import EntypoGlyphs from 'react-native-vector-icons/glyphmaps/Entypo.json';
import IoniconsGlyphs from 'react-native-vector-icons/glyphmaps/Ionicons.json';
import MaterialIconsGlyphs from 'react-native-vector-icons/glyphmaps/MaterialIcons.json';
import OcticonsGlyphs from 'react-native-vector-icons/glyphmaps/Octicons.json';
import AntDesignGlyphs from 'react-native-vector-icons/glyphmaps/AntDesign.json';
import FeatherGlyphs from 'react-native-vector-icons/glyphmaps/Feather.json';
import FoundationGlyphs from 'react-native-vector-icons/glyphmaps/Foundation.json';

import { AntDesign, Entypo, Feather, Foundation, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import React, { ComponentType } from "react";
import { ColorTheme } from '@/types/Theme';
import { getColor, isColorTheme } from '@/helpers/colors';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type IconSet = 'Entypo' | 'Ionicons' | 'MaterialIcons' | 'Octicons' | 'AntDesign' | 'Feather' | 'Foundation';

export type IconNamesMap = {
    Entypo: keyof typeof EntypoGlyphs;
    Ionicons: keyof typeof IoniconsGlyphs;
    MaterialIcons: keyof typeof MaterialIconsGlyphs;
    Octicons: keyof typeof OcticonsGlyphs;
    AntDesign: keyof typeof AntDesignGlyphs;
    Feather: keyof typeof FeatherGlyphs;
    Foundation: keyof typeof FoundationGlyphs;
}

export const IconTypesMap = {
    Entypo,
    Ionicons,
    MaterialIcons,
    Octicons,
    AntDesign,
    Feather,
    Foundation,
}

export interface TypedIconProps<T extends IconSet> {
    type: T;
    name: IconNamesMap[T];
    size?: number;
    color?: ColorTheme | string;
}

export type IconProps<T extends keyof IconNamesMap> = {
    iconProps: TypedIconProps<T>;
}

export const IconTypedComponent = <T extends keyof typeof IconTypesMap>(props: TypedIconProps<T>) => {
    const { type, name, size = 18, color = 'white' } = props;
    const theme = useColorScheme()

    const IconComponent = IconTypesMap[type] as ComponentType<any>;
    const resolvedColor = isColorTheme(color) ? getColor(color as ColorTheme) : (color === 'default' ? Colors[theme ?? 'light'].text : color);
    return <IconComponent name={name} size={size} color={resolvedColor} />;
}

export default IconTypedComponent
