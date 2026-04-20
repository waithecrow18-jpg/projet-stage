import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Search, X, Save } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import api from '../../utils/api.js'

export default function AdminProgrammes() {
  const [programmes, setProgrammes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  
  const [form, setForm] = useState({
    nom_fr: '', nom_ar: '',
    description_fr: '', description_ar: '',
    couleur: '', annee_lancement: '', statut: 'Actif'
  })
  const [iconeFile, setIconeFile] = useState(null)

  const fetchProgrammes = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/admin/programmes', { params: { search, page } })
      setProgrammes(data.data || data)
      setLastPage(data.last_page || 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProgrammes() }, [page, search])

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce programme ?")) {
      try {
        await api.delete(`/admin/programmes/${id}`)
        fetchProgrammes()
      } catch (e) { alert("Erreur lors de la suppression.") }
    }
  }

  const openForm = (item = null) => {
    if (item) {
      setEditingId(item.id)
      setForm({
        nom_fr: item.nom_fr || '', nom_ar: item.nom_ar || '',
        description_fr: item.description_fr || '', description_ar: item.description_ar || '',
        couleur: item.couleur || '', annee_lancement: item.annee_lancement || '', statut: item.statut || 'Actif'
      })
    } else {
      setEditingId(null)
      setForm({
        nom_fr: '', nom_ar: '',
        description_fr: '', description_ar: '',
        couleur: '', annee_lancement: '', statut: 'Actif'
      })
    }
    setIconeFile(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))
    if (iconeFile) formData.append('icone', iconeFile)
    
    try {
      if (editingId) {
        formData.append('_method', 'PUT')
        await api.post(`/admin/programmes/${editingId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/admin/programmes', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      }
      setIsModalOpen(false)
      fetchProgrammes()
    } catch (e) {
      alert("Erreur d'enregistrement.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="Gestion des Programmes">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" placeholder="Rechercher par nom..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-primary focus:border-primary"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button icon={Plus} size="sm" onClick={() => openForm()}>Nouveau Programme</Button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Nom (FR)</th>
                <th className="px-6 py-4">Année</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Chargement...</td></tr>
              ) : programmes.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Aucun programme trouvé.</td></tr>
              ) : programmes.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-dark">{item.nom_fr}</td>
                  <td className="px-6 py-4 text-gray-500">{item.annee_lancement || '-'}</td>
                  <td className="px-6 py-4"><span className="inline-flex px-2 py-1 rounded text-xs bg-gray-100">{item.statut}</span></td>
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
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? 'Modifier le programme' : 'Nouveau programme'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nom (FR)</label>
                  <input required type="text" value={form.nom_fr} onChange={e => setForm({...form, nom_fr: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Nom (AR)</label>
                  <input type="text" value={form.nom_ar} onChange={e => setForm({...form, nom_ar: e.target.value})} className="w-full p-2 border rounded" dir="rtl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Description (FR)</label>
                  <textarea required rows={3} value={form.description_fr} onChange={e => setForm({...form, description_fr: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description (AR)</label>
                  <textarea rows={3} value={form.description_ar} onChange={e => setForm({...form, description_ar: e.target.value})} className="w-full p-2 border rounded" dir="rtl" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Année</label>
                  <input type="number" value={form.annee_lancement} onChange={e => setForm({...form, annee_lancement: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Statut</label>
                  <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value})} className="w-full p-2 border rounded">
                    <option value="Actif">Actif</option><option value="En cours">En cours</option><option value="Terminé">Terminé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Couleur</label>
                  <input type="color" value={form.couleur || '#1D9E75'} onChange={e => setForm({...form, couleur: e.target.value})} className="w-full p-1 border rounded h-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Icône (Image)</label>
                <input type="file" accept="image/*" onChange={e => setIconeFile(e.target.files[0])} className="w-full p-2 border rounded" />
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
