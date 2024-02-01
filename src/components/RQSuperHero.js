import { useSuperHeroData } from "./hooks/useSuperHeroData";
import { useParams } from "react-router-dom";
export const RQSuperHeroPage = () => {
  const { heroId } = useParams();

  const { isLoading, data, isError, error, isFetching, isSuccess } =
    useSuperHeroData(heroId);

  if (isSuccess) {
    console.log("perform side effect after data fetching");
  } 

  if (isLoading || isFetching) {
    return <h2>isLoading</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <div>
   <h2>Single Hero page</h2> 
    {data?.data.name} - {data?.data.alterEgo}</div>;
};
