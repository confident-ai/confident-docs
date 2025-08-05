import styles from './styles.module.scss'
export default function Banner() {
    return (
        <div className={styles.Banner}>
            <div className={styles.inner}>
                <h1 className={styles.heading}>Stay Confident</h1>
                <p className={styles.description}>
                    Subscribe to our weekly newsletter to stay confident in the AI systems you build.
                </p>
            </div>
        </div>
    )
}