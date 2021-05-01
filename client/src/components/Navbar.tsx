import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Row, Layout, Menu } from 'antd'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <Layout.Header className='navbar'>
      <Row style={{ flexFlow: 'nowrap', height: 64 }}>
        <h1 className="brand-logo">ShortLinker</h1>
        <Menu
          className='menu-row'
          theme="dark"
          mode="horizontal"
          selectable={false}
        >
          <Menu.Item key="1"><NavLink to="/create">Create</NavLink></Menu.Item>
          <Menu.Item key="2"><NavLink to="/links">Links</NavLink></Menu.Item>
          <Menu.Item key="3"><a href="/" onClick={logoutHandler}>Logout</a></Menu.Item>
        </Menu>
      </Row>
    </Layout.Header>
  )
}