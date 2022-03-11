import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import ProtectedRoute from './auth/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/login" element={<ProtectedRoute component={Login} restricted />} />
            <Route path="/register" element={<ProtectedRoute component={Register} restricted />} />
            <Route path="/" element={<PrivateRoute component={Dashboard} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
