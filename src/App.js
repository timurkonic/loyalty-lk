import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import backendService from './BackendService';

import Login from './Login';
import Register from './Register';
import Account from './Account';

const App = () => {
  const [ token, setToken ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ account, setAccount ] = useState({});
  const [ authorized, setAuthorized ] = useState(undefined);

  const authorize = async () => {
    if (!token) {
      return;
    }

    if (token.length == 0) {
      setAuthorized(false);
      return;
    }
    
    try {
      const response = await backendService('GET', '/user/account', { token: token });
      setAccount(response);
      setAuthorized(true);
    }
    catch (e) {
      setAuthorized(false);
    }
  };

  const ProtectedRoute = ({ authorized, children }) => {
    if (authorized === undefined)
      return null;
    if (!authorized) {
      return <Navigate to="/login"/>;
    }
    return children;
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])

  useEffect(() => {
    if (token)
      localStorage.setItem('token', token);
  }, [token])

  useEffect(() => {
    setLoading(true);
    authorize();
    setLoading(false);
  }, [token]);

  if (loading)
    return <Spinner animation="border" variant="light" className="loading"/>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={
          <ProtectedRoute authorized={authorized} children={
            <Account account={account}/>
          }/>
        }/>
        <Route path="/" element={<Navigate to="/account" replace={true}/>}/>
      </Routes>
    </Router>
  );
}

export default App;