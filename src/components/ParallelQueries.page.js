import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};
export const ParallelQueriesPage = () => {
  const { data: superHeroes } = useQuery({
    queryKey: "super-heroes",
    queryFn: fetchSuperHeros,
  });
  const { data: friends } = useQuery({
    queryKey: "friends",
    queryFn: fetchFriends,
    select : (data) => {
          const heroname = data.data
          return heroname
        },
  });

  console.log("friends", friends);

  return (
    <>
      {friends?.map((hero) => {
        return <div>{hero.name}</div>;
      })}
    </>
  );
};
