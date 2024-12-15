import { Api } from "./api"
import { ApiResponse } from "apisauce"
import { ApprovalData } from "@/store/types"
import { getGeneralApiProblem } from "./apiProblem"
import { ApprovalTrackerData, GetApprovalResponse, GetApprovalTrackerResult } from "."

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

  async getApprovalTracker(): GetApprovalTrackerResult {
    try {
      const response: ApiResponse<ApprovalTrackerData[]> = await this.apisauce.get(`api/tracker`)

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
