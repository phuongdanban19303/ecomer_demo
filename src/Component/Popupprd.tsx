import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { closePop } from "../store/popupSlice";

const Popupprd: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, Poprd } = useSelector((state: RootState) => state.popup);

  if (!isOpen || !Poprd) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-[800px] h-auto bg-white flex rounded-lg shadow-lg p-10 relative">
        <div className="w-[50%]">
          <img src={Poprd?.img1} alt={Poprd?.name} width="90%" />
        </div>
        <div className="w-[50%] px-7.5">
          <h5 className="font-bold mb-2">{Poprd?.name}</h5>
          <p className="mb-2 text-gray-600">{Number(Poprd?.price || 0).toLocaleString("vi-VN")} VND</p>
          <p className="mb-4">{Poprd?.short_desc}</p>
        </div>
        <button
          className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-black"
          onClick={() => dispatch(closePop())}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Popupprd;