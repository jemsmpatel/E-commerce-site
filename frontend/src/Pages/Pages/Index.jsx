import React from 'react'
import Carousel from '../Componants/Carousel';
import Card from '../Componants/Card';
import { useGetAllProductsQuery } from '../../redux/api/products';

const Index = () => {
    const { data } = useGetAllProductsQuery();

    return (
        <>
            <Carousel />
            <div className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data ? (
                        data.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <div>Empty</div>
                    )}

                </div>
            </div>
        </>
    );
}

export default Index;