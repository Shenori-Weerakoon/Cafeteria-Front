import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuManage from './components/Admin/MenuManage';
import MenuForm from './components/Admin/MenuForm';
import SignUp from './components/Customer/SignUp';
import LogIn from './components/Customer/Login';
import Profile from './components/Customer/Profile';
import Customer from './components/Admin/Customer';
import InventoryManage from './components/Admin/InventoryManage';
import InventoryForm from './components/Admin/InventoryForm';
import PromotionManage from './components/Admin/PromotionManage';
import PromotionForm from './components/Admin/PromotionForm';
import HomePage from './components/Customer/HomePage';
import CheckoutPage from './components/Customer/Checkout';
import AdminLogin from './components/Admin/AdminLogin';
import AdminSignUp from './components/Admin/AdminSignUp';
import Employee from './components/Admin/EmployeeManage';
import EmployeeForm from './components/Admin/EmployeeForm';
import EmployeeLogin from './components/Admin/EmployeeLogin';
import EmployeeForm from './components/Admin/EmployeeForm';
import CashOnDelivery from './components/Customer/CashOnDelivery';
import OrderPaymentManage from './components/Admin/OrderPaymentManage';
import Payment from './components/Customer/Payment';
import Orders from './components/Customer/Orders';
import SupportTicket from './components/Admin/SupportTicket';
import Feeback from './components/Customer/Feeback';
import Support from './components/Customer/Support';



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
        <Route path="/InventoryManage" element={<InventoryManage />} />
        <Route path="/InventoryForm" element={<InventoryForm />} />
        <Route path="/PromotionForm" element={<PromotionForm />} />
        <Route path="/PromotionManage" element={<PromotionManage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/CheckoutPage" element={<CheckoutPage/>} />
        <Route path="/SalaryForm" element={<SalaryForm />} />
        <Route path="/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/Employee" element={<Employee />} />        
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminSignUp" element={<AdminSignUp />} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/CashOnDelivery" element={<CashOnDelivery/>} />
        <Route path="/OrderPaymentManage" element={<OrderPaymentManage />} />
        <Route path="/Orders" element={<Orders/>} />
        <Route path="/SupportTicket" element={<SupportTicket />} />
        <Route path="/Feeback" element={<Feeback/>} />
        <Route path="/Support" element={<Support/>} />


      </Routes>
    </Router>
  );
}

export default App;
