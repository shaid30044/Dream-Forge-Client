import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useBought = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bought = [], refetch: boughtRefetch } = useQuery({
    queryKey: ["bought"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bought");
      return res.data;
    },
  });

  return [bought, boughtRefetch];
};

export default useBought;
