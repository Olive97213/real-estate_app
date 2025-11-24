import { categories } from '@/constants/data';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || 'all'
  );
  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory('All');
      router.setParams({ filter: 'All' });
      return;
    }
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategory(item.category)}
          className={`mr-4 rounded-full px-4 py-2 ${
            selectedCategory === item.category
              ? 'bg-primary-300'
              : 'bg-primary-100 border-primary-200'
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              selectedCategory === item.category
                ? 'text-white font-rubik-bold mt-0.5'
                : 'text-black-300 font-rubik'
            }`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
