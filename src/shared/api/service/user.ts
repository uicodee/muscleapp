import { AxiosResponse } from "axios";
import { api } from "@/shared/api/http";
import { Referrals, User } from "@/shared/api/models/user.ts";

export default class UserService {
  static async getUser(
    initData: string | undefined
  ): Promise<AxiosResponse<User>> {
    return api.get<User>("/api/user", {
      headers: { Authorization: `Bearer ${initData}` },
    });
  }

  static async getReferrals(
    initData: string | undefined
  ): Promise<AxiosResponse<Referrals>> {
    return api.get<Referrals>("/api/user/referals", {
      headers: { Authorization: `Bearer ${initData}` },
    });
  }

  static async updateLanguage(
    initData: string | undefined,
    language: string
  ): Promise<AxiosResponse<User>> {
    return api.patch<User>(
      "/api/user",
      { language: language },
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
