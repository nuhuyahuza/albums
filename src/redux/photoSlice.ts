import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PhotoState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  photos: [],
  loading: false,
  error: null,
};

export const fetchAlbumPhotos = createAsyncThunk('photo/fetchAlbumPhotos', async (albumId: number) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    throw error.response.data;
  }
});

export const deletePhoto = createAsyncThunk('photo/deletePhoto', async (photoId: number) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
    return photoId;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    throw error.response.data;
  }
});

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbumPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      })
      .addCase(fetchAlbumPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.photos = state.photos.filter((photo) => photo.id !== action.payload);
      });
  },
});

export default photoSlice.reducer;
