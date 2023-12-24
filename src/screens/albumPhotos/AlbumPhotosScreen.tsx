import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "react-native-paper";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchAlbumPhotos, deletePhoto } from "../../redux/photoSlice";
import albumPhotosScreenStyles from "./AlbumPhotosScreenStyles";
import { NavigationProp, useNavigation } from "@react-navigation/native";

//interface for Album Photos
interface AlbumPhotosScreenProps {
  route: { params: { albumId: number; albumTitle?: string } };
  navigation: NavigationProp<Record<string, object>>;
}

const AlbumPhotosScreen = ({ route }: AlbumPhotosScreenProps ) => {
  const dispatch: AppDispatch = useDispatch();
  const { albumId, albumTitle = "Album" } = route.params;
  const navigation = useNavigation();
  const { photos, loading, error } = useSelector(
    (state: RootState) => state.photo
  );

  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleImageTap = (photoId: number) => {
    setSelectedPhotoId(photoId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPhotoId(null);
    setModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchAlbumPhotos(albumId));
    navigation.setOptions({
      title: albumTitle,
      headerStyle: {
        backgroundColor: "#EAEEE9",
        borderRadius: 10,
      },
    });
  }, [dispatch, albumId, navigation]);

  //handling of delete popup/alert
  const handleDelete = () => {
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
          onPress: () => {
            if (selectedPhotoId !== null) {
              dispatch(deletePhoto(selectedPhotoId));
              closeModal();
            }
          },
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
      <View
        style={albumPhotosScreenStyles.photosContainer}
      >
        {photos.map((photo) => (
          <TouchableOpacity
            onPress={() => handleImageTap(photo.id)}
            key={photo.id}
          >
            <Image
              source={{ uri: photo.thumbnailUrl }}
              style={{ width: 200, height: 200, resizeMode: "contain" , margin: 1}}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        style={albumPhotosScreenStyles.photoModalView}
        isVisible={isModalVisible}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              margin: 0,
            }}
          >
            <IconButton iconColor="red" icon="close" onPress={closeModal} />
          </View>
          <Swiper
            showsButtons={false}
            loop={false}
            showsPagination={false}
            index={photos.findIndex((photo) => photo.id === selectedPhotoId)}
          >
            {photos.map((photo) => (
              <View key={photo.id} style={{ width: "100%" }}>
                <Image
                  source={{ uri: photo.thumbnailUrl }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                  }}
                />
              </View>
            ))}
          </Swiper>

          <View
            style={{ flexDirection: "row", justifyContent: "center", margin: 10, bottom: 100}}>
            <IconButton icon="delete" onPress={handleDelete} />
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default AlbumPhotosScreen;
