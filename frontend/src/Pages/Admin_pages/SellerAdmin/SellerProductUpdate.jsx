import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUploadImageMutation } from '../../../redux/api/seller';
import {
    useUpdateProductMutation,
    useGetSpecificProductQuery,
    useDeleteProductMutation,
} from '../../../redux/api/products';
import SellerSideBar from '../../Componants/SellerSideBar';
import categorys from '../../Componants/categorys';
import Loader from '../../../Structure/Loader';

const SellerProductUpdate = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSpecificProductQuery(id);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [mrp_price, setMrpPrice] = useState('');
    const [stock, setStock] = useState('');
    const [discount_price, setDiscountPrice] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [brand, setBrand] = useState('');
    const [tax, setTax] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [images, setImages] = useState([]);
    const [updateproduct, { isUpdatingLoading, updateError }] = useUpdateProductMutation();
    const [deleteproduct, { isDeletingLoading, deleteError }] = useDeleteProductMutation();
    const [uploadImage] = useUploadImageMutation();
    const navigate = useNavigate();
    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    var updatedData = {};

    useEffect(() => {
        if (data) {
            setName(data?.name);
            setDescription(data?.description);
            setPrice(data?.price);
            setMrpPrice(data?.mrp_price);
            setStock(data?.stock);
            setDiscountPrice(data?.discount_price);
            setCategory(data?.category);
            setSku(data?.sku);
            setBrand(data?.brand);
            setTax(data?.tax);
            setIsActive(data?.isActive);
        }
    }, [data]);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/seller/products';


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && images.length < 6) {
            setImages([...images, file]);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {

            if (data?.name != name) {
                updatedData.name = name;
            }
            if (data?.description != description) {
                updatedData.description = description;
            }
            if (data?.price != price) {
                updatedData.price = price;
            }
            if (data?.mrp_price != mrp_price) {
                updatedData.mrp_price = mrp_price;
            }
            if (data?.stock != stock) {
                updatedData.stock = stock;
            }
            if (data?.discount_price != discount_price) {
                updatedData.discount_price = discount_price;
            }
            if (data?.category != category) {
                updatedData.category = category;
            }
            if (data?.sku != sku) {
                updatedData.sku = sku;
            }
            if (data?.brand != brand) {
                updatedData.brand = brand;
            }
            if (data?.tax != tax) {
                updatedData.tax = tax;
            }
            if (data?.isActive != isActive) {
                updatedData.isActive = isActive;
            }
            if (images != "") {
                let uploadedImagePaths = [];
                for (let i = 0; i < images.length; i++) {
                    const formData = new FormData();
                    formData.append("image", images[i]);

                    try {
                        const uploadResponse = await uploadImage(formData).unwrap();
                        if (uploadResponse.url) {
                            uploadedImagePaths.push(uploadResponse.url);
                        } else {
                            console.error("Upload failed for image:", images[i].name);
                            toast.error(`Failed to upload ${images[i].name}`);
                            return;
                        }
                    } catch (error) {
                        console.error("Upload error:", error);
                        toast.error(`Error uploading ${images[i].name}`);
                        return;
                    }
                }
                updatedData.images = uploadedImagePaths;
            }


            try {
                const response = await updateproduct({
                    id: id,
                    data: updatedData,
                }).unwrap();

                navigate(redirect);
                toast.success("Product successfully Updated.");
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
            const response = await deleteproduct(id).unwrap();
            navigate(redirect);
            toast.success("Product successfully Deleted.");
        } catch (error) {
            console.error("Delition error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Delition failed. Please try again.";
            toast.error(message);
        }
    };
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
                    <h2 className='text-4xl mb-5 ml-10'>Change Product</h2>
                    <div className='mx-6'>
                        <form>
                            <div className="relative mb-4">
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Product Name</label>
                            </div>
                            <div className="relative mb-4">
                                <textarea type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="6" placeholder="" required className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" ></textarea>
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" > Description </label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="mrp_price" value={mrp_price} onChange={(e) => setMrpPrice(e.target.value)} required maxLength="20" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">MRP Price</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required maxLength="20" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Price</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="discount_price" value={discount_price} onChange={(e) => setDiscountPrice(e.target.value)} required maxLength="20" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Discount Price</label>
                            </div>
                            <div className="relative mb-4">
                                <input
                                    list="category-options"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder=" " // enables floating label
                                />
                                <datalist id="category-options">
                                    {categorys && categorys.map((item, index) => (
                                        <option value={item} key={index} />
                                    ))}
                                </datalist>
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
                                    Category
                                </label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required maxLength="20" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Stock</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="sku" value={sku} onChange={(e) => setSku(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Sku</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Brand</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="tax" value={tax} onChange={(e) => setTax(e.target.value)} required maxLength="3" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Tax On Product</label>
                            </div>
                            <div className="ml-3 mb-4">
                                <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} placeholder="" className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor='isActive' className="ml-2 text-gray-700">isActive</label>
                            </div>
                            <div className='grid grid-cols-3 gap-3'>
                                {data?.images.map((image, index) => (
                                    <img key={index} src={image} alt={image} className='w-[100px] h-[100px]' />
                                ))}
                            </div>
                            <div className="mb-4">
                                <div className="flex flex-col gap-3 mb-2">
                                    {images.map((img, index) => (
                                        <div key={index} className="flex w-max items-center gap-2 bg-gray-200 px-2 py-1 rounded">
                                            <p className="text-gray-700 text-sm">{img.name}</p>
                                        </div>
                                    ))}
                                </div>
                                {images.length < 6 && (
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-block bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                            Add Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="text-gray-600 text-sm">{`You can add ${6 - images.length} more`}</p>
                                    </div>
                                )}
                            </div>
                            <button type="button" onClick={handleUpdateSubmit} className="w-[40%] bg-blue-600 text-white py-2 mt-3 mr-[20%] rounded-md text-lg">{isUpdatingLoading ? "Updatting..." : "Update"}</button>
                            <button type="button" onClick={handleDeleteSubmit} className="w-[40%] bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isDeletingLoading ? "Deletting..." : "Delete"}</button>
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

export default SellerProductUpdate;