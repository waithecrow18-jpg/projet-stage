import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import Button from '../../components/ui/Button.jsx'
import api from '../../utils/api.js'

export default function AdminActualites() {
  const [actualites, setActualites] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  const fetchActualites = async () => {
    setLoading(true)
    try {
      // Endpoint admin pour récupérer toutes les actualités, y compris les brouillons
      const { data } = await api.get('/admin/actualites', { params: { search, page } })
      // Selon format Laravel pagination (excépté si on utlise une ressource différente)
      setActualites(data.data || data)
      setLastPage(data.last_page || 1)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActualites()
  }, [page, search])

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette actualité ?")) {
      try {
        await api.delete(`/admin/actualites/${id}`)
        fetchActualites()
      } catch (e) {
        alert("Erreur lors de la suppression.")
      }
    }
  }

  return (
    <AdminLayout title="Gestion des Actualités">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Rechercher par titre..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-primary focus:border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/actualites/create">
          <Button icon={Plus} size="sm">Nouvelle Actualité</Button>
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Titre (FR)</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">Chargement des données...</td></tr>
              ) : actualites.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-400">Aucune actualité trouvée.</td></tr>
              ) : actualites.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-dark max-w-md truncate">{item.titre_fr || item.title}</td>
                  <td className="px-6 py-4 text-gray-500">{item.categorie || item.category}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(item.date_publication || item.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${item.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {item.is_published ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-2">
                    <Link to={`/admin/actualites/edit/${item.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination simple */}
        {lastPage > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">Page {page} sur {lastPage}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page-1)}>Précédent</Button>
              <Button variant="outline" size="sm" disabled={page === lastPage} onClick={() => setPage(page+1)}>Suivant</Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
