import { AxiosResponse } from "axios";
import { api } from "@/shared/api/http";
import { Entity } from "@/shared/api/models/entity.ts";

export default class EntityService {
  static async getNextLevel(
    initData: string | undefined,
    option: string
  ): Promise<AxiosResponse<Entity | null>> {
    return api.get<Entity>(`api/entities/next-level/${option}`, {
      headers: { Authorization: `Bearer ${initData}` },
    });
  }

  static async upgradeLevel(
    initData: string | undefined,
    option: string
  ): Promise<AxiosResponse> {
    return api.post(
      `api/entities/next-level/{entityType}/upgrade?entity_type=${option}`,
      {},
      { headers: { Authorization: `Bearer ${initData}` } }
    );
  }

  // static async getCashes(): Promise<AxiosResponse<Cash[]>> {
  //     return api.get<[]>("/cash/all")
  // }
  //
  // static async newCash(cash: newCashDTO): Promise<AxiosResponse<Cash>> {
  //     return api.post<Cash>("/cash/new", cash)
  // }
  //
  // static async editCash(cash: editCashDTO): Promise<AxiosResponse<Cash>> {
  //     return api.put<Cash>("/cash/edit", cash)
  // }
  //
  // static async deleteCash(cashId: number): Promise<AxiosResponse> {
  //     return api.delete(`/cash/delete?cashId=${cashId}`)
  // }
}
