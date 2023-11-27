import { Helmet } from "react-helmet-async";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import SectionTitle from "../../../Shared/SectionTitle";
import useUser from "../../../Hooks/useUser";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

const AgentProfile = () => {
  const { user } = useContext(AuthContext);
  const [users] = useUser();

  const userInfo = users.find((userInfo) => userInfo.email === user.email);

  return (
    <div>
      <Helmet>
        <title>Dream Forge | My Profile</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
        <div className="flex justify-center">
          <SectionTitle title={"Agent Profile"} />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <img src={userInfo.photo} className="rounded-full w-28 h-28" />
          <div>
            <p className="text-xl font-semibold">Name: {userInfo.name}</p>
            <p className="text-xl font-semibold py-2">
              Email: {userInfo.email}
            </p>
            <p className="text-xl font-semibold">Roll: {userInfo?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
