import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import AdminSidebar from './AdminSidebar.jsx'
import AdminNavbar from './AdminNavbar.jsx'

export default function AdminLayout({ children, title = 'Tableau de bord' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>{title} | Admin Environment.ma</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#F4F6F5] flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main Wrapper */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 transition-all duration-300">
          <AdminNavbar 
            toggleSidebar={() => setSidebarOpen(true)} 
            title={title} 
          />
          
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
             <div className="max-w-6xl mx-auto">
               {children}
             </div>
          </main>
        </div>
      </div>
    </>
  )
}
