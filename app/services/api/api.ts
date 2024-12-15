import Config from "../../config"
import type { ApiConfig, LoginResponse, PostLoginResponse } from "./api.types"
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { getGeneralApiProblem } from "./apiProblem"
import { storage } from "@/utils/storage"
import { router } from "expo-router"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })

    this.apisauce.addAsyncRequestTransform(async (request) => {
      if (request.headers && (storage.getString("accessToken")?.length ?? 0) > 0) {
        request.headers.Authorization = storage.getString("accessToken")
      }
    })

    this.apisauce.addAsyncResponseTransform(async (response) => {
      if (response.status === 401) {
        storage.clearAll()
        router.replace("/")
      }
    })
  }

  async login(email: string, password: string): PostLoginResponse {
    try {
      const response: ApiResponse<LoginResponse> = await this.apisauce.post(
        `login`,
        JSON.stringify({ email, password }),
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? ({} as LoginResponse) }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }

  async register(name: string, email: string, password: string): PostLoginResponse {
    try {
      const response: ApiResponse<LoginResponse> = await this.apisauce.post(
        `register`,
        JSON.stringify({ name, email, password }),
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data ?? ({} as LoginResponse) }
    } catch (error) {
      return { kind: "bad-data" }
    }
  }
}

export const api = new Api()
