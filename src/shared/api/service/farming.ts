import { AxiosResponse } from "axios";
import { Farming } from "../models/farming";
import { api } from "../http";

export default class FarmingService {
  static async getFarming(
    initData: string | undefined
  ): Promise<AxiosResponse<Farming>> {
    return api.get<Farming>("/api/farming", {
      headers: { Authorization: `Bearer ${initData}` },
    });
  }

  static async claim(
    initData: string | undefined
  ): Promise<AxiosResponse<Farming>> {
    return api.post<Farming>(
      "/api/farming/claim",
      {},
      {
        headers: { Authorization: `Bearer ${initData}` },
      }
    );
  }
}
