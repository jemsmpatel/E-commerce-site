import { useState } from 'react';
import { useRegisterMutation } from '../../../redux/api/users';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CustemerSideBar from '../../Componants/CustemerSideBar';

const CustemerAdd = () => {
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [full_name, setFullName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [register, { isLoading, error }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/home/users';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                full_name,
                email,
                contact,
                isActive,
                isStaff,
                isAdmin
            }).unwrap();
            navigate(redirect);
            toast.success("User successfully Created.");
        } catch (err) {
            console.error("Registration error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Registration failed. Please try again.";
            toast.error(message);
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='flex mb-[100px]'>
            {isSidebarOpen ?
                <CustemerSideBar />
                :
                ""
            }
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='w-[10vw] md:w-[3vw] sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-300 text-sm p-2'
            >
                {isSidebarOpen ? "<<" : ">>"}
            </button>
            <div className={`w-[90vw] p-5 ${isSidebarOpen ? "hidden md:block" : ""}`}>
                <h2 className='text-4xl mb-5'>Create User</h2>
                <div className='mx-6'>
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
                        <div className="ml-3 mb-4">
                            <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} placeholder="" className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor='isActive' className="ml-2">isActive</label>
                        </div>
                        <div className="ml-3 mb-4">
                            <input type="checkbox" id="isStaff" checked={isStaff} onChange={(e) => setIsStaff(e.target.checked)} placeholder="" className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor='isStaff' className="ml-2">isStaff</label>
                        </div>
                        <div className="ml-3 mb-4">
                            <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} placeholder="" className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label htmlFor='isAdmin' className="ml-2">isAdmin</label>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Creatting..." : "Create"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CustemerAdd;