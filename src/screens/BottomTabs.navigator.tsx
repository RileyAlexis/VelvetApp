import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from "react-native-linear-gradient";

import { Home } from "./Home.screen";

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name="Home" component={Home}
                options={{
                    title: "Voice",
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerBackground: () => (
                        <LinearGradient colors={['pink', 'white', 'pink', 'lightblue', 'white', 'lightblue']}
                            style={{ flex: 1 }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                    ),
                }} />
        </BottomTabs.Navigator>
    )
}