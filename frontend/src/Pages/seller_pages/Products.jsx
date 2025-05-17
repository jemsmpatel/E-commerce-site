import { useSelector } from 'react-redux';
import { useGetSellerAllProductsQuery } from '../../redux/api/products';
import { Link } from 'react-router-dom';
import ImageSlider from '../Componants/ImageSlider';
import Loader from '../../Structure/Loader';

const Products = () => {
    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    const { data, isLoading, isError } = useGetSellerAllProductsQuery(sellerInfo?.id);

    return (
        <div className="bg-gray-100 p-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                {data ? (
                    data.map((product) => (
                        <div key={product._id} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300" >
                            <div className="w-full md:w-[300px] h-[300px] overflow-hidden">
                                <ImageSlider images={product.images} alt={product.name} />
                            </div>
                            <div className="w-full p-4 flex flex-col justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">Product Name: {product.name}</h2>
                                <p className="text-gray-600 text-md mt-1 line-clamp-1">description: {product.description}</p>
                                <div className='flex flex-wrap gap-6 mt-2'>
                                    <p className="text-gray-600 text-md">category: {product.category}</p>
                                    <p className="text-gray-600 text-md">stock: {product.stock}</p>
                                </div>
                                <p className="text-gray-600 text-md mt-1">sku: {product.sku}</p>
                                <div className='flex flex-wrap gap-6 mt-2'>
                                    <p className="text-gray-600 text-md">brand: {product.brand}</p>
                                    <p className="text-gray-600 text-md">tax: {product.tax}%</p>
                                </div>
                                <p className="text-gray-600 text-md mt-1">isActive: {product.isActive.toString()}</p>
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-lg font-bold text-indigo-600">MRP Price: ₹{product.mrp_price}</span>
                                    <span className="text-lg font-bold text-indigo-600">Price: ₹{product.price}</span>
                                    <span className="text-lg font-bold text-indigo-600">Discount Price: ₹{product.discount_price}</span>
                                    <Link to={`/seller/products/${product._id}`} className="bg-indigo-600 text-white text-md px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
                                        Edit Product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : isLoading ? (
                    <div className='flex justify-center mt-20 items-center'>
                        <Loader />
                    </div>
                ) : (
                    <div>Empty</div>
                )
                }
            </div>
        </div >
    );
}

export default Products;