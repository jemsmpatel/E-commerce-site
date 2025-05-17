import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserCartQuery, useUpdateCartMutation, useRemoveProductToCartMutation } from '../../redux/api/users';
import { useGetListProductsMutation } from '../../redux/api/products';
import { Link } from 'react-router-dom';
import ImageSlider from '../Componants/ImageSlider';
import { toast } from 'react-toastify';
import Loader from '../../Structure/Loader';

const Cart = () => {
    const { userInfo } = useSelector((state) => state.userAuth);
    const { data, isLoadingdata, isError, refetch } = useGetUserCartQuery(userInfo.id);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [qty, setQty] = useState(1);

    const [getProducts, { data: productList, isLoading }] = useGetListProductsMutation();
    const [updateCart, { isUpdatingLoading, updateError }] = useUpdateCartMutation();
    const [deleteProductToCart, { isDeleteProductLoading, deleteProductError }] = useRemoveProductToCartMutation();

    useEffect(() => {
        refetch();
        if (data && data.cart_items && data.cart_items.length > 0) {
            const product_ids = data.cart_items.map((item) => item.product_id);
            getProducts({ product_ids: product_ids });
        }
    }, [data]);

    const openModal = (product, index) => {
        const initialQty = data?.cart_items[index]?.qty || 1;
        setSelectedProduct({ ...product, index });
        setQty(initialQty);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        setQty(1);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateCart({
                id: userInfo.id,
                data: {
                    product_id: selectedProduct._id,
                    qty: qty,
                    tax: selectedProduct.tax,
                },
            }).unwrap();
            toast.success("Quantity updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Quantity update failed");
        }
        closeModal();
    };

    const handleRemoveProductSubmit = async (product_id) => {
        try {
            deleteProductToCart({ id: userInfo.id, product_id: product_id });
            refetch();
            toast.success("product removed to cart");
        } catch (error) {
            console.error(error);
            toast.error("Product Delition Error");
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Cart Products</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                {productList?.length > 0 ? (
                    productList.map((product, index) => (
                        <div
                            key={product?._id}
                            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="w-full md:w-[250px] h-[250px] overflow-hidden">
                                <ImageSlider images={product?.images} alt={product?.name} />
                            </div>
                            <div className="w-full p-4 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800">Product Name: {product?.name}</h2>
                                    <p className="text-gray-600 text-md mt-1">Description: {product?.description}</p>
                                    <div className="flex flex-wrap gap-6 mt-2">
                                        <p className="text-gray-600 text-md">Category: {product?.category}</p>
                                        <p className="text-gray-600 text-md">Stock: {product?.stock}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-6 mt-2">
                                        <p className="text-gray-600 text-md">Brand: {product?.brand}</p>
                                        <p className="text-gray-600 text-md">Tax: {data?.cart_items[index]?.tax}%</p>
                                    </div>
                                    <p className="text-gray-600 text-md mt-1">quntity: {data?.cart_items[index]?.qty}</p>
                                    <p className="text-gray-600 text-md mt-1 font-medium">
                                        Sub Total: ₹{((product?.price * data?.cart_items[index]?.qty) + ((product?.price * data?.cart_items[index]?.qty * data?.cart_items[index]?.tax) / 100))}
                                    </p>
                                </div>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-lg font-bold text-indigo-600">Price: ₹{product?.price}</span>
                                    <span className="text-lg font-bold text-indigo-600">MRP: ₹{product?.mrp_price}</span>
                                    <span className="text-lg font-bold text-indigo-600">Discount: ₹{product?.discount_price}</span>
                                    <div className="flex">
                                        <button
                                            onClick={() => openModal(product, index)}
                                            className="bg-indigo-600 text-white text-md px-4 py-2 rounded-xl hover:bg-indigo-700 transition mr-4"
                                        >
                                            Edit quntity
                                        </button>
                                        <button
                                            onClick={() => handleRemoveProductSubmit(product._id)}
                                            className="bg-indigo-600 text-white text-md px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : isLoading ? (
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500">Failed to load products.</div>
                ) : (
                    <div className="text-center text-gray-600 text-lg">No Products Found</div>
                )}
                {productList ? <div className='flex justify-center'><Link to={`/order`}><button className='cursor-pointer bg-gray-800 text-white w-auto py-3 px-4 rounded-2xl text-xl whitespace-nowrap'>Order Now</button></Link></div> : ""}
            </div>
            {showModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Edit Qty for: {selectedProduct.name}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label htmlFor="qty" className="block mb-2 font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                id="qty"
                                type="number"
                                className="border rounded px-3 py-2 w-full mb-4"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                min={1}
                                max={selectedProduct.stock}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            >
                                {isUpdatingLoading ? "Saving" : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;