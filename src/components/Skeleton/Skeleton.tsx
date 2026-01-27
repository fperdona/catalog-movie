import styles from "./Skeleton.module.css";

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
}

export function Skeleton({ width = "100%", height = "20px", borderRadius = "4px" }: SkeletonProps) {
    return (
        <div
            className={styles.skeleton}
            style={{ width, height, borderRadius }}
        />
    );
}
