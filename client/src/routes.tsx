import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'

import { Navbar } from './components/Navbar';
import { Layout } from 'antd';

export const useRoutes = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
        return (
            <Layout>
                <Navbar />
                <Switch>
                    <Route path='/links' exact>
                        <LinksPage />
                    </Route>
                    <Route path='/create' exact>
                        <CreatePage />
                    </Route>
                    <Route path='/detail/:id'>
                        <DetailPage />
                    </Route>

                    <Redirect to='/create' />
                </Switch>
            </Layout>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>

            <Redirect to='/' />
        </Switch>
    )
}