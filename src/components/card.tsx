import type { Repository } from "../types";

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
      <article>
        <h2>
          <a href={url}>{name}</a>
        </h2>
        <p>{description}</p>
        <p>
          {primaryLanguage && (
            <span style={{ backgroundColor: primaryLanguage?.color }}>
              {primaryLanguage?.name}
            </span>
          )}
          {stargazerCount > 0 && (
            <a href={`${url}/stargazers`}>{stargazerCount}</a>
          )}
          {forkCount > 0 && <a href={`${url}/network/members`}>{forkCount}</a>}
        </p>
      </article>
    </>
  );
};

export default Card;
