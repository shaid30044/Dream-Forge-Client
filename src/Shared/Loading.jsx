import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div>
      <SyncLoader color="#f15859" margin={10} size={20} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
