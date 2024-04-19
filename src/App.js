import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuManage from './components/Admin/MenuManage';
import SupportTicket from './components/Admin/SupportTicket';
import Feeback from './components/Customer/Feeback';



function App() {
  return (
    <Router>
      <Routes>        
        
        <Route path="/MenuManage" element={<MenuManage />} />
        <Route path="/Feeback" element={<Feeback/>} />
        <Route path="/Support" element={<Support/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
