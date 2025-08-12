export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
}
