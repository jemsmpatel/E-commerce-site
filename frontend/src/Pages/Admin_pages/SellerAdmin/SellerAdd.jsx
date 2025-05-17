import { useState } from 'react';
import { useSellerRegisterMutation, useUploadImageMutation } from '../../../redux/api/seller';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SellerSideBar from '../../Componants/SellerSideBar';

const SellerAdd = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [full_name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [contact, setContact] = useState('');
    const [father_name, setFatherName] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState('');
    const [religion, setReligion] = useState('');
    const [home_address, setHome_address] = useState('');
    const [home_country, setHome_country] = useState('');
    const [home_state, setHome_state] = useState('');
    const [home_city, setHome_city] = useState('');
    const [pan_no, setPan_no] = useState('');
    const [shop_name, setShop_name] = useState('');
    const [shop_address, setShop_address] = useState('');
    const [shop_country, setShop_country] = useState('');
    const [shop_state, setShop_state] = useState('');
    const [shop_city, setShop_city] = useState('');
    const [gst_no, setGst_no] = useState('');
    const [bank_account_holder_name, setBank_account_holder_name] = useState('');
    const [bank_name, setBank_name] = useState('');
    const [bank_account_no, setBank_account_no] = useState('');
    const [bank_IFSC_code, setBank_IFSC_code] = useState('');
    const [status, setStatus] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [selectedaadharImage, setSelectedAadharImage] = useState(null);
    const [selectedpanImage, setSelectedPanImage] = useState(null);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [sellerregister, { isLoading }] = useSellerRegisterMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/seller/users';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {

            if (!full_name || !email || !aadhar || !contact || !father_name || !gender || !dob || !religion || !home_address || !home_country || !home_state || !home_city || !pan_no || !shop_name || !shop_address || !shop_country || !shop_state || !shop_city || !gst_no || !bank_account_holder_name || !bank_name || !bank_account_no || !bank_IFSC_code || !selectedaadharImage || !selectedpanImage) {
                toast.error("Please fill all required fields");
                return;
            }

            let uploadedaadharImagePath = null;

            if (selectedaadharImage) {
                const formData = new FormData();
                formData.append("image", selectedaadharImage);
                const uploadaadharImageResponse = await uploadImage(formData).unwrap();
                if (uploadaadharImageResponse.url) {
                    uploadedaadharImagePath = uploadaadharImageResponse.url;
                } else {
                    console.error("Failed to upload image: ", uploadImageErrorDetails);
                    toast.error("Failed to upload image");
                    return;
                }
            }

            let uploadedpanImagePath = null;

            if (selectedpanImage) {
                const formData = new FormData();
                formData.append("image", selectedpanImage);
                const uploadpanImageResponse = await uploadImage(formData).unwrap();
                if (uploadpanImageResponse.url) {
                    uploadedpanImagePath = uploadpanImageResponse.url;
                } else {
                    console.error("Failed to upload image: ", uploadImageErrorDetails);
                    toast.error("Failed to upload inmage");
                    return;
                }
            }

            if (uploadedaadharImagePath && uploadedpanImagePath) {
                const response = await sellerregister({
                    full_name,
                    email,
                    aadhar,
                    contact,
                    password,
                    father_name,
                    gender,
                    dob,
                    religion,
                    home_address,
                    home_country,
                    home_state,
                    home_city,
                    pan_no,
                    shop_name,
                    shop_address,
                    shop_country,
                    shop_state,
                    shop_city,
                    gst_no,
                    bank_account_holder_name,
                    bank_name,
                    bank_account_no,
                    bank_IFSC_code,
                    status,
                    "pan_card_copy": uploadedaadharImagePath,
                    "aadhar_card_copy": uploadedpanImagePath,
                    isActive,
                    isStaff,
                    isAdmin
                }).unwrap();
            }

            navigate(redirect);
            toast.success("User successfully Created.");
        } catch (err) {
            console.error("Creation error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Creation failed. Please try again.";
            toast.error(message);
        }
    };

    const handleaadharImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedAadharImage(file);
    }

    const handlepanImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedPanImage(file);
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='flex mb-[100px]'>
            {isSidebarOpen ?
                <SellerSideBar />
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
                <h2 className='text-4xl mb-5 ml-5'>Create User</h2>
                <div className='mx-6'>
                    <form className='mr-5' onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <input type="text" name="fname" value={full_name} onChange={(e) => setFullName(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Full Name</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required minLength="7" maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="aadhar" value={aadhar} onChange={(e) => setAadhar(e.target.value)} required minLength="12" maxLength="12" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Aadhar</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required minLength="10" maxLength="10" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Contact</label>
                        </div>
                        <div className="relative mb-4 relative">
                            <input type={showPassword ? "text" : "password"} name="password" required minLength="8" maxLength="15" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Password</label>
                            <button type="button" onClick={togglePassword} className="absolute right-3 top-4 text-gray-500">
                                {showPassword ? "👁️" : "🙈"}
                            </button>
                        </div>
                        <div className="relative mb-4">
                            <input type="password" name="password2" required minLength="8" maxLength="15" placeholder="" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Confirm Password</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="fathername" value={father_name} onChange={(e) => setFatherName(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Father Name</label>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender">Gender</label>
                            <div className='flex-col ml-[100px] justify-end w-50'>
                                <div>
                                    <input type="radio" name='gender' id="male" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className='mr-[7px]' /><label htmlFor='male'>Male</label>
                                </div>
                                <div>
                                    <input type="radio" name='gender' id="female" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className='mr-[7px]' /><label htmlFor='female'>Female</label>
                                </div>
                                <div>
                                    <input type="radio" name='gender' id="other" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} className='mr-[7px]' /><label htmlFor='other'>Other</label>
                                </div>
                            </div>
                        </div>
                        <div className="relative mb-4">
                            <input type="date" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} required placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Date Of Birth</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="religion" value={religion} onChange={(e) => setReligion(e.target.value)} required placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Religion</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="home_address" value={home_address} onChange={(e) => setHome_address(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Home Address</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="home_country" value={home_country} onChange={(e) => setHome_country(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Home Country</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="home_state" value={home_state} onChange={(e) => setHome_state(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Home State</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="home_city" value={home_city} onChange={(e) => setHome_city(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Home City</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="pan_no" value={pan_no} onChange={(e) => setPan_no(e.target.value)} required minLength="10" maxLength="10" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Pan No</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="shop_name" value={shop_name} onChange={(e) => setShop_name(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Shop Name</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="shop_address" value={shop_address} onChange={(e) => setShop_address(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Shop Address</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="shop_country" value={shop_country} onChange={(e) => setShop_country(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Shop Country</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="shop_state" value={shop_state} onChange={(e) => setShop_state(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Shop State</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="shop_city" value={shop_city} onChange={(e) => setShop_city(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Shop City</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="gst_no" value={gst_no} onChange={(e) => setGst_no(e.target.value)} required minLength="15" maxLength="15" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Gst No</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="bank_account_holder_name" value={bank_account_holder_name} onChange={(e) => setBank_account_holder_name(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Bank Account Holder Name</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="bank_name" value={bank_name} onChange={(e) => setBank_name(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Bank Name</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="bank_account_no" value={bank_account_no} onChange={(e) => setBank_account_no(e.target.value)} required minLength="9" maxLength="18" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Bank Account No</label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" name="bank_IFSC_code" value={bank_IFSC_code} onChange={(e) => setBank_IFSC_code(e.target.value)} required minLength="11" maxLength="11" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Bank IFSC Code</label>
                        </div>
                        <div className="relative mb-4">
                            <select name="status" value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                            >
                                <option value="">-----</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
                                status
                            </label>
                        </div>
                        <div className="mb-4 flex">
                            <label className="cursor-pointer inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-[10px]"> Aadhar Image Upload
                                <input type="file" className="hidden" onChange={handleaadharImageChange} />
                            </label>
                            <p className="text-gray-700 mt-[5px]">{selectedaadharImage?.name}</p>
                        </div>
                        <div className="mb-4 flex">
                            <label className="cursor-pointer inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-[10px]"> Pan Image Upload
                                <input type="file" className="hidden" onChange={handlepanImageChange} />
                            </label>
                            <p className="text-gray-700 mt-[5px]">{selectedpanImage?.name}</p>
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
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Signing Up..." : "Sign Up"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellerAdd;