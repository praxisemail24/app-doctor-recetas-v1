import LottieView from "lottie-react-native"
import React from "react"

export interface LoadingProps {
    size?: number,
}

const Loading: React.FC<LoadingProps> = ({ size = 20 }) => {
    return (
        <LottieView
            source={require('@/assets/animations/loading.json')}
            style={{ width: size + (size * 0.1), height: size }}
            speed={1.8}
            autoPlay
        />
    )
}

export default Loading