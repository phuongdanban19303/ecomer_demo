import React, { useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { logout } from "../store/userSlice";

const Header: React.FC = () => {
  const [active, setActive] = useState<string>("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLogin } = useSelector((state: RootState) => state.user);
  const { Listcart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActive("home");
    else if (path.includes("/shop") || path.includes("/detail")) setActive("shop");
    else if (path === "/cart" || path === "/checkout") setActive("cart");
    else if (path === "/login" || path === "/register") setActive("login");
    else setActive("");
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  return (
    <div
      className="grid grid-cols-3 gap-4 h-[80px] items-center"
      style={{ width: "1200px", margin: "0px auto" }}
    >
      <div className="flex gap-4 font-semibold italic">
        <Link
          to="/"
          className={`${active === "home" ? "text-amber-600" : "text-black"} cursor-pointer hover:text-amber-600 transition-colors`}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={`${active === "shop" ? "text-amber-600" : "text-black"} cursor-pointer hover:text-amber-600 transition-colors`}
        >
          Shop
        </Link>
      </div>

      <div className="text-center cursor-pointer" onClick={() => navigate("/")}>
        <h6 className="text-2xl font-light tracking-widest">BOUTIQUE</h6>
      </div>

      <div className="flex gap-6 justify-end font-semibold italic items-center">
        
        <Link
          to="/cart"
          className={`${active === "cart" ? "text-amber-600" : "text-black"} flex items-center gap-1 cursor-pointer hover:text-amber-600 transition-colors relative`}
        >
          <FaCartArrowDown className="text-xl" />
          <span>Cart</span>
          {Listcart.length > 0 && (
            <span className="absolute -top-2 -left-3 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {Listcart.length}
            </span>
          )}
        </Link>

        {userLogin?.islogin ? (
          <div className="flex items-center gap-1">
            <IoPersonSharp className="text-xl" />
            <span>{userLogin.name}</span>
            <button 
              onClick={handleLogout} 
              className="text-gray-500 hover:text-red-500 font-normal ml-1"
            >
              (Logout)
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className={`${active === "login" ? "text-amber-600" : "text-black"} flex items-center gap-1 cursor-pointer hover:text-amber-600 transition-colors`}
          >
            <IoPersonSharp className="text-xl" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;