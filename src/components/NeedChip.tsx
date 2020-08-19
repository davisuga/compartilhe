import React from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Chip } from "react-native-paper";
import { IState, IFilters } from "../store";
import { hp, wp } from "~/utils/screen-size";

export default function components(filter: IFilters) {
  const dispatch = useDispatch();
  const colors = useSelector<IState, any>((state) => state.theme);
  const styles = StyleSheet.create({
    chip: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      margin: 3,
    },
    chipText: {
      color: "#fff",
    },
    filterButton: {
      marginTop: hp(2),
      borderWidth: 1.5,
      borderColor: colors.primary,
      backgroundColor: colors.background,
      margin: 3,
    },
    filterButtonText: {
      color: colors.primary,
    },
    filterButtonActive: {
      margin: 3,
      marginTop: hp(2),
      borderWidth: 1.5,
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    filterButtonTextActive: {
      color: colors.background,
    },
  });

  function changeActiveFilter(toChangeFilter) {
    dispatch({ type: "FILTER_ACTIVE", filter: toChangeFilter });
  }

  const filterState = useSelector<IState, boolean>(
    (state) => state.filterActive[filter.filter.Filter]
  );

  return (
    <Chip
      onPress={() => {
        changeActiveFilter(filter.filter.Filter);
      }}
      mode="outlined"
      style={
        filterState == true ? styles.filterButtonActive : styles.filterButton
      }
    >
      <Text
        style={
          filterState == true
            ? styles.filterButtonTextActive
            : styles.filterButtonText
        }
      >
        {filter.filter.OfferName}
      </Text>
    </Chip>
  );
}
