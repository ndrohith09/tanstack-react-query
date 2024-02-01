import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = ({ queryKey }) => {
  console.log("queryKey", queryKey);
  const heroId = queryKey[1];
  return axios.get("http://localhost:4000/superheroes/" + heroId);
};

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: fetchSuperHeros,
    // queryFn: () => fetchSuperHeros(heroId),
    gcTime: 5000, // garbage collector value
    staleTime: 2000,
  });
};
