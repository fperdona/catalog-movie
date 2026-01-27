import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { getMovieDetails, getMovieVideos, IMAGE_BASE_URL } from "../../services/api";
import styles from "./MovieDetails.module.css";
import { Button } from "../../components/Button/Button";
import { Skeleton } from "../../components/Skeleton/Skeleton";


export function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const movieId = Number(id);

    const { data: movie, isLoading, isError } = useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovieDetails(movieId),
    });

    const { data: videos } = useQuery({
        queryKey: ["movieVideos", movieId],
        queryFn: () => getMovieVideos(movieId),
    });

    // Busca o primeiro trailer disponível no YouTube
    const trailer = videos?.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (isLoading) return (
        <div className={styles.container}>
            <Skeleton width="80px" height="40px" borderRadius="4px" />
            <div className={styles.content} style={{ marginTop: "24px" }}>
                <Skeleton width="300px" height="450px" borderRadius="8px" />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <Skeleton height="36px" width="60%" />
                    <Skeleton height="20px" width="40%" />
                    <Skeleton height="20px" width="30%" />
                    <Skeleton height="100px" width="100%" />
                </div>
            </div>
        </div>
    );

    if (isError || !movie) return <p className={styles.message}>Erro ao carregar filme.</p>;

    // Converte duração de minutos para formato horas/minutos
    const year = movie.release_date?.split("-")[0] || "N/A";
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;


    return (
        <div className={styles.container}>
            <Button variant="secondary" onClick={() => navigate(-1)} className={styles.back}>← Voltar</Button>


            <div className={styles.content}>
                <img
                    src={
                        movie.poster_path
                            ? `${IMAGE_BASE_URL}${movie.poster_path}`
                            : undefined
                    }
                    alt={movie.title}
                    className={styles.poster}
                />

                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title}</h1>

                    <div className={styles.meta}>
                        <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        <span>{year}</span>
                        <span>{hours}h {minutes}min</span>
                    </div>

                    <div className={styles.genres}>
                        {movie.genres.map((g) => (
                            <span key={g.id} className={styles.genre}>{g.name}</span>
                        ))}
                    </div>

                    <h2>Sinopse</h2>
                    <p className={styles.overview}>{movie.overview || "Sinopse não disponível."}</p>
                </div>
            </div>

            {trailer && (
                <div className={styles.trailerSection}>
                    <h2>Trailer</h2>
                    <div className={styles.playerWrapper}>
                        <ReactPlayer
                            src={`https://www.youtube.com/watch?v=${trailer.key}`}
                            controls
                            width="100%"
                            height="100%"
                            className={styles.player}
                        />

                    </div>
                </div>
            )}
        </div>
    );
}
