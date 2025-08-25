import { Post } from "../../../types/posts";

export interface PostsState {
  posts: Post[];
  postDetails: Post | null;
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
}
