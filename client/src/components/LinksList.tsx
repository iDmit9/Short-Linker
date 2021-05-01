import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Table } from 'antd'

import { LinkType } from '../types'

type LinksListProps = {
   links: Array<LinkType>
}

export const LinksList = ({ links }: LinksListProps) => {
   if (!links.length) {
      return <p className="center">No links yet</p>
   }

   const columns = [
      {
         title: 'Original',
         dataIndex: 'from',
         key: 'from',
      },
      {
         title: 'Shortened',
         dataIndex: 'to',
         key: 'to',
      },
      {
         title: 'Open',
         dataIndex: '_id',
         key: '_id',
         render: (text: string) => <Link to={`/detail/${text}`}>Open</Link>,
      },
   ];

   return (
      <Layout.Content>
         <Table rowKey="_id" columns={columns} dataSource={links} />
      </Layout.Content>
   )
}