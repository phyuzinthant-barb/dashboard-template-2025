import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://movie-b.origin.com.mm/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Accept", "multipart/form-data");
    return headers;
  },
});

interface RefreshResponse {
  accessToken: string;
}

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const tokenExpiry = localStorage.getItem("accessToken_exp");
  const now = Date.now();

  if (tokenExpiry) {
    const expiryTime = Number(tokenExpiry);

    if (now >= expiryTime) {
      console.error("Token expired. Logging out user...");
      localStorage.clear();
      window.location.href = "/login";
      return { error: { status: 401, data: "Token expired" } };
    }

    if (now >= expiryTime - 5 * 60 * 1000) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        const refreshResult = (await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        )) as { data?: RefreshResponse; error?: any };

        if (refreshResult?.data?.accessToken) {
          const expiresInSeconds = 3600;
          const newExpiryTime = Date.now() + expiresInSeconds * 1000;

          localStorage.setItem("auth_token", refreshResult.data.accessToken);
          localStorage.setItem("accessToken_exp", newExpiryTime.toString());
        } else {
          console.error("Failed to refresh token. Logging out user...");
          localStorage.clear();
          window.location.href = "/login";
          return { error: { status: 401, data: "Refresh token failed" } };
        }
      }
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === 401 &&
    args.url !== "/auth/login" &&
    args.url !== "/auth/otp/verify"
  ) {
    console.error("Unauthorized. Logging out user...");
    localStorage.clear();
    window.location.href = "/login";
  }

  return result;
};

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Me",
    "Category",
    "Genre",
    "Role",
    "Cast",
    "Movie",
    "Series",
    "Seasons",
    "Episodes",
    "Banner",
    "Ads",
    "Packages",
    "Promotions",
    "Announcements",
    "Admins",
    "AdminRoles",
    "FAQ",
    "Terms",
    "Policy",
    "Reminder",
    "Customers",
    "Collection",
  ],
  endpoints: () => ({}),
});
