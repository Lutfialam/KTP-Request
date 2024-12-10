import { create } from "zustand"
import { AuthenticationStore, createAuthenticationSlice } from "./AuthenticationStore"
import { ApprovalStore, createApprovalSlice } from "./ApprovalStore"

export interface RootStore {
  auth: AuthenticationStore
  approval: ApprovalStore
}

export const useStore = create<RootStore>()((...a) => ({
  auth: createAuthenticationSlice(...a),
  approval: createApprovalSlice(...a),
}))
