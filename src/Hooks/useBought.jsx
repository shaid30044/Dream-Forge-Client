import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBought = () => {
  const axiosPublic = useAxiosPublic();

  const { data: bought = [], refetch: boughtRefetch } = useQuery({
    queryKey: ["bought"],
    queryFn: async () => {
      const res = await axiosPublic.get("/bought");
      return res.data;
    },
  });

  return [bought, boughtRefetch];
};

export default useBought;
