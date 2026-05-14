import './App.css'
import Auth from './pages/Auth'
import Login from './components/Login'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Auth/>}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path='login' element={<Login/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
