import { useState, useCallback } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const request = useCallback( async (url: string, method = 'GET', body = null, headers = {}) => {        
        setLoading(true)
        try {
            if(body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            
            console.log('data response',response)

            // because its universal function I think shoud use type any 
            const data: any  = await response.json()

            console.log('data ',data)
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')    
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e.message
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}