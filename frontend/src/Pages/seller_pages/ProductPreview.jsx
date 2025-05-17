import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useGetSpecificProductQuery } from '../../redux/api/products';
import moment from 'moment';

const ProductPreview = () => {
    const { id } = useParams();
    const { data, isLoadingdata, isError } = useGetSpecificProductQuery(id);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showReadMore, setShowReadMore] = useState(true);
    const [mainImage, setMainImage] = useState(data?.images[0]);

    useEffect(() => {
        // Check if description fits within 3 lines
        const el = document.getElementById('description');
        if (el) {
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            const maxHeight = lineHeight * 3;
            if (el.scrollHeight <= maxHeight) {
                setShowReadMore(false);
            }
        }
        if (data?.images?.length > 0) {
            setMainImage(data.images[0]);
        }
        if (data?.reviews?.length > 0) {
            const sorted = data.reviews
                .map((r) => ({
                    ...r,
                    _id: r._id?.$oid || r._id,
                    createdAt: r.createdAt?.$date || r.createdAt,
                }))
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

            setSortedReviews(sorted);
        }
        window.scrollTo(0, 0);
    }, [data]);

    const [sortedReviews, setSortedReviews] = useState([])
    const [showAllReviews, setShowAllReviews] = useState(false);

    const handleThumbnailHover = (src) => {
        setMainImage(src);
    };

    return (
        <div className='bg-gray-100'>
            <div className="container mx-auto py-3 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Image */}
                    <div className="h-full">
                        <div className="mb-4 flex justify-center">
                            <img
                                id="mainImage"
                                src={mainImage}
                                alt="Main"
                                className="rounded-xl shadow-md max-h-[475px] object-cover"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto px-4 h-[100px]">
                            {data?.images?.length > 0 ? (
                                data.images.map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={image}
                                        onMouseOver={() => handleThumbnailHover(image)}
                                        className="rounded-xl cursor-pointer w-20 transition-transform duration-200 hover:scale-90"
                                        alt={`Thumbnail ${idx + 1}`}
                                    />
                                ))
                            ) : (
                                <img
                                    src="data:image/jpeg;base64,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"
                                    className="rounded-xl cursor-pointer w-20"
                                    alt="Thumbnail"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Side - Details */}
                    <div>
                        <h1 className="text-5xl font-semibold mb-3 mt-3">{data?.name}</h1>
                        <p className="text-gray-600 mb-2">brand: {data?.brand}</p>

                        <p
                            id="description"
                            className={`text-gray-800 content overflow-hidden ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'
                                }`}
                        >
                            {data?.description}
                        </p>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-600 underline mt-1"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>

                        <div className="flex items-center my-4 gap-3">
                            <span className="text-orange-600 text-2xl font-bold">₹{data?.price}</span>
                            <span className="text-sm text-gray-500">{data?.discount_price}₹ off</span>
                            <span className="text-sm line-through text-gray-500">₹{data?.mrp_price}</span>
                        </div>

                        <p className="mb-1">Available stock: {data?.stock}</p>

                        <ul className="mt-4 list-disc list-inside text-gray-700">
                            <li>
                                <strong>Delivery:</strong> Free shipping on orders above ₹500 in Gujarat, India
                            </li>
                            <li>
                                <strong>Tax Rate:</strong> {data?.tax}%
                            </li>
                            <li>
                                <strong>Return Policy:</strong> Easy 30-day returns
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Reviews Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
                    {sortedReviews?.slice(0, showAllReviews ? sortedReviews?.length : 2).map((review, index) => (
                        <div key={review?._id} className="bg-white shadow-md rounded-md p-4 mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-lg font-medium">{review?.name}</h3>
                                <span className="text-yellow-600 font-semibold">{review?.rating}★</span>
                            </div>
                            <p className="text-gray-700">{review?.comment}</p>
                            <p className="text-sm text-gray-400">{moment(review.createdAt).format('LLL')}</p>
                        </div>
                    ))}

                    {sortedReviews.length > 2 && (
                        <button
                            className="text-blue-600 underline"
                            onClick={() => setShowAllReviews(!showAllReviews)}
                        >
                            {showAllReviews ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ProductPreview;