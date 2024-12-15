import Loader from "@/components/Loader"

import { useState } from "react"
import { router } from "expo-router"
import { useAuthenticationStore } from "@/store"
import { $styles, colors, spacing } from "@/theme"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "@/components"

export default function Register() {
  const auth = useAuthenticationStore()
  const [isLoading, setIsLoading] = useState(false)

  async function register() {
    setIsLoading(true)
    const isSuccess = await auth.register()
    setIsLoading(false)

    if (isSuccess) {
      router.replace("/")
    }
  }

  function shouldSubmitButtonEnabled() {
    const requiredField: (keyof typeof auth)[] = ["name", "email", "password", "repeatedPassword"]
    return requiredField.every((item) => (auth[item] as string)?.length > 0)
  }

  if (isLoading) return <Loader />

  return (
    <Screen
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContainer}
      backgroundColor={colors.palette.neutral100}
    >
      <Text size="xl" weight="semiBold" color={colors.palette.neutral450} text="SIGN UP " />
      <Text size="xl" weight="semiBold" color={colors.palette.neutral450} text="TO CONTINUE" />
      <Text
        size="xs"
        weight="medium"
        style={$signinText}
        color={colors.palette.neutral450}
        text="Sign up before continue to the app"
      />

      <View style={$styles.gap(spacing.sm)}>
        <TextField
          name="name"
          value={auth.name}
          placeholder="Name"
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
          status={auth.errorMessage?.length > 0 ? "error" : undefined}
        />
        <TextField
          name="email"
          value={auth.email}
          placeholder="Email"
          keyboardType="email-address"
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
          status={auth.errorMessage?.length > 0 ? "error" : undefined}
        />
        <TextField
          name="password"
          value={auth.password}
          placeholder="Password"
          secureTextEntry={true}
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
          status={auth.errorMessage?.length > 0 ? "error" : undefined}
        />
        <TextField
          secureTextEntry
          name="repeatedPassword"
          value={auth.repeatedPassword}
          placeholder="Repeat Password"
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
          status={auth.errorMessage?.length > 0 ? "error" : undefined}
        />
      </View>

      {auth.errorMessage.length > 0 ? (
        <Text size="xxs" color={colors.palette.angry500} text={auth.errorMessage} />
      ) : null}

      <Button
        text="SIGN UP"
        onPress={register}
        style={$submitButton}
        disabled={!shouldSubmitButtonEnabled()}
      />

      <Text weight="medium" align="center" text="have an account? " />
      <Text
        align="center"
        weight="medium"
        text="sign in now"
        decoration="underline"
        color={colors.palette.blue}
        onPress={() => {
          auth.handleState("errorMessage", "")
          router.replace("/")
        }}
      />
    </Screen>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
  padding: spacing.md,
  justifyContent: "center",
}

const $signinText: TextStyle = {
  marginBottom: spacing.lg,
}

const $submitButton: ViewStyle = {
  alignSelf: "center",
  borderRadius: 100,
  paddingHorizontal: 60,
  marginTop: spacing.lg,
  marginBottom: spacing.xl,
}
