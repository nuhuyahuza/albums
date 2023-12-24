import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Album {
  id: number;
  title: string;
  randomImage: string;
  imageUri: string;
}
interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface AlbumState {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumState = {
  albums: [],
  loading: false,
  error: null,
};

const getRandomImage = (photos: Photo[]) => {
    if (photos.length === 0) {
      return '';
    }
    const randomIndex = Math.floor(Math.random() * photos.length);
    return photos[randomIndex].thumbnailUrl;
  };

export const fetchAlbums = createAsyncThunk('album/fetchAlbums', async () => {
  try {
    // Fetch albums
    const albumsResponse = await axios.get('https://jsonplaceholder.typicode.com/albums');
    const albumsData = albumsResponse.data;
      // Fetch photos
    const photosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
      const photosData = photosResponse.data;
      const albumsWithRandomImage: Album[] = albumsData.map((album: Album) => {
        // Filter photos associated with the current album
        const albumPhotos = photosData.filter((photo: Photo) => photo.albumId === album.id);
        const randomImage: string = getRandomImage(albumPhotos);
        return { ...album, randomImage };
      });
  
    return albumsWithRandomImage;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    throw error.albumsResponse.data;
  }
});
//deleteAlbum request
export const deleteAlbum = createAsyncThunk('album/deleteAlbum', async (albumId: number) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
    return albumId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) { 
    throw error.response.data;
  }
});

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter((album) => album.id !== action.payload);
      });
  },
});

export default albumSlice.reducer;

