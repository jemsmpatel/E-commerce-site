import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const CustomerAdminPrivateRoute = () => {

    const { userInfo } = useSelector((state) => state.userAuth);
    return (
        userInfo?.isAdmin == true || userInfo?.isStaff == true ?
            <Outlet /> :
            <Navigate to='/login' replace />
    );
};

export default CustomerAdminPrivateRoute;