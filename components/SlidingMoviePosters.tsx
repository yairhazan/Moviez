import React, { useState, useEffect } from 'react';

const moviePosters = [
  'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', // The Shawshank Redemption
  'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', // The Godfather
  'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', // The Dark Knight
  'https://image.tmdb.org/t/p/w500/8kSerJrhrJWKLk1LViesGcnrUPE.jpg', // Pulp Fiction
  'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg', // Forrest Gump
  'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg', // The Matrix
  'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', // Inception
  'https://image.tmdb.org/t/p/w500/hEjK9A9BkNXejFW4tfacVAEHtkn.jpg', // Fight Club
  'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', // Goodfellas
  'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg', // The Lord of the Rings: The Fellowship of the Ring
];

const SlidingMoviePosters: React.FC = () => {
  const [rows, setRows] = useState(5);

  useEffect(() => {
    const calculateRows = () => {
      const height = window.innerHeight;
      const rowHeight = height / 5; // Assuming 5 rows as a base
      const calculatedRows = Math.ceil(height / rowHeight);
      setRows(calculatedRows);
    };

    calculateRows();
    window.addEventListener('resize', calculateRows);
    return () => window.removeEventListener('resize', calculateRows);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {[...Array(rows)].map((_, index) => (
        <div
          key={index}
          className={`flex poster-row poster-row-${index + 1}`}
          style={{
            top: `${(index / rows) * 100}%`,
            height: `${100 / rows}%`,
            animation: `slide${index % 2 === 0 ? 'Right' : 'Left'} ${60 + index * 10}s linear infinite`,
          }}
        >
          {[...moviePosters, ...moviePosters].map((poster, i) => (
            <img
              key={i}
              src={poster}
              alt={`Movie poster ${i % moviePosters.length + 1}`}
              className="poster-image"
              loading="lazy"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SlidingMoviePosters;

