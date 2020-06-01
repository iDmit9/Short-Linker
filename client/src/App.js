import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Loader } from './components/Loader';

function App() {
  const { token, login, logout, userId, ready, expiredAt } = useAuth()
  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, expiredAt
    }}>
      <Router>
        {/* <Layout> */}
          {/* <div className='container'> */}
          {/* {isAuthenticated && <Navbar />}           */}
            {routes}
          {/* </div> */}
        {/* </Layout> */}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
