import type { NextPage } from "next";
import Head from "next/head";
import type { Repository } from "../types";
import useSWR from "swr";
import Header from "../components/header";
import Card from "../components/card";

interface ApiError extends Error {
  info: any;
  status: number;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data"
    ) as ApiError;
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return data;
};

const Csr: NextPage = () => {
  const { data, error } = useSWR<Repository[], ApiError>(
    "/api/github",
    fetcher
  );

  if (error) return <div>Something went wrong :(</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Client-side rendering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {data.map(
        ({
          id,
          url,
          name,
          description,
          primaryLanguage,
          stargazerCount,
          forkCount,
        }) => (
          <Card
            key={id}
            url={url}
            name={name}
            description={description}
            primaryLanguage={primaryLanguage}
            stargazerCount={stargazerCount}
            forkCount={forkCount}
          />
        )
      )}
    </>
  );
};

export default Csr;
