import React, { useEffect, useState } from "react";

const useDOBdate = (datestring) => {
  const [dateYear, setdateYear] = useState("");
  useEffect(() => {
    const year = new Date() - new Date(datestring);
    setdateYear(year);
  }, [datestring]);
  return Math.floor(dateYear / 1000 / 60 / 60 / 24 / 365);
};

export default useDOBdate;
