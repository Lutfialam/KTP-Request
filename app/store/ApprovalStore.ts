import { delay } from "@/utils/delay"
import { RootStore, useStore } from "./RootStore"
import { useShallow } from "zustand/react/shallow"
import { apiApproval } from "@/services/api/apiApproval"
import { ApprovalData, ApprovalFormData, RootStateCreator } from "./types"
import { apiRequestIDCard } from "@/services/api/apiRequestIDCard"
import { storage } from "@/utils/storage"

export interface ApprovalStore {
  isLoading: boolean
  searchQuery: string
  familyNumber: string
  errorMessage: string
  list: ApprovalData[]
  selectedList: ApprovalData
  formData: ApprovalFormData
  parentFormData: ApprovalFormData

  // actions
  handleState: (
    key: keyof ApprovalStore | string,
    value: ApprovalStore[keyof ApprovalStore] | string,
  ) => void

  getCreatedIDData: () => Promise<void>
  getApprovalData: () => Promise<void>
  createIDCard: () => Promise<boolean>
  verifyFamilyNumber: () => Promise<boolean>
  approveOrRevise: (id: string, type: "revised" | "approved") => Promise<boolean>
}

export const createApprovalSlice: RootStateCreator<ApprovalStore> = (set, get) => ({
  list: [],
  searchQuery: "",
  familyNumber: "",
  errorMessage: "",
  isLoading: false,
  selectedList: {} as ApprovalData,
  formData: {} as ApprovalFormData,
  parentFormData: {} as ApprovalFormData,

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
})

export const useApprovalStore = () => useStore(useShallow((state: RootStore) => state.approval))
