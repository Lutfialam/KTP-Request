import { isRTL } from "@/i18n"
import { spacing } from "@/theme"
import { FlashList, FlashListProps } from "@shopify/flash-list"
import { Dimensions, FlatList, View, ViewStyle } from "react-native"
import { ForwardedRef, forwardRef, PropsWithoutRef, ReactElement, RefObject } from "react"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"

export type ListViewRef<T> = FlashList<T> | FlatList<T>

export type ListViewProps<T> = PropsWithoutRef<FlashListProps<T>> & {
  isLoading?: boolean
  skeletonCount?: number
  skeletonHeight?: number
}

/**
 * This is a Higher Order Component meant to ease the pain of using @shopify/flash-list
 * when there is a chance that a user would have their device language set to an
 * RTL language like Arabic or Persian. This component will use react-native's
 * FlatList if the user's language is RTL or FlashList if the user's language is LTR.
 *
 * Because FlashList's props are a superset of FlatList's, you must pass estimatedItemSize
 * to this component if you want to use it.
 *
 * This is a temporary workaround until the FlashList component supports RTL at
 * which point this component can be removed and we will default to using FlashList everywhere.
 * @see {@link https://github.com/Shopify/flash-list/issues/544|RTL Bug Android}
 * @see {@link https://github.com/Shopify/flash-list/issues/840|Flashlist Not Support RTL}
 * @param {FlashListProps | FlatListProps} props - The props for the `ListView` component.
 * @param {RefObject<ListViewRef>} forwardRef - An optional forwarded ref.
 * @returns {JSX.Element} The rendered `ListView` component.
 */
const ListViewComponent = forwardRef(
  <T,>(props: ListViewProps<T>, ref: ForwardedRef<ListViewRef<T>>) => {
    const ListComponentWrapper = isRTL ? FlatList : FlashList

    if (props.isLoading) {
      return Array.from(new Array(props.skeletonCount ?? 1)).map((_, key) => (
        <View key={key} style={$container}>
          <SkeletonPlaceholder key={key} borderRadius={12}>
            <SkeletonPlaceholder.Item
              marginTop={spacing.md}
              height={props.skeletonHeight ?? 120}
              width={Dimensions.get("window").width}
            />
          </SkeletonPlaceholder>
        </View>
      ))
    }
    return <ListComponentWrapper {...props} ref={ref} />
  },
)

ListViewComponent.displayName = "ListView"

export const ListView = ListViewComponent as <T>(
  props: ListViewProps<T> & {
    ref?: RefObject<ListViewRef<T>>
  },
) => ReactElement

const $container: ViewStyle = {
  paddingHorizontal: spacing.md,
}
