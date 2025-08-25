import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import api from "../api";
import { Post } from "../../../types/posts";

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, thunkAPI) => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchPostById = createAsyncThunk<
  Post,
  number,
  { rejectValue: string }
>("posts/fetchPostById", async (id, thunkAPI) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return thunkAPI.rejectWithValue(error.message);
  }
});
