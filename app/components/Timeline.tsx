import { Text } from "./Text"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { ListView } from "./ListView"
import { $styles, colors, spacing } from "@/theme"

export interface TimelineProps<T> {
  data: T[]
}

export default function Timeline<T>({ data }: TimelineProps<T>) {
  return (
    <View style={$styles.flex1}>
      <ListView
        data={data}
        estimatedItemSize={120}
        renderItem={({ index }) => (
          <View style={$container}>
            <View style={$lineContainer}>
              <View style={$dot} />
              {index !== data.length - 1 ? <View style={$line} /> : null}
            </View>

            <View style={[$spaceBetween, $styles.flex1, { paddingBottom: spacing.md }]}>
              <View>
                <Text
                  size="xxs"
                  weight="semiBold"
                  text="Waiting Approval"
                  color={colors.palette.blue}
                />
                <Text
                  size="xxs"
                  weight="medium"
                  text="July 04, 2022"
                  color={colors.palette.neutral450}
                />
              </View>

              <View style={$approverContainer}>
                <Image source={{ uri: "https://i.pravatar.cc/300" }} style={$avatar} />
                <Text size="xxs" weight="semiBold" text="Pak RT" />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const $directionRow: ViewStyle = {
  display: "flex",
  flexDirection: "row",
}

const $spaceBetween: ViewStyle = {
  ...$directionRow,
  justifyContent: "space-between",
}

const $container: ViewStyle = {
  ...$directionRow,
  flex: 1,
}

const $dot: ViewStyle = {
  width: 6,
  height: 6,
  borderRadius: 100,
  marginTop: spacing.xs,
  backgroundColor: colors.palette.neutral480,
}

const $line: ViewStyle = {
  width: 2,
  height: "100%",
  backgroundColor: colors.palette.neutral450,
}

const $lineContainer: ViewStyle = {
  alignItems: "center",
  marginRight: spacing.xs,
}

const $approverContainer: ViewStyle = {
  ...$directionRow,
  borderRadius: 6,
  padding: spacing.xxs,
  alignItems: "center",
  paddingHorizontal: spacing.xs,
  backgroundColor: colors.palette.neutral150,
}

const $avatar: ImageStyle = {
  width: 24,
  height: 24,
  borderRadius: 100,
  marginRight: spacing.xs,
}

export { Timeline }
