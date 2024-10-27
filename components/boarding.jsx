import { View, Text, Image } from 'react-native';
import React from 'react';

const Boarding = ({ title, subtitle, image, currentIndex, totalItems }) => {
  return (
    <View className="flex  bg-white  justify-start">

      <Image source={image} resizeMode="cover" className="w-full h-[60vh]" />
      
      <View className="p-7 space-y-3">
      <View className="flex-row items-center justify-start w-full  ">
        {Array.from({ length: totalItems }).map((_, index) => (
          <View
            key={index}
            className={`h-1 w-10 rounded-full bg-[#DDE0E5] ${index !=0 ? 'mx-1.5'  : ''} ${
              currentIndex === index ? 'bg-[#254EDB] h-1 w-10' : ''
            }`}
          />
        ))}
      </View>
      

      <View className="menu flex flex-col  gap-4">
        <Text className="welcome font-manbold text-2xl">{title}</Text>
        <Text className="description font-manmed text-base text-gray-600">
          {subtitle}
        </Text>
      </View>
      
      </View>
    </View>
  );
};

export default Boarding;
