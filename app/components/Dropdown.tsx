import { useRef, useState } from "react"
import AntDesign from "@expo/vector-icons/AntDesign"

import { TxKeyPath } from "@/i18n"
import { Text } from "@/components"
import { colors, spacing } from "@/theme"

import {
  View,
  Modal,
  Pressable,
  ViewStyle,
  Dimensions,
  ImageStyle,
  TouchableOpacity,
} from "react-native"

type Alignment = "center" | "left" | "right"
export type DropdownData = { label: string; value: string }

interface DropdownProps {
  isRequired?: boolean
  data: DropdownData[]
  selected?: DropdownData
  onSelect: (selected: DropdownData) => void
  position?: Alignment
  label?: string
  labelTx?: TxKeyPath
  placeholderTx?: TxKeyPath
  placeholder?: string
}

interface DropdownPicker extends Partial<DropdownProps> {
  toggleModal: () => void
  dropdownRef?: React.RefObject<View>
}

interface Position {
  x?: number
  y?: number
  w?: number
  h?: number
  px?: number
  py?: number
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  const { data, position = "left", onSelect, ...rest } = props

  const defaultPosition = { x: 0, y: 0, w: 0, h: 0, px: 0, py: 0 }
  const dropdownRef = useRef<View>(null)

  const [visible, setVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState<Position>(defaultPosition)

  const toggleModal = () => {
    if (dropdownRef.current) {
      dropdownRef?.current?.measure((x, y, w, h, px, py) => {
        setModalPosition({ x, y, w, h, px, py })
      })
    }
    setVisible((isVisibled) => !isVisibled)
  }

  return (
    <View>
      <Picker dropdownRef={dropdownRef} toggleModal={toggleModal} {...rest} />

      <Modal transparent visible={visible}>
        <TouchableOpacity style={$overlay} onPress={toggleModal}>
          <View style={$content(modalPosition, position)}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={$dropdownItem}
                onPress={() => {
                  onSelect(item)
                  toggleModal()
                }}
              >
                <Text
                  size="xs"
                  weight="medium"
                  text={item.label}
                  color={colors.palette.neutral480}
                />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
const Picker: React.FC<DropdownPicker> = ({
  label,
  labelTx,
  selected,
  isRequired,
  toggleModal,
  dropdownRef,
  placeholder,
  placeholderTx,
}) => {
  return (
    <View style={$pickerContainer}>
      {label || labelTx ? (
        <Text>
          <Text
            size="sm"
            tx={labelTx}
            text={label}
            weight="medium"
            color={colors.palette.neutral480}
          />
          {isRequired ? (
            <Text weight="medium" size="xxs" text="*" color={colors.palette.angry500} />
          ) : null}
        </Text>
      ) : null}

      <Pressable ref={dropdownRef} onPress={toggleModal} style={$textInputWrapper}>
        {selected?.label ? (
          <Text text={selected.label} size="sm" color={colors.palette.neutral800} />
        ) : (
          <Text tx={placeholderTx} text={placeholder} size="sm" color={colors.palette.neutral480} />
        )}

        <AntDesign size={20} name="down" style={$downIcon} color={colors.palette.neutral300} />
      </Pressable>
    </View>
  )
}

const $overlay: ViewStyle = {
  width: "100%",
  height: "100%",
}

const $content: (position: Position, x: Alignment) => ViewStyle = (
  position: Position,
  x: Alignment,
) => ({
  position: "absolute",
  backgroundColor: colors.palette.neutral100,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,

  zIndex: 40,
  padding: 10,
  borderRadius: 10,

  [x]: Dimensions.get("window").width - (position.px as number) - (position.w as number),
  top: (position.h as number) + (position.py as number) + spacing.xxs,
  left: position.px,
  width: position.w,
})

const $dropdownItem: ViewStyle = {
  margin: spacing.xs,
  marginVertical: spacing.sm,
}

const $textInputWrapper: ViewStyle = {
  height: 43,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: colors.palette.neutral400,
  paddingHorizontal: spacing.sm,
  borderRadius: 5,
}

const $downIcon: ImageStyle = {
  paddingLeft: spacing.sm,
}

const $pickerContainer: ViewStyle = {
  gap: spacing.xxs,
}
