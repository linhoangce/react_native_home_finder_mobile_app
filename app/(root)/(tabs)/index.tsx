import {
    FlatList,
    Button,
    ActivityIndicator
} from "react-native";

import {SafeAreaView}     from "react-native-safe-area-context";
import {
    Card,
    FeatureCard
}                         from "@/components/Cards";
import {useGlobalContext} from "@/lib/global-provider";
import seed               from "@/lib/seed";
import {useAppwrite}      from "@/lib/useAppwrite";
import {
    getLatestProperties,
    getProperties
}                         from "@/lib/appwrite";
import {
    useCallback,
    useEffect
}                         from "react";
import NoResult           from "@/components/NoResult";
import ListHeader         from "@/components/ListHeader";
import {
    router,
    useLocalSearchParams
}                         from "expo-router";

export default function Index() {
    const {user} = useGlobalContext();

    const params = useLocalSearchParams<{
        query?: string;
        filter?: string
    }>();

    const {
        data: latestProperties,
        loading: latestPropertiesLoading
    } = useAppwrite({
        fn: getLatestProperties
    });

    const {
        data: properties,
        loading,
        refetch
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
        },
        skip: true,
    });

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    const renderItem = useCallback(
        ({item}: any) => (
            <Card
                item={item}
                onPress={() => handleCardPress(item.$id)}
            />
        ),
        [handleCardPress]
    );

    const renderItemFeatureCard = useCallback(
        ({item}: any) => (
            <FeatureCard
                item={item}
                onPress={() => handleCardPress(item.$id)}
            />
        ), [handleCardPress]
    )

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            // limit: 6
        })
    }, [params.filter, params.query]);

    return (
        <SafeAreaView className="bg-white h-full">
            <Button title="Seed" onPress={seed}/>
            <FlatList
                data={properties}
                renderItem={renderItem}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" className="text-primary-300 mt-5"/>
                    ) : <NoResult/>
                }
                ListHeaderComponent={
                    <ListHeader
                        user={user}
                        latestProperties={latestProperties}
                        latestPropertiesLoading={latestPropertiesLoading}
                        handleCardPress={handleCardPress}
                        renderItemFeatureCard={renderItemFeatureCard}
                    />
                }
            />
        </SafeAreaView>
    );
}
