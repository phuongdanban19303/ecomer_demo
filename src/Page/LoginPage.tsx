import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {type RootState } from "../store/store";
import { loginSuccess, logout } from "../store/userSlice";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Nhập email!"),
  password: yup.string().required("Nhập mật khẩu!"),
}).required();

type LoginData = yup.InferType<typeof schema>;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin, Accounts } = useSelector((state: RootState) => state.user);

  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginData) => {
    const user = Accounts.find(u => u.email === data.email);
    if (!user) {
      setError("email", { message: "Email không tồn tại" });
      return;
    }
    if (user.password !== data.password) {
      setError("password", { message: "Sai mật khẩu" });
      return;
    }
    dispatch(loginSuccess(user));
    navigate("/"); // Đăng nhập xong đá về trang chủ
  };

  return (
    <div>
      <Header />
      <div style={{ width: "1200px", margin: "0 auto", height: "600px" }} className="flex justify-center items-center bg-gray-100">
        {userLogin?.islogin ? (
          <div className="text-center">
            <h1 className="text-4xl">Xin chào {userLogin?.name}</h1>
            <button className="bg-black text-white px-4 py-2 mt-4" onClick={() => dispatch(logout())}>LOG OUT</button>
          </div>
        ) : (
          <div className="bg-white w-[400px] h-auto p-8 rounded-md shadow-xl">
            <p className="italic text-xl text-center mb-8">SIGN IN</p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <input {...register("email")} className="border p-2 w-full" placeholder="Email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <input type="password" {...register("password")} className="border p-2 w-full" placeholder="Password" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <button type="submit" className="w-full bg-[#494949] text-white py-2 mt-4 hover:bg-black">SIGN IN</button>
            </form>
            <p className="text-gray-500 text-center mt-6">
              Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;