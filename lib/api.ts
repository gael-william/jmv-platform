import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api";
const USE_CREDENTIALS = process.env.NEXT_PUBLIC_API_USE_CREDENTIALS === "true";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: USE_CREDENTIALS,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError | unknown) => Promise.reject(normalizeApiError(error))
);

export type Post = {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  location?: string | null;
  media_url?: string | null;
  media_type?: "image" | "video" | null;
  model_name?: string | null;
  photographer?: string | null;
  stylist?: string | null;
  tags?: string[] | string | null;
  likes_count?: number;
  comments_count?: number;
  likes?: number;
  author?: {
    id: number;
    name: string;
  };
  created_at?: string;
};

export type Comment = {
  id: number;
  post_id: number;
  body?: string;
  comment?: string;
  user_name?: string;
  username?: string;
  created_at?: string;
};

export type FetchPostsParams = {
  page?: number;
  per_page?: number;
  limit?: number;
  category?: string;
  authorId?: number;
  signal?: AbortSignal;
};

export type PaginationMeta = {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
};

export type PostsResponse = {
  data: Post[];
  pagination?: PaginationMeta;
};

export type UploadPostPayload = {
  title: string;
  description: string;
  category?: string;
  location?: string;
  mediaType: "image" | "video";
  file: File;
  tags?: string[];
  modelName?: string;
  photographer?: string;
  stylist?: string;
};

export type UploadedMedia = {
  media_url: string;
  media_type: "image" | "video";
};

export type CreateCommentPayload = {
  body: string;
  user_name?: string;
  username?: string;
  comment?: string;
};

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

function normalizeApiError(error: AxiosError | unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data as
      | { message?: string; error?: string; title?: string; errors?: Record<string, string[]> }
      | undefined;
    const validationMessage = data?.errors
      ? Object.values(data.errors).flat().filter(Boolean).join(" ")
      : "";

    return {
      status,
      message:
        validationMessage ||
        (data?.message ??
          data?.error ??
          data?.title ??
          error.message ??
          "Une erreur API inattendue est survenue."),
      details: data,
    };
  }

  return {
    status: 500,
    message: error instanceof Error ? error.message : "Une erreur inattendue est survenue.",
    details: error,
  };
}

function extractResponseData<T>(response: { data: { data?: T } | T }): T {
  const payload = response.data as { data?: T };
  return payload.data ?? (response.data as T);
}

function extractPostsResponse(response: { data: PostsResponse | Post[] }): PostsResponse {
  if (Array.isArray(response.data)) {
    return { data: response.data };
  }

  return {
    data: Array.isArray(response.data.data) ? response.data.data : [],
    pagination: response.data.pagination,
  };
}

export function buildUploadPostForm(payload: UploadPostPayload): FormData {
  const form = new FormData();

  form.append("file", payload.file);

  return form;
}

function buildCreatePostForm(payload: UploadPostPayload, media: UploadedMedia): FormData {
  const form = new FormData();

  form.append("title", payload.title);
  form.append("description", payload.description);
  form.append("media_url", media.media_url);
  form.append("media_type", media.media_type);

  if (payload.category) form.append("category", payload.category);
  if (payload.location) form.append("location", payload.location);
  if (payload.modelName) form.append("model_name", payload.modelName);
  if (payload.photographer) form.append("photographer", payload.photographer);
  if (payload.stylist) form.append("stylist", payload.stylist);
  if (payload.tags?.length) payload.tags.forEach((tag) => form.append("tags[]", tag));

  return form;
}

export async function fetchPosts(params?: FetchPostsParams): Promise<Post[]> {
  const response = await fetchPostsPage(params);
  return response.data;
}

export async function fetchPostsPage(params?: FetchPostsParams): Promise<PostsResponse> {
  const { signal, ...queryParams } = params ?? {};
  const response = await apiClient.get<PostsResponse | Post[]>('/posts', {
    params: queryParams,
    signal,
  });
  return extractPostsResponse(response);
}

export async function uploadPost(post: UploadPostPayload | FormData, config?: AxiosRequestConfig): Promise<Post> {
  if (post instanceof FormData) {
    const response = await apiClient.post<Post>('/posts', post, {
      ...config,
    });

    return extractResponseData<Post>(response);
  }

  const uploadResponse = await apiClient.post<UploadedMedia>('/media/upload', buildUploadPostForm(post), {
    ...config,
  });
  const uploadedMedia = extractResponseData<UploadedMedia>(uploadResponse);
  const createPostForm = buildCreatePostForm(post, uploadedMedia);

  const response = await apiClient.post<Post>('/posts', createPostForm);

  return extractResponseData<Post>(response);
}

export async function fetchComments(postId: number | string): Promise<Comment[]> {
  const response = await apiClient.get<Comment[] | { data: Comment[] }>(`/posts/${postId}/comments`);
  return extractResponseData<Comment[]>(response);
}

export async function likePost(postId: number | string): Promise<{ likes_count: number }> {
  const response = await apiClient.post<{ likes_count: number }>(`/posts/${postId}/like`);
  return extractResponseData<{ likes_count: number }>(response);
}

export async function addComment(
  postId: number | string,
  payload: CreateCommentPayload
): Promise<Comment> {
  const commentPayload = {
    comment: payload.comment ?? payload.body,
    username: payload.username ?? payload.user_name,
  };

  const response = await apiClient.post<Comment>(`/posts/${postId}/comments`, commentPayload);
  return extractResponseData<Comment>(response);
}

const api = {
  fetchPosts,
  fetchPostsPage,
  uploadPost,
  likePost,
  fetchComments,
  addComment,
  buildUploadPostForm,
};

export default api;
