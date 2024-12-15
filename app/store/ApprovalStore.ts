import { delay } from "@/utils/delay"
import { storage } from "@/utils/storage"
import { RootStore, useStore } from "./RootStore"
import { useShallow } from "zustand/react/shallow"
import { apiApproval } from "@/services/api/apiApproval"
import { apiRequestIDCard } from "@/services/api/apiRequestIDCard"
import { ApprovalData, ApprovalFormData, RootStateCreator } from "./types"
import { ApprovalTrackerData, GetIDCardResponse } from "@/services/api"

export enum ApprovalStatus {
  StatusSubmitted = "submitted",
  StatusVerifiedRT = "verified_rt",
  StatusRejectedRT = "rejected_rt",
  StatusVerifiedRW = "verified_rw",
  StatusRejectedRW = "rejected_rw",
  StatusRejectedKel = "rejected_kel",
  StatusVerifiedKel = "verified_kel",
}

export const maskedStatus: Record<ApprovalStatus, string> = {
  [ApprovalStatus.StatusSubmitted]: "Submitted",
  [ApprovalStatus.StatusVerifiedRT]: "Approved RT",
  [ApprovalStatus.StatusRejectedRT]: "Rejected RT",
  [ApprovalStatus.StatusVerifiedRW]: "Approved RW",
  [ApprovalStatus.StatusRejectedRW]: "Rejected RW",
  [ApprovalStatus.StatusRejectedKel]: "Rejected Kelurahan",
  [ApprovalStatus.StatusVerifiedKel]: "Completed",
}

export interface ApprovalStore {
  isLoading: boolean
  searchQuery: string
  familyNumber: string
  errorMessage: string
  list: ApprovalData[]
  trackerData: ApprovalTrackerData[]
  selectedList: ApprovalData
  formData: ApprovalFormData
  idCard: GetIDCardResponse

  // actions
  handleState: (
    key: keyof ApprovalStore | string,
    value: ApprovalStore[keyof ApprovalStore] | string,
  ) => void

  getCreatedIDData: () => Promise<void>
  getApprovalTracker: () => Promise<void>
  getApprovalData: () => Promise<void>
  getIDCard: () => Promise<void>
  createIDCard: () => Promise<boolean>
  verifyFamilyNumber: () => Promise<boolean>
  approveOrRevise: (id: string, type: "revised" | "approved") => Promise<boolean>
}

export const createApprovalSlice: RootStateCreator<ApprovalStore> = (set, get) => ({
  list: [],
  trackerData: [],
  searchQuery: "",
  familyNumber: "",
  errorMessage: "",
  isLoading: false,
  selectedList: {} as ApprovalData,
  formData: {
    name: "",
    address: "",
    email: storage.getString("email") ?? "",
    gender: "",
    maritalStatus: "",
    placeAndDateOfBirth: "",
    religion: "",
  },
  idCard: {} as GetIDCardResponse,

  // actions
  handleState: (key, value) =>
    set((state) => ({ ...state, approval: { ...state.approval, [key]: value } })),

  getApprovalData: async () => {
    await delay(1000)
    const response = await apiApproval.getApprovalList()

    if (response.kind === "ok") {
      get().approval.handleState("list", response.data)
    }
  },
  getCreatedIDData: async () => {
    await delay(1000)
    const response = await apiRequestIDCard.getCreatedRequest()

    if (response.kind === "ok") {
      get().approval.handleState("list", [response.data])
    }
  },
  verifyFamilyNumber: async () => {
    const response = await apiRequestIDCard.getFamilyCard(get().approval.familyNumber)

    if (response.kind === "ok") {
      return true
    } else {
      get().approval.handleState("errorMessage", "No KK tidak terdaftar")
      return false
    }
  },
  createIDCard: async () => {
    const response = await apiRequestIDCard.createIDCard({
      agama: get().approval.formData.religion,
      alamat: get().approval.formData.address,
      namaLengkap: get().approval.formData.name,
      jenisKelamin: get().approval.formData.gender,
      statusPerkawinan: get().approval.formData.maritalStatus,
      tanggalLahir: get().approval.formData.placeAndDateOfBirth,
      placeCode: "320301",
      email: storage.getString("email") ?? "",
      kk: get().approval.familyNumber,
    })

    if (response.kind === "ok") {
      await get().approval.getApprovalData()
      return true
    } else {
      get().approval.handleState(
        "errorMessage",
        "Gagal dalam membuat KTP, silahkan coba beberapa saat lagi",
      )
      return false
    }
  },
  approveOrRevise: async (id: string, type: "revised" | "approved") => {
    const response = await apiApproval.aproveOrRevise(id, type === "approved")

    if (response.kind === "ok") {
      return true
    } else {
      return false
    }
  },
  getApprovalTracker: async () => {
    const response = await apiApproval.getApprovalTracker()
    if (response.kind === "ok") {
      get().approval.handleState("trackerData", response.data.reverse())
    }
  },
  getIDCard: async () => {
    const response = await apiRequestIDCard.getIDCard()
    if (response.kind === "ok") {
      get().approval.handleState("idCard", response.data)
    }
  },
})

export const useApprovalStore = () => useStore(useShallow((state: RootStore) => state.approval))
