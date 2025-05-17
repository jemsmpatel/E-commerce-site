import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const SPrivateRoute = () => {

    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    return sellerInfo ? <Outlet /> : <Navigate to='/seller/login' replace />;
};

export default SPrivateRoute;