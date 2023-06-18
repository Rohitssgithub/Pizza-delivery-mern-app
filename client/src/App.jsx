import React from 'react'
import NavBar from './Components/Navbar/NavBar';
import Home from './Pages/Home';
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Cart from './Components/Cart/Cart';
import Registration from './Components/Register/Registration';
import Login from './Components/Login/Login';
import UserList from './Components/Admin/userList';
import ShowAllPizza from './Components/Admin/ShowAllPizza';
import AddBurger from './Components/Admin/AddPizza';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Components/Profile/Profile';
import Logout from './Components/Logout';
import AdminPage from './Components/Admin/AdminPage';
import UpdateUser from './Components/Admin/UpdateUser';
import UpdatePizza from './Components/Admin/UpdatePizza.Jsx';
import Footer from './Components/footer/Footer';
import ProtectAdmin from './Components/ProtectAdmin';
import Protected from './Components/Protected';
import AddUser from './Components/Admin/AddUser';
import Order from './Components/order/Order';
import OrderDetail from './Components/order/OrderDetail';

const App = () => (
  <>
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={
          <Protected>
            <Cart />
          </Protected>
        } />
        <Route path='/admin'
          element={
            <ProtectAdmin>
              <AdminPage />
            </ProtectAdmin>
          } />
        <Route path='/addpizza' element={
          <ProtectAdmin>
            <AddBurger />
          </ProtectAdmin>
        } />
        <Route path='/Profile/:id' element={<Profile />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/userlist' element={
          <ProtectAdmin>
            <UserList />
          </ProtectAdmin>
        } />
        <Route path='/allpizza' element={
          <ProtectAdmin>
            <ShowAllPizza />
          </ProtectAdmin>
        } />
        <Route path='/edit/:id' element={
          <ProtectAdmin>
            <UpdateUser />
          </ProtectAdmin>
        } />
        <Route path='/update/:id' element={
          <ProtectAdmin>
            <UpdatePizza />
          </ProtectAdmin>
        } />
        <Route path='/addUser' element={
          <ProtectAdmin>
            <AddUser />
          </ProtectAdmin>
        } />
        <Route path='/order' element={<Order />} />
        <Route path='/orderdetail/:id' element={<OrderDetail />} />
      </Routes>
      {/* <Footer></Footer> */}
    </Router>
  </>
)

export default App
