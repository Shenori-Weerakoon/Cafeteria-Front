import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuManage from './components/Admin/MenuManage';
import MenuForm from './components/Admin/MenuForm';



function App() {
  return (
    <Router>
      <Routes>        
        
        <Route path="/MenuManage" element={<MenuManage />} />
        <Route path="/MenuForm" element={<MenuForm />} /> 

      </Routes>
    </Router>
  );
}

export default App;
