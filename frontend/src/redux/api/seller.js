import { apiSlice } from './apiSlice';
import { SELLER_URL, UPLOAD_URL } from '../constants';

export const users = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sellerRegister: builder.mutation({
            query: (data) => ({
                url: `${SELLER_URL}/`,
                method: "POST",
                body: data,
            }),
        }),
        sellerLogin: builder.mutation({
            query: (data) => ({
                url: `${SELLER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        sellerUpdateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `${SELLER_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        sellerDeleteUser: builder.mutation({
            query: (id) => ({
                url: `${SELLER_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: formData,
            }),
        }),
        getAllSeller: builder.query({
            query: () => `${SELLER_URL}/`,
        }),
        getSpecificSeller: builder.query({
            query: (id) => `${SELLER_URL}/${id}`
        }),
        sellerLogout: builder.mutation({
            query: () => ({
                url: `${SELLER_URL}/logout`,
                method: "POST",
            }),
        }),
        // sellerProfile: builder.mutation({
        //     query: () => ({
        //         url: `${SELLER_URL}/profile`,
        //         method: "GET",
        //     }),
        // }),
        // sellerUpdateProfile: builder.mutation({
        //     query: (data) => ({
        //         url: `${SELLER_URL}/profile`,
        //         method: "PUT",
        //         body: data
        //     }),
        // }),
        sellerCreateContact: builder.mutation({
            query: (data) => ({
                url: `${SELLER_URL}/contact`,
                method: "POST",
                body: data,
            }),
        }),
        sellerUpdateContact: builder.mutation({
            query: ({ id, data }) => ({
                url: `${SELLER_URL}/contact/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        sellerDeleteContact: builder.mutation({
            query: (id) => ({
                url: `${SELLER_URL}/contact/${id}`,
                method: "DELETE",
            }),
        }),
        sellerGetContact: builder.query({
            query: (id) => `${SELLER_URL}/contact/${id}`,
        }),
        // sellerGetUserAllContact: builder.mutation({
        //     query: () => ({
        //         url: `${SELLER_URL}/contact/user/${id}`,
        //         method: "GET",
        //     }),
        // }),
        sellerGetAllContacts: builder.query({
            query: () => `${SELLER_URL}/contact`,
        }),
    }),
});

export const {
    useSellerRegisterMutation,
    useSellerLoginMutation,
    useSellerUpdateUserMutation,
    useSellerDeleteUserMutation,
    useUploadImageMutation,
    useGetAllSellerQuery,
    useGetSpecificSellerQuery,
    useSellerLogoutMutation,
    // useSellerProfileMutation,
    // useSellerUpdateProfileMutation,
    useSellerCreateContactMutation,
    useSellerUpdateContactMutation,
    useSellerDeleteContactMutation,
    useSellerGetContactQuery,
    // useSellerGetUserAllContactMutation,
    useSellerGetAllContactsQuery,
} = users;
