import { Helmet } from "react-helmet-async";
import useBought from "../../../Hooks/useBought";

const PropertyBought = () => {
  const [bought] = useBought();

  return (
    <div>
      <Helmet>
        <title>Dream Forge | Property Bought</title>
      </Helmet>
    </div>
  );
};

export default PropertyBought;
