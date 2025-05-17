import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import HeaderCustomer from "./Structure/HeaderCustomer";
import Footer from "./Structure/Footer";

const ADMINApp = () => {
    return (
        <>
            <ToastContainer />
            <HeaderCustomer />
            <Outlet />
            <Footer />
        </>
    );
}

export default ADMINApp;