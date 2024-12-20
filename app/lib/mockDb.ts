export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  description: string;
}

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    poster_path: "/placeholder.svg?height=750&width=500",
    vote_average: 9.3,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    id: 2,
    title: "The Godfather",
    poster_path: "/placeholder.svg?height=750&width=500",
    vote_average: 9.2,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster_path: "/placeholder.svg?height=750&width=500",
    vote_average: 9.0,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster_path: "/placeholder.svg?height=750&width=500",
    vote_average: 8.9,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
  },
  {
    id: 5,
    title: "Forrest Gump",
    poster_path: "/placeholder.svg?height=750&width=500",
    vote_average: 8.8,
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart."
  }
];

