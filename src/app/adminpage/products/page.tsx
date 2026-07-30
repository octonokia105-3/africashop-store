"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { Product, getProducts, deleteProduct, upsertProduct, getAllProductsAdmin } from "@/app/actions/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getAllProductsAdmin();
    setProducts(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct.title || !currentProduct.slug || !currentProduct.price) {
      alert("المرجوا ملء الحقول الإلزامية");
      return;
    }
    
    // Ensure JSON arrays are properly formatted
    const toSave = {
      ...currentProduct,
      images: Array.isArray(currentProduct.images) ? currentProduct.images : [],
      features: Array.isArray(currentProduct.features) ? currentProduct.features : []
    };

    const res = await upsertProduct(toSave);
    if (res.success) {
      setIsEditing(false);
      setCurrentProduct({});
      loadProducts();
    } else {
      alert("خطأ: " + res.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من الحذف؟")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  if (loading) return <div className="p-10 text-center text-muted">جاري التحميل...</div>;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center bg-surface border border-border p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl font-black text-light">إدارة المنتجات</h1>
          <p className="text-muted text-sm mt-1">إضافة وتعديل المنتجات المعروضة في المتجر</p>
        </div>
        <button 
          onClick={() => { setCurrentProduct({ is_active: true, images: [], features: [] }); setIsEditing(true); }}
          className="bg-gold text-void font-bold px-6 py-3 rounded-xl hover:bg-gold-hover transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-void/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <h2 className="text-xl font-black text-light mb-6">{currentProduct.id ? 'تعديل منتج' : 'منتج جديد'}</h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-muted text-sm mb-1">الاسم (Title)</label>
                <input required type="text" value={currentProduct.title || ''} onChange={e => setCurrentProduct({...currentProduct, title: e.target.value})} className="w-full bg-void border border-border rounded-lg p-3 text-light" />
              </div>
              <div>
                <label className="block text-muted text-sm mb-1">الرابط (Slug) - مثلا: my-product-name</label>
                <input required type="text" value={currentProduct.slug || ''} onChange={e => setCurrentProduct({...currentProduct, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full bg-void border border-border rounded-lg p-3 text-light" />
              </div>
              <div>
                <label className="block text-muted text-sm mb-1">الوصف (Description)</label>
                <textarea value={currentProduct.description || ''} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} className="w-full bg-void border border-border rounded-lg p-3 text-light h-24" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted text-sm mb-1">السعر (Price)</label>
                  <input required type="number" value={currentProduct.price || ''} onChange={e => setCurrentProduct({...currentProduct, price: Number(e.target.value)})} className="w-full bg-void border border-border rounded-lg p-3 text-light" />
                </div>
                <div>
                  <label className="block text-muted text-sm mb-1">الثمن القديم (Compare at)</label>
                  <input type="number" value={currentProduct.compare_at_price || ''} onChange={e => setCurrentProduct({...currentProduct, compare_at_price: Number(e.target.value)})} className="w-full bg-void border border-border rounded-lg p-3 text-light" />
                </div>
              </div>
              <div>
                <label className="block text-muted text-sm mb-1">رابط الصورة (Image URL) - افصل بفاصلة لعدة صور</label>
                <input type="text" value={currentProduct.images?.join(', ') || ''} onChange={e => setCurrentProduct({...currentProduct, images: e.target.value.split(',').map(s => s.trim()).filter(s => s)})} className="w-full bg-void border border-border rounded-lg p-3 text-light" placeholder="/images/nokia/my-image.png" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="isActive" checked={currentProduct.is_active !== false} onChange={e => setCurrentProduct({...currentProduct, is_active: e.target.checked})} className="w-5 h-5 accent-gold" />
                <label htmlFor="isActive" className="text-light">نشط (يظهر في المتجر)</label>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-border mt-6">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg border border-border text-muted hover:text-light transition-colors">إلغاء</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-gold text-void font-bold hover:bg-gold-hover transition-colors">حفظ المنتج</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-void/50 border-b border-border text-muted text-sm">
            <tr>
              <th className="p-4 font-normal text-right">المنتج</th>
              <th className="p-4 font-normal text-right">السعر</th>
              <th className="p-4 font-normal text-right">الحالة</th>
              <th className="p-4 font-normal text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-void/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-void border border-border flex items-center justify-center overflow-hidden">
                      {p.images && p.images[0] ? (
                        <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-muted" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-light">{p.title}</div>
                      <div className="text-xs text-muted">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-bold text-gold">{p.price} درهم</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${p.is_active ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted'}`}>
                    {p.is_active ? 'نشط' : 'مخفي'}
                  </span>
                </td>
                <td className="p-4 text-left">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setCurrentProduct(p); setIsEditing(true); }} className="p-2 rounded-lg bg-void text-muted hover:text-gold transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg bg-void text-muted hover:text-urgent transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted">لا توجد منتجات. أضف منتجك الأول الآن!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
