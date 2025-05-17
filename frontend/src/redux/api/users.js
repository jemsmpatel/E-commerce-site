import { apiSlice } from './apiSlice';
import { USER_URL } from '../constants';

export const users = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/`,
                method: "POST",
                body: data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        request_login_otp: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/request_otp`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            }),
        }),
        profile: builder.query({
            query: () => `${USER_URL}/profile`
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data
            }),
        }),
        createContact: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/contact`,
                method: "POST",
                body: data,
            }),
        }),
        updateContact: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USER_URL}/contact/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/contact/${id}`,
                method: "DELETE",
            }),
        }),
        getContact: builder.query({
            query: (id) => `${USER_URL}/contact/${id}`,
        }),
        getUserAllContact: builder.mutation({
            query: () => ({
                url: `${USER_URL}/contact/user/${id}`,
                method: "GET",
            }),
        }),
        getAllUsers: builder.query({
            query: () => `${USER_URL}/`,
        }),
        getSpecificuser: builder.query({
            query: (id) => `${USER_URL}/${id}`,
        }),
        updateSpecificUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USER_URL}/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteSpecificUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        getAllContacts: builder.query({
            query: () => `${USER_URL}/contact`,
        }),
        addToCart: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USER_URL}/cart/${id}`,
                method: "POST",
                body: data,
            }),
        }),
        updateCart: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USER_URL}/cart/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        removeProductToCart: builder.mutation({
            query: ({ id, product_id }) => ({
                url: `${USER_URL}/cart/${id}/${product_id}`,
                method: "DELETE",
            }),
        }),
        EmptyCart: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/cart/${id}`,
                method: "DELETE",
            }),
        }),
        getUserCart: builder.query({
            query: (id) => `${USER_URL}/cart/${id}`,
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useRequest_login_otpMutation,
    useLogoutMutation,
    useProfileQuery,
    useUpdateProfileMutation,
    useCreateContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
    useGetContactQuery,
    useGetUserAllContactMutation,
    useGetAllUsersQuery,
    useGetSpecificuserQuery,
    useUpdateSpecificUserMutation,
    useDeleteSpecificUserMutation,
    useGetAllContactsQuery,
    useAddToCartMutation,
    useUpdateCartMutation,
    useRemoveProductToCartMutation,
    useEmptyCartMutation,
    useGetUserCartQuery,
} = users;
