import React, { Children, PropsWithChildren, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { ThemedText } from "./ThemedText";
import IconTypedComponent from "./ui/IconTyped";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { spacingSize } from "@/constants/Styles";
import Modal from "react-native-modal"

const { height } = Dimensions.get('window')

type DropdownProps = {
    header?: React.ReactNode | React.ReactElement,
    title?: string,
    children?: React.ReactNode[] | React.ReactElement[]
}

const Dropdown: React.FC<DropdownProps> = ({ header, title, children }) => {
    const theme = useColorScheme()
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)

    return (
        <View style={{ position: 'relative', zIndex: 9999 }}>
            <TouchableOpacity
                style={[
                    { display: 'flex', flexDirection: 'row', alignItems: 'center' },
                    !header && { borderColor: Colors[theme ?? 'light'].borderColor, borderWidth: 1, padding: spacingSize, borderRadius: spacingSize }
                ]}
                onPress={() => setIsOpen(!isOpen)}
            >
                { 
                    header ? header : <ThemedText>{ title }</ThemedText>  
                }
                <IconTypedComponent 
                    type="Entypo"
                    name={ isOpen ? "chevron-small-up" : "chevron-small-down" }
                    color="default"
                    size={22}
                />
            </TouchableOpacity>
            <Modal
                isVisible={isOpen}
                onDismiss={onClose}
                onBackdropPress={onClose}
                swipeDirection={"down"}
                propagateSwipe
                onSwipeComplete={onClose}
                style={{ margin: 0 }}
            >
                <View 
                    style={[
                        Styles.modalContainer,
                        Styles.borderRadius,
                        { backgroundColor: Colors[theme ?? 'light'].background },
                        { borderColor: Colors[theme ?? 'light'].borderColor },
                    ]}
                >
                    <ScrollView style={Styles.borderRadius}>
                        { children }
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

const Styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        maxHeight: height * 0.8,
        borderWidth: 1
    },
    borderRadius: {
        borderTopLeftRadius: spacingSize * 2,
        borderTopRightRadius: spacingSize * 2
    }
})

export default Dropdown;