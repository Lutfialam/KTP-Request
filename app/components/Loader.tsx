import LottieView from "lottie-react-native"

import { Text } from "./Text"
import { colors, spacing } from "@/theme"
import { Image, ImageStyle } from "expo-image"
import { View, ViewStyle } from "react-native"

export default function Loader() {
  return (
    <View style={$container}>
      <Image style={$image} contentFit="contain" source={require("assets/images/success.png")} />
      <LottieView
        loop
        autoPlay
        style={$lottieStyle}
        source={require("assets/lottie/loader.json")}
      />

      <Text align="center" weight="semiBold" text="Mohon tunggu sebentar" />
      <Text align="center" weight="semiBold" text="Permohonan anda sedang kami proses" />
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.neutral100,
}

const $image: ImageStyle = {
  width: 300,
  height: 300,
}

const $lottieStyle: ViewStyle = {
  width: 200,
  aspectRatio: 1,
  marginVertical: -spacing.xxl,
}
