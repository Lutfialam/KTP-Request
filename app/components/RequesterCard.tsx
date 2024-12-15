import { Text } from "./Text"
import { colors, spacing } from "@/theme"
import { ApprovalData } from "@/store/types"
import { TouchableOpacity, View, ViewStyle } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { maskedStatus } from "@/store"

interface RequesterCardProps {
  item: ApprovalData
  onPress?: () => void
  containerStyle?: ViewStyle
}

export default function RequesterCard({ item, onPress, containerStyle }: RequesterCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[$historyCard, containerStyle]}>
      <View>
        <Text weight="bold" text={item?.namaWarga} />
        <Text size="xs" text={item?.tglPengajuan} color={colors.palette.neutral450} />
        <Text size="xs" text={item?.alamatWarga} color={colors.palette.neutral450} />

        <View style={$approvalStatus}>
          <Ionicons name="timer-sharp" size={24} color={colors.palette.blue} />
          <Text size="xs" weight="medium" text={maskedStatus[item?.status]} />
        </View>
      </View>

      <FontAwesome name="user" size={52} color={colors.palette.neutral450} />
    </TouchableOpacity>
  )
}

const $directionRow: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}

const $spaceBetween: ViewStyle = {
  ...$directionRow,
  justifyContent: "space-between",
}

const $approvalStatus: ViewStyle = {
  ...$directionRow,
  gap: spacing.xs,
  marginTop: spacing.md,
}

const $historyCard: ViewStyle = {
  ...$spaceBetween,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  borderRadius: 12,
  padding: spacing.md,
  marginTop: spacing.md,
  backgroundColor: colors.palette.neutral100,
}

export { RequesterCard }
