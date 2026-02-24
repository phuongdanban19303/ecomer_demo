import axios from "axios";

export interface Product {
  _id?: { $oid: string };
  name?: string;
  price?: string | number;
  category?: string;
  short_desc?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
}

const apiClient = axios.create({
  baseURL: "https://firebasestorage.googleapis.com", 
  timeout: 5000,
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const res = await apiClient.get<Product[]>(
      "/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    return []; 
  }
};