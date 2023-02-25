import { getData } from "./base-service";

export const ApiService = {
  getBanners(page: number = 1, limit: number = 10, sortQuery?: string) {
    if (sortQuery) {
      return getData(`banner?page=${page}&limit=${limit}&${sortQuery}`);
    }
    return getData(`banner?page=${page}&limit=${limit}`);
  },

  getProductsByCategoryID(category_id: string ,page: number = 1, limit: number = 12) {
    return getData(`work?category_id=${category_id}&page=${page}&limit=${limit}`);
  },

  getProductDetail(product_id: string) {
    return getData(`work/${product_id}`);
  },

  getProducts(page: number = 1, limit: number = 10) {
    return getData(`work?page=${page}&limit=${limit}`);
  },

  getCategoryDetail(category_id: string) {
    return getData(`category/${category_id}`);
  }
}