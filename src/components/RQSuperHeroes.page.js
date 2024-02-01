import { useState } from "react";
import {
  useSuperHeroesData,
  useAddSuperHeroData,
} from "./hooks/useSuperHerosData";
import { Link } from "react-router-dom";
export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { mutate: addHero } = useAddSuperHeroData();

  const onError = () => {
    console.log("perform side effect after data error");
  };

  // use refetch to manually trigger the data fetch
  const { isLoading, data, isError, error, isFetching, isSuccess, refetch } =
    useSuperHeroesData(onError);

  if (isSuccess) {
    console.log("perform side effect after data fetching");
  }

  const handleAdd = () => {
    const hero = { name, alterEgo };
    console.log("hero",hero)
    addHero(hero);
  };

  console.log(isLoading, isFetching);

  if (isLoading || isFetching) {
    return <h2>isLoading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <button onClick={refetch}>Fetch heros</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data?.map((hero) => {
        return <div>{hero}</div>;
      })} */}
    </>
  );
};
