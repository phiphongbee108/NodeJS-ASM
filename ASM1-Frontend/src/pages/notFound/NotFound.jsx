import React, { useEffect } from "react";
import axios from "../../utils/axios";
import "./NotFound.css";

const NotFound = () => {
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get()
        .then((response) => {
          console.log("response:", response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);
  return <div className="message_text">Route not found</div>;
};

export default NotFound;
