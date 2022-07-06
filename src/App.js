import './App.css';
import logo from './img/logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <div>
      <div class="logo"><img src={logo} width="300px" alt="ЛИНИЯ"/></div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;