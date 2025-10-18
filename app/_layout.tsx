
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StoreProvider } from '@/utils/store';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Component that only respects top safe area inset
function SafeAreaTopOnly({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top, // ✅ only top inset
        backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
      }}
    >
      {children}
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <SafeAreaTopOnly>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </ThemeProvider>
        </SafeAreaTopOnly>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
