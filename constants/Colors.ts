/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { shadeColor } from "@/helpers/colors";

const tintColorLight = '#5DCA84';
const tintColorDark = '#fff';
const successColor = '#6EA944';
const dangerColor = '#C42B1C';

export const Colors = {
  light: {
    text: '#1D3A62',
    textLabel: '#9FC0A3',
    background: '#fff',
    backgroundTheme: '#F5FEF9',
    tint: tintColorLight,
    icon: '#50A276',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    shadowColor: '#C8C9CA',
    primaryColor: '#50A276',
    borderColor: '#DADBDB',
    successColor,
    dangerColor,
  },
  dark: {
    text: '#ECEDEE',
    textLabel: '#82A3CA',
    background: '#151718',
    backgroundTheme: '#10261E',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    shadowColor: '#ECECEC',
    primaryColor: '#5DCA84',
    borderColor: '#29363B',
    successColor: shadeColor(successColor, 10),
    dangerColor: shadeColor(dangerColor, 10),
  },
};
