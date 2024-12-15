import { Text } from "./Text"
import { View, ViewStyle } from "react-native"
import { GetIDCardResponse } from "@/services/api"
import { $styles, colors, spacing } from "@/theme"

interface IDCardProps {
  item: GetIDCardResponse
  containerStyle?: ViewStyle
}

export default function IDCard({ item, containerStyle }: IDCardProps) {
  return (
    <View style={[$historyCard, containerStyle]}>
      <View style={[$directionRow, $styles.gap(spacing.xs)]}>
        <View>
          <Text size="xs" text="NIK" />
          <Text size="xs" text="Nama" />
          <Text size="xs" text="Tanggal Lahir" />
          <Text size="xs" text="Jenis Kelamin" />
          <Text size="xs" text="Alamat" />
          <Text size="xs" text="Status Perkawinan" />
          <Text size="xs" text="Berlaku Hingga" />
        </View>
        <View>
          <Text size="xs" text={` : ${item.nik ?? "-"}`} />
          <Text size="xs" text={` : ${item.namaLengkap ?? "-"}`} />
          <Text size="xs" text={` : ${item.tanggalLahir ?? "-"}`} />
          <Text size="xs" text={` : ${item.jenisKelamin ?? "-"}`} />
          <Text size="xs" text={` : ${item.alamat ?? "-"}`} />
          <Text size="xs" text={` : ${item.statusPerkawinan ?? "-"}`} />
          <Text size="xs" text={` : Seumur Hidup`} />
        </View>
      </View>
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

export { IDCard }
