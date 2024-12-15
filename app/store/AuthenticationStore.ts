import { api } from "@/services/api"
import { storage } from "@/utils/storage"
import { RootStateCreator } from "./types"
import { RootStore, useStore } from "./RootStore"
import { useShallow } from "zustand/react/shallow"

export interface AuthenticationStore {
  name: string
  role: string
  email: string
  password: string
  repeatedPassword: string

  errorMessage: string

  // actions
  clearState: () => void
  handleState: (
    key: keyof AuthenticationStore | string,
    value: AuthenticationStore[keyof AuthenticationStore],
  ) => void
  login: () => Promise<boolean>
  register: () => Promise<boolean>
}

export const createAuthenticationSlice: RootStateCreator<AuthenticationStore> = (set, get) => ({
  name: "",
  password: "",
  repeatedPassword: "",
  role: storage.getString("role") ?? "",
  email: storage.getString("email") ?? "",

  errorMessage: "",

  // actions
  clearState: () => {
    set((state) => ({
      ...state,
      auth: {
        ...state.auth,
        name: "",
        role: "",
        email: "",
        password: "",
        errorMessage: "",
        repeatedPassword: "",
      },
    }))
  },

  handleState: (key, value) =>
    set((state) => ({ ...state, auth: { ...state.auth, [key]: value } })),

  login: async (): Promise<boolean> => {
    const response = await api.login(get().auth.email, get().auth.password)

    if (response.kind === "ok") {
      get().auth.handleState("role", response.data.role)

      storage.set("email", get().auth.email)
      storage.set("role", response.data.role)
      storage.set("accessToken", response.data.token)

      get().auth.handleState("email", "")
      get().auth.handleState("password", "")
      return true
    } else if (response.kind === "unauthorized") {
      get().auth.handleState("errorMessage", "Email atau password salah")
      return false
    } else {
      get().auth.handleState("errorMessage", "Something went wrong, try again later")
      return false
    }
  },

  register: async (): Promise<boolean> => {
    if (get().auth.password !== get().auth.repeatedPassword) {
      get().auth.handleState("errorMessage", "Password tidak sama")
      return false
    }

    const response = await api.register(get().auth.name, get().auth.email, get().auth.password)

    if (response.kind === "ok") {
      get().auth.clearState()
      return true
    }

    if (response.kind === "unauthorized") {
      get().auth.handleState("errorMessage", "Data tidak sesuai")
      return false
    } else if (response.kind === "failed") {
      get().auth.handleState("errorMessage", response.message)
      return false
    } else {
      get().auth.handleState("errorMessage", "Something went wrong, try again later")
      return false
    }
  },
})

export const useAuthenticationStore = () =>
  useStore(
    useShallow((state: RootStore) => ({
      ...state.auth,
      isAuthenticated: !!storage.getString("accessToken"),
    })),
  )
