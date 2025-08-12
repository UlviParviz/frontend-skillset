import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostById } from "./postThunks";
import { PostsState } from "./types";

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  detailsLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchPostById.pending, (state) => {
      state.detailsLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPostById.fulfilled, (state, action) => {
      state.detailsLoading = false;
      state.selectedPost = action.payload;
    });
    builder.addCase(fetchPostById.rejected, (state, action) => {
      state.detailsLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default postSlice.reducer;
