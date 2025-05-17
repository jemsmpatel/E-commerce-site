import { apiSlice } from './apiSlice.js';
import { PRODUCT_URL } from '../constants.js';
import { data } from 'react-router';


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/`,
                method: "POST",
                body: data
            }),
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "PUT",
                body: data
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        getSellerAllProducts: builder.query({
            query: (id) => `${PRODUCT_URL}/seller/${id}`
        }),
        getSpecificProduct: builder.query({
            query: (id) => `${PRODUCT_URL}/${id}`
        }),
        getAllProducts: builder.query({
            query: () => `${PRODUCT_URL}/`,
        }),
        getListProducts: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/list`,
                method: "POST",
                body: data
            }),
        }),
        getSearchedStringProducts: builder.query({
            query: (str) => `${PRODUCT_URL}/search/${str}`
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/review`,
                method: "POST",
                body: data,
            }),
        }),
        getUserAllReviews: builder.query({
            query: (id) => `${PRODUCT_URL}/review/user/${id}`
        }),
        updateReview: builder.mutation({
            query: ({ pid, rid, data }) => ({
                url: `${PRODUCT_URL}/review/${pid}/${rid}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteReview: builder.mutation({
            query: ({ pid, rid }) => ({
                url: `${PRODUCT_URL}/review/${pid}/${rid}`,
                method: "DELETE",
            }),
        }),

        createOrder: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/order`,
                method: "POST",
                body: data,
            }),
        }),
        updateOrder: builder.mutation({
            query: ({ id, data }) => ({
                url: `${PRODUCT_URL}/order/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/order/${id}`,
                method: "DELETE"
            }),
        }),
        getAllOrders: builder.query({
            query: () => `${PRODUCT_URL}/order`,
        }),
        getSpecificOrder: builder.query({
            query: (id) => `${PRODUCT_URL}/order/${id}`,
        }),
        getUserAllOrders: builder.query({
            query: (id) => `${PRODUCT_URL}/order/user/${id}`
        }),
        getSellerActiveOrders: builder.query({
            query: (id) => `${PRODUCT_URL}/order/seller/${id}`,
        }),
        getSellerSoldOrders: builder.query({
            query: (id) => `${PRODUCT_URL}/order/seller/sold/${id}`,
        }),
    }),
});


export const {
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetSellerAllProductsQuery,
    useGetSpecificProductQuery,
    useDeleteProductMutation,
    useGetAllProductsQuery,
    useGetListProductsMutation,
    useGetSearchedStringProductsQuery,
    useCreateReviewMutation,
    useGetUserAllReviewsQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,


    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetAllOrdersQuery,
    useGetSpecificOrderQuery,
    useGetUserAllOrdersQuery,
    useGetSellerActiveOrdersQuery,
    useGetSellerSoldOrdersQuery,
} = productsApiSlice;