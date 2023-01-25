import { get } from "../axios/requests";

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(isNotToken?: boolean): Promise<T[]> {
    try {
      const res = await get(`/${this.apiName}/getAll${this.displayName}`, {
        headers: {
          "authentication": isNotToken ? "" : "Bearer " + localStorage.getItem("token"),
        }
      });
      return res;
    } catch (err) {
      console.log(`Lấy danh sách ${this.apiName} thất bại.`);
      throw err;
    }
  }
}