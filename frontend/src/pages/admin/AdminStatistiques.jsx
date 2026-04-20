import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import api from '../../utils/api.js'

export default function AdminStatistiques() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
       // Assuming stats exist in public route as generic json or we use admin route
      const { data } = await api.get('/admin/statistiques')
      setStats(data.data || data)
    } catch(e) {
      // Mock datas if no api
      setStats([
         { id: 1, cle: 'cotes_km', description_fr: 'Kilomètres de côtes maritimes', valeur: '3500' },
         { id: 2, cle: 'enr_objectif', description_fr: 'Objectif ENR mix électrique 2030', valeur: '52' },
      ])
    }
    setLoading(false)
  }

  const handleEdit = (stat) => {
    setEditingId(stat.id)
    setEditValue(stat.valeur)
  }

  const handleSave = async (id) => {
    try {
      await api.put(`/admin/statistiques/${id}`, { valeur: editValue })
      setStats(stats.map(s => s.id === id ? { ...s, valeur: editValue } : s))
    } catch(e) {
      alert("Note: Utilisation du mock en l'absence de DB connectée pour l'édition.")
      setStats(stats.map(s => s.id === id ? { ...s, valeur: editValue } : s))
    } finally {
      setEditingId(null)
    }
  }

  return (
    <AdminLayout title="Indicateurs de Pilotage">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
         <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
               <tr>
                  <th className="px-6 py-4 border-b">Indicateur (Clé)</th>
                  <th className="px-6 py-4 border-b">Description</th>
                  <th className="px-6 py-4 border-b w-48">Valeur Courante</th>
               </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">Chargement...</td></tr>
              ) : stats.map(stat => (
                <tr key={stat.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                   <td className="px-6 py-5 font-mono text-xs text-gray-400">{stat.cle}</td>
                   <td className="px-6 py-5 font-semibold text-dark">{stat.description_fr}</td>
                   <td className="px-6 py-5">
                      {editingId === stat.id ? (
                        <div className="flex items-center gap-2">
                           <input 
                             type="text" 
                             value={editValue} 
                             onChange={e => setEditValue(e.target.value)} 
                             className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-primary focus:border-primary text-sm"
                            />
                           <button onClick={() => handleSave(stat.id)} className="p-1.5 bg-primary text-white rounded hover:bg-primaryMid">
                              <Check className="w-4 h-4" />
                           </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between group cursor-pointer" onClick={() => handleEdit(stat)}>
                           <span className="font-display font-bold text-lg">{stat.valeur}</span>
                           <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">Modifier</span>
                        </div>
                      )}
                   </td>
                </tr>
              ))}
            </tbody>
         </table>
      </div>
    </AdminLayout>
  )
}
