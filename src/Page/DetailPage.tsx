import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchProducts, type Product } from "../api/apiClient";
import { addToCart } from "../store/cartSlice";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const prdshop = products.find((item) => item?._id?.$oid === id);


  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (prdshop?._id?.$oid) {
      dispatch(
        addToCart({
          Id: prdshop._id.$oid,
          Name: prdshop.name,
          img: prdshop.img1,
          price: Number(prdshop.price || 0),
          Quantity: quantity,
        })
      );
      alert("Đã thêm vào giỏ hàng thành công!"); 
    }
  };

  if (isLoading) return <div className="text-center py-20 text-xl">Đang tải chi tiết...</div>;
  if (!prdshop) return <div className="text-center py-20 text-2xl text-red-500">Sản phẩm không tồn tại!</div>;

  return (
    <div>
      <Header />
      <div className="flex max-w-[1200px] mx-auto min-h-[700px] pt-10">
        {/* Cột ảnh */}
        <div className="w-[50%] relative flex gap-4">
          <div className="flex flex-col gap-2 w-[20%]">
            {prdshop?.img1 && <img src={prdshop.img1} alt="thumb1" className="cursor-pointer border hover:border-black" />}
            {prdshop?.img2 && <img src={prdshop.img2} alt="thumb2" className="cursor-pointer border hover:border-black" />}
            {prdshop?.img3 && <img src={prdshop.img3} alt="thumb3" className="cursor-pointer border hover:border-black" />}
            {prdshop?.img4 && <img src={prdshop.img4} alt="thumb4" className="cursor-pointer border hover:border-black" />}
          </div>
          <div className="w-[80%]">
            <img src={prdshop?.img1} alt={prdshop?.name} className="w-full" />
          </div>
        </div>

        {/* Cột thông tin */}
        <div className="w-[50%] px-10">
          <h1 className="text-4xl mb-4 font-light">{prdshop?.name}</h1>
          <p className="text-2xl text-gray-500 mb-4">{Number(prdshop?.price || 0).toLocaleString("vi-VN")} VND</p>
          <p className="text-gray-600 mb-6">{prdshop?.short_desc}</p>
          <p className="mb-6 font-bold">CATEGORY: <span className="font-normal text-gray-500">{prdshop?.category}</span></p>
          
          <div className="flex items-center gap-6">
            <div className="border text-sm p-2 flex items-center justify-between w-[150px]">
              <span className="text-gray-500">QUANTITY</span>
              <div className="flex items-center gap-2">
                <AiOutlineCaretLeft className="cursor-pointer" onClick={decreaseQty} />
                <span className="font-bold">{quantity}</span>
                <AiOutlineCaretRight className="cursor-pointer" onClick={increaseQty} />
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-8 py-2.5 hover:bg-gray-800 transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;