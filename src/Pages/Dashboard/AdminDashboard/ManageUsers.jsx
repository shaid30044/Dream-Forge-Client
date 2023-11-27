import { Helmet } from "react-helmet-async";
import notFound from "../../../assets/NotFound.jpg";
import DashboardSideBar from "../../../Shared/Dashboard/DashboardSideBar";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../../../Hooks/useUser";
import SectionTitle from "../../../Shared/SectionTitle";

const ManageUsers = () => {
  const [users, usersRefetch] = useUser();
  const axiosPublic = useAxiosPublic();

  const handleMakeAgent = (user) => {
    const verifyStatus = {
      $set: {
        role: "agent",
      },
    };

    axiosPublic.patch(`/user/${user._id}`, verifyStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        usersRefetch();

        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is now an agent!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    const verifyStatus = {
      $set: {
        role: "admin",
      },
    };

    axiosPublic.patch(`/user/${user._id}`, verifyStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        usersRefetch();

        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is now an admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleFraud = (user) => {
    const verifyStatus = {
      $set: {
        role: "fraud",
      },
    };
    axiosPublic.patch(`/user/${user._id}`, verifyStatus).then((res) => {
      if (res.data.modifiedCount > 0) {
        usersRefetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} marked as fraud!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/user/${user._id}`).then((res) => {
          if (res.data.deletedCount) {
            usersRefetch();

            Swal.fire({
              position: "center",
              icon: "success",
              text: `${user.name} deleted successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Dream Forge | Manage Users</title>
      </Helmet>

      <div className="fixed z-50">
        <DashboardSideBar />
      </div>

      {users.length === 0 ? (
        // not found

        <div className="flex justify-center items-center h-screen pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <img src={notFound} />
        </div>
      ) : (
        <div className="font-open w-full pr-4 pl-3 md:pr-6 md:pl-[280px] lg:pr-40 lg:pl-[400px] pt-6 pb-12 md:py-12">
          <div className="flex justify-center">
            <SectionTitle title={"Manage Users"} />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-md lg:table-lg">
              <thead className="text-base font-medium text-white rounded-t-lg">
                <tr className="bg-primary">
                  <td></td>
                  <td>User Name</td>
                  <td>User Email</td>
                  <td className="text-center">Make Agent</td>
                  <td className="text-center">Make Admin</td>
                  <td className="text-center">Make as Fraud</td>
                  <td className="text-center">Delete User</td>
                </tr>
              </thead>

              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx} className="text-dark3">
                    <th>{idx + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      <div className="w-32">
                        {user.role === "fraud" ? (
                          ""
                        ) : user.role === "agent" ? (
                          <span className="text-[#70c641]">agent</span>
                        ) : (
                          <button
                            onClick={() => handleMakeAgent(user)}
                            className="text-[#70c641] font-medium bg-[#effee7]  rounded-full text-center px-3 py-2"
                          >
                            Make Agent
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="w-32">
                        {user.role === "fraud" ? (
                          ""
                        ) : user.role === "admin" ? (
                          <span className="text-[#70c641]">admin</span>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="text-[#70c641] font-medium bg-[#effee7]  rounded-full text-center px-3 py-2"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="w-40">
                        {user.role === "fraud" ? (
                          <span className="text-primary">fraud</span>
                        ) : (
                          <button
                            onClick={() => handleFraud(user)}
                            className="text-primary font-medium bg-primary1 rounded-full text-center px-3 py-2"
                          >
                            Make as Fraud
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="w-32">
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-primary font-medium bg-primary1 rounded-full text-center px-3 py-2"
                        >
                          Delete User
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
