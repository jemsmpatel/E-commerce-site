import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserCartQuery, useEmptyCartMutation } from '../../redux/api/users';
import { useCreateOrderMutation, useGetListProductsMutation } from '../../redux/api/products';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Order = () => {
    const { userInfo } = useSelector((state) => state.userAuth);
    const { data, refetch } = useGetUserCartQuery(userInfo.id);
    const [user_id, setUser_id] = useState('');
    const [products, setProducts] = useState('');
    const [full_name, setFull_name] = useState('');
    const [contact, setContact] = useState('');
    const [delivery_address, setDelivery_address] = useState('');
    const [delivery_country, setDelivery_country] = useState('');
    const [delivery_state, setDelivery_state] = useState('');
    const [delivery_city, setDelivery_city] = useState('');
    const [pincode, setPincode] = useState('');
    const [shipping_charges, setShipping_charges] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    var total_amount = 0;
    const [payment_method, setPayment_method] = useState('');
    const [payment_status, setPayment_status] = useState('Panding');
    const [estimated_delivery_date, setEstimated_delivery_date] = useState(`${String(new Date(new Date().setDate(new Date().getDate() + 7)).getDate()).padStart(2, '0')}-${String(new Date(new Date().setDate(new Date().getDate() + 7)).getMonth() + 1).padStart(2, '0')}-${new Date(new Date().setDate(new Date().getDate() + 7)).getFullYear()}`);
    const [orderPlace, { isorderLoading, error }] = useCreateOrderMutation();
    const [EmptyCart] = useEmptyCartMutation();
    const [getProducts, { data: productList, isLoading }] = useGetListProductsMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product_ids, setProduct_ids] = useState();
    const [qty_list, setQty_list] = useState();
    const [tax_list, setTax_list] = useState();


    useEffect(() => {
        refetch();
        if (data && data.cart_items && data.cart_items.length > 0) {
            const product_id_list = data.cart_items.map((item) => item.product_id);
            setProduct_ids(product_id_list);
            getProducts({ product_ids: product_id_list });
        }
    }, [data]);

    useEffect(() => {
        if (productList && productList.length > 0) {
            const qty_l = data.cart_items.map((item) => item.qty);
            const tax_l = data.cart_items.map((item) => item.tax);
            setQty_list(qty_l);
            setTax_list(tax_l);
            const price = productList?.map((product) => product?.price);
            for (let i = 0; i < price.length; i++) {
                total_amount += ((parseInt(price[i]) * parseInt(qty_l[i])) + (((parseInt(price[i]) * parseInt(qty_l[i])) * parseInt(tax_l[i])) / 100))
            }
            total_amount += 50;
            setTotalAmount(total_amount);
        }
    }, [productList]);


    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/profile/orders';

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await orderPlace({
                "user_id": userInfo.id,
                "product_id": product_ids,
                "qty": qty_list,
                "tax": tax_list,
                full_name,
                contact,
                delivery_address,
                delivery_country,
                delivery_state,
                delivery_city,
                pincode,
                payment_method,
                payment_status,
                "shipping_charges": 50,
                estimated_delivery_date
            }).unwrap();
            EmptyCart(userInfo.id);
            toast.success("Order successfully Plased.");
            navigate(redirect);
        } catch (err) {
            console.error("Registration error:", err);
            const message = err?.data?.error || err?.data?.message || "Registration failed. Please try again.";
            toast.error(message);
        }
    };


    return (
        <div className="flex items-center justify-center py-[50px] bg-gray-100">
            <div className="p-8 rounded-4xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] bg-gray-50 w-full max-w-[400px] max-w-sm">
                <h2 className="text-center text-4xl font-semibold mb-5">Order Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <p className='ml-2 text-lg'>Shipping Charges: {50}</p>
                    </div>
                    <div className="relative mb-4">
                        <p className='ml-2 text-lg'>Total Amount: {totalAmount ? totalAmount : ""}</p>
                    </div>
                    <div className="relative mb-4">
                        <p className='ml-2 text-lg'>Estimated Delivery Date: {estimated_delivery_date}</p>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="fname" value={full_name} onChange={(e) => setFull_name(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Full Name</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required minLength="10" maxLength="10" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Contact</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="delivery_address" value={delivery_address} onChange={(e) => setDelivery_address(e.target.value)} required maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery Address</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="delivery_country" value={delivery_country} onChange={(e) => setDelivery_country(e.target.value)} required maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery Country</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="delivery_state" value={delivery_state} onChange={(e) => setDelivery_state(e.target.value)} required maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery State</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="delivery_city" value={delivery_city} onChange={(e) => setDelivery_city(e.target.value)} required maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery City</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required minLength="6" maxLength="6" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Pincode</label>
                    </div>
                    <div className="relative mb-4">
                        <select name="payment_method" value={payment_method}
                            onChange={(e) => setPayment_method(e.target.value)} disabled
                            className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                        >
                            {/* <option value="" disabled hidden></option> */}
                            <option value="cod">Cash on Delivery</option>
                            {/* <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="netbanking">Net Banking</option> */}
                        </select>
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
                            Payment Method
                        </label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" disabled name="payment_status" value={payment_status} onChange={(e) => setPayment_status(e.target.value)} required maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Payment Status</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Signing Up..." : "Sign Up"}</button>
                </form>
                <hr className="my-4 border-gray-400" />
                <p className="text-gray-600 text-center pb-4 font-semibold">Already have an account? <Link to="/login/" className="text-indigo-600">Sign In</Link>. By clicking Sign up, you agree to the terms of use.</p>
            </div>
        </div>
    );
}

export default Order;