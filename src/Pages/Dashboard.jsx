import DashboardSideBar from "../Shared/Dashboard/DashboardSideBar";
import PropertyBought from "./Dashboard/UserDashboard/PropertyBought";
import Wishlist from "./Dashboard/UserDashboard/Wishlist";

const Dashboard = () => {
  return (
    <div>
      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <Wishlist />
      <PropertyBought />
    </div>
  );
};

export default Dashboard;
