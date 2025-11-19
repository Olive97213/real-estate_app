import icons from '@/constants/icons';
import images from '@/constants/images';
import { login,logout } from '@/lib/appwrite';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const signin = () => {
  const handleLogin = async () => {
    const result = await login();

    if (result) {
      console.log('Login Success');
    } else {
      Alert.alert('Error', 'Failed to login');
    }
  };
  // 🧪 Bouton de test pour logout
  const handleTestLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert('Success', 'Logged out successfully');
    } else {
      Alert.alert('Error', 'Failed to logout');
    }
  };
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get you Closer to {'\n'}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
           <TouchableOpacity
              onPress={handleTestLogout}
              className="bg-red-500 rounded-full w-full py-3 mt-2"
            >
              <Text className="text-white text-center font-rubik-medium">
                🚪 Test Logout
              </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signin;
