import { Colors } from "@/constants/Colors"
import { spacingSize } from "@/constants/Styles"
import React, { PropsWithChildren } from "react"
import { useColorScheme } from "@/hooks/useColorScheme"
import { ScrollView, View } from "react-native"

type ContainerViewProps = PropsWithChildren<{
    center?: boolean,
    stickyHeaderComponent?: React.ReactNode | React.ReactElement,
    stickyFooterComponent?: React.ReactNode | React.ReactElement,
    backgroundColor?: string,
}>

const ContainerView: React.FC<ContainerViewProps> = ({ children, center, backgroundColor, stickyHeaderComponent, stickyFooterComponent }) => {
    const theme = useColorScheme()

    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor ?? Colors[theme ?? 'light'].backgroundTheme }}>
            <ScrollView
                stickyHeaderIndices={[0]}
            >
                { stickyHeaderComponent && stickyHeaderComponent }
                <View 
                    style={[
                        {
                            flex: 1,
                            overflow: 'hidden',
                            gap: 16,
                            padding: spacingSize * 2,
                            paddingBottom: 100,
                            backgroundColor: 'transparent',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }, 
                        center && { alignItems: 'center', justifyContent: 'center' }
                    ]}
                >{children}</View>
                
            </ScrollView>
            { stickyFooterComponent && stickyFooterComponent }
        </View>
    )
}

export default ContainerView