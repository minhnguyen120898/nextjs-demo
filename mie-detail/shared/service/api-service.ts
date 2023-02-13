import axiosClient from "./base-service"

export const ApiService = {
  getBanners(page: number = 1, limit: number = 10, sortQuery?: string) {
    if (sortQuery) {
      return axiosClient.get(`banner?page=${page}&limit=${limit}&${sortQuery}`);
    }
    return axiosClient.get(`banner?page=${page}&limit=${limit}`);
  },

  getProductsByCategoryID(category_id: string ,page: number = 1, limit: number = 12) {
    return axiosClient.get(`work?category_id=${category_id}&page=${page}&limit=${limit}`);
  },

  getProductDetail(product_id: string) {
    return axiosClient.get(`work/${product_id}`);
  },

  getProducts(page: number = 1, limit: number = 10) {
    return axiosClient.get(`work?page=${page}&limit=${limit}`);
  }
}