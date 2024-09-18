import React from "react";
import { useLocation } from "react-router-dom";

const PropertyToRent = () => {
  const location = useLocation();
  const { filteredProperties, searchQuery } = location.state;

  const resultsCount = filteredProperties.length;

  return (
    <div>
      <h1>Properties for Rent</h1>
      <h2>
        {resultsCount} places matched "{searchQuery}"
      </h2>
      <ul>
        {filteredProperties.map((property) => (
          <li key={property.id}>
            <img src={property.picture} alt={property.type} />
            <h2>
              {property.type} in {property.cityortown}
            </h2>
            <p>{property.smalldescription}</p>
            <p>{property.bathrooms}</p>
            <p>Price: {property.price}</p>
            <a href={property.url}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyToRent;
