import IDCard from "@/components/IDCard"
import Timeline from "@/components/Timeline"
import AntDesign from "@expo/vector-icons/AntDesign"

import { useEffect } from "react"
import { $styles, colors, spacing } from "@/theme"
import { router, useLocalSearchParams } from "expo-router"
import { Screen, Text, RequesterCard, Button } from "@/components"
import { ApprovalStatus, useApprovalStore, useAuthenticationStore } from "@/store"
import { ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

export default function ApprovalDetail() {
  const { id } = useLocalSearchParams()
  const { role, name } = useAuthenticationStore()
  const { approveOrRevise, selectedList, getApprovalTracker, trackerData, idCard, getIDCard } =
    useApprovalStore()

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

  const isRequestApproved = trackerData.find(
    (item) => item.status === ApprovalStatus.StatusVerifiedKel,
  )

  useEffect(() => {
    ;(async () => {
      await Promise.allSettled([getApprovalTracker(), getIDCard()])
    })()
  }, [])

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
          {isRequestApproved ? (
            <View style={$approvedTextContainer}>
              <Text weight="semiBold" text="KTP Telah disetujui" />
              <Text
                size="xs"
                text="Selamat KTP Anda telah disetujui semua pihak dan telah berhasil dipublish! kamu dapat melanjutkan proses selanjutnya untuk pengambilan KTP kamu. Dan berikut detail dari KTP kamu"
              />
            </View>
          ) : null}
          {isRequestApproved ? <IDCard item={idCard} /> : <RequesterCard item={selectedList} />}

          {role === "user" && !isRequestApproved ? (
            <Text
              size="xxs"
              weight="semiBold"
              style={$infoText}
              color={colors.palette.neutral480}
              text={`Hai ${name ?? "user"}, pengajuan KTP mu masih dalam proses nih, mohon ditunggu ya! kamu dapat melihat detail proses nya dibawah ini`}
            />
          ) : (
            <Text style={$emptyInfoText} />
          )}

          <Text text="Detail Approval" weight="semiBold" style={$detailApprovalText} />
          <Timeline data={trackerData} />
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

const $emptyInfoText: TextStyle = {
  marginBottom: spacing.md,
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

const $detailApprovalText: TextStyle = {
  marginBottom: spacing.md,
}

const $approvedTextContainer: ViewStyle = {
  marginTop: spacing.lg,
}
