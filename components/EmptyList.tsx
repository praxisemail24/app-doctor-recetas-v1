import { spacingSize } from '@/constants/Styles';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

const EmptyList = () => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    React.useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withSpring(0, { damping: 8 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={[animatedStyle, { alignItems: 'center', justifyContent: 'center', flex: 1 }]}>
            <LottieView 
                source={require('@/assets/animations/empty.json')}
                autoPlay
                loop
                style={{ height: 250, width: 500 }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#666' }}>¡Tu lista está vacía!</Text>
            <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>Agrega elementos para comenzar</Text>
        </Animated.View>
    );
};

export default EmptyList;