import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchProducts, type Product } from "../api/apiClient"; // Import hàm và Type
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const Categorys = [
  { name: "APPLE", sub: ["ALL"] },
  { name: "IPHONE & MAC", sub: ["iPhone", "iPad", "Macbook"] },
  { name: "WIRELESS", sub: ["Airpod", "Watch"] },
  { name: "OTHER", sub: ["Mouse", "Keyboard", "Other"] },
];

const Bodyshop: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // ÁP DỤNG REACT-QUERY LẤY DATA
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // Giữ data trong 5 phút không gọi lại API
  });

  const renderlistprd = () => {
    if (isLoading) return <p>Đang tải dữ liệu...</p>;

    let filteredData = products;
    if (activeCategory !== "ALL") {
      filteredData = products.filter((item) =>
        item?.category?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    return filteredData.map((prd) => {
      // Dấu ? bắt buộc theo ý mày
      const price = Number(prd?.price || 0);
      const pire = price.toLocaleString("vi-VN");

      return (
        <div key={prd?._id?.$oid} className="w-[25%] p-1">
          <img
            className="hover:opacity-80 cursor-pointer"
            src={prd?.img1}
            alt={`anh${prd?.name}`}
            onClick={() => navigate(`/detail/${prd?._id?.$oid}`)}
          />
          <div className="text-center px-1.5">
            <p className="font-bold cursor-pointer" onClick={() => navigate(`/detail/${prd?._id?.$oid}`)}>
              {prd?.name}
            </p>
            <p>{pire} VND</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div style={{ width: "1200px", margin: "0 auto", height: "700px" }} className="flex pt-2.5">
      <div className="w-[20%]">
        <h2 className="text-xl">CATEGORIES</h2>
        {Categorys.map((ctr) => (
          <div key={ctr?.name}>
            <h3 className="bg-amber-200">{ctr?.name}</h3>
            <ul>
              {ctr.sub.map((item) => (
                <li key={item} className="cursor-pointer hover:text-amber-700" onClick={() => setActiveCategory(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-[80%]">
        <div className="flex flex-wrap ">{renderlistprd()}</div>
      </div>
    </div>
  );
};

export default function ShopPage() {
  return (
    <div>
      <Header />
      <Bodyshop />
      <Footer />
    </div>
  );
}