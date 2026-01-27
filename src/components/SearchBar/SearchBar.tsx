import { useState } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch(query.trim());
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Buscar filmes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>Buscar</button>
        </form>
    );
}
