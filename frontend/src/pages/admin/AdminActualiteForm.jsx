import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Save, X, Image as ImageIcon } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import api from '../../utils/api.js'

export default function AdminActualiteForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  
  const [form, setForm] = useState({
    titre_fr: '', titre_ar: '',
     extrait_fr: '', extrait_ar: '',
    contenu_fr: '', contenu_ar: '',
    categorie: 'News', date_publication: new Date().toISOString().split('T')[0],
    is_published: true
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (isEdit) {
      api.get(`/admin/actualites/${id}`).then(({ data }) => {
        const item = data.data || data
        setForm({
          titre_fr: item.titre_fr || '', titre_ar: item.titre_ar || '',
          extrait_fr: item.extrait_fr || '', extrait_ar: item.extrait_ar || '',
          contenu_fr: item.contenu_fr || '', contenu_ar: item.contenu_ar || '',
          categorie: item.categorie || 'News',
          date_publication: item.date_publication ? item.date_publication.split('T')[0] : '',
          is_published: item.is_published ?? true
        })
        if (item.image) setImagePreview(item.image)
        setLoading(false)
      }).catch(() => {
        alert("Erreur de chargement de l'actualité")
        navigate('/admin/actualites')
      })
    }
  }, [id, isEdit, navigate])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Utilisation de FormData car il y a un upload d'image
    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))
    if (imageFile) formData.append('image', imageFile)
    
    if (isEdit) formData.append('_method', 'PUT') // Simulation PUT pour multipart form-data Laravel

    try {
      if (isEdit) {
        await api.post(`/admin/actualites/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/admin/actualites', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      navigate('/admin/actualites')
    } catch (e) {
      console.error(e)
      alert(e.response?.data?.message || "Erreur lors de l'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AdminLayout title="Chargement..."><div/></AdminLayout>

  return (
    <AdminLayout title={isEdit ? "Modifier l'actualité" : "Nouvelle actualité"}>
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Version FR */}
          <div className="space-y-4">
             <div className="bg-blue-50 py-2 px-4 rounded-lg text-blue-800 font-bold text-sm mb-4">Version Française</div>
             <div>
               <label className="block text-sm font-semibold mb-1">Titre</label>
               <input required type="text" value={form.titre_fr} onChange={e => setForm({...form, titre_fr: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50" />
             </div>
             <div>
               <label className="block text-sm font-semibold mb-1">Extrait (Court)</label>
               <textarea required rows={3} value={form.extrait_fr} onChange={e => setForm({...form, extrait_fr: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 resize-none" />
             </div>
             <div>
               <label className="block text-sm font-semibold mb-1">Contenu complet</label>
               <textarea required rows={8} value={form.contenu_fr} onChange={e => setForm({...form, contenu_fr: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50" />
             </div>
          </div>

          {/* Version AR */}
          <div className="space-y-4" dir="rtl">
             <div className="bg-emerald-50 py-2 px-4 rounded-lg text-emerald-800 font-bold text-sm mb-4">النسخة العربية (Arabe)</div>
             <div>
               <label className="block text-sm font-semibold mb-1">العنوان</label>
               <input type="text" value={form.titre_ar} onChange={e => setForm({...form, titre_ar: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50" />
             </div>
             <div>
               <label className="block text-sm font-semibold mb-1">مقتطف</label>
               <textarea rows={3} value={form.extrait_ar} onChange={e => setForm({...form, extrait_ar: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 resize-none" />
             </div>
             <div>
               <label className="block text-sm font-semibold mb-1">المحتوى الكامل</label>
               <textarea rows={8} value={form.contenu_ar} onChange={e => setForm({...form, contenu_ar: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50" />
             </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Catégorie</label>
                  <select value={form.categorie} onChange={e=>setForm({...form, categorie: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50">
                    <option value="News">News</option>
                    <option value="Événements">Événements</option>
                    <option value="Communiqués">Communiqués</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Date de publication</label>
                  <input type="date" value={form.date_publication} onChange={e => setForm({...form, date_publication: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50" />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer mt-4">
                 <input type="checkbox" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-primary" />
                 <span className="text-sm font-medium">Publier immédiatement sur le site</span>
              </label>
           </div>
           
           <div>
              <label className="block text-sm font-semibold mb-2">Image de couverture</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl h-40 flex flex-col items-center justify-center relative overflow-hidden group">
                 {imagePreview ? (
                   <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                   <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500">Cliquez pour uploader une image</span>
                   </div>
                 )}
                 <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
           </div>
        </div>

        <div className="mt-10 flex gap-4 pt-6 border-t border-gray-100 justify-end">
          <Button variant="outline" type="button" onClick={() => navigate('/admin/actualites')} icon={X}>Annuler</Button>
          <Button type="submit" loading={saving} icon={Save}>Enregistrer</Button>
        </div>

      </form>
    </AdminLayout>
  )
}
