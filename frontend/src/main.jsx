import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store.js';
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Index from './Pages/Pages/Index';
import About from './Pages/Pages/About';
import ContactUs from './Pages/Pages/ContactUs';
import Download from './Pages/Pages/Download';
import Login from './Pages/Pages/Login';
import Registration from './Pages/Pages/Registration';
import SApp from './SApp';
import SLogin from './Pages/seller_pages/SLogin';
import SIndex from './Pages/seller_pages/SIndex';
import SPrivateRoute from './Pages/seller_pages/SPrivateRoute';
import SRegistration from './Pages/seller_pages/SRegistration';
import Create from './Pages/seller_pages/Create';
import Products from './Pages/seller_pages/Products';
import EditProduct from './Pages/seller_pages/EditProduct';
import ADMINApp from './ADMINApp';
import AdminPrivateRoute from './Pages/Admin_pages/AdminPrivateRoute';
import ADMINIndex from './Pages/Admin_pages/ADMINIndex';
import CustomerAdminPrivateRoute from './Pages/Admin_pages/CustomerAdmin/CustomerAdminPrivateRoute';
import CustemreHome from './Pages/Admin_pages/CustomerAdmin/CustemreHome';
import SellerAdminPrivateRoute from './Pages/Admin_pages/SellerAdmin/SellerAdminPrivateRoute';
import SellerHome from './Pages/Admin_pages/SellerAdmin/SellerHome';
import CustomerUsers from './Pages/Admin_pages/CustomerAdmin/CustomerUsers';
import CustomerUsersUpdate from './Pages/Admin_pages/CustomerAdmin/CustomerUsersUpdate';
import CustemerAdd from './Pages/Admin_pages/CustomerAdmin/CustemerAdd';
import CustemerContact from './Pages/Admin_pages/CustomerAdmin/CustemerContact';
import CustemerContactAdd from './Pages/Admin_pages/CustomerAdmin/CustemerContactAdd';
import CustemerContactsUpdate from './Pages/Admin_pages/CustomerAdmin/CustemerContactsUpdate';
import SellerUsers from './Pages/Admin_pages/SellerAdmin/SellerUsers';
import SellerAdd from './Pages/Admin_pages/SellerAdmin/SellerAdd';
import SellerUsersUpdate from './Pages/Admin_pages/SellerAdmin/SellerUsersUpdate';
import SellerContact from './Pages/Admin_pages/SellerAdmin/SellerContact';
import SellerContactsUpdate from './Pages/Admin_pages/SellerAdmin/SellerContactsUpdate';
import SellerContactAdd from './Pages/Admin_pages/SellerAdmin/SellerContactAdd';
import SellerProduct from './Pages/Admin_pages/SellerAdmin/SellerProduct';
import SellerProductAdd from './Pages/Admin_pages/SellerAdmin/SellerProductAdd';
import SellerProductUpdate from './Pages/Admin_pages/SellerAdmin/SellerProductUpdate';
import ProductView from './Pages/Pages/ProductView';
import Cart from './Pages/Pages/Cart';
import PrivateRoute from './Pages/Pages/PrivateRoute';
import Order from './Pages/Pages/Order';
import ProfileOrders from './Pages/Pages/ProfileOrders';
import Profile from './Pages/Pages/Profile';
import ProductOrderDetails from './Pages/Pages/ProductOrderDetails';
import TermsPolicies from './Pages/Pages/TermsPolicies';
import UserReviews from './Pages/Pages/UserReviews';
import SellerOrders from './Pages/seller_pages/SellerOrders';
import SellerSold from './Pages/seller_pages/SellerSold';
import AdminSellerOrders from './Pages/Admin_pages/SellerAdmin/AdminSellerOrders';
import Search from './Pages/Pages/Search';
import Loader from './Structure/Loader';
import ProductPreview from './Pages/seller_pages/ProductPreview';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/'>
            {/* user urls */}
            <Route path='/' element={<App />}>
                <Route index element={<Index />} />
                <Route path='about' element={<About />} />
                <Route path='contact' element={<ContactUs />} />
                <Route path='search/:id' element={<Search />} />
                <Route path='download' element={<Download />} />
                <Route path='login' element={<Login />} />
                <Route path='registration' element={<Registration />} />
                <Route path='product/:id' element={<ProductView />} />
                <Route path='' element={<PrivateRoute />} >
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/reviews' element={<UserReviews />} />
                    <Route path='/termspolicies' element={<TermsPolicies />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<Order />} />
                    <Route path='/profile/orders' element={<ProfileOrders />} />
                    <Route path='/profile/orders/:id' element={<ProductOrderDetails />} />
                </Route>
            </Route>
            {/* seller urls */}
            <Route path='/seller' element={<SApp />} >
                <Route path='' element={<SPrivateRoute />} >
                    <Route path='' element={<SIndex />} />
                    <Route path='create' element={<Create />} />
                    <Route path='products' element={<Products />} />
                    <Route path='products/:id' element={<EditProduct />} />
                    <Route path='product/:id' element={<ProductPreview />} />
                    <Route path='orders' element={<SellerOrders />} />
                    <Route path='sold' element={<SellerSold />} />
                </Route>
                <Route path='registration' element={<SRegistration />} />
                <Route path='login' element={<SLogin />} />
            </Route>
            {/* admin urls */}
            <Route path='/admin' element={<ADMINApp />} >
                <Route path='' element={<AdminPrivateRoute />} >
                    <Route path='' element={<ADMINIndex />} />
                    <Route path='home' element={<CustomerAdminPrivateRoute />}>
                        <Route path='' element={<CustemreHome />} />
                        <Route path='users' element={<CustomerUsers />} />
                        <Route path='users/:id' element={<CustomerUsersUpdate />} />
                        <Route path='users/add' element={<CustemerAdd />} />
                        <Route path='contact' element={<CustemerContact />} />
                        <Route path='contact/:id' element={<CustemerContactsUpdate />} />
                        <Route path='contact/add' element={<CustemerContactAdd />} />
                    </Route>
                    <Route path='seller' element={<SellerAdminPrivateRoute />}>
                        <Route path='' element={<SellerHome />} />
                        <Route path='users' element={<SellerUsers />} />
                        <Route path='users/:id' element={<SellerUsersUpdate />} />
                        <Route path='users/add' element={<SellerAdd />} />
                        <Route path='contact' element={<SellerContact />} />
                        <Route path='contact/:id' element={<SellerContactsUpdate />} />
                        <Route path='contact/add' element={<SellerContactAdd />} />
                        <Route path='products' element={<SellerProduct />} />
                        <Route path='products/:id' element={<SellerProductUpdate />} />
                        <Route path='products/add' element={<SellerProductAdd />} />
                        <Route path='orders' element={<AdminSellerOrders />} />
                    </Route>
                </Route>
            </Route>
        </Route >
    )
);




createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);