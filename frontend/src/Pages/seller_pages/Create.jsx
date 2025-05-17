import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUploadImageMutation } from '../../redux/api/seller';
import { useCreateProductMutation } from '../../redux/api/products';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import categorys from '../Componants/categorys';

const Create = () => {

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
    const [createProduct, { isLoading, error }] = useCreateProductMutation();
    const [uploadImage] = useUploadImageMutation();
    const navigate = useNavigate();
    const { sellerInfo } = useSelector((state) => state.sellerAuth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/seller';

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && images.length < 6) {
            setImages([...images, file]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length < 1) {
            alert("Please upload at least 1 image.");
            return;
        }

        try {

            if (!name || !description || !price || !mrp_price || !stock || !discount_price || !category || !sku || !brand) {
                toast.error("Please fill all required fields");
                return;
            }

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

            try {
                const response = await createProduct({
                    "seller_id": sellerInfo?.id,
                    name,
                    description,
                    price,
                    mrp_price,
                    stock,
                    discount_price,
                    category,
                    sku,
                    brand,
                    tax,
                    "images": uploadedImagePaths,
                    isActive
                }).unwrap();

                navigate(redirect);
                toast.success("Product successfully Created.");
            } catch (error) {
                console.error("Creation error:", error);
                const message =
                    err?.data?.error || err?.data?.message || "Creation failed. Please try again.";
                toast.error(message);
            }

        } catch (err) {
            console.error("Creation error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Creation failed. Please try again.";
            toast.error(message);
        }
    };

    return (
        <div className="flex items-center justify-center py-[50px] bg-gray-100">
            <div className="p-8 rounded-4xl shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] bg-gray-50 w-full max-w-[400px] max-w-sm">
                <h2 className="text-center text-4xl font-semibold mb-5">Create Product</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "submitting..." : "submit"}</button>
                </form>
                <hr className="my-4 border-gray-400" />
                <p className='text-gray-600 text-center pb-4 font-semibold'>important Notice</p>
                <p className="text-gray-600 text-center pb-4 font-semibold">sku filed is uniq in all products</p>
            </div>
        </div>
    );
}

export default Create;