import {AxiosResponse} from "axios";
import {api} from "@/shared/api/http";
import {Task} from "@/shared/api/models/task.ts";

export default class TaskService {
    static async getTasks(initData: string | undefined): Promise<AxiosResponse<Task[]>> {
        return api.get<Task[]>("/api/tasks", {headers: {Authorization: `Bearer ${initData}`}})
    }
}
