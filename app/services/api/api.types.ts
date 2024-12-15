import { ApprovalData } from "@/store/types"
import { GeneralApiProblem } from "./apiProblem"
import { ApiResponse } from "apisauce"
import { ApprovalStatus } from "@/store"

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

export interface LoginResponse {
  role: string
  token: string
}

export type PostLoginResponse = Promise<{ kind: "ok"; data: LoginResponse } | GeneralApiProblem>
export type GetApprovalResponse = Promise<{ kind: "ok"; data: ApprovalData[] } | GeneralApiProblem>
export type GetCreatedIDResponse = Promise<{ kind: "ok"; data: ApprovalData } | GeneralApiProblem>

export interface FamilyCardResponse {
  noKk: string
  namaKk: string
  alamat: string
  anggotaKk: string
}
export type GetFamilyCard = Promise<{ kind: "ok"; data: FamilyCardResponse } | GeneralApiProblem>

export type RequestIDCardCreationResponse = ApiResponse<{
  id: number
  email: string
  namaWarga: string
  alamatWarga: string
  noKk: string
  tglPengajuan: string
  status: string
  kk: {
    noKk: string
    namaKk: string
    alamat: string
    anggotaKk: string
  }
}>

export interface CreateIDCardRequest {
  namaLengkap: string
  tanggalLahir: string
  alamat: string
  jenisKelamin: string
  agama: string
  statusPerkawinan: string
  email: string
  placeCode: string
  kk: string
}

export interface CreateIDCardResponse {
  id: number
  noKtp: string
  namaWarga: string
  alamatWarga: string
  tglLaporan: string
}
export type PostCreateIDCardResponse = Promise<
  { kind: "ok"; data: CreateIDCardResponse } | GeneralApiProblem
>

export interface ApprovalTrackerData {
  id: number
  requestId: number
  status: ApprovalStatus
  role: string
  picName: string
  updatedAt: string
  remarks: string
  sequence: number
}

export type GetApprovalTrackerResult = Promise<
  { kind: "ok"; data: ApprovalTrackerData[] } | GeneralApiProblem
>

export interface GetIDCardResponse {
  nik: string
  namaLengkap: string
  tanggalLahir: string
  alamat: string
  jenisKelamin: string
  agama: string
  statusPerkawinan: string
  email: string
}

export type GetIDCardResponseResult = Promise<
  { kind: "ok"; data: GetIDCardResponse } | GeneralApiProblem
>
