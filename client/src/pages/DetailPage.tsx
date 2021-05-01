import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinkCard } from '../components/LinkCard'

import { LinkType } from './CreatePage'

type LinkParams = {
    id: string;
};

export const DetailPage = () => {
    const { token } = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [ link, setLink ] = useState<LinkType | null>(null)
    const linkId = useParams<LinkParams>().id

    const getLink = useCallback(async () => {
        try {
            const fetched: LinkType = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLink(fetched)
        } catch (e) { }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}