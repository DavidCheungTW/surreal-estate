import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import getProperty from "../requests/getProperty";
import Alert from "./Alert";
import SideBar from "./SideBar";
import "../styles/properties.css";

const Properties = ({ userID }) => {
  const { search } = useLocation();
  const [properties, setProperties] = useState([]);
  const [alert, setAlert] = useState({ message: "" });

  useEffect(() => {
    const query = search;
    getProperty(setProperties, setAlert, query);
  }, [search]);

  const handleSaveProperty = (propertyId) => {
    const parmObj = {
      propertyListing: propertyId,
      fbUserId: userID,
    };
    axios
      .post(
        "http://localhost:4000/api/v1/Favourite?populate=propertyListing",
        parmObj
      )
      .then(() => {
        setAlert({
          message: "Favourite added.",
          isSuccess: true,
        });
      })
      .catch(() => {
        setAlert({
          message: "Server error. Please try again later.",
          isSuccess: false,
        });
      });
  };

  return (
    <div className="properties">
      {/* <h3>Properties Page</h3> */}
      <div className="column left">
        {/* <SideBar search={search} /> */}
        <SideBar />
      </div>
      <div className="column right">
        {alert.message && (
          <Alert message={alert.message} isSuccess={alert.isSuccess} />
        )}
        {!alert.message && properties.length > 0 && (
          <>
            {properties.map((property) => (
              <div key={property._id} className="item">
                <PropertyCard
                  key={property._id}
                  {...property}
                  userID={userID}
                  onSaveProperty={handleSaveProperty}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Properties;
