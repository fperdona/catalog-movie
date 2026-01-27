import { useState } from "react";
import styles from "./SearchBar.module.css";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import Search from "../../assets/icons/search.svg?react";

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
            <Button type="submit" className={styles.teste}>
                <Icon svg={Search} width={28} height={28} />
            </Button>
        </form>
    );
}
