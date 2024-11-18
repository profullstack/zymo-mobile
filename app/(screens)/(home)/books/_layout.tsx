import { Stack } from "expo-router"

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="screens/[singlebook]" 
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}

export default Layout