import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout.jsx'

export default function AdminProgrammes() {
  return (
    <AdminLayout title="Programmes">
      <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm text-gray-500">
        <h3 className="font-display font-medium text-lg mb-2">Interface de gestion des programmes</h3>
        <p className="text-sm">Veuillez reproduire la même logique que AdminActualites (CRUD) pour finaliser ce panel.</p>
      </div>
    </AdminLayout>
  )
}
