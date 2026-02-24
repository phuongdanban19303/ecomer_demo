import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name?: string;
  email?: string;
  password?: string;
  number?: string;
  islogin?: boolean;
}

const getLoginLocal = (): User => {
  const data = localStorage.getItem("user_login");
  return data ? JSON.parse(data) : { islogin: false };
};

const getAccountsLocal = (): User[] => {
  const data = localStorage.getItem("user_Register");
  return data ? JSON.parse(data) : [{ name: "phan duy phuong", email: "mifdanchoi@gmail.com", password: "12345678" }];
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userLogin: getLoginLocal(),
    Accounts: getAccountsLocal(),
  },
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.userLogin = { ...action.payload, islogin: true };
      localStorage.setItem("user_login", JSON.stringify(state.userLogin));
    },
    logout: (state) => {
      state.userLogin = { islogin: false };
      localStorage.setItem("user_login", JSON.stringify(state.userLogin));
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;