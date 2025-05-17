import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Footer from "./Structure/Footer";
import HeaderCustomer from "./Structure/HeaderCustomer";

const App = () => {
    return (
        <>
            <ToastContainer />
            <HeaderCustomer />
            <Outlet />
            <Footer />
        </>
    )
}

export default App