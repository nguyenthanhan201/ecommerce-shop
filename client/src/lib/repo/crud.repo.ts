import { get } from "../axios/requests";

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(): Promise<T[]> {
    try {
      if (this.apiName === "products") {
        const res = await get(`/${this.apiName}/getAll${this.displayName}`);
        return res;
      } else {
        const res = await get(`/${this.apiName}/getAll${this.displayName}`, {
          headers: {
            "authentication": "Bearer " + localStorage.getItem("token"),
          }
        });
        return res;
      }
    } catch (err) {
      console.log(`Lấy danh sách ${this.apiName} thất bại.`);
      throw err;
    }
  }
}