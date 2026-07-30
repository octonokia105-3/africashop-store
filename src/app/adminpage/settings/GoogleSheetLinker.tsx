'use client'

import { useState } from 'react'
import { Link2, ShieldCheck, X, CheckCircle2, ArrowRight } from 'lucide-react'
import { saveGoogleSheetsWebhook } from '@/app/actions/settings'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GoogleSheetLinker({ initialUrl }: { initialUrl: string }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState(initialUrl || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!url || url.trim() === '') {
      alert("المرجوا إدخال رابط Google Webhook الخاص بك")
      return
    }
    setIsSaving(true)
    const res = await saveGoogleSheetsWebhook(url.trim())
    setIsSaving(false)
    if (res.success) {
      setIsOpen(false)
      window.location.reload()
    } else {
      alert("حدث خطأ أثناء حفظ الرابط: " + res.error)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-void border border-border hover:border-green-500 text-light font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group"
      >
        {initialUrl ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-green-500">مربوط وتلقائي (اضغط لتغيير رابط Google Sheet)</span>
          </>
        ) : (
          <>
            <Link2 className="w-5 h-5 text-muted group-hover:text-green-500 transition-colors" /> 
            {t.settings.linkAccount || "ربط رابط Google Sheets (Webhook)"}
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between p-6 border-b border-border bg-surface-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-light">لصق رابط Google Webhook</h3>
                  <p className="text-sm text-muted">الرابط المنشوق من Google Apps Script</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-light transition-colors p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-center">
              <p className="text-light text-sm leading-relaxed">
                قم بلصق رابط الـ <strong>Application Web URL</strong> الذي قمت بنسخه من Google Apps Script (الذي ينتهي بـ <code>/exec</code>).
              </p>

              <div className="space-y-2 text-right">
                <label className="text-sm font-bold text-light">رابط Google Webhook URL</label>
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full bg-void border border-border rounded-xl px-4 py-3 text-light focus:outline-none focus:border-green-500 transition-colors dir-ltr text-left font-mono text-xs"
                />
              </div>
            </div>

            <div className="p-6 border-t border-border bg-surface-2 flex justify-end gap-3">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-xl text-muted hover:text-light font-bold transition-colors"
              >
                إلغاء
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || !url}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-xl transition-colors flex items-center gap-2"
              >
                {isSaving ? "جاري التفعيل..." : "حفظ الرابط والتفعيل"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
