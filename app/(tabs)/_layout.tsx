import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'; // or any icon pack you prefer
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="bowl-food" size={size ?? 28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Catalog',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="menu-book" size={size ?? 28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
