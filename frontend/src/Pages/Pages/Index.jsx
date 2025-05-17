import React from 'react'
import Carousel from '../Componants/Carousel';
import Card from '../Componants/Card';
import { useGetAllProductsQuery } from '../../redux/api/products';
import Loader from '../../Structure/Loader';

const Index = () => {
    const { data, isLoading, isError } = useGetAllProductsQuery();

    return (
        <>
            <Carousel />
            <div className="min-h-screen bg-gray-100 p-6">
                {isLoading ? (
                    <div className='flex justify-center mt-20 items-center'>
                        <Loader />
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500">Failed to load products.</div>
                ) : data?.length === 0 ? (
                    <div className="text-center text-gray-500">No products available.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data.map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Index;