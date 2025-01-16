import React, { forwardRef, useCallback, useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { FeedSortByOptions, useFeed } from "replyke-rn";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Feather from "@expo/vector-icons/Feather";
import { sortValues } from "../../constants/sortValues";
import { cn } from "../../utils/cn";

const SortingSheet = forwardRef<BottomSheet, { closeSortingSheet: () => void }>(
  ({ closeSortingSheet }, ref) => {
    const { sortBy, setSortBy } = useFeed();
    const snapPoints = useMemo(() => ["70%"], []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#18181B" }}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        handleComponent={() => (
          <View className="px-8 py-4 flex-row border-b border-gray-800">
            <Text className="uppercase text-gray-500 text-sm">
              Sort posts by
            </Text>
          </View>
        )}
      >
        <BottomSheetView className="p-4">
          <FlatList
            data={["hot", "new", "top", "controversial"] as FeedSortByOptions[]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    setSortBy?.(item);
                    closeSortingSheet();
                  }}
                  className="flex-1 flex-row items-center gap-4 p-3"
                >
                  {sortBy === item
                    ? sortValues[item].iconSelected
                    : sortValues[item].icon}
                  <Text
                    className={cn(
                      "text-lg flex-1",
                      sortBy === item ? "text-white" : "text-gray-500"
                    )}
                  >
                    {sortValues[item].title}
                  </Text>
                  {sortBy === item && (
                    <Feather name="check" size={22} color="#93c5fd" />
                  )}
                </Pressable>
              );
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default SortingSheet;
