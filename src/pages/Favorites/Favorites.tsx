import { useFavorites } from "../../contexts/FavoritesContext";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import styles from "../Home/Home.module.css";

export function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Meus Favoritos</h1>
            {favorites.length === 0 ? (
                <p className={styles.message}>Nenhum filme favoritado ainda.</p>
            ) : (
                <div className={styles.grid}>
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
}
