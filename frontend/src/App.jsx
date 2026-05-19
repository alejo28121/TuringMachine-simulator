import './App.css'
import Auth from './pages/Auth'
import Login from './components/Login'
import Dashboard from './pages/DashboardPage'
import States from './components/states'
import Transitions from './components/transitions'
import Tape from './components/Tape'
import Simulations from './components/Simulation'
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
          <Route path='/dashboard/' element={<Dashboard/>}>
            <Route path='states' element={<States/>}/>
            <Route path='transitions' element={<Transitions/>}/>
            <Route path='tape' element={<Tape/>}/>
            <Route path='simulation' element={<Simulations/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
