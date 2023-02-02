import axiosClient from "./base-service"

export const BannerService = {
  getBanners(page: number = 1, limit: number = 10, sortQuery?: string) {
    if (sortQuery) {
      return axiosClient.get(`banner?page=${page}&limit=${limit}&${sortQuery}`);
    }
    return axiosClient.get(`banner?page=${page}&limit=${limit}`);
  }
}