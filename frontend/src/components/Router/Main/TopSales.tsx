import { nanoid } from '@reduxjs/toolkit';
import MainPreloader from 'extras/MainPreloader';
import arrayToChunksArray from 'extras/arrayToChunksArray';
import React, { useEffect } from 'react'
import { topSales, topSalesIsLoading } from '../../../redux/reducers/productsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import ProductCard from './ProductCart';

export default function TopSales() {
  const dispatch = useAppDispatch();
  const topSalesList = useAppSelector(topSales);
  const isLoading = useAppSelector(topSalesIsLoading);

  const topSalesChunks = arrayToChunksArray(topSalesList, 3);

  useEffect(() => {
    dispatch({ type: 'getTopSales' });
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {isLoading && <MainPreloader />}
      {topSalesChunks.length > 0 &&
        topSalesChunks.map(chunk =>
          <div className="row m-2" key={nanoid()}>
            {chunk.map(product => <ProductCard
              key={product.id}
              id={product.id}
              images={product.images}
              title={product.title}
              price={product.price}
            />)}
          </div>
        )
      }
    </section>
  );
}
