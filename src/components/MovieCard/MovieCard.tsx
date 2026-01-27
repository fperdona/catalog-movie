import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL } from "../../services/api";
import styles from "./MovieCard.module.css";
import noPoster from "../../assets/no-poster.svg";


interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const year = movie.release_date?.split("-")[0] || "N/A";

    return (
        <Link to={`/movie/${movie.id}`} className={styles.card}>
            <img
                src={
                    movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : noPoster
                }
                alt={movie.title}
                className={styles.poster}
            />
            <div className={styles.info}>
                <h3 className={styles.title}>{movie.title}</h3>
                <div className={styles.details}>
                    <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
                    <span className={styles.year}>{year}</span>
                </div>
            </div>
        </Link>
    );
}
