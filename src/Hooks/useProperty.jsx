import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProperty = () => {
  const axiosPublic = useAxiosPublic();

  const { data: property = [], refetch } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axiosPublic.get("/property");
      return res.data;
    },
  });

  return [property, refetch];
};

export default useProperty;
