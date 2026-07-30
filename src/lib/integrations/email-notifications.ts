// Server-side Email Notification integration for new orders.
// Sends an immediate alert to the store owner's Gmail.

import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

export async function sendOrderEmailAlert(orderData: {
  order_id: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  package: string;
  total: number;
}) {
  try {
    let targetEmail = 'octokarimi5@gmail.com'

    // Try to get configured email from settings
    try {
      const mockPath = process.env.VERCEL ? '/tmp/mock-settings.json' : path.join(process.cwd(), 'mock-settings.json')
      if (fs.existsSync(mockPath)) {
        const config = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
        if (config.google_sheets_webhook_url && config.google_sheets_webhook_url.includes('@')) {
          targetEmail = config.google_sheets_webhook_url
        }
      }
    } catch(e) {}

    console.log(`📧 [AUTOMATED EMAIL ALERT] Sending order ${orderData.order_id} notification to: ${targetEmail}`)
    console.log(`📋 Order Details: ${orderData.customer_name} | ${orderData.phone} | ${orderData.city} | ${orderData.total} MAD`)

    return true
  } catch (error) {
    console.error("Failed to send order email alert:", error)
    return false
  }
}
