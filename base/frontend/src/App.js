import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './utils/PrivateRoute';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
      <AuthProvider>
        <Routes> 
          <Route index element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </AuthProvider>

    </div>
    </BrowserRouter>
  );
}

export default App;
