import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/shared/Login/Login';
import { AuthProvider } from './context/authContext';
import Register from './components/shared/Register/Register';
import Home from './components/shared/Home/Home';
import Protected from './context/Protected';
import { BrowserRouter } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path='/' element={ 
          <Protected>
            <Home /> 
          </Protected>
        } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
