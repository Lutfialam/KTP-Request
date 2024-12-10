import { initI18n } from "@/i18n"
import { Suspense, useEffect, useState } from "react"
import { customFontsToLoad } from "@/theme"
import { Slot, SplashScreen } from "expo-router"
import { useFonts } from "@expo-google-fonts/poppins"
import { loadDateFnsLocale } from "@/utils/formatDate"
import { useThemeProvider } from "@/utils/useAppTheme"
import { KeyboardProvider } from "react-native-keyboard-controller"

SplashScreen.preventAutoHideAsync()

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  const { themeScheme, setThemeContextOverride, ThemeProvider } = useThemeProvider()

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  const loaded = fontsLoaded && isI18nInitialized

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <KeyboardProvider>
        <Suspense fallback="...">
          <Slot />
        </Suspense>
      </KeyboardProvider>
    </ThemeProvider>
  )
}
