import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { List, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAlbums, deleteAlbum } from "../redux/albumSlice";
import { useNavigation,NavigationProp } from "@react-navigation/native";

const HomeScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { albums, loading, error } = useSelector(
    (state: RootState) => state.album
  );

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<NavigationProp<Record<string, object>>>();

  const handleDelete = (albumId: number) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this album?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => dispatch(deleteAlbum(albumId)),
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <List.Section>
          {albums.map((item) => (
            <List.Item
              key={item.id.toString()}
              title={item.title}
              description={`Album ID: ${item.id}`}
              left={(props) => <List.Icon {...props} icon="camera" />}
              right={() => (
                <IconButton
                  icon="delete"
                  onPress={() => handleDelete(item.id)}
                />
              )}
              onPress={() =>
                navigation.navigate("AlbumPhotos", {
                  albumId: item.id,
                  randomImage: item.randomImage,
                  albumTitle: item.title,
                })
              }
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
