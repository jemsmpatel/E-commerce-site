import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAddToCartMutation } from '../../redux/api/users';
import { toast } from 'react-toastify';

const Card = ({ product }) => {
    const { userInfo } = useSelector((state) => state.userAuth);
    const navigate = useNavigate();
    const [addtocart, { isLoading, error }] = useAddToCartMutation();
    const redirect = new URLSearchParams(useLocation().search).get('redirect') || '/login';
    const handlecart = (id, tax) => {
        if (!userInfo.id) {
            navigate(redirect);
        }
        try {
            const result = addtocart({
                id: userInfo.id,
                data: {
                    "product_id": id,
                    "qty": 1,
                    "tax": tax,
                }
            }).unwrap();
            toast.success("Product Added To Cart");
        } catch (error) {
            console.log(error);
            toast.error("Add To Cart is Failed");
        }
    };

    return (
        <Link to={`/product/${product?._id}`} className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" >
            <img className="w-full h-96 object-cover" src={product.images[0]} alt={product.name} />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">
                        ₹{product.price}
                    </span>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handlecart(product?._id, product?.tax)
                    }} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default Card;