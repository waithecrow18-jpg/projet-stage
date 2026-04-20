import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'

export default function AdminPublications() {
  return (
    <AdminLayout title="Publications Officielles">
      <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm text-gray-500">
        <h3 className="font-display font-medium text-lg mb-2">Interface d'upload des publications</h3>
        <p className="text-sm">Système d'upload de fichiers PDF similaires à la logique d'images implémentée dans les formulaires.</p>
      </div>
    </AdminLayout>
  )
}
