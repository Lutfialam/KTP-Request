import { ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./apiProblem"

import {
  Api,
  GetFamilyCard,
  FamilyCardResponse,
  CreateIDCardRequest,
  CreateIDCardResponse,
  PostCreateIDCardResponse,
  GetCreatedIDResponse,
  RequestIDCardCreationResponse,
  GetIDCardResponseResult,
  GetIDCardResponse,
} from "."
import { ApprovalData } from "@/store/types"
import { format } from "date-fns"

class ApiRequestIDCard extends Api {
  async getIDCard(): GetIDCardResponseResult {
    try {
      const response: ApiResponse<GetIDCardResponse> = await this.apisauce.get(`api/ktp`)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? ({} as GetIDCardResponse) }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  async getFamilyCard(number: string): GetFamilyCard {
    try {
      const response: ApiResponse<FamilyCardResponse> = await this.apisauce.get(`api/kk/${number}`)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? ({} as FamilyCardResponse) }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  async getCreatedRequest(): GetCreatedIDResponse {
    try {
      const response: ApiResponse<ApprovalData> = await this.apisauce.get(`api/permohonan`)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? ({} as ApprovalData) }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  async createIDCard(data: CreateIDCardRequest): PostCreateIDCardResponse {
    try {
      const responseReq: RequestIDCardCreationResponse = await this.apisauce.post(
        "api/permohonan",
        JSON.stringify({
          NamaWarga: data.namaLengkap,
          AlamatWarga: data.alamat,
          NoKK: data.kk,
          TglPengajuan: format(new Date(), "yyyy-MM-dd"),
        }),
      )

      const response: ApiResponse<CreateIDCardResponse> = await this.apisauce.post(
        `api/ktp`,
        JSON.stringify({ ...data, reqID: responseReq.data?.id }),
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? ({} as CreateIDCardResponse) }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }
}

export const apiRequestIDCard = new ApiRequestIDCard()
