// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"

import {
  Poppins_100Thin as Poppins100Thin,
  Poppins_100Thin_Italic as Poppins100ThinItalic,
  Poppins_200ExtraLight as Poppins200ExtraLight,
  Poppins_200ExtraLight_Italic as Poppins200ExtraLightItalic,
  Poppins_300Light as Poppins300Light,
  Poppins_300Light_Italic as Poppins300LightItalic,
  Poppins_400Regular as Poppins400Regular,
  Poppins_400Regular_Italic as Poppins400RegularItalic,
  Poppins_500Medium as Poppins500Medium,
  Poppins_500Medium_Italic as Poppins500MediumItalic,
  Poppins_600SemiBold as Poppins600SemiBold,
  Poppins_600SemiBold_Italic as Poppins600SemiBoldItalic,
  Poppins_700Bold as Poppins700Bold,
  Poppins_700Bold_Italic as Poppins700BoldItalic,
  Poppins_800ExtraBold as Poppins800ExtraBold,
  Poppins_800ExtraBold_Italic as Poppins800ExtraBoldItalic,
  Poppins_900Black as Poppins900Black,
  Poppins_900Black_Italic as Poppins900BlackItalic,
} from "@expo-google-fonts/poppins"

export const customFontsToLoad = {
  Poppins100Thin,
  Poppins100ThinItalic,
  Poppins200ExtraLight,
  Poppins200ExtraLightItalic,
  Poppins300Light,
  Poppins300LightItalic,
  Poppins400Regular,
  Poppins400RegularItalic,
  Poppins500Medium,
  Poppins500MediumItalic,
  Poppins600SemiBold,
  Poppins600SemiBoldItalic,
  Poppins700Bold,
  Poppins700BoldItalic,
  Poppins800ExtraBold,
  Poppins800ExtraBoldItalic,
  Poppins900Black,
  Poppins900BlackItalic,
}

const fonts = {
  poppins: {
    // Cross-platform Google font.
    extraLarge: "Poppins200ExtraLight",
    light: "Poppins300Light",
    normal: "Poppins400Regular",
    medium: "Poppins500Medium",
    semiBold: "Poppins600SemiBold",
    bold: "Poppins700Bold",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.poppins,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
