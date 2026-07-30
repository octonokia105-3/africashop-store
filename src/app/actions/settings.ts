'use server'

import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

function getMockSettingsPath() {
  return process.env.VERCEL ? '/tmp/mock-settings.json' : path.join(process.cwd(), 'mock-settings.json')
}

export async function getStoreSettings() {
  // Check if Supabase keys are configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const mockPath = getMockSettingsPath()
      if (fs.existsSync(mockPath)) {
        return JSON.parse(fs.readFileSync(mockPath, 'utf8'))
      }
    } catch (e) {}
    return null
  }

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .single()
      
    if (error && error.code !== 'PGRST116') {
      console.error("Error fetching settings from Supabase:", error)
      // Fallback to mock settings if Supabase fetch fails
      try {
        const mockPath = getMockSettingsPath()
        if (fs.existsSync(mockPath)) {
          return JSON.parse(fs.readFileSync(mockPath, 'utf8'))
        }
      } catch(e) {}
      return null
    }
    return data
  } catch (err) {
    // Fallback to mock settings
    try {
      const mockPath = getMockSettingsPath()
      if (fs.existsSync(mockPath)) {
        return JSON.parse(fs.readFileSync(mockPath, 'utf8'))
      }
    } catch (e) {}
    return null
  }
}

export async function saveGoogleSheetsWebhook(url: string) {
  // Dev mode / Local fallback
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const mockPath = getMockSettingsPath()
      let current: any = {}
      if (fs.existsSync(mockPath)) {
        current = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
      }
      current.id = 1
      current.google_sheets_webhook_url = url
      fs.writeFileSync(mockPath, JSON.stringify(current, null, 2))
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e.message }
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('store_settings')
      .upsert({ id: 1, google_sheets_webhook_url: url })
      
    if (error) throw error
    
    // Also save to mock settings as backup
    try {
      const mockPath = getMockSettingsPath()
      let current: any = {}
      if (fs.existsSync(mockPath)) {
        current = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
      }
      current.id = 1
      current.google_sheets_webhook_url = url
      fs.writeFileSync(mockPath, JSON.stringify(current, null, 2))
    } catch(e) {}

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function saveTrackingConfig(data: { metaPixelId?: string; metaCapiToken?: string; tiktokPixelId?: string; googleAdsId?: string }) {
  // Dev mode / Local fallback
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const mockPath = getMockSettingsPath()
      let current: any = {}
      if (fs.existsSync(mockPath)) {
        current = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
      }
      current.id = 1
      current.meta_pixel_id = data.metaPixelId || ''
      current.meta_capi_token = data.metaCapiToken || ''
      current.tiktok_pixel_id = data.tiktokPixelId || ''
      current.google_ads_id = data.googleAdsId || ''
      fs.writeFileSync(mockPath, JSON.stringify(current, null, 2))
      return { success: true }
    } catch (e: any) {
      return { success: false, error: e.message }
    }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('store_settings')
      .upsert({ 
        id: 1, 
        meta_pixel_id: data.metaPixelId || '',
        meta_capi_token: data.metaCapiToken || '',
        tiktok_pixel_id: data.tiktokPixelId || '',
        google_ads_id: data.googleAdsId || ''
      })
      
    if (error) throw error

    // Also save to mock settings as backup
    try {
      const mockPath = getMockSettingsPath()
      let current: any = {}
      if (fs.existsSync(mockPath)) {
        current = JSON.parse(fs.readFileSync(mockPath, 'utf8'))
      }
      current.id = 1
      current.meta_pixel_id = data.metaPixelId || ''
      current.meta_capi_token = data.metaCapiToken || ''
      current.tiktok_pixel_id = data.tiktokPixelId || ''
      current.google_ads_id = data.googleAdsId || ''
      fs.writeFileSync(mockPath, JSON.stringify(current, null, 2))
    } catch(e) {}

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
