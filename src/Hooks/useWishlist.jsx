import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useWishlist = () => {
  const axiosPublic = useAxiosPublic();

  const { data: wishlist = [], refetch: wishlistRefetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosPublic.get("/wishlist");
      return res.data;
    },
  });

  return [wishlist, wishlistRefetch];
};

export default useWishlist;
