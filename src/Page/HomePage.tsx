import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts,type Product } from "../api/apiClient";
import { openPop } from "../store/popupSlice";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Popupprd from "../Component/Popupprd";
const ListProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: listPrd = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, 
  });

  if (isLoading) return <p className="text-center py-10">Đang tải sản phẩm...</p>;

  return (
    <div style={{ margin: "0px auto", width: "1200px" }}>
      <p>MADE THE HARD WAY</p>
      <p className="pb-2">TOP PRODUCTS</p>
      <div className="flex flex-wrap">
        {listPrd.map((prd) => {
          const price = Number(prd?.price || 0).toLocaleString("vi-VN");
          return (
            <div key={prd?._id?.$oid} className="w-[25%] p-1">
              <img
                className="hover:opacity-80 cursor-pointer"
                onClick={() => dispatch(openPop(prd))} // Phóng data vào kho
                src={prd?.img1}
                alt={`anh${prd?.name}`}
              />
              <div className="text-center px-1.5 mt-2">
                <p className="font-bold cursor-pointer hover:underline" onClick={() => navigate(`/detail/${prd?._id?.$oid}`)}>
                  {prd?.name}
                </p>
                <p>{price} VND</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div>
      <Header />
      <Popupprd /> 
      <ListProduct />
      <Footer />
    </div>
  );
}