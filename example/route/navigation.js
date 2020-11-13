import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { I18nManager, Platform, Dimensions } from 'react-native';
import StackRoute from './stack';
import DrawerContent from './DrawerContent'
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function AppStack() {

    function AppStack() {
        let screens = [];
        for (const key in StackRoute) {
            if (StackRoute.hasOwnProperty(key)) {
                const element = StackRoute[key];
                if (element.active) {
                    screens.push(
                        <Stack.Screen
                            name={element.route_name}
                            component={element.component}
                        />
                    );
                }
            }
        }
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {screens}
            </Stack.Navigator>
        );
    }

    const appDrawer = (
        <Drawer.Navigator
            drawerPosition={
                Platform.OS === 'android' ? (I18nManager.isRTL ? 'right' : 'left') : ''
            }
            drawerWidth={
                (Dimensions.get('screen').width * 3) / 5 > 280
                    ? 280
                    : (Dimensions.get('screen').width * 2) / 3
            }
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Root" component={AppStack} />
        </Drawer.Navigator>
    );

    const splashStack = (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={StackRoute.splash.route_name}
                component={StackRoute.splash.component}
            />
        </Stack.Navigator>
    );

    let navigatorSelection = null;
    const stack = 'app';
    switch (stack) {
        case 'splash':
            navigatorSelection = splashStack;
            break;
        default:
            navigatorSelection = appDrawer;
            break;
    }

    return navigatorSelection;
}

export default AppStack;
