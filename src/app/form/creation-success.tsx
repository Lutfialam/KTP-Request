import { Button, Screen, Text } from "@/components"
import { $styles, colors, spacing } from "@/theme"
import { TextStyle, View, ViewStyle } from "react-native"
import { router, useLocalSearchParams } from "expo-router"

import LottieView from "lottie-react-native"

export default function CreationSuccess() {
  const { message } = useLocalSearchParams()

  return (
    <Screen
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$styles.flex1}
      backgroundColor={colors.palette.neutral100}
    >
      <View style={$container}>
        <LottieView
          loop
          autoPlay
          style={$lottieStyle}
          source={require("assets/lottie/success-animation.json")}
        />

        <Text
          align="center"
          style={$successText}
          color={colors.palette.neutral480}
          text={
            (message as string) ??
            "Proses pengajuan KTP mu berhasil! kamu dapat melihat pengajuanmu di halaman detail pengajuan"
          }
        />

        <Button
          text="KEMBALI KE HOME"
          style={$submitButton}
          onPress={() => {
            router.replace("/home")
          }}
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  padding: spacing.lg,
  alignItems: "center",
  justifyContent: "center",
}

const $submitButton: ViewStyle = {
  alignSelf: "center",
  borderRadius: 100,
  paddingHorizontal: 60,
  marginTop: spacing.lg,
  marginBottom: spacing.xl,
}

const $successText: TextStyle = {
  marginTop: spacing.lg,
}

const $lottieStyle: ViewStyle = {
  width: 250,
  aspectRatio: 1,
  padding: spacing.sm,
}
