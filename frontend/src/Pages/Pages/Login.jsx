import { useState } from 'react';
import { useRequest_login_otpMutation, useLoginMutation } from '../../redux/api/users';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserCredentials } from '../../redux/features/auth/authSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpShow, setOtpfiledShow] = useState(false);
    const [request_login_otp, { isrequestLoading, requestError }] = useRequest_login_otpMutation();
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const handlerequestLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request_login_otp({ email }).unwrap();
            setOtpfiledShow(true);
            toast.success('Otp Sent successfully.');
        } catch (err) {
            console.error('Otp Sending failed:', err);
            toast.error('Otp Sending Failed.');
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, otp }).unwrap();
            dispatch(setUserCredentials(response));
            navigate(redirect);
            setOtpfiledShow(true);
            toast.success('Login successfully.');
        } catch (err) {
            console.error('Login failed:', err);
            toast.error('Login Failed.');
        }
    };

    return (
        <div className="flex items-center justify-center py-[50px] bg-gray-100">
            <div className="p-8 rounded-4xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] bg-gray-50 w-full max-w-[400px] max-w-sm">
                <h2 className="text-center text-4xl font-semibold mb-5">Sign In</h2>
                {!otpShow ?
                    <form onSubmit={handlerequestLoginSubmit}>
                        <div className="relative mb-4">
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label htmlFor="email" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email Address</label>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Signing In..." : "Sign In"}</button>
                    </form> :
                    ""
                }
                {otpShow ?
                    <form onSubmit={handleLoginSubmit}>
                        <div className="relative mb-4">
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label htmlFor="email" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email Address</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" minLength="6" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label htmlFor="otp" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Otp</label>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Signing In..." : "Sign In"}</button>
                    </form> :
                    ""
                }
                <hr className="my-4 border-gray-400" />
                <p className="text-gray-600 text-center pb-4 font-semibold">Don’t have an account? <Link to="/registration" className="text-indigo-600 underline">Sign up</Link>.</p>
            </div>
        </div>
    )
}

export default Login