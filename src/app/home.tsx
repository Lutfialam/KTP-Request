import { Image } from "expo-image"
import { router } from "expo-router"
import { storage } from "@/utils/storage"
import { useApprovalStore, useAuthenticationStore } from "@/store"
import { useEffect, useState } from "react"
import { $styles, colors, spacing } from "@/theme"
import { ListView, Screen, Text, TextField } from "@/components"
import { Dimensions, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import AntDesign from "@expo/vector-icons/AntDesign"
import RequesterCard from "@/components/RequesterCard"
import LogoutConfirmation from "@/components/LogoutConfirmation"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export default function Home() {
  const { role, name } = useAuthenticationStore()
  const { list, handleState, searchQuery, getCreatedIDData } = useApprovalStore()

  const [isLoading, setIsLoading] = useState(false)
  const [shouldConfirmationShow, setShouldConfirmationShow] = useState(false)

  const approvalList = list.filter((item) =>
    item.namaWarga.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await getCreatedIDData()
      setIsLoading(false)
    })()
  }, [])

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$styles.flex1}
      backgroundColor={colors.palette.neutral100}
    >
      <View style={[$spaceBetween, $container]}>
        {isLoading ? (
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item marginTop={spacing.lg} width={120} height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={260} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ) : (
          <>
            <View style={$header}>
              <Text
                size="lg"
                weight="bold"
                text={`Hello ${name ?? "user"}!`}
                color={colors.palette.neutral480}
              />
              <Text text="Welcome to ID Digitalization App" color={colors.palette.neutral450} />
            </View>

            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={colors.palette.angry500}
              onPress={() => {
                setShouldConfirmationShow(true)
              }}
            />
          </>
        )}
      </View>

      {role === "user" ? (
        <View style={[$banner, $container]}>
          {isLoading ? (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item width={Dimensions.get("window").width} height={120} />
            </SkeletonPlaceholder>
          ) : (
            <Image
              cachePolicy="memory-disk"
              style={$backgroundImage}
              source={{
                uri: "https://images.unsplash.com/photo-1587045930305-4875b26e8f25?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
            >
              <View style={$easyTextContainer}>
                <Text
                  size="xxs"
                  weight="bold"
                  color={colors.palette.neutral480}
                  text="Semudah Itu buat KTP!"
                />
                <Text
                  size="xxs"
                  weight="medium"
                  color={colors.palette.neutral480}
                  text="pendaftaran hanya dalam hitungan menit!"
                />
              </View>
            </Image>
          )}
        </View>
      ) : (
        <View style={$emptyBanner} />
      )}

      <View style={$container}>
        {isLoading ? (
          <SkeletonPlaceholder borderRadius={100}>
            <SkeletonPlaceholder.Item
              height={50}
              marginBottom={spacing.lg}
              width={Dimensions.get("window").width - spacing.xl}
            />
          </SkeletonPlaceholder>
        ) : (
          <TextField
            style={$input}
            name="searchQuery"
            onTextChange={handleState}
            inputWrapperStyle={$searchInput}
            placeholder="Cari berdasarkan nama"
            containerStyle={{ marginBottom: spacing.md }}
            placeholderTextColor={colors.palette.neutral450}
            LeftAccessory={() => (
              <AntDesign name="search1" size={20} color="black" style={$searchIcon} />
            )}
          />
        )}
      </View>

      {!isLoading && role === "user" ? (
        <View style={[$spaceBetween, $container]}>
          <Text text="Recent creation" />
          <Text
            weight="medium"
            text="Create New"
            style={$createText}
            onPress={() => {
              router.navigate("/form/family-number-verifier")
            }}
          />
        </View>
      ) : null}

      {!isLoading && role !== "user" ? (
        <View style={$container}>
          <Text text="Permohonan terbaru" />
        </View>
      ) : null}

      {isLoading ? (
        <View style={$container}>
          <SkeletonPlaceholder borderRadius={12}>
            <SkeletonPlaceholder.Item
              height={120}
              marginTop={spacing.md}
              width={Dimensions.get("window").width}
            />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder borderRadius={12}>
            <SkeletonPlaceholder.Item
              height={120}
              marginTop={spacing.md}
              width={Dimensions.get("window").width}
            />
          </SkeletonPlaceholder>

          <SkeletonPlaceholder borderRadius={12}>
            <SkeletonPlaceholder.Item
              height={120}
              marginTop={spacing.md}
              width={Dimensions.get("window").width}
            />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <ListView
          data={approvalList}
          estimatedItemSize={120}
          contentContainerStyle={$container}
          renderItem={({ item }) => (
            <RequesterCard
              item={item}
              onPress={() => {
                handleState("selectedList", item)
                router.navigate(`/approval/${item.id}`)
              }}
            />
          )}
        />
      )}

      <LogoutConfirmation
        isVisible={shouldConfirmationShow}
        onClose={setShouldConfirmationShow}
        onContinue={() => {
          storage.clearAll()
          router.replace("/")
        }}
      />
    </Screen>
  )
}

const $header: ViewStyle = {
  marginTop: spacing.md,
}

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
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

const $searchInput: ViewStyle = {
  borderRadius: 100,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  backgroundColor: colors.palette.neutral100,
}

const $searchIcon: ImageStyle = {
  alignSelf: "center",
  paddingLeft: spacing.xs,
}

const $input: TextStyle = {
  fontSize: 14,
  color: colors.palette.neutral450,
}

const $banner: ViewStyle = {
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  width: "100%",
  height: 140,
  overflow: "hidden",
  marginVertical: spacing.lg,
  backgroundColor: colors.palette.neutral100,
}

const $createText: TextStyle = {
  textDecorationLine: "underline",
}

const $backgroundImage: ImageStyle = {
  height: 140,
  borderRadius: 12,
  overflow: "hidden",
  justifyContent: "flex-end",
  width: Dimensions.get("window").width - spacing.xl,
}

const $easyTextContainer: ViewStyle = {
  margin: spacing.xs,
  padding: spacing.sm,
  borderRadius: spacing.sm,
  backgroundColor: "rgba(217,217,217,0.8)",
}

const $emptyBanner: ViewStyle = {
  marginTop: spacing.lg,
}
