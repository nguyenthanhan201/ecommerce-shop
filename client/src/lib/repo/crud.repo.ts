import { get } from "../axios/requests";

export abstract class CrudRepository<T> {
  abstract apiName: string;
  abstract displayName: string;

  async getAll(isNotToken?: boolean): Promise<{ fromCache: boolean, data: T[] }> {
    try {
      const res = await get(`/${this.apiName}/getAll${this.displayName}/${this.apiName}`, {
        headers: {
          "authentication": isNotToken ? "" : "Bearer " + localStorage.getItem("token"),
        }
      });
      return res;
    } catch (err) {
      console.log(`Lấy danh sách ${this.apiName} thất  bại.`);
      throw err;
    }
  }
}