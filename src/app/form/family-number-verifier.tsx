import { router } from "expo-router"
import { colors, spacing } from "@/theme"
import { useApprovalStore } from "@/store"
import { Button, Screen, Text, TextField } from "@/components"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import AntDesign from "@expo/vector-icons/AntDesign"

export default function FamilyNumberVerifier() {
  const { familyNumber, handleState, errorMessage, verifyFamilyNumber } = useApprovalStore()

  async function onVerify() {
    if (await verifyFamilyNumber()) {
      router.replace("/form/form-creation")
    }
  }

  return (
    <Screen safeAreaEdges={["top", "bottom"]} backgroundColor={colors.palette.neutral100}>
      <TouchableOpacity style={$header} onPress={router.back}>
        <AntDesign name="left" size={24} color="black" />
        <Text size="lg" weight="bold" text="Back" color={colors.palette.neutral480} />
      </TouchableOpacity>

      <View style={$contentContainer}>
        <Text size="lg" weight="bold" text="Create new ID Card" color={colors.palette.neutral480} />

        <Text
          size="xs"
          style={$info}
          text="Silahkkan verifikasi nomor KK terlebih dahulu sebelum melanjutkan pendaftaran"
          color={colors.palette.neutral480}
        />

        <TextField
          label="No KK"
          name="familyNumber"
          value={familyNumber}
          onTextChange={handleState}
          containerStyle={$inputContainer}
          placeholder="Masukkan No KK"
          placeholderTextColor={colors.palette.placeholder}
          status={errorMessage?.length > 0 ? "error" : undefined}
        />
        {errorMessage.length > 0 ? (
          <Text size="xxs" color={colors.palette.angry500} text={errorMessage} />
        ) : null}

        <Button
          text="Lanjut"
          onPress={onVerify}
          style={$continueButton}
          disabled={familyNumber.length <= 0}
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

const $info: TextStyle = {
  marginTop: spacing.xs,
  marginBottom: spacing.xs,
}
