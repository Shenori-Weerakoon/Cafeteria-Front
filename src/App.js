import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuManage from './components/Admin/MenuManage';
import MenuForm from './components/Admin/MenuForm';
import SignUp from './components/Customer/SignUp';
import LogIn from './components/Customer/Login';
import Profile from './components/Customer/Profile';
import Customer from './components/Admin/Customer';


function App() {
  return (
    <Router>
      <Routes>        
        
        <Route path="/MenuManage" element={<MenuManage />} />
        <Route path="/MenuForm" element={<MenuForm />} /> 
        <Route path="/Login" element={<LogIn />} />
        <Route path="/Register" element={<SignUp />} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Customer" element={<Customer />} />


      </Routes>
    </Router>
  );
}

export default App;
