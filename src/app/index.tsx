import { Redirect, router } from "expo-router"
import { useAuthenticationStore } from "@/store"
import { $styles, colors, spacing } from "@/theme"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "@/components"
import { storage } from "@/utils/storage"

export default function WelcomeScreen() {
  const auth = useAuthenticationStore()

  async function onLoginPress() {
    if (await auth.login()) {
      router.replace("/home")
    }
  }

  if ((storage.getString("accessToken")?.length ?? 0) > 0) {
    return <Redirect href="/home" />
  }

  return (
    <Screen
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$screenContainer}
      backgroundColor={colors.palette.neutral100}
    >
      <Text size="xl" weight="semiBold" color={colors.palette.neutral450} text="SIGN IN " />
      <Text size="xl" weight="semiBold" color={colors.palette.neutral450} text="TO CONTINUE" />
      <Text
        size="xs"
        weight="medium"
        style={$signinText}
        color={colors.palette.neutral450}
        text="Sign in before continue to the app"
      />

      <View style={$styles.gap(spacing.sm)}>
        <TextField
          name="email"
          value={auth.email}
          placeholder="Email"
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
      </View>

      {auth.errorMessage.length > 0 ? (
        <Text size="xxs" color={colors.palette.angry500} text={auth.errorMessage} />
      ) : null}

      <Text
        size="xxs"
        align="right"
        weight="medium"
        style={$forgotPassword}
        text="Forgot your password?"
      />
      <Button
        text="SIGN IN"
        style={$submitButton}
        onPress={onLoginPress}
        disabled={auth.email.length <= 0 || auth.password.length <= 0}
      />

      <Text weight="medium" align="center" text="don't have an account? " />
      <Text
        align="center"
        weight="medium"
        text="sign up now"
        decoration="underline"
        color={colors.palette.blue}
        onPress={() => {
          router.navigate("/authentication/register")
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

const $forgotPassword: TextStyle = {
  textDecorationLine: "underline",
  marginVertical: spacing.md,
}
