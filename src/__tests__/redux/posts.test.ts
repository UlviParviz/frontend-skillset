import reducer from "../../shared/redux/posts/postSlice";
import { fetchPosts, fetchPostById } from "../../shared/redux/posts/postThunks";
import { PostsState } from "../../shared/redux/posts/types";
import { Post } from "../../types/posts";

const initialState: PostsState = {
  posts: [],
  postDetails: null,
  loading: false,
  detailsLoading: false,
  error: null,
};

const dummyPosts: Post[] = [
  { id: 1, userId: 1, title: "Test Post 1", body: "This is a test post" },
  { id: 2, userId: 1, title: "Test Post 2", body: "Another test post" },
];

const dummyPost: Post = {
  id: 3,
  userId: 1,
  title: "Single Post",
  body: "Single post body",
};

describe("postSlice reducer", () => {
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  describe("fetchPosts", () => {
    it("should handle pending", () => {
      const state = reducer(initialState, fetchPosts.pending("", undefined));
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle fulfilled", () => {
      const state = reducer(
        initialState,
        fetchPosts.fulfilled(dummyPosts, "", undefined)
      );
      expect(state.loading).toBe(false);
      expect(state.posts).toEqual(dummyPosts);
    });

    it("should handle rejected", () => {
      const error = "Failed to fetch posts";
      const state = reducer(
        initialState,
        fetchPosts.rejected(null, "", undefined, error)
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe(error);
    });
  });

  describe("fetchPostById", () => {
    it("should handle pending", () => {
      const state = reducer(initialState, fetchPostById.pending("", 1));
      expect(state.detailsLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle fulfilled", () => {
      const state = reducer(
        initialState,
        fetchPostById.fulfilled(dummyPost, "", 1)
      );
      expect(state.detailsLoading).toBe(false);
      expect(state.postDetails).toEqual(dummyPost);
    });

    it("should handle rejected", () => {
      const error = "Failed to fetch post by ID";
      const state = reducer(
        initialState,
        fetchPostById.rejected(null, "", 1, error)
      );
      expect(state.detailsLoading).toBe(false);
      expect(state.error).toBe(error);
    });
  });
});
