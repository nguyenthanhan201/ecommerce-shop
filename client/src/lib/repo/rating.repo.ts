import { get, post } from "../axios/requests";

export class RatingRepository {
  async getRatingByIdAuth(idAuth: String) {
    const res = await get(`/rating/getRatingByIdAuth/${idAuth}`);
    return res;
  }
  async getRatingByIdProduct(idProduct: string) {
    const res = await get(`/rating/getRatingByIdProduct/${idProduct}`);
    return res;
  }
  async updateRatingById(idRating: string, rating: number, comment: string) {
    const res = await post(`/rating/updateRatingById/${idRating}?_method=PUT`, { rating, comment });
    return res;
  }
}
export const RatingServices = new RatingRepository();