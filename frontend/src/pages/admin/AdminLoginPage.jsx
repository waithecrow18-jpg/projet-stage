import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import Button from '../../components/ui/Button.jsx'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      // Navigate is handled by ProtectedRoute or already active context, 
      // but normally we are redirected. In a real scenario we use navigate('/admin/dashboard')
    } catch (err) {
      setError(err?.response?.data?.message || err?.response?.data?.errors?.email?.[0] || 'Erreur de connexion. Vérifiez vos identifiants.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F5] px-4 py-12 sm:px-6 lg:px-8">
      <Helmet><title>Connexion Administration</title></Helmet>
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Espace Sécurisé
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Département de l'environnement du Maroc
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{error}</div>}

          <div className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary text-sm bg-gray-50 focus:bg-white transition-colors"
                  placeholder="admin@environnement.gov.ma"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary text-sm bg-gray-50 focus:bg-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full justify-center">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  )
}
