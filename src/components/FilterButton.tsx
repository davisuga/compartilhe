import React from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { IState, IFilters, ITheme } from "../store";
import { hp, wp } from "~/utils/screen-size";
export default function components(filter) {
  const dispatch = useDispatch();
  const colors = useSelector<IState, ITheme>((state) => state.theme);
  const styles = StyleSheet.create({
    filterButton: {
      height: hp(7),
      justifyContent: "center",

      marginTop: hp(2),
      borderWidth: 1.5,
      borderColor: colors.background,
      backgroundColor: colors.primary,
      borderRadius: 50,
    },
    filterButtonText: {
      color: colors.background,
    },
    filterButtonActive: {
      height: hp(7),
      justifyContent: "center",

      marginTop: hp(2),
      borderWidth: 1.5,
      borderColor: colors.primary,
      backgroundColor: colors.background,
      borderRadius: 50,
    },
    filterButtonTextActive: {
      color: colors.primary,
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
