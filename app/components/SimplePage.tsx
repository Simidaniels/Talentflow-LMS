import styles from "../page.module.css";

type SimplePageProps = {
  heading: string;
  description: string;
};

export default function SimplePage({ heading, description }: SimplePageProps) {
  return (
    <section className={styles.simplePageCard}>
      <h1 className={styles.simplePageTitle}>{heading}</h1>
      <p className={styles.simplePageText}>{description}</p>
    </section>
  );
}
