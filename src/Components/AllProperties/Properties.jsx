import useProperty from "../../Hooks/useProperty";
import SectionTitle from "../../Shared/SectionTitle";
import { useEffect, useState } from "react";
import SearchProperties from "./SearchProperties";
import notFound from "../../assets/NotFound.jpg";

const Properties = () => {
  const [property] = useProperty();

  const [search, setSearch] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value.trim().toLowerCase();

    setSearch(search);
  };

  useEffect(() => {
    const filteredProperties = property.filter((property) =>
      property.propertyTitle.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredProperties);

    setShowNoResults(filteredProperties.length === 0);
  }, [property, search]);

  return (
    <div className="font-open px-4 md:px-10 lg:px-20 py-20 lg:py-32">
      <SectionTitle title={"All Properties"} />

      <div className="pb-10">
        {/* search functionality */}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center"
        >
          <input
            onChange={handleSearch}
            type="search"
            name="search"
            value={search}
            id="search"
            placeholder="Search Property"
            className="border-2 border-dark5 border-r-0 focus:border-primary focus:outline-none bg-transparent rounded-full rounded-r-none duration-300 w-full md:w-2/3 lg:w-1/2 pl-8 md:pl-10 pr-4 py-2 md:py-2.5"
          />

          <input
            type="submit"
            value="Search"
            className="text-white font-medium border-2 border-primary border-l-0 rounded-full rounded-l-none bg-primary cursor-pointer px-6 md:px-10"
          />
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12">
        {showNoResults ? (
          // not found

          <div className="md:col-span-2 lg:col-span-3 lg:px-40">
            <img src={notFound} />
          </div>
        ) : searchResults.length > 0 ? (
          // search properties

          searchResults.map((property, idx) => (
            <SearchProperties key={idx} property={property} />
          ))
        ) : (
          // all properties

          property.map((property, idx) => (
            <SearchProperties key={idx} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default Properties;
