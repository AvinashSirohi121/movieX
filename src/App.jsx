import { useEffect } from "react";
import "./App.css";
import { fetchDatafromAPI } from "./utils/api";
import { getApiConfiguration } from "./redux/Slices/homeSlice";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import SearchResult from "./pages/SearchResult/SearchResult";
import Explore from "./pages/Explore/Explore";
import Details from "./pages/Details/Details";
import NotFoundError from "./pages/404/NotFoundError";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log("URL ==>", url);

  const fetchApiConfig = async () => {
    await fetchDatafromAPI("/configuration")
      .then((res) => {
        console.log("configurations =>", res);
        const url = {
          backdrop: res?.data?.images?.secure_base_url + "original",
          poster: res?.data?.images?.secure_base_url + "original",
          profile: res?.data?.images?.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      })
      .catch((e) => {
        console.log("error =>>", e);
      });
  };
  useEffect(() => {
    console.log("Calling getMovieData");
    fetchApiConfig();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:query" element={<SearchResult />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="*" element={<NotFoundError />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
