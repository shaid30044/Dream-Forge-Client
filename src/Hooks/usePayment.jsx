import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePayment = () => {
  const axiosPublic = useAxiosPublic();

  const { data: payment = [], refetch: paymentRefetch } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosPublic.get("/payments");
      return res.data;
    },
  });

  return [payment, paymentRefetch];
};

export default usePayment;
