import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Shared/Loading";
import useAgent from "../Hooks/useAgent";

const AgentRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const [isAgent, isAgentLoading] = useAgent();

  if (loading || isAgentLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }
  if (user && isAgent) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" />;
};

export default AgentRoute;
