import { View, Text } from 'react-native'
import React from 'react'

const TabsLayout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen name ="home"
                options={{title:"Home",
                    headerShown: false,
            }}>
            </Tabs.Screen>
        </Tabs>
    </>
  )
}

export default TabsLayout