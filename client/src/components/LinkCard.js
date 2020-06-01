import React from 'react'
import { Layout, Col } from 'antd'

export const LinkCard = ({ link }) => {
  return (
    <Layout.Content>
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 18, offset: 3 }}
      >
        <h2 className='link-card-title'>Link</h2>

        <p>Your link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Clicks count on the link: <strong>{link.clicks}</strong></p>
        <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      </Col>
    </Layout.Content>
  )
}