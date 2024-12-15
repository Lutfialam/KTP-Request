import { useState } from "react"
import { format } from "date-fns"
import { router } from "expo-router"
import { delay } from "@/utils/delay"
import { colors, spacing } from "@/theme"
import { useApprovalStore } from "@/store"
import { Dropdown } from "@/components/Dropdown"
import { Button, Screen, Text, TextField } from "@/components"
import { TouchableOpacity, View, ViewStyle } from "react-native"

import Loader from "@/components/Loader"
import DatePicker from "react-native-date-picker"
import AntDesign from "@expo/vector-icons/AntDesign"

export default function FormCreation() {
  const { formData, isLoading, handleState, createIDCard } = useApprovalStore()
  const [shouldDatePickerShow, setShouldDatePickerShow] = useState(false)

  function onFormDataChange(key: keyof typeof formData | string, value: string) {
    handleState("formData", { ...formData, [key]: value })
  }

  function shouldSubmitButtonEnabled() {
    return Object.values(formData).every((item) => item.length > 0)
  }

  async function onSubmitCreation() {
    handleState("isLoading", true)
    await delay(1000)
    const isSuccess = await createIDCard()
    handleState("isLoading", false)

    if (isSuccess) {
      router.replace("/form/creation-success")
    }
  }

  if (isLoading) return <Loader />

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      backgroundColor={colors.palette.neutral100}
    >
      <TouchableOpacity style={$header} onPress={router.back}>
        <AntDesign name="left" size={24} color="black" />
        <Text size="lg" weight="bold" text="Back" color={colors.palette.neutral480} />
      </TouchableOpacity>

      <View style={$contentContainer}>
        <Text size="lg" weight="bold" text="Create new ID Card" color={colors.palette.neutral480} />
        <Text
          size="xs"
          text="Buat KTP barumu disini Cukup siapkan berkas yang diperlukan dan mengisi nya disini!"
          color={colors.palette.neutral480}
        />

        <TextField
          name="name"
          label="Nama"
          value={formData.name}
          onTextChange={onFormDataChange}
          containerStyle={$inputContainer}
          placeholder="Masukkan nama kamu disini"
          placeholderTextColor={colors.palette.placeholder}
        />

        <TextField
          editable={false}
          name="placeAndDateOfBirth"
          onTextChange={onFormDataChange}
          label="Tempat, tanggal lahir"
          containerStyle={$inputContainer}
          value={formData.placeAndDateOfBirth}
          placeholder="Contoh: Jakarta, 20 April 2024"
          placeholderTextColor={colors.palette.placeholder}
          onPress={() => {
            setShouldDatePickerShow(true)
          }}
        />

        <DatePicker
          modal
          mode="date"
          open={shouldDatePickerShow}
          date={formData.placeAndDateOfBirth ? new Date(formData.placeAndDateOfBirth) : new Date()}
          onConfirm={(date) => {
            setShouldDatePickerShow(false)
            onFormDataChange("placeAndDateOfBirth", format(date, "yyyy-MM-dd"))
          }}
          onCancel={() => {
            setShouldDatePickerShow(false)
          }}
        />

        <View style={$inputContainer}>
          <Dropdown
            label="Jenis Kelamin"
            placeholder="Pilih Jenis Kelamin"
            selected={{ label: formData.gender, value: formData.gender }}
            data={[
              { label: "Laki-Laki", value: "Laki-Laki" },
              { label: "Perempuan", value: "Perempuan" },
            ]}
            onSelect={({ value }) => {
              onFormDataChange("gender", value)
            }}
          />
        </View>

        <View style={$inputContainer}>
          <Dropdown
            label="Agama"
            placeholder="Pilih Agama"
            selected={{ label: formData.religion, value: formData.religion }}
            data={[
              { label: "Islam", value: "Islam" },
              { label: "Kristen", value: "Kristen" },
              { label: "Hindi", value: "Hindi" },
              { label: "Budha", value: "Budha" },
              { label: "Konghucu", value: "Konghucu" },
            ]}
            onSelect={({ value }) => {
              onFormDataChange("religion", value)
            }}
          />
        </View>

        <View style={$inputContainer}>
          <Dropdown
            label="Status Perkawinan"
            placeholder="Pilih Status Perkawinan"
            selected={{ label: formData.maritalStatus, value: formData.maritalStatus }}
            data={[
              { label: "Menikah", value: "Menikah" },
              { label: "Belum Menikah", value: "Belum Menikah" },
            ]}
            onSelect={({ value }) => {
              onFormDataChange("maritalStatus", value)
            }}
          />
        </View>

        <TextField
          multiline
          name="address"
          label="Alamat"
          value={formData.address}
          onTextChange={onFormDataChange}
          containerStyle={$inputContainer}
          placeholder="Masukkan alamat kamu"
          placeholderTextColor={colors.palette.placeholder}
        />

        <Button
          text="Lanjut"
          style={$continueButton}
          onPress={onSubmitCreation}
          disabled={!shouldSubmitButtonEnabled()}
        />
      </View>
    </Screen>
  )
}

const $directionRow: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}

const $header: ViewStyle = {
  ...$directionRow,
  gap: spacing.sm,
  paddingHorizontal: spacing.md,
}

const $contentContainer: ViewStyle = {
  padding: spacing.md,
}

const $inputContainer: ViewStyle = {
  marginTop: spacing.md,
}

const $continueButton: ViewStyle = {
  alignSelf: "flex-end",
  borderRadius: 100,
  paddingHorizontal: 60,
  marginTop: spacing.lg,
}
