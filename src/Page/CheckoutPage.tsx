import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const CheckoutPage: React.FC = () => {
  const { Listcart } = useSelector((state: RootState) => state.cart);

  const totalSum = Listcart.reduce(
    (acc, prd) => acc + Number(prd?.price || 0) * prd.Quantity,
    0
  );

  return (
    <div>
      <Header />
      
      <div className="max-w-[1200px] mx-auto bg-[#F6F9F6] h-[150px] flex justify-between items-center px-16 my-8">
        <h1 className="text-3xl italic font-light">CHECK OUT</h1>
        <p className="text-gray-500 font-bold">HOME / CART / <span className="text-black">CHECKOUT</span></p>
      </div>

      <div className="max-w-[1200px] mx-auto flex gap-8 mb-20">
        
        <div className="w-[65%]">
          <h2 className="text-xl mb-6 font-bold">BILLING DETAILS</h2>
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-gray-600">FULL NAME:</label>
              <input type="text" placeholder="Enter Your Full Name Here!" className="w-full border p-3 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">EMAIL:</label>
              <input type="email" placeholder="Enter Your Email Here!" className="w-full border p-3 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">PHONE NUMBER:</label>
              <input type="text" placeholder="Enter Your Phone Number Here!" className="w-full border p-3 focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">ADDRESS:</label>
              <input type="text" placeholder="Enter Your Address Here!" className="w-full border p-3 focus:outline-none focus:border-black" />
            </div>
            <button type="button" className="bg-black text-white py-3 px-6 w-fit mt-4 hover:bg-gray-800">
              Place order
            </button>
          </form>
        </div>

        <div className="w-[35%] bg-[#F8F9FA] p-8 h-fit">
          <h2 className="text-xl mb-6 font-bold">YOUR ORDER</h2>
          <div className="flex flex-col gap-4 border-b pb-4 mb-4">
            {Listcart.length === 0 ? (
              <p className="text-gray-500 italic">Giỏ hàng trống</p>
            ) : (
              Listcart.map((item) => (
                <div key={item.Id} className="flex justify-between items-center">
                  <p className="font-semibold text-gray-700 max-w-[60%] truncate">{item?.Name}</p>
                  <p className="text-gray-500">
                    {Number(item?.price || 0).toLocaleString("vi-VN")} VND x {item?.Quantity}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between items-center text-lg">
            <p className="font-bold">TOTAL</p>
            <p className="text-2xl font-light">{totalSum.toLocaleString("vi-VN")} VND</p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;