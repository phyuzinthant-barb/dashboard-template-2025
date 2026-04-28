import Route from "@/routes/types";
import VideoPage from "./pages/VideoPage";
import {
  AddMoviePage,
  EditMoviePage,
  MovieDetailPage,
  MovieListPage,
} from "./movies/pages";
import {
  AddSeasonPage,
  EditSeasonPage,
  SeasonDetailPage,
} from "./series/pages/season";
import {
  AddSeriesPage,
  EditSeriesPage,
  SeriesDetailPage,
  SeriesPage,
} from "./series/pages/series";
import {
  AddEpisodePage,
  EditEpisodePage,
  EpisodeDetailPage,
} from "./series/pages/episodes";

export const videoRoutes: Route[] = [
  {
    path: "/video-list",
    element: <VideoPage />,
    subRoutes: [
      {
        path: "",
        index: true,
        element: <MovieListPage />,
      },
      {
        path: "series",
        element: <SeriesPage />,
      },
    ],
  },
  {
    path: "/video-list/movies/add",
    element: <AddMoviePage />,
  },
  {
    path: "/video-list/movies/detail/:id",
    element: <MovieDetailPage />,
  },
  {
    path: "/video-list/movies/edit/:id",
    element: <EditMoviePage />,
  },
  {
    path: "/video-list/series/add",
    element: <AddSeriesPage />,
  },
  {
    path: "/video-list/series/detail/:id",
    element: <SeriesDetailPage />,
  },
  {
    path: "/video-list/series/edit/:id",
    element: <EditSeriesPage />,
  },

  // season
  {
    path: "/video-list/series/season/detail/:id",
    element: <SeasonDetailPage />,
  },
  {
    path: "/video-list/series/season/add/:id",
    element: <AddSeasonPage />,
  },
  {
    path: "/video-list/series/season/edit/:id",
    element: <EditSeasonPage />,
  },

  // episodes
  {
    path: "/video-list/series/season/episode/detail/:id",
    element: <EpisodeDetailPage />,
  },
  {
    path: "/video-list/series/season/episode/add/:id",
    element: <AddEpisodePage />,
  },
  {
    path: "/video-list/series/season/episode/edit/:id",
    element: <EditEpisodePage />,
  },
];
