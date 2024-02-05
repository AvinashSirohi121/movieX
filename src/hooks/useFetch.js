import { useEffect, useState } from "react";
import { fetchDatafromAPI } from "../utils/api";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDatafromAPI(url)
      .then((res) => {
        console.log("Response =>", res);
        if (res != null && res != "" && res != undefined) {
          setData(res);
        }
      })
      .catch((e) => {
        console.log("Error in useFetch =>", e);
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
