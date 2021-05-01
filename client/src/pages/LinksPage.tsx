import React, { useState, useCallback, useEffect, useContext } from 'react'

import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

import { LinkType } from '../types'

export const LinksPage = () => {
    const [ links, setLinks ] = useState<Array<LinkType>>([])
    const { loading, request } = useHttp()
    const { token } = useContext( AuthContext )

    const fetchLinks = useCallback( async () => {
        try {
            const fetched: Array<LinkType> = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    
    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links}/>}
        </>
    )
}