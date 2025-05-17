import { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SellerSideBar from '../../Componants/SellerSideBar';
import { useGetSpecificSellerQuery, useSellerUpdateUserMutation, useSellerDeleteUserMutation, useUploadImageMutation } from '../../../redux/api/seller';
import Loader from '../../../Structure/Loader';

const SellerUsersUpdate = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSpecificSellerQuery(id);
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

    useEffect(() => {
        if (data) {
            setFullName(data?.full_name);
            setEmail(data?.email);
            setAadhar(data?.aadhar);
            setContact(data?.contact);
            setFatherName(data?.father_name);
            setGender(data?.gender);
            setDob(data?.dob);
            setReligion(data?.religion);
            setHome_address(data?.home_address);
            setHome_country(data?.home_country);
            setHome_state(data?.home_state);
            setHome_city(data?.home_city);
            setPan_no(data?.pan_no);
            setShop_name(data?.shop_name);
            setShop_address(data?.shop_address);
            setShop_country(data?.shop_country);
            setShop_state(data?.shop_state);
            setShop_city(data?.shop_city);
            setGst_no(data?.gst_no);
            setBank_account_holder_name(data?.bank_account_holder_name);
            setBank_name(data?.bank_name);
            setBank_account_no(data?.bank_account_no);
            setBank_IFSC_code(data?.bank_IFSC_code);
            setStatus(data?.status);
            setIsAdmin(data?.isAdmin);
            setIsStaff(data?.isStaff);
            setIsActive(data?.isActive);
        }
    }, [data]);


    const [updateuser, { isUpdatingLoading, updateError }] = useSellerUpdateUserMutation();
    const [deleteuser, { isDeletingLoading, deleteError }] = useSellerDeleteUserMutation();
    const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
    const navigate = useNavigate();
    var updatedData = {};

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/seller/users/';

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (data?.full_name != full_name) {
                updatedData.full_name = full_name;
            }
            if (data?.email != email) {
                updatedData.email = email;
            }
            if (data?.aadhar != aadhar) {
                updatedData.aadhar = aadhar;
            }
            if (data?.contact != contact) {
                updatedData.contact = contact;
            }
            if (data?.father_name != father_name) {
                updatedData.father_name = father_name;
            }
            if (data?.gender != gender) {
                updatedData.gender = gender;
            }
            if (data?.dob != dob) {
                updatedData.dob = dob;
            }
            if (data?.religion != religion) {
                updatedData.religion = religion;
            }
            if (data?.home_address != home_address) {
                updatedData.home_address = home_address;
            }
            if (data?.home_country != home_country) {
                updatedData.home_country = home_country;
            }
            if (data?.home_state != home_state) {
                updatedData.home_state = home_state;
            }
            if (data?.home_city != home_city) {
                updatedData.home_city = home_city;
            }
            if (data?.pan_no != pan_no) {
                updatedData.pan_no = pan_no;
            }
            if (data?.shop_name != shop_name) {
                updatedData.shop_name = shop_name;
            }
            if (data?.shop_address != shop_address) {
                updatedData.shop_address = shop_address;
            }
            if (data?.shop_country != shop_country) {
                updatedData.shop_country = shop_country;
            }
            if (data?.shop_state != shop_state) {
                updatedData.shop_state = shop_state;
            }
            if (data?.shop_city != shop_city) {
                updatedData.shop_city = shop_city;
            }
            if (data?.gst_no != gst_no) {
                updatedData.gst_no = gst_no;
            }
            if (data?.bank_account_holder_name != bank_account_holder_name) {
                updatedData.bank_account_holder_name = bank_account_holder_name;
            }
            if (data?.bank_name != bank_name) {
                updatedData.bank_name = bank_name;
            }
            if (data?.bank_account_no != bank_account_no) {
                updatedData.bank_account_no = bank_account_no;
            }
            if (data?.bank_IFSC_code != bank_IFSC_code) {
                updatedData.bank_IFSC_code = bank_IFSC_code;
            }
            if (data?.status != status) {
                if (status === "") {
                    updatedData.status = null;
                } else {
                    updatedData.status = status;
                }
            }
            if (data?.isAdmin != isAdmin) {
                updatedData.isAdmin = isAdmin;
            }
            if (data?.isStaff != isStaff) {
                updatedData.isStaff = isStaff;
            }
            if (data?.isActive != isActive) {
                updatedData.isActive = isActive;
            }
            if (selectedaadharImage != null) {
                const formData = new FormData();
                formData.append("image", selectedaadharImage);
                const uploadaadharImageResponse = await uploadImage(formData).unwrap();
                if (uploadaadharImageResponse.url) {
                    updatedData.aadhar_card_copy = uploadaadharImageResponse.url;
                } else {
                    console.error("Failed to upload image: ", uploadImageErrorDetails);
                    toast.error("Failed to upload image");
                    return;
                }
            }
            if (selectedpanImage != null) {
                const formData = new FormData();
                formData.append("image", selectedpanImage);
                const uploadpanImageResponse = await uploadImage(formData).unwrap();
                if (uploadpanImageResponse.url) {
                    updatedData.pan_card_copy = uploadpanImageResponse.url;
                } else {
                    console.error("Failed to upload image: ", uploadImageErrorDetails);
                    toast.error("Failed to upload inmage");
                    return;
                }
            }
            console.log(updatedData);
            try {
                const response = await updateuser({
                    id: id,
                    data: updatedData,
                }).unwrap();
                navigate(redirect);
                toast.success("User successfully Updated.");
            } catch (error) {
                console.error("Updation error:", error);
                const message =
                    err?.data?.error || err?.data?.message || "Updation failed. Please try again.";
                toast.error(message);
            }

        } catch (err) {
            console.error("Updation error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Updation failed. Please try again.";
            toast.error(message);
        }
    };

    const handleDeleteSubmit = async (e) => {
        try {
            const response = await deleteuser(id).unwrap();
            navigate(redirect);
            toast.success("User successfully Deleted.");
        } catch (error) {
            console.error("Delition error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Delition failed. Please try again.";
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
            {data ?
                <div className={`w-[90vw] p-5 ${isSidebarOpen ? "hidden md:block" : ""}`}>
                    <h2 className='text-4xl mb-5'>Change User</h2>
                    <h2 className='text-2xl mb-5 normal-case'>{data?.email}</h2>
                    <div className='ml-4'>
                        <form className='mr-5'>
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
                            <div className="mb-4 flex items-center">
                                <div className="w-50 h-50 mr-10">
                                    <img src={`${data?.aadhar_card_copy}`} alt={`${data?.aadhar_card_copy}`} className='w-50 h-50' />
                                </div>
                                <label className="cursor-pointer inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-[10px] h-10"> Aadhar Image Upload
                                    <input type="file" className="hidden" onChange={handleaadharImageChange} />
                                </label>
                                <p className="text-gray-700 mt-[5px]">{selectedaadharImage?.name}</p>
                            </div>
                            <div className="mb-4 flex items-center">
                                <div className="w-50 h-50 mr-10">
                                    <img src={`${data?.pan_card_copy}`} alt={`${data?.pan_card_copy}`} className='w-50 h-50' />
                                </div>
                                <label className="cursor-pointer inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mr-[10px] h-10"> Pan Image Upload
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
                            <div className="mb-4">
                                <button type="button" onClick={handleUpdateSubmit} className="w-[40%] bg-blue-600 text-white py-2 mt-3 mr-[20%] rounded-md text-lg">{isUpdatingLoading ? "Updatting..." : "Update"}</button>
                                <button type="button" onClick={handleDeleteSubmit} className="w-[40%] bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isDeletingLoading ? "Deletting..." : "Delete"}</button>
                            </div>
                        </form>
                    </div>
                </div> :
                isLoading ?
                    <div className='flex justify-center mt-20 items-center'>
                        <Loader />
                    </div>
                    :
                    <div className='ml-98'>No User Info Founded</div>
            }
        </div>
    );
}

export default SellerUsersUpdate;