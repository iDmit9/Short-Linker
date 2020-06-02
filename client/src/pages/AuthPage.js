import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

import { Form, Input, Button, Card, Row, Layout } from 'antd';

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {

    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      const expirationDate = new Date(new Date().getTime() + data.expTime * 1000)
      auth.login(data.token, data.userId, expirationDate)
      message(data.message)
    } catch (e) {

    }
  }

  const layout = {
    labelCol: { span: 8, },
    wrapperCol: { span: 16, },
  }

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  return (
    <Layout className='auth-layout' >
      <Row justify="center" align="middle">
        <Card
          title="Authorization"
          bordered={true}
          className='authCard'
        >
          <Form
            {...layout}
            name="basic"
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid E-mail!',
                }, {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              hasFeedback
            >
              <Input
                id="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
            </Form.Item>
            <Form.Item
              name="passwordLabel"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                }, {
                  min: 6,
                  message: 'Minimum length 6 characters!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                id="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                disabled={loading}
                onClick={loginHandler}
              >
                Log In
              </Button>
              <Button
                onClick={registerHandler}
                disabled={loading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Layout>
  )
}