import type { Repository } from "../types";
import Stars from "./star";
import Forks from "./forks";
import styles from "./card.module.css";

const Card = ({
  url,
  name,
  description,
  primaryLanguage,
  stargazerCount,
  forkCount,
}: Repository) => {
  return (
    <>
      <article className={styles.card}>
        <h2 className={styles.title}>
          <a href={url}>{name}</a>
        </h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.meta}>
          {primaryLanguage && (
            <span className={styles.language}>
              <span
                className={styles.languageColor}
                style={{ backgroundColor: primaryLanguage?.color }}
              />{" "}
              <span itemProp="programmingLanguage">
                {primaryLanguage?.name}
              </span>
            </span>
          )}
          {stargazerCount > 0 && (
            <a href={`${url}/stargazers`} className={styles.stargazers}>
              <Stars /> <span>{stargazerCount}</span>
            </a>
          )}
          {forkCount > 0 && (
            <a href={`${url}/network/members`} className={styles.forks}>
              <Forks /> <span>{forkCount}</span>
            </a>
          )}
        </p>
      </article>
    </>
  );
};

export default Card;
