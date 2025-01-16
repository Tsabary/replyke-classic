import React, { forwardRef, useCallback, useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { TimeFrame, useFeed } from "replyke-rn";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Feather from "@expo/vector-icons/Feather";

import { cn } from "../../utils/cn";
import { timeFrameValues } from "../../constants/timeFrameValues";

const TimeFrameSheet = forwardRef<
  BottomSheet,
  { closeTimeFrameSheet: () => void }
>(({ closeTimeFrameSheet }, ref) => {
  const { sortBy, timeFrame, setTimeFrame } = useFeed();
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
            {sortBy} posts from
          </Text>
        </View>
      )}
    >
      <BottomSheetView className="p-4">
        <FlatList
          data={
            [
              "year",
              "month",
              "week",
              "day",
              "hour",
              null,
            ] as (TimeFrame | null)[]
          }
          keyExtractor={(item) => item || "all-time"}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setTimeFrame?.(item);
                  closeTimeFrameSheet();
                }}
                className="flex-1 flex-row items-center gap-4 p-3"
              >
                <Text
                  className={cn(
                    "text-lg flex-1",
                    timeFrame === item ? "text-white" : "text-gray-500"
                  )}
                >
                  {item ? timeFrameValues[item] : "All Time"}
                </Text>
                {timeFrame === item && (
                  <Feather name="check" size={22} color="#93c5fd" />
                )}
              </Pressable>
            );
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

export default TimeFrameSheet;
