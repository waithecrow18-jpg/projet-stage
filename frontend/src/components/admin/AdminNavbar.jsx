import { Menu, LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminNavbar({ toggleSidebar, title }) {
  const { logout, user } = useAuth()

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-display font-semibold text-dark text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 border-r border-gray-200 pr-4">
           <User className="w-4 h-4" />
           {user?.name || 'Administrateur'}
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </button>
      </div>
    </header>
  )
}
