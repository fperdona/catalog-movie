import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { IMAGE_BASE_URL } from "../../services/api";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Icon } from "../Icon/Icon";
import styles from "./MovieCard.module.css";
import noPoster from "../../assets/no-poster.svg";
import Heart from "../../assets/icons/heart.svg?react";
import HeartFilled from "../../assets/icons/heart-filled.svg?react";

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const year = movie.release_date?.split("-")[0] || "N/A";
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorited = isFavorite(movie.id);

    return (
        <Link to={`/movie/${movie.id}`} className={styles.card}>
            <button
                className={`${styles.favButton} ${favorited ? styles.favActive : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(movie);
                }}
            >
                <Icon svg={favorited ? HeartFilled : Heart} width={20} height={20} />
            </button>
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
