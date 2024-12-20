import { MovieDb } from 'moviedb-promise';

const tmdb = new MovieDb(process.env.NEXT_PUBLIC_TMDB_API_KEY || '');

export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export async function getMoviesToSwipe(page: number = 1): Promise<Movie[]> {
  try {
    const response = await tmdb.discoverMovie({
      sort_by: 'popularity.desc',
      include_adult: false,
      page
    });

    return (response.results || []).map(movie => ({
      id: String(movie.id),
      title: movie.title || '',
      poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      overview: movie.overview || '',
      release_date: movie.release_date || '',
      vote_average: movie.vote_average || 0
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await tmdb.searchMovie({ query });
    
    return (response.results || []).map(movie => ({
      id: String(movie.id),
      title: movie.title || '',
      poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      overview: movie.overview || '',
      release_date: movie.release_date || '',
      vote_average: movie.vote_average || 0
    }));
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
} 