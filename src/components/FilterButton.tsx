import React from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { IState, IFilters } from "../store";
import { hp, wp } from "~/utils/screen-size";
export default function components(filter) {
  const dispatch = useDispatch();
  const colors = useSelector<IState, any>((state) => state.theme);
  const styles = StyleSheet.create({
    filterButton: {
      marginTop: hp(2),
      borderWidth: 1.5,
      borderColor: colors.primary,
      backgroundColor: colors.background,
    },
    filterButtonText: {
      color: colors.primary,
    },
    filterButtonActive: {
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

  const filterState = useSelector<IState>(
    (state) => state.filterActive[filter.filter.Filter]
  );

  return (
    <Button
      onPress={() => {
        changeActiveFilter(filter.filter.Filter);
      }}
      style={
        filterState == true ? styles.filterButtonActive : styles.filterButton
      }
      mode="outlined"
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
    </Button>
  );
}
