import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ActivateAccountPage from './pages/auth/ActivateAccountPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './utils/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
      <AuthProvider>
        <Routes> 
          <Route path='/' element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/activate' element={<ActivateAccountPage />} />
        </Routes>
      </AuthProvider>

    </div>
    </BrowserRouter>
  );
}

export default App;
