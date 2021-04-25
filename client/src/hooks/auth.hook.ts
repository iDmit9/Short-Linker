import { useState, useCallback, useEffect } from "react"

let storageName: string = 'userData' 

type StorageDataType = {
    token: string, 
    userId: string, 
    expired: any //<Date| string | number | null>
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [expiredAt, setExpiredAt] = useState<any>(null) //<Date| string | number | null>

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setExpiredAt(0)

        localStorage.removeItem(storageName)
    }, [])

    const onExpiredLogout = useCallback((expDate: any) => {      
        if (expDate === null) {
            return
        }

        const expTimer = +new Date(expDate) - +new Date()
        if ( expTimer <= 0) { 
            console.log('authorizaton expired')
            logout()
        } else {
            setTimeout(() => {
                logout()
            }, expTimer)  
        }        
    }, [logout])  

    const login = useCallback((jwtToken:string, id:string, expDate:any):void => {
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
        
        let data: StorageDataType = {token: '', userId: '', expired: 0}

        //getItem return argument of type 'string | null' 
        //which is not assignable to JSON.parse whithout type checking
        const storageString = localStorage.getItem(storageName)
        
        if (typeof storageString === "string") {
            data = JSON.parse(storageString)
        } 

        if (data && data.token) {
            login(data.token, data.userId, data.expired)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready, expiredAt}
}