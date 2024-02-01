import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeros = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onError) => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeros,
    gcTime: 5000, // garbage collector value
    staleTime: 2000,
    refetchOnMount: true,
    // select : (data) => {
    //   const heroname = data.data.map((hero) => hero.name)
    //   return heroname
    // },
    refetchOnWindowFocus: true, // tab looses focus and gains focus an refetch is done ['always']
    // refetchInterval : 2000
    // enabled: false,
    throwOnError: onError,
  });
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-hero"],
    mutationFn: addSuperHero,
    onSuccess: (data) => {
      alert("succes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
      //   queryClient.invalidateQueries("super-heroes"); // invalidate sends new request. can use setQueryData to update the query
    },
  });
};
