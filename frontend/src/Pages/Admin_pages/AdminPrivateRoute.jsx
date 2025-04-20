import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const AdminPrivateRoute = () => {
    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    const { userInfo } = useSelector((state) => state.userAuth);
    return (
        sellerInfo?.isAdmin == true || sellerInfo?.isStaff == true || userInfo?.isAdmin == true || userInfo?.isStaff == true
            ? <Outlet /> :
            <Navigate to='/login' replace />
    );
};

export default AdminPrivateRoute;