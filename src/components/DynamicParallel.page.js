import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = (heroId) => {
  return axios.get("http://localhost:4000/superheroes/" + heroId);
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};
export const DynamicParallel = ({ heroIds }) => {
  //   console.log(heroIds.map((id) => id), "heroIds");
  heroIds.map((id) => {
    console.log(id);
  });
  const results = useQueries({
    queries : heroIds?.map((id) => {
      return {
        queryKey: ["super-hero-dy", id],
        queryFn: () => fetchSuperHeros(id),
        staleTime: Infinity
      };
    })
});
  
    // enabled: !!userID (means changes the userID value to boolean) 

  //   console.log("results", results);

  return <>DynamicParallelPage</>;
};
