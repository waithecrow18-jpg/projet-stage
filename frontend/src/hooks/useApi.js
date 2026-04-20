import { useState, useEffect, useCallback } from 'react'
import api from '../utils/api.js'

/**
 * Hook générique pour les appels API (GET)
 * Supporte l'annulation au démontage ou lors du changement de paramètres.
 * 
 * @param {string} endpoint - L'URL (ex: '/actualites')
 * @param {object} initialParams - Paramètres de requête (ex: { page: 1 })
 */
export function useApi(endpoint, initialParams = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(initialParams)

  const fetchData = useCallback(async (currentParams, signal) => {
    setLoading(true)
    setError(null)
    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
      const response = await api.get(`/${cleanEndpoint}`, { params: currentParams, signal })
      
      // Stocke la réponse brute (qui contiendra data et meta dans le cas de Laravel Pagination)
      setData(response.data)
      setLoading(false)
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        return // Requête ignorée car annulée
      }
      setError(err?.response?.data?.message || err.message || 'Erreur réseau')
      setLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    const controller = new AbortController()
    fetchData(params, controller.signal)

    // Cleanup: annule la requête
    return () => controller.abort()
  }, [fetchData, params])

  const refetch = (newParams) => {
    if (newParams) {
      setParams(prev => ({ ...prev, ...newParams }))
    } else {
      setParams({ ...params })
    }
  }

  return { data, loading, error, refetch, params, setParams }
}

// ─────────────────────────────────────────────────────────────
// Rétrocompatibilité (utilisée par certaines sections si besoin)
// ─────────────────────────────────────────────────────────────
export function useApiList(resource, p = {}) {
  const { data, loading, error } = useApi(resource, p)
  // Laravel renvoie généralement les tableaux paginés dans response.data.data
  return { data: data?.data ?? data ?? [], loading, error }
}

export function useApiOne(resource, id) {
  return useApi(`${resource}/${id}`)
}

export default useApi
