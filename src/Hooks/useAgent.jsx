import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useAgent = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: isAgent, isPending: isAgentLoading } = useQuery({
    queryKey: [user?.email, "isAgent"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/user/agent/${user.email}`);

      console.log(res);

      return res.data?.agent;
    },
  });

  return [isAgent, isAgentLoading];
};

export default useAgent;
