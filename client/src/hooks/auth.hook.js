import { useState, useCallback, useEffect } from "react"

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [expiredAt, setExpiredAt] = useState(null)

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setExpiredAt(0)

        localStorage.removeItem(storageName)
    }, [])

    const onExpiredLogout = useCallback((expDate) => {      
        if (expDate === null) {
            console.log('Stil not fetch time')
            return
        }

        const expTimer = new Date(expDate) - new Date()
        if ( expTimer <= 0) { 
            console.log('authorizaton expired')
            logout()
        } else {
            setTimeout(() => {
                logout()
            }, expTimer)  
        }        
    }, [logout])  

    const login = useCallback((jwtToken, id, expDate) => {
        setToken(jwtToken)
        setUserId(id)
        setExpiredAt(expDate)
        
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, 
            token: jwtToken, 
            expired: expDate
        }))

        onExpiredLogout(expDate)
    }, [onExpiredLogout])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.expired)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready, expiredAt}
}