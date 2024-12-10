import { ApprovalData } from "@/store/types"
import { Api } from "./api"
import { getGeneralApiProblem } from "./apiProblem"
import { ApiResponse } from "apisauce"
import { GetApprovalResponse } from "."

class ApiApproval extends Api {
  async getApprovalList(): GetApprovalResponse {
    try {
      const response: ApiResponse<ApprovalData[]> = await this.apisauce.get(`api/list-permohonan`)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? [] }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  async aproveOrRevise(id: string, isVerified: boolean): GetApprovalResponse {
    try {
      const response: ApiResponse<ApprovalData[]> = await this.apisauce.post(
        `api/verify`,
        JSON.stringify({ reqID: parseInt(id), isVerified }),
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? [] }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }
}

export const apiApproval = new ApiApproval()
