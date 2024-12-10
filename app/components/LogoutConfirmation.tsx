import AntDesign from "@expo/vector-icons/AntDesign"

import { Text } from "./Text"
import { Button } from "./Button"
import { $styles, colors, spacing } from "@/theme"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"
import { ImageStyle, Modal, TouchableOpacity, View, ViewStyle } from "react-native"

interface LogoutConfirmationProps {
  onClose?: (shouldOpen: boolean) => void
  onContinue?: () => void
  isVisible: boolean
}

export default function LogoutConfirmation(props: LogoutConfirmationProps) {
  const { onClose, isVisible, onContinue } = props
  const bottomInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={$modalContainer}>
        <TouchableOpacity
          style={$overlay}
          onPress={() => {
            onClose?.(false)
          }}
        />

        <View style={$contentOverlay}>
          <View style={[$container, bottomInsets]}>
            <View style={$spaceBetween}>
              <Text size="lg" weight="semiBold" text="Are you sure to logout?" />
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={$closeIcon}
                onPress={() => {
                  onClose?.(false)
                }}
              />
            </View>

            <Text text="Tenang kamu dapat login kembali setelah melakukan logout ini" />

            <View style={[$directionRow, $styles.gap(spacing.md)]}>
              <Button
                text="Cancel"
                style={$button}
                backgroundColor={colors.palette.neutral800}
                onPress={() => {
                  onClose?.(false)
                }}
              />
              <Button
                text="Logout"
                style={$button}
                onPress={onContinue}
                backgroundColor={colors.palette.angry500}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
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

const $container: ViewStyle = {
  gap: spacing.lg,
  padding: spacing.md,
  justifyContent: "center",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  paddingBottom: spacing.xl,
  backgroundColor: colors.palette.neutral100,
}

const $closeIcon: ImageStyle = {
  alignSelf: "flex-end",
}

const $modalContainer: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
}

const $overlay: ViewStyle = {
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.3)",
}
const $contentOverlay: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.3)",
}

const $button: ViewStyle = {
  flex: 1,
  borderRadius: 100,
}

export { LogoutConfirmation }
