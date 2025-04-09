import React from "react"
import { Image, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import type { Category } from '@/types/Category';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import GradientButton from '@/components/ui/GradientButton';
import { useCallback, useEffect, useState } from 'react';
import { http } from '@/helpers/http';
import BoxButton from '@/components/ui/BoxButton';
import { AppStyle, spacingSize } from '@/constants/Styles';
import { FontAwesome6, Fontisto, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import ModalProducts from '@/components/ModalProducts';
import IconTypedComponent from "@/components/ui/IconTyped";

const { width } = Dimensions.get('window')

const items = [
  { id: 0, name: 'Certificado médico', icon: <IconTypedComponent type="Foundation" name="telephone" size={24} color="default" /> },
  { id: 1, name: 'Refill de recetas', icon: <MaterialCommunityIcons name="virus-outline" size={24} /> },
  { id: 2, name: 'Prueba de COVID-19 | Influenza/Microplasma', icon: <IconTypedComponent type="Foundation" name="telephone" size={24} color="default" />},
  { id: 3, name: 'Prueba de COVID-19 Antígeno', icon: <Foundation name="telephone" size={24} /> },
  { id: 4, name: 'Consulta médica', icon: <Fontisto name="doctor" size={24} /> },
  { id: 5, name: 'STD Panel', icon: <Fontisto name="test-tube" size={24} /> },
  { id: 6, name: 'Análisis de sangre', icon: <Fontisto name="blood-test" size={24} /> },
  { id: 7, name: 'Prueba de influenza AyB', icon: <MaterialCommunityIcons name="ab-testing" size={24} /> },
  { id: 8, name: 'Prueba COVID-19 PCR', icon: <FontAwesome6 name="virus-covid" size={24} /> },
]

type ModalCategory = {
  category?: Category,
  show: boolean,
}

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [mCategory, setMCategory] = useState<ModalCategory>({ show: false, })

  const getCategories = useCallback(() => {
    setRefreshing(true)
    http.get(`/api/lista_categorias.php`).then((r)=> {
      if(Array.isArray(r.data)) {
        setCategories(r.data)
      }
    }).finally(() => setRefreshing(false))
  }, [])

  const onPressCategory = (category: Category) => setMCategory({ show: true, category })

  useEffect(() => {
    getCategories()
  }, [getCategories])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F5FEF9', dark: '#9DC0A1' }}
      headerImage={
        <>
          <Image
            source={require('@/assets/images/bg/home.png')}
            style={styles.reactLogo}
          />
          <View style={[AppStyle.flexCenter, { position: 'absolute', width: '100%', height: '100%', backgroundColor: "rgba(0, 0, 0, 0.2)", }]}>
            <Image 
              source={require('@/assets/images/logodr.png')}
              style={{ height: 65, width: 260 }}
            />
          </View>
        </>
      }>
      <ThemedView style={[AppStyle.titleContainer, { justifyContent: 'center', marginBottom: 20 }]}>
        <ThemedText type="title">Categorias</ThemedText>
      </ThemedView>
      <ThemedView style={AppStyle.stepContainer}>
        <FlatList 
          data={categories}
          keyExtractor={(c) => `${c.Id}`}
          scrollEnabled={false}
          numColumns={3}
          refreshing={refreshing}
          onRefresh={() => getCategories()}
          renderItem={({ item }) => {
            return (
              <GradientButton
                key={item.Id}
                color="#5DCA84" label={item.Nombre}
                style={{ width: (width - 44) / 3, marginBottom: 20 }}
                onPress={() => onPressCategory(item)}
              >
                <Image
                  source={{ uri: item.Icono }}
                  style={{ width: 55, height: 55, alignItems: 'center', objectFit: 'scale-down' }}
                />
              </GradientButton>
            )
          }}
        />
      </ThemedView>
      <ThemedView style={[AppStyle.titleContainer, { justifyContent: 'center' }]}>
        <ThemedText type="title">¿Qué necesitas hoy?</ThemedText>
      </ThemedView>
      <ThemedView style={AppStyle.stepContainer}>
        <FlatList
          data={items}
          keyExtractor={(item) => `${item.id}`}
          horizontal={true}
          contentContainerStyle={{ paddingTop: spacingSize, paddingBottom: spacingSize, gap: spacingSize, }}
          renderItem={({ item }) => {
            return (
              <BoxButton
                style={{ width: 300, alignItems: 'center', justifyContent: 'center' }} 
              >
                <View style={{ display: 'flex', flexDirection: 'row', gap: spacingSize, alignItems: 'center'  }}>
                  { item.icon && item.icon }
                  <ThemedText style={{maxWidth: 210}}>{ item.name }</ThemedText>
                </View>
              </BoxButton>
            )
          }}
        />
      </ThemedView>
      <ModalProducts
        isActive={mCategory.show}
        category={mCategory.category}
        onDismiss={() => setMCategory({ show: false })} 
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    objectFit: 'cover',
    height: 260,
    width,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
