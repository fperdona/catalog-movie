import { Button } from "../Button/Button";
import styles from "./Header.module.css";

interface HeaderProps {
    theme: "dark" | "light";
    onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
    return (
        <header className={styles.header}>
            <h2 className={styles.logo}>Catálogo de Filmes</h2>
            <Button variant="secondary" onClick={onToggleTheme}>
                {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            </Button>
        </header>
    );
}
