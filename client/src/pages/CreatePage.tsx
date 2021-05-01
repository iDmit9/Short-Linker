import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Row, Input, Col } from 'antd'

import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export type LinkType = {
    link: {
        clicks: number
        code: string
        date: string
        from: string
        owner: string
        to: string
        _id: string
    }    
}

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            try {
                const data: LinkType = await request('/api/link/generate', 'POST', { from: link }, {
                    Authorization: `Bearer ${auth.token}`
                })

                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                console.log('Link generation error')
            }
        }
    }

    return (
        <Layout.Content>
            <Row>
                <Col
                    xs={{ span: 24, offset: 0 }}
                    lg={{ span: 12, offset: 6 }}
                >
                    <h4 style={{ paddingTop: '2rem' }}>Enter link</h4>
                    <Input
                        className='createInput'
                        placeholder="Enter link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                </Col>
            </Row>
        </Layout.Content>
    )
}