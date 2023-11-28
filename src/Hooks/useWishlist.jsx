import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
  const axiosSecure = useAxiosSecure();

  const { data: wishlist = [], refetch: wishlistRefetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axiosSecure.get("/wishlist");
      return res.data;
    },
  });

  return [wishlist, wishlistRefetch];
};

export default useWishlist;
