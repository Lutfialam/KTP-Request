import { StateCreator } from "zustand"
import { RootStore } from "./RootStore"
import { ApprovalStatus } from "./ApprovalStore"

export type RootStateCreator<T> = StateCreator<RootStore, [], [], T>

export interface ApprovalData {
  id: number
  email: string
  namaWarga: string
  alamatWarga: string
  noKk: string
  tglPengajuan: string
  status: ApprovalStatus
  kk: Kk
}

export interface Kk {
  noKk: string
  namaKk: string
  alamat: string
  anggotaKk: string
}

export interface ApprovalFormData {
  name: string
  address: string
  placeAndDateOfBirth: string

  gender: string
  religion: string
  maritalStatus: string
  email: string
  placeCode?: string
}
