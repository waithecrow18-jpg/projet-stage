import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Search, X, Save, FileText } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import api from '../../utils/api.js'

export default function AdminPublications() {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  
  const [form, setForm] = useState({
    titre_fr: '', titre_ar: '',
    categorie: 'Rapport', auteur: '', date_publication: new Date().toISOString().split('T')[0]
  })
  const [pdfFile, setPdfFile] = useState(null)

  const fetchPublications = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/publications', { params: { search, page } })
      setPublications(data.data || data)
      setLastPage(data.last_page || 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPublications() }, [page, search])

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer cette publication ?")) {
      try {
        await api.delete(`/admin/publications/${id}`)
        fetchPublications()
      } catch (e) { alert("Erreur lors de la suppression.") }
    }
  }

  const openForm = (item = null) => {
    if (item) {
      setEditingId(item.id)
      setForm({
        titre_fr: item.titre_fr || '', titre_ar: item.titre_ar || '',
        categorie: item.categorie || 'Rapport', auteur: item.auteur || '', 
        date_publication: item.date_publication ? item.date_publication.split('T')[0] : ''
      })
    } else {
      setEditingId(null)
      setForm({
        titre_fr: '', titre_ar: '',
        categorie: 'Rapport', auteur: '', date_publication: new Date().toISOString().split('T')[0]
      })
    }
    setPdfFile(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))
    if (pdfFile) formData.append('fichier_pdf', pdfFile)
    
    try {
      if (editingId) {
        formData.append('_method', 'PUT')
        await api.post(`/admin/publications/${editingId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/admin/publications', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      setIsModalOpen(false)
      fetchPublications()
    } catch (e) {
      alert("Erreur d'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="Gestion des Publications">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" placeholder="Rechercher par titre..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-primary focus:border-primary"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button icon={Plus} size="sm" onClick={() => openForm()}>Nouvelle Publication</Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Titre (FR)</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Chargement...</td></tr>
              ) : publications.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Aucune publication trouvée.</td></tr>
              ) : publications.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-dark flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-500"/> {item.titre_fr}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.categorie}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(item.date_publication).toLocaleDateString()}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <button onClick={() => openForm(item)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? 'Modifier la publication' : 'Nouvelle publication'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Titre (FR)</label>
                <input required type="text" value={form.titre_fr} onChange={e => setForm({...form, titre_fr: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Titre (AR)</label>
                <input type="text" value={form.titre_ar} onChange={e => setForm({...form, titre_ar: e.target.value})} className="w-full p-2 border rounded" dir="rtl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Catégorie</label>
                  <input required type="text" value={form.categorie} onChange={e => setForm({...form, categorie: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Date</label>
                  <input required type="date" value={form.date_publication} onChange={e => setForm({...form, date_publication: e.target.value})} className="w-full p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Auteur/Organisation</label>
                <input type="text" value={form.auteur} onChange={e => setForm({...form, auteur: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Fichier PDF</label>
                <input type="file" accept="application/pdf" onChange={e => setPdfFile(e.target.files[0])} className="w-full p-2 border rounded" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Annuler</Button>
                <Button type="submit" loading={saving} icon={Save}>Enregistrer</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
