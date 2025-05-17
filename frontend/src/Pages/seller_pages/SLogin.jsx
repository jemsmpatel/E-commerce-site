import { useState } from 'react';
import { useSellerLoginMutation } from '../../redux/api/seller';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setSellerCredentials } from '../../redux/features/seller/sellerauthSlice';


const SLogin = () => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useSellerLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/seller';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password }).unwrap();
            dispatch(setSellerCredentials(response));
            navigate(redirect);
            toast.success('Login successfully.');
        } catch (err) {
            toast.error(err?.data?.error);
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="flex items-center justify-center py-[50px] bg-gray-100">
            <div className="p-8 rounded-4xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] bg-gray-50 w-full max-w-[400px] max-w-sm">
                <h2 className="text-center text-4xl font-semibold mb-5">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label htmlFor="email" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email Address</label>
                    </div>
                    <div className="relative mb-4">
                        <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label htmlFor="password" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Password</label>
                        <button type="button" onClick={togglePassword} className="absolute right-3 top-4 text-gray-500">
                            {showPassword ? "👁️" : "🙈"}
                        </button>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="flex items-center text-sm">
                            <input type="checkbox" name="remember-me" className="mr-2" /> Remember me
                        </label>
                        <Link to="/forgot_pass" className="text-indigo-600 underline">Forgot password?</Link>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Signing In..." : "Sign In"}</button>
                </form>
                <hr className="my-4 border-gray-400" />
                <p className="text-gray-600 text-center pb-4 font-semibold">Don’t have an account? <Link to="/seller/registration" className="text-indigo-600 underline">Sign up</Link>.</p>
            </div>
        </div>
    )
}

export default SLogin;