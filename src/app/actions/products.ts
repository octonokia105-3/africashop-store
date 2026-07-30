'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/server'

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  images: string[];
  features: { label: string; val: string }[];
  urgency_stock: number;
  is_active: boolean;
  created_at: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data || []
  } catch (err) {
    console.error("Error fetching products:", err)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()
      
    if (error) throw error
    return data
  } catch (err) {
    console.error(`Error fetching product ${slug}:`, err)
    return null
  }
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data || []
  } catch (err) {
    console.error("Error fetching all products for admin:", err)
    return []
  }
}

export async function upsertProduct(product: Partial<Product>) {
  try {
    const supabase = await createAdminClient()
    const { data, error } = await supabase
      .from('products')
      .upsert(product)
      .select()
      .single()
      
    if (error) throw error
    return { success: true, data }
  } catch (error: any) {
    console.error("Error saving product:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteProduct(id: string) {
  try {
    const supabase = await createAdminClient()
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
      
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
