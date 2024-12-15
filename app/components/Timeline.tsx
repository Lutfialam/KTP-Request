import { Text } from "./Text"
import { ListView } from "./ListView"
import { $styles, colors, spacing } from "@/theme"
import { ApprovalTrackerData } from "@/services/api"
import { Image, ImageStyle, View, ViewStyle } from "react-native"
import { maskedStatus } from "@/store"
import { format } from "date-fns"

export interface TimelineProps {
  data: ApprovalTrackerData[]
}

export default function Timeline({ data }: TimelineProps) {
  return (
    <View style={$styles.flex1}>
      <ListView
        data={data}
        estimatedItemSize={120}
        renderItem={({ item, index }) => (
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
                  color={colors.palette.blue}
                  text={maskedStatus[item.status]}
                />
                <Text
                  size="xxs"
                  weight="medium"
                  text={format(
                    new Date(`${item.updatedAt.split(" ")[0]} ${item.updatedAt.split(" ")[1]}`),
                    "dd MMMM yyyy - hh:mm",
                  )}
                  color={colors.palette.neutral450}
                />
              </View>

              <View style={$approverContainer}>
                <Image source={{ uri: "https://i.pravatar.cc/300" }} style={$avatar} />
                <Text size="xxs" weight="semiBold" text={item.picName} />
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
