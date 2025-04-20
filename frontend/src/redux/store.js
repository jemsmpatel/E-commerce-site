import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authReducer from './features/auth/authSlice';
import sellerAuthReducer from './features/seller/sellerauthSlice';
import { apiSlice } from './api/apiSlice';
// import moviesReducer from "../redux/features/movies/moviesSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        userAuth: authReducer,
        sellerAuth: sellerAuthReducer,
        // movies: moviesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

setupListeners(store.dispatch);

export default store;