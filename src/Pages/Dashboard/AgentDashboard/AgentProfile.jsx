import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";

const AgentProfile = () => {
  return (
    <div>
      <Helmet>
        <title>Dream Forge | My Profile</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>
    </div>
  );
};

export default AgentProfile;
