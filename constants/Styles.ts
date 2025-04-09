import { StyleSheet } from "react-native"

export const spacingSize = 10
export const primaryColor = '#5DCA84'

export const AppStyle = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacingSize,
    },
    stepContainer: {
        gap: spacingSize,
        marginBottom: spacingSize,
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: spacingSize,
    },
    box: {
        borderWidth: 1,
        borderColor: primaryColor,
        padding: spacingSize * 2,
        borderRadius: spacingSize * 2,
    },
    flatList: {
        gap: spacingSize,
        padding: spacingSize,
        height: '100%',
    },
    shadow: {
        shadowColor: "#82A3CA",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9,
        shadowRadius: 5,

        // Sombras en Android
        elevation: 10,
    },
})