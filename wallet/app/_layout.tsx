import SafeScreen from '@/components/SafeScreen'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { StatusBar } from 'react-native'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <StatusBar translucent backgroundColor={"#0a0a0a"} barStyle={"light-content"} />
      <SafeScreen>
      <Slot />
      </SafeScreen>
    </ClerkProvider>
  )
}