import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Blocks, FileCheck, BarChart3, Settings } from 'lucide-react'

const LINKS = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Actualités', path: '/admin/actualites', icon: FileText },
  { label: 'Programmes', path: '/admin/programmes', icon: Blocks },
  { label: 'Publications', path: '/admin/publications', icon: FileCheck },
  { label: 'Statistiques', path: '/admin/statistiques', icon: BarChart3 },
]

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const location = useLocation()

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-dark/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-gray-100 w-64 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        
        {/* Header Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
             <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary" />
             </div>
             Portail Admin
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
          {LINKS.map(link => {
            const isActive = location.pathname.startsWith(link.path)
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors relative group ${
                  isActive ? 'text-primary bg-primary/5' : 'text-gray-600 hover:text-dark hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full" />}
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`} />
                {link.label}
              </Link>
            )
          })}
        </div>

      </aside>
    </>
  )
}
