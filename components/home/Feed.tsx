import React, { useCallback, useRef, useState } from "react";
import { Animated, RefreshControl, View, Text } from "react-native";
import { EntityProvider, useFeed } from "replyke-rn";
import BottomSheet from "@gorhom/bottom-sheet";

import { SinglePostSkeleton } from "../shared/Skeleton";
import { SinglePost } from "../SinglePost";
import SortingSheet from "./SortingSheet";
import SortingToolbar from "./SortingToolbar";
import TimeFrameSheet from "./TimeFrameSheet";

function Feed({
  listEmptyComponent,
}: {
  listEmptyComponent?: React.JSX.Element;
}) {
  const sortingDrawerRef = useRef<BottomSheet>(null);
  const timeFrameDrawerRef = useRef<BottomSheet>(null);

  const { entities, loadMore, resetEntities, loading } = useFeed();
  const [listHeight, setListHeight] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Animated Value to track scrolling
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await resetEntities?.();
    setRefreshing(false);
  }, [resetEntities]);

  const openSortingSheet = () => {
    sortingDrawerRef.current?.snapToIndex(0);
  };

  const closeSortingSheet = () => {
    sortingDrawerRef.current?.close();
  };

  const openTimeFrameSheet = () => {
    timeFrameDrawerRef.current?.snapToIndex(0);
  };

  const closeTimeFrameSheet = () => {
    timeFrameDrawerRef.current?.close();
  };

  const initialLoading = loading && (!entities || entities.length === 0);

  if (initialLoading)
    return (
      <View className="flex-1 bg-gray-950">
        <Animated.FlatList
          data={[1, 2, 3]}
          renderItem={() => <SinglePostSkeleton />}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={{
            gap: 16,
            padding: 16,
            paddingTop: 0,
            backgroundColor: "#030712",
          }}
          ListHeaderComponent={
            <SortingToolbar
              openSortingSheet={openSortingSheet}
              openTimeFrameSheet={openTimeFrameSheet}
            />
          }
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          bounces={false}
        />
      </View>
    );

  return (
    <>
      <View
        className="flex-1 bg-gray-950"
        onLayout={(event) => {
          if (event.nativeEvent.layout.height > listHeight)
            setListHeight(event.nativeEvent.layout.height);
        }}
      >
        <Animated.FlatList
          data={entities!}
          renderItem={({ item: entity, index }) => (
            <EntityProvider entity={entity}>
              <SinglePost />
            </EntityProvider>
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            gap: 16,
            padding: 16,
            paddingTop: 0,
            backgroundColor: "#030712",
          }}
          onEndReached={loadMore}
          onEndReachedThreshold={2}
          ListHeaderComponent={
            <SortingToolbar
              openSortingSheet={openSortingSheet}
              openTimeFrameSheet={openTimeFrameSheet}
            />
          }
          ListFooterComponent={null}
          ListEmptyComponent={
            loading ? null : (
              <View className="flex-1" style={{ height: listHeight }}>
                {listEmptyComponent ?? (
                  <View
                    className="flex-1"
                    style={{
                      backgroundColor: "white",
                      justifyContent: "center",
                    }}
                  >
                    <Text className="text-center text-xl font-medium text-gray-400">
                      No Results
                    </Text>
                    <Text className="text-center text-lg text-gray-400 mt-2">
                      Try expanding your search
                    </Text>
                  </View>
                )}
              </View>
            )
          }
          decelerationRate="normal"
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          bounces={false}
        />
      </View>
      <SortingSheet
        ref={sortingDrawerRef}
        closeSortingSheet={closeSortingSheet}
      />
      <TimeFrameSheet
        ref={timeFrameDrawerRef}
        closeTimeFrameSheet={closeTimeFrameSheet}
      />
    </>
  );
}

export default Feed;
