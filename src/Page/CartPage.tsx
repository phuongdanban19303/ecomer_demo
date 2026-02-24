import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../store/store";
import { upCart, downCart, deleteCart } from "../store/cartSlice";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "../Component/Header";

const Shoppingcart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Listcart } = useSelector((state: RootState) => state.cart);

  const totalSum = Listcart.reduce((acc, prd) => acc + Number(prd?.price || 0) * prd.Quantity, 0);

  return (
    <div className="max-w-[1200px] mx-auto mt-8 flex gap-8">
      <table className="w-[70%] bg-white shadow-md text-left">
        <thead className="bg-[#F8F9FA] text-gray-600">
          <tr>
            <th className="p-4">PRODUCT</th>
            <th className="p-4">PRICE</th>
            <th className="p-4">QUANTITY</th>
            <th className="p-4">TOTAL</th>
            <th className="p-4">REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {Listcart.map((prd) => (
            <tr key={prd?.Id} className="border-t">
              <td className="p-4 flex items-center gap-4">
                <img src={prd?.img} className="w-16 h-16 object-cover rounded" alt={prd?.Name} />
                <span>{prd?.Name}</span>
              </td>
              <td className="p-4">{Number(prd?.price || 0).toLocaleString("vi-VN")} VND</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <AiOutlineCaretLeft className="cursor-pointer" onClick={() => dispatch(downCart(prd.Id))} />
                  <span>{prd?.Quantity}</span>
                  <AiOutlineCaretRight className="cursor-pointer" onClick={() => dispatch(upCart(prd.Id))} />
                </div>
              </td>
              <td className="p-4">{(Number(prd?.price || 0) * prd.Quantity).toLocaleString("vi-VN")} VND</td>
              <td className="p-4 text-red-500 text-xl cursor-pointer">
                <RiDeleteBin6Line onClick={() => dispatch(deleteCart(prd.Id))} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="w-[30%] bg-[#F8F9FA] p-6 h-fit">
        <h2 className="text-xl font-bold mb-4">CART TOTAL</h2>
        <div className="flex justify-between font-bold text-lg mb-6">
          <span>TOTAL</span>
          <span>{totalSum.toLocaleString("vi-VN")} VND</span>
        </div>
        <button onClick={() => navigate("/checkout")} className="w-full bg-black text-white py-2 hover:bg-gray-800">
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default function CartPage() {
  return (
    <div>
      <Header />
      <Shoppingcart />
    </div>
  );
}