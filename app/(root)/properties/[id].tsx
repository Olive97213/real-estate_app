import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Comment from '@/components/Comment';
import { facilities } from '@/constants/data';
import icons from '@/constants/icons';
import images from '@/constants/images';

import { getPropertyById } from '@/lib/appwrite';
import { useAppwrite } from '@/lib/useAppwrite';

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get('window').height;

  const { data: property, loading } = useAppwrite({
    fn: getPropertyById,
    params: { id: id! },
  });

  // Loader
  if (loading || !property) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-3">Loading property...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        {/* Image */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={property?.image ? { uri: property.image } : images.noResult}
            className="size-full"
            resizeMode="cover"
          />

          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          {/* Header buttons */}
          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === 'ios' ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={'#191D31'}
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="px-5 mt-7 flex gap-2">
          {/* Name */}
          <Text className="text-2xl font-rubik-extrabold">
            {property?.name}
          </Text>

          {/* Type & rating */}
          <View className="flex flex-row items-center gap-3">
            <View className="px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-rubik-bold text-primary-300">
                {property?.type}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Text className="text-black-200 text-sm font-rubik-medium">
                {property?.rating ?? 0} ({property?.reviews?.length ?? 0}{' '}
                reviews)
              </Text>
            </View>
          </View>

          {/* Beds baths area */}
          <View className="flex flex-row items-center mt-5">
            <View className="bg-primary-100 rounded-full size-10 items-center justify-center">
              <Image source={icons.bed} className="size-4" />
            </View>
            <Text className="ml-2">{property?.bedrooms ?? 0} Beds</Text>

            <View className="bg-primary-100 rounded-full size-10 items-center justify-center ml-7">
              <Image source={icons.bath} className="size-4" />
            </View>
            <Text className="ml-2">{property?.bathrooms ?? 0} Baths</Text>

            <View className="bg-primary-100 rounded-full size-10 items-center justify-center ml-7">
              <Image source={icons.area} className="size-4" />
            </View>
            <Text className="ml-2">{property?.area ?? 0} sqft</Text>
          </View>

          {/* Agent */}
          <View className="border-t border-primary-200 pt-7 mt-5">
            <Text className="text-xl font-rubik-bold">Agent</Text>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center">
                <Image
                  source={{
                    uri: property?.agent?.avatar || images.avatar,
                  }}
                  className="size-14 rounded-full"
                />

                <View className="ml-3">
                  <Text className="text-lg font-rubik-bold">
                    {property?.agent?.name}
                  </Text>
                  <Text className="text-sm text-black-200">
                    {property?.agent?.email}
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-3">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>

          {/* Overview */}
          <View className="mt-7">
            <Text className="text-xl font-rubik-bold">Overview</Text>
            <Text className="text-black-200 mt-2">{property?.description}</Text>
          </View>

          {/* Facilities */}
          {property?.facilities?.length > 0 && (
            <View className="mt-7">
              <Text className="text-xl font-rubik-bold">Facilities</Text>

              <View className="flex flex-row flex-wrap gap-5 mt-3">
                {property.facilities.map((item: string, index: number) => {
                  const facility = facilities.find((f) => f.title === item);

                  return (
                    <View
                      key={index}
                      className="items-center min-w-16 max-w-20"
                    >
                      <View className="size-14 bg-primary-100 rounded-full items-center justify-center">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        className="text-sm text-center mt-1"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Gallery */}
          {property?.gallery?.length > 0 && (
            <View className="mt-7">
              <Text className="text-xl font-rubik-bold">Gallery</Text>

              <FlatList
                data={property.gallery ?? []}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          {/* Location */}
          <View className="mt-7">
            <Text className="text-xl font-rubik-bold">Location</Text>

            <View className="flex flex-row items-center mt-4 gap-2">
              <Image source={icons.location} className="size-7" />
              <Text>{property?.address}</Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-5 rounded-xl"
            />
          </View>

          {/* Reviews */}
          {property?.reviews?.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />

                  <Text className="text-xl font-rubik-bold ml-2">
                    {property?.rating ?? 0} ({property?.reviews?.length ?? 0}{' '}
                    reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text className="text-primary-300 font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews?.[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom */}
      <View className="absolute bottom-0 w-full bg-white border-t border-primary-200 p-7 rounded-t-2xl">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="text-xs text-black-200">Price</Text>

            <Text className="text-primary-300 text-2xl font-rubik-bold">
              ${property?.price ?? 0}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 bg-primary-300 py-3 rounded-full items-center justify-center ml-10">
            <Text className="text-white text-lg font-rubik-bold">Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
