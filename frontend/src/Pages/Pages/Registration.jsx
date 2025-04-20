import { useState } from 'react';
import { useRegisterMutation } from '../../redux/api/users';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Registration = () => {

    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [full_name, setFullName] = useState('');
    const [register, { isLoading, error }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                full_name,
                email,
                contact
            }).unwrap();

            navigate(redirect);
            toast.success("User successfully registered.");
        } catch (err) {
            console.error("Registration error:", err);
            const message = err?.data?.error || err?.data?.message || "Registration failed. Please try again.";
            toast.error(message);
        }
    };


    return (
        <div className="flex items-center justify-center py-[50px] bg-gray-100">
            <div className="p-8 rounded-4xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] bg-gray-50 w-full max-w-[400px] max-w-sm">
                <h2 className="text-center text-4xl font-semibold mb-5">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <input type="text" name="fname" value={full_name} onChange={(e) => setFullName(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Full Name</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required minLength="7" maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email</label>
                    </div>
                    <div className="relative mb-4">
                        <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required minLength="10" maxLength="10" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Contact</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Signing Up..." : "Sign Up"}</button>
                </form>
                <hr className="my-4 border-gray-400" />
                <p className="text-gray-600 text-center pb-4 font-semibold">Already have an account? <Link to="/login/" className="text-indigo-600">Sign In</Link>. By clicking Sign up, you agree to the terms of use.</p>
            </div>
        </div>
    );
}

export default Registration;