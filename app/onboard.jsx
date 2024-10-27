import { View, FlatList, Animated, useWindowDimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import Boarding from '../components/boarding';
import { Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';

const OnBoard = () => {

  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onboardingData = [
    {
      image: require('../assets/images/gloves.jpg'),
      title: 'Welcome !',
      description: 'We will assist you in efficiently and easily scheduling appointments with doctors. \n Let\'s get started!',
    },
    {
      image: require('../assets/images/doctor.jpg'),
      title: 'Choose Specialization',
      description: 'Select the medical specialization you need so we can tailor your experience.',
    },
    {
      image: require('../assets/images/calendar.png'),
      title: 'Schedule Your First Appointment',
      description: 'Choose a suitable time and date to meet your preferred doctor. Begin your journey to better health!',
    },
  ];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
    else navigation.replace('(auth)/sign-up');
  };

  const handleSkip = () => {
    flatListRef.current.scrollToIndex({ index: onboardingData.length - 1 });
     navigation.replace('(auth)/sign-up');
  };

  return (
    <View className="h-screen flex flex-col bg-white">
      <FlatList
        data={onboardingData}
        ref={flatListRef}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Boarding
              title={item.title}
              subtitle={item.description}
              image={item.image}
              currentIndex={currentIndex}
              totalItems={onboardingData.length} 
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      <View className="flex-row justify-between gap-4 mb-10 p-6">
        <Button
          mode="outlined"
          theme={{ colors: { outline: "#DDE0E5" } }}
          textColor="black"
          className="flex-1 mx-1 drop-shadow bg-[#EDEEF1] h-10 rounded-md text-sm font-manbold"
          onPress={handleSkip}
        >
          Skip
        </Button>
        <Button
          mode="contained"
          textColor="white"
 
          className="flex-1 mx-1 bg-[#254EDB] rounded-md h-10 text-sm font-manbold"
          onPress={handleNext}
        >
          Next
        </Button>
      </View>
      
    </View>
  );
};

export default OnBoard;
