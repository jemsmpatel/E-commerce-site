import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const SellerAdminPrivateRoute = () => {

    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    return (
        sellerInfo?.isAdmin == true || sellerInfo?.isStaff == true ?
            < Outlet /> :
            <Navigate to='/seller/login' replace />
    );
};

export default SellerAdminPrivateRoute;