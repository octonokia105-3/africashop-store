import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const filePath = process.env.VERCEL 
      ? '/tmp/google-sheets-live.csv' 
      : path.join(process.cwd(), 'public', 'google-sheets-live.csv')

    let fileContent = ''
    if (!fs.existsSync(filePath)) {
      fileContent = 'Order ID,Date & Time,Customer Name,Phone,City,Address,Package,Total,Status\n'
    } else {
      fileContent = fs.readFileSync(filePath, 'utf8')
    }

    const dateStr = new Date().toLocaleString('fr-FR', { timeZone: 'GMT' })
    const row = `"${data.order_id || 'NEW'}","${dateStr}","${data.customer_name || ''}","${data.phone || ''}","${data.city || ''}","${data.address || ''}","${data.package || ''}","${data.total} MAD","New"\n`

    fs.appendFileSync(filePath, row, 'utf8')

    console.log("🟢 Live Webhook Sync Received:", data)

    return NextResponse.json({ status: 'success', message: 'Order appended to live sheet' })
  } catch (error: any) {
    console.error("🔴 Live Webhook Error:", error)
    return NextResponse.json({ status: 'error', error: error.message }, { status: 500 })
  }
}

export async function GET() {
  const filePath = process.env.VERCEL 
    ? '/tmp/google-sheets-live.csv' 
    : path.join(process.cwd(), 'public', 'google-sheets-live.csv')

  if (fs.existsSync(filePath)) {
    const csvContent = fs.readFileSync(filePath, 'utf8')
    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'inline; filename="google-sheets-live.csv"'
      }
    })
  }

  return new Response('Order ID,Date & Time,Customer Name,Phone,City,Address,Package,Total,Status\n', {
    headers: { 'Content-Type': 'text/csv' }
  })
}
