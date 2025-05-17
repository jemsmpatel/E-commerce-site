import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api', // Proxy will convert this to http://127.0.0.1:5000
        credentials: 'include',
    }),
    endpoints: () => ({}), // Extend in other files
});
