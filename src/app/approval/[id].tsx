import Timeline from "@/components/Timeline"
import AntDesign from "@expo/vector-icons/AntDesign"

import { $styles, colors, spacing } from "@/theme"
import { router, useLocalSearchParams } from "expo-router"
import { Screen, Text, RequesterCard, Button } from "@/components"
import { useApprovalStore, useAuthenticationStore } from "@/store"
import { ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

export default function ApprovalDetail() {
  const { id } = useLocalSearchParams()
  const { role } = useAuthenticationStore()
  const { approveOrRevise, selectedList } = useApprovalStore()

  async function onApprovalClick(type: "revised" | "approved") {
    if (await approveOrRevise(id as string, type)) {
      router.replace({
        pathname: "/form/creation-success",
        params: {
          message: `Pengajuan KTP ${selectedList.namaWarga} telah berhasil di ${type === "approved" ? "Setujui" : "Tolak"}`,
        },
      })
    }
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$styles.flex1}
      backgroundColor={colors.palette.neutral100}
    >
      <TouchableOpacity style={$header} onPress={router.back}>
        <AntDesign name="left" size={24} color="black" />
        <Text
          size="lg"
          weight="bold"
          text="Detail Pengajuan KTP"
          color={colors.palette.neutral480}
        />
      </TouchableOpacity>

      <ScrollView>
        <View style={$container}>
          <RequesterCard item={selectedList} />

          <Text
            size="xxs"
            weight="semiBold"
            style={$infoText}
            color={colors.palette.neutral480}
            text="Hai Asep Solar, pengajuan KTP mu masih dalam proses nih, mohon ditunggu ya! kamu dapat melihat detail proses nya dibawah ini"
          />

          <Text text="Detail Approval" weight="semiBold" />
          <Timeline data={["Asep", "Knalpot"]} />
        </View>
      </ScrollView>

      {["rt", "rw"].includes(role) ? (
        <View style={$buttonContainer}>
          <Button
            text="Tolak"
            style={$revisedButton}
            onPress={() => {
              onApprovalClick("revised")
            }}
          />
          <Button
            style={$styles.flex1}
            text="Approve"
            onPress={() => {
              onApprovalClick("approved")
            }}
          />
        </View>
      ) : null}

      {role === "kelurahan" ? (
        <View style={$buttonContainer}>
          <Button
            style={$styles.flex1}
            text="Publish KTP"
            onPress={() => {
              onApprovalClick("approved")
            }}
          />
        </View>
      ) : null}
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
  gap: spacing.xs,
  paddingHorizontal: spacing.md,
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.md,
}

const $infoText: TextStyle = {
  marginVertical: spacing.lg,
}

const $buttonContainer: ViewStyle = {
  ...$directionRow,
  gap: spacing.md,
  padding: spacing.md,
}

const $revisedButton: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.angry500,
}
