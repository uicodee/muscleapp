import {AxiosResponse} from "axios";
import {api} from "@/shared/api/http";
import {Hero} from "@/shared/api/models/hero.ts";

export default class HeroService {

    static async getHero(initData: string | undefined): Promise<AxiosResponse<Hero>> {
        return api.get<Hero>("/api/hero", {headers: {Authorization: `Bearer ${initData}`}})
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