import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import { DrawerContentScrollView, DrawerItemList,DrawerToggleButton } from '@react-navigation/drawer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

export default function CustomDrawerContent(props:any) {

    const {bottom} = useSafeAreaInsets();
    const navigation = useNavigation();

    const closeDrawer = ()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
    }
  return (
    <View
        style={{
          flex: 1,
          backgroundColor: Colors.backgroundColor,
        }}
    >
      <DrawerContentScrollView {...props} scrollEnabled={true}>
        <View style={{padding: 40,height: 45, marginBottom:20}}>
            <Image style={{height: 35}} contentFit='contain' source={require('../assets/images/logo.svg')} />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

    </View>
  )
}