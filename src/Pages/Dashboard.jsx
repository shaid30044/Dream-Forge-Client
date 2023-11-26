import DashboardSideBar from "../Shared/Dashboard/DashboardSideBar";
import Wishlist from "./Dashboard/UserDashboard/Wishlist";

const Dashboard = () => {
  return (
    <div>
      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <Wishlist />
    </div>
  );
};

export default Dashboard;
