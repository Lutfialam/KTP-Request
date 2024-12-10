import { router } from "expo-router"
import { useAuthenticationStore } from "@/store"
import { $styles, colors, spacing } from "@/theme"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button, Screen, Text, TextField } from "@/components"

export default function Register() {
  const auth = useAuthenticationStore()

  async function register() {
    if (await auth.register()) {
      router.replace("/")
    }
  }

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
        />
        <TextField
          name="email"
          value={auth.email}
          placeholder="Email"
          keyboardType="email-address"
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
        />
        <TextField
          name="password"
          value={auth.password}
          placeholder="Password"
          keyboardType="visible-password"
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
        />
        <TextField
          name="repeatedPassword"
          value={auth.repeatedPassword}
          placeholder="Repeat Password"
          keyboardType="visible-password"
          onTextChange={auth.handleState}
          placeholderTextColor={colors.palette.placeholder}
        />
      </View>

      <Button text="SIGN UP" style={$submitButton} onPress={register} />

      <Text weight="medium" align="center" text="have an account? " />
      <Text
        align="center"
        weight="medium"
        text="sign in now"
        decoration="underline"
        color={colors.palette.blue}
        onPress={() => {
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
