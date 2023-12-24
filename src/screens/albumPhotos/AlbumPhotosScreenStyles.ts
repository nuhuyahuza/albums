import { StyleSheet, ViewStyle } from "react-native";

interface albumPhotosScreenStyles {
  item: ViewStyle;
  loadingContainer: ViewStyle;
  errorContainer: ViewStyle;
  photoModalView: ViewStyle;
  photosContainer: ViewStyle;
}

const albumPhotosScreenStyles: albumPhotosScreenStyles = StyleSheet.create({
  item: {
    flex: 1,
    height: 200,
    width: 200,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
  },
  photoModalView: {
    flex: 1,
    backgroundColor: "white",
    margin: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photosContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom:10,
    justifyContent: "space-around",
  },
});

export default albumPhotosScreenStyles;
