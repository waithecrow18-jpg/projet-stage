import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'
import { FileText, Blocks, FileCheck, MailType } from 'lucide-react'
import api from '../../utils/api.js'

function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
         <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="font-display text-2xl font-bold text-dark">{value}</p>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ actualites: 0, programmes: 0, publications: 0, contacts: 0 })
  const [recentNews, setRecentNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Dans un vrai cas, on appellerait /api/v1/admin/dashboard
    // Ici on mock le chargement pour la démo visuelle
    setTimeout(() => {
      setStats({ actualites: 24, programmes: 4, publications: 112, contacts: 38 })
      setRecentNews([
        { id: 1, title: "Lancement du Plan de Reforestation", date: "15 Mar 2025", status: 1 },
        { id: 2, title: "Rapport CO2 2024", date: "10 Mar 2025", status: 1 },
        { id: 3, title: "Nouvelle loi sur l'eau", date: "05 Mar 2025", status: 0 },
      ])
      setLoading(false)
    }, 600)
  }, [])

  return (
    <AdminLayout title="Vue d'ensemble">
      
      {/* 4 Cartes Métriques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Actualités" value={loading ? '-' : stats.actualites} icon={FileText} colorClass="bg-blue-50 text-blue-600" />
        <StatCard title="Programmes" value={loading ? '-' : stats.programmes} icon={Blocks} colorClass="bg-green-50 text-emerald-600" />
        <StatCard title="Publications" value={loading ? '-' : stats.publications} icon={FileCheck} colorClass="bg-red-50 text-red-600" />
        <StatCard title="Messages Web" value={loading ? '-' : stats.contacts} icon={MailType} colorClass="bg-amber-50 text-amber-600" />
      </div>

      {/* Tableau dernières actus */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="font-display font-semibold text-dark">Actualités Récentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4 font-medium">Titre (FR)</th>
                <th className="px-6 py-4 font-medium text-center">Statut</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">Chargement...</td></tr>
              ) : recentNews.map(news => (
                <tr key={news.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-dark">{news.title}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${news.status ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {news.status ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{news.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  )
}
