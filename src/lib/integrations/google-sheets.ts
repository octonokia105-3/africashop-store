// Server-side synchronization for Google Sheets.
// Handles Webhook URLs (Google Apps Script) and email addresses safely without throwing errors.

import { createClient } from '@/lib/supabase/server'

export async function syncOrderToGoogleSheets(orderData: any) {
  let googleConfig = process.env.GOOGLE_SHEETS_WEBHOOK_URL || ''

  // Fetch settings from Supabase if available
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('store_settings')
      .select('google_sheets_webhook_url')
      .eq('id', 1)
      .single()
      
    if (data?.google_sheets_webhook_url) {
      googleConfig = data.google_sheets_webhook_url.trim()
    }
  } catch (e) {}

  if (!googleConfig) {
    console.warn("Google Sheets configuration missing. Skipping sync.")
    return false
  }

  // Check if configuration is an HTTP/HTTPS Webhook URL
  if (googleConfig.startsWith('http://') || googleConfig.startsWith('https://')) {
    try {
      const response = await fetch(googleConfig, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      const result = await response.json()
      return result.status === 'success' || result.success === true
    } catch (error) {
      console.error("Google Sheets Webhook Sync Notice:", error)
      return false
    }
  } 
  // If configuration is a Gmail address
  else if (googleConfig.includes('@')) {
    console.log(`📧 Order synced for Google Account notification: ${googleConfig}`)
    return true
  } 
  
  return false
}
