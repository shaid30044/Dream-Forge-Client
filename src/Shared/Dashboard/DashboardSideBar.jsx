import { Link, NavLink } from "react-router-dom";
import { BsBuildingGear, BsBuilding } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { TbMoneybag, TbUserCog, TbUser } from "react-icons/tb";
import {
  MdOutlineLibraryAddCheck,
  MdOutlineSell,
  MdOutlineManageHistory,
} from "react-icons/md";
import { FaArrowRight, FaArrowLeft, FaRegCommentDots } from "react-icons/fa6";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { RiHomeLine } from "react-icons/ri";
import { useContext, useState } from "react";
import useAdmin from "../../Hooks/useAdmin";
import useReview from "../../Hooks/useReview";
import useAgent from "../../Hooks/useAgent";
import { AuthContext } from "../../Providers/AuthProvider";
import bg from "../../assets/DashboardSideBar.jpg";
import useWishlist from "../../Hooks/useWishlist";
import useProperty from "../../Hooks/useProperty";
import useBought from "../../Hooks/useBought";
import useUser from "../../Hooks/useUser";

const DashboardSideBar = () => {
  const [review] = useReview();
  const [wishlist] = useWishlist();
  const [property] = useProperty();
  const [bought] = useBought();
  const [users] = useUser();
  const [isAgent] = useAgent();
  const [isAdmin] = useAdmin();
  const { user } = useContext(AuthContext);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const reviewCount = review.filter(
    (review) => review.reviewerEmail === user?.email
  );

  const wishlistCount = wishlist.filter(
    (wishlist) => wishlist.buyerEmail === user?.email
  );

  const propertyCount = property.filter(
    (property) => property.agentEmail === user?.email
  );

  const boughtCount = bought.filter(
    (bought) => bought.buyerEmail === user?.email
  );

  const requestCount = bought.filter(
    (request) => request.agentEmail === user?.email
  );

  const soldCount = bought.filter(
    (sold) => sold.agentEmail === user?.email && sold.status === "bought"
  );

  const userPath = [
    {
      name: "My Profile",
      path: "/dashboard/myProfile",
      icon: TbUser,
    },
    {
      name: "Wishlist",
      path: "/dashboard/wishlist",
      icon: GoHeart,
      count: wishlistCount.length,
    },
    {
      name: "Property Bought",
      path: "/dashboard/propertyBought",
      icon: TbMoneybag,
      count: boughtCount.length,
    },
    {
      name: "My Reviews",
      path: "/dashboard/myReviews",
      icon: FaRegCommentDots,
      count: reviewCount.length,
    },
  ];

  const agent = [
    {
      name: "Agent Profile",
      path: "/dashboard/agentProfile",
      icon: TbUser,
    },
    {
      name: "My Added Properties",
      path: "/dashboard/myAddedProperties",
      icon: MdOutlineLibraryAddCheck,
      count: propertyCount.length,
    },
    {
      name: "My Sold Properties",
      path: "/dashboard/mySoldProperties",
      icon: MdOutlineSell,
      count: soldCount.length,
    },
    {
      name: "Requested Properties",
      path: "/dashboard/requestedProperties",
      icon: VscGitPullRequestGoToChanges,
      count: requestCount.length,
    },
  ];

  const admins = [
    {
      name: "Admin Profile",
      path: "/dashboard/adminProfile",
      icon: TbUser,
    },
    {
      name: "Manage Properties",
      path: "/dashboard/manageProperties",
      icon: BsBuildingGear,
      count: property.length,
    },
    {
      name: "Manage Users",
      path: "/dashboard/manageUsers",
      icon: TbUserCog,
      count: users.length,
    },
    {
      name: "Manage Reviews",
      path: "/dashboard/manageReviews",
      icon: MdOutlineManageHistory,
      count: review.length,
    },
  ];

  const pages = [
    {
      name: "Home",
      path: "/",
      icon: RiHomeLine,
    },
    {
      name: "All Properties",
      path: "/allProperties",
      icon: BsBuilding,
    },
  ];

  return (
    <div>
      {/* small device */}

      <div className="md:hidden">
        {!toggle ? (
          <div
            style={{ backgroundImage: `url(${bg})` }}
            className="bg-cover bg-no-repeat w-64 h-screen"
          >
            <div className="overflow-auto font-open w-64 h-screen px-4 bg-black/7 py-12">
              {/* dashboard slide button */}

              <button
                onClick={handleToggle}
                className="absolute top-7 left-3 text-white text-lg"
              >
                <FaArrowLeft />
              </button>

              {/* dashboard */}

              {/* brand name */}

              <div className="text-white text-3xl py-1 md:py-0">
                <span>
                  <Link to="/">
                    <h3 className="text-center">Dream Forge</h3>
                  </Link>
                </span>
              </div>

              {/* user and admin panel */}

              <div className="space-y-6 font-medium border-b-2 border-white pt-8 md:pt-10 lg:pt-16 pb-8 mb-8">
                {isAdmin ? (
                  // admin panel

                  <>
                    {admins.map((admin, idx) => (
                      <div key={idx}>
                        <NavLink
                          to={admin.path}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "text-primary"
                              : "text-white"
                          }
                        >
                          <p className="flex items-center gap-2">
                            {<admin.icon />} {admin.name}{" "}
                            {admin.count ? <span>({admin?.count})</span> : ""}
                          </p>
                        </NavLink>
                      </div>
                    ))}
                  </>
                ) : isAgent ? (
                  // agent panel

                  <>
                    {agent.map((agent, idx) => (
                      <div key={idx}>
                        <NavLink
                          to={agent.path}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "text-primary"
                              : "text-white"
                          }
                        >
                          <p className="flex items-center gap-2">
                            {<agent.icon />} {agent.name}{" "}
                            {agent.count ? <span>({agent?.count})</span> : ""}
                          </p>
                        </NavLink>
                      </div>
                    ))}
                  </>
                ) : (
                  // user panel

                  <>
                    {userPath.map((user, idx) => (
                      <div key={idx}>
                        <NavLink
                          to={user.path}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending"
                              : isActive
                              ? "text-primary"
                              : "text-white"
                          }
                        >
                          <p className="flex items-center gap-2">
                            {<user.icon />} {user.name}{" "}
                            {user.count ? <span>({user?.count})</span> : ""}
                          </p>
                        </NavLink>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* pages */}

              <div className="space-y-6 font-medium">
                {pages.map((page, idx) => (
                  <div key={idx}>
                    <NavLink
                      to={page.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-primary"
                          : "text-white"
                      }
                    >
                      <p className="flex items-center gap-2">
                        {<page.icon />} {page.name}
                      </p>
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleToggle}
            className="bg-transparent hover:bg-transparent text-dark1 px-3 py-3 mt-4"
          >
            <FaArrowRight />
          </button>
        )}
      </div>

      {/* medium and large device */}

      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="bg-cover bg-no-repeat w-64 h-screen"
      >
        <div className="hidden md:block overflow-auto font-open w-64 h-screen px-4 bg-black/70 py-12">
          {/* brand name */}

          <div className="text-white text-3xl  py-1 md:py-0">
            <span>
              <Link to="/">
                <h3 className="text-center">Dream Forge</h3>
              </Link>
            </span>
          </div>

          {/* user and admin panel */}

          <div className="space-y-6 font-medium border-b-2 border-white pt-8 md:pt-10 lg:pt-16 pb-8 mb-8">
            {isAdmin && (
              // admin panel

              <>
                {admins.map((admin, idx) => (
                  <div key={idx}>
                    <NavLink
                      to={admin.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-primary"
                          : "text-white"
                      }
                    >
                      <p className="flex items-center gap-2">
                        {<admin.icon />} {admin.name}{" "}
                        {admin.count ? <span>({admin?.count})</span> : ""}
                      </p>
                    </NavLink>
                  </div>
                ))}
              </>
            )}
            {isAgent && (
              // agent panel
              <>
                {agent.map((agent, idx) => (
                  <div key={idx}>
                    <NavLink
                      to={agent.path}
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-primary"
                          : "text-white"
                      }
                    >
                      <p className="flex items-center gap-2">
                        {<agent.icon />} {agent.name}{" "}
                        {agent.count ? <span>({agent?.count})</span> : ""}
                      </p>
                    </NavLink>
                  </div>
                ))}
              </>
            )}
            {!isAgent ||
              (!isAdmin && (
                // user panel

                <>
                  {userPath.map((user, idx) => (
                    <div key={idx}>
                      <NavLink
                        to={user.path}
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "text-primary"
                            : "text-white"
                        }
                      >
                        <p className="flex items-center gap-2">
                          {<user.icon />} {user.name}{" "}
                          {user.count ? <span>({user?.count})</span> : ""}
                        </p>
                      </NavLink>
                    </div>
                  ))}
                </>
              ))}
          </div>

          {/* pages */}

          <div className="space-y-6 font-medium">
            {pages.map((page, idx) => (
              <div key={idx}>
                <NavLink
                  to={page.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-primary"
                      : "text-white"
                  }
                >
                  <p className="flex items-center gap-2">
                    {<page.icon />} {page.name}
                  </p>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
