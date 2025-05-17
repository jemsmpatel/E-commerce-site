import { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetUserAllReviewsQuery, useGetListProductsMutation, useUpdateReviewMutation, useDeleteReviewMutation } from "../../redux/api/products";
import { toast } from 'react-toastify';
import Loader from '../../Structure/Loader';

const UserReviews = () => {
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedComment, setEditedComment] = useState("");
    const [editedRating, setEditedRating] = useState("");
    const { userInfo } = useSelector((state) => state.userAuth);
    const { data } = useGetUserAllReviewsQuery(userInfo?.id);
    const [getProducts, { data: productList, isLoading }] = useGetListProductsMutation();
    const [reviews, setReviews] = useState(null);
    const [updatereview, { isupdatting, updateError }] = useUpdateReviewMutation();
    const [deletereview, { isdeletting, deleteError }] = useDeleteReviewMutation();

    const handleEditClick = (review) => {
        setEditingReviewId(review._id.$oid);
        setEditedComment(review.comment);
        setEditedRating(review.rating);
    };

    const handleCancelEdit = () => {
        setEditingReviewId(null);
        setEditedComment("");
        setEditedRating("");
    };

    const handleUpdate = (pid, rid) => {
        try {
            updatereview({
                pid,
                rid,
                data: {
                    rating: editedRating,
                    comment: editedComment
                }
            }).unwrap();
            toast.success("Review updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Review Updation failed");
        }
        // Reset after update
        setEditingReviewId(null);
    };

    const handleDelete = (pid, rid) => {
        try {
            deletereview({
                pid,
                rid
            }).unwrap();
            toast.success("Review Deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Review Delettion failed");
        }
    };

    useEffect(() => {
        if (data) {
            setReviews(data.reviews);
            const product_ids = data.reviews.map((item) => item.product_id);
            getProducts({ product_ids: product_ids });
        }
    }, [data]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg my-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Your Product Reviews</h2>

            {isLoading ?
                <div className='flex justify-center mt-20 items-center'>
                    <Loader />
                </div>
                : reviews?.length === 0 ? (
                    <p className="text-center text-gray-500">No reviews yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {reviews?.map(({ product_id, review }, index) => (
                            <li key={review._id.$oid} className="p-4 border rounded-md shadow-sm">
                                <Link to={`/product/${product_id.$oid}`}><strong>Product Name:</strong> {productList ? productList[index].name : 0}</Link>
                                <p><strong>Reviewed on:</strong> {moment(review.createdAt.$date).format("MMM DD, YYYY")}</p>

                                {editingReviewId === review._id.$oid ? (
                                    <div className="mt-3 space-y-2">
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="rating"
                                            max={5}
                                            min={1}
                                            required
                                            className="border rounded-md px-3 py-2 w-full"
                                            value={editedRating}
                                            onChange={(e) => {
                                                let value = parseFloat(e.target.value);
                                                if (value > 5) value = 5;
                                                if (value < 1) value = 1;
                                                setEditedRating(value);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            className="border rounded-md px-3 py-2 w-full"
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(product_id.$oid, review._id.$oid)}
                                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                                        <p><strong>Comment:</strong> {review.comment}</p>
                                        <div className="flex gap-4 mt-3">
                                            <button
                                                onClick={() => handleEditClick(review)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product_id.$oid, review._id.$oid)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    );
}

export default UserReviews;