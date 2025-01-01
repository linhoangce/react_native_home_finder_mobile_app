import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
}                           from 'react-native'
import icons                from "@/constants/icons";
import Search               from "@/components/Search";
import NoResult             from "@/components/NoResult";
import Filters              from "@/components/Filters";
import {Models}             from "react-native-appwrite";
import {User}               from '@/lib/global-provider';
import {memo}               from "react";


const ListHeader = memo(({
                                   user,
                                   latestProperties,
                                   latestPropertiesLoading,
                                   handleCardPress,
                                   renderItemFeatureCard
                               }: {
    user: User | null,
    latestProperties: Models.Document[] | null,
    latestPropertiesLoading: boolean,
    handleCardPress: (id: string) => void,
    renderItemFeatureCard: any
}) => {
    return (
        <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
                <View className="flex flex-row items-center">
                    <Image
                        source={{uri: user?.avatar}}
                        className="size-12 rounded-full"
                    />

                    <View className="flex flex-col items-start ml-2 justify-center">
                        <Text className="text-xs font-rubik text-black-100">
                            Good Morning
                        </Text>
                        <Text className="text-base font-rubik-medium text-black-300">
                            {user?.name}
                        </Text>
                    </View>
                </View>
                <Image source={icons.bell} className="size-6"/>
            </View>
            <Search/>
            <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-rubik-bold text-black-300">
                        Feature
                    </Text>
                    <TouchableOpacity>
                        <Text className="text-base font-rubik-bold text-primary-300">
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {latestPropertiesLoading ? (
                    <ActivityIndicator size="large" className="text-primary-300"/>) :
                !latestProperties || latestProperties.length === 0 ?
                    <NoResult/> : (
                        <FlatList
                            data={latestProperties}
                            renderItem={renderItemFeatureCard}
                            keyExtractor={(item) => item.$id}
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />
                    )}

            <View className="flex flex-row items-center justify-between">
                <Text className="text-rxl font-rubik-bold text-black-300">
                    Our Recommendations
                </Text>
                <TouchableOpacity>
                    <Text className="text-base font-rubik-bold text-primary-300">
                        See All
                    </Text>
                </TouchableOpacity>
            </View>
            <Filters/>
        </View>
    );
});

export default ListHeader;
