import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useAppSelector } from '@/redux/store';
import { getColor } from '@/helpers/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const totalItems = useAppSelector(x => x.shoppingCart.items.length)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
        //tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/*<Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />*/}
      <Tabs.Screen
        name="shopping-cart"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name="cart" size={28} color={color} />
              {
                totalItems > 0 && (
                  <View style={{ 
                      position: 'absolute',
                      right: -6,
                      top: -3,
                      backgroundColor: getColor('red'),
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold', fontFamily: 'Barlow' }}>{ totalItems }</Text>
                  </View>
                )
              }
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Entypo name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
