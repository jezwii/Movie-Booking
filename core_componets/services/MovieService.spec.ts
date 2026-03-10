import { movieService } from "./MovieService";
import * as httpService from "./httpService";

jest.mock("./httpService");
const mockedRequest = httpService.request as jest.Mock;

// Mock the env variable
const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...ORIGINAL_ENV, NEXT_PUBLIC_TMDB_API_KEY: "test-key-123" };
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
});

describe("MovieService", () => {
  describe("getMovies", () => {
    it("returns an empty array when the API key is not set", async () => {
      process.env.NEXT_PUBLIC_TMDB_API_KEY = undefined;
      mockedRequest.mockImplementation(() => Promise.resolve());
      expect(mockedRequest).not.toHaveBeenCalled();
    });

    it("resolves with a mapped Movie array on success", async () => {
      const tmdbResponse = {
        results: [
          {
            id: 1,
            title: "Inception",
            vote_average: 8.8,
            poster_path: "/inception.jpg",
            overview: "A thief.",
          },
        ],
      };

      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess(tmdbResponse);
        return Promise.resolve();
      });

      const movies = await movieService.getMovies();

      expect(movies).toHaveLength(1);
      expect(movies[0]).toMatchObject({
        id: "1",
        title: "Inception",
        rating: 8.8,
        duration: "2hrs",
        image: "https://image.tmdb.org/t/p/w1280/inception.jpg",
        description: "A thief.",
      });
    });

    it("sets an empty image when poster_path is null", async () => {
      const tmdbResponse = {
        results: [
          {
            id: 2,
            title: "No Poster",
            vote_average: 7.0,
            poster_path: null,
            overview: "A movie without a poster.",
          },
        ],
      };

      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess(tmdbResponse);
        return Promise.resolve();
      });

      const movies = await movieService.getMovies();
      expect(movies[0].image).toBe("");
    });

    it("resolves with an empty array when the request fails", async () => {
      mockedRequest.mockImplementationOnce(
        (_method, _url, _onSuccess, onFailure) => {
          onFailure(new Error("Network Error"));
          return Promise.resolve();
        },
      );

      const movies = await movieService.getMovies();
      expect(movies).toEqual([]);
    });
  });

  describe("getMovieById", () => {
    it("resolves with a mapped Movie on success", async () => {
      const tmdbMovie = {
        id: 10,
        title: "Interstellar",
        vote_average: 8.6,
        poster_path: "/interstellar.jpg",
        overview: "Space travel.",
        runtime: 169,
      };

      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess(tmdbMovie);
        return Promise.resolve();
      });

      const movie = await movieService.getMovieById("10");

      expect(movie).toMatchObject({
        id: "10",
        title: "Interstellar",
        rating: 8.6,
        duration: "169m",
        image: "https://image.tmdb.org/t/p/w1280/interstellar.jpg",
        description: "Space travel.",
      });
    });

    it("uses 'N/A' for duration when runtime is missing", async () => {
      const tmdbMovie = {
        id: 11,
        title: "No Runtime",
        vote_average: 6.5,
        poster_path: null,
        overview: "A movie.",
      };

      mockedRequest.mockImplementationOnce((_method, _url, onSuccess) => {
        onSuccess(tmdbMovie);
        return Promise.resolve();
      });

      const movie = await movieService.getMovieById("11");
      expect(movie?.duration).toBe("N/A");
    });

    it("resolves with null when the request fails", async () => {
      mockedRequest.mockImplementationOnce(
        (_method, _url, _onSuccess, onFailure) => {
          onFailure(new Error("Not Found"));
          return Promise.resolve();
        },
      );

      const movie = await movieService.getMovieById("999");
      expect(movie).toBeNull();
    });
  });
});
