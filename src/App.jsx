import { useEffect } from "react";
import "./App.css";
import { fetchDatafromAPI } from "./utils/api";
import { getApiConfiguration, getGenres } from "./redux/Slices/homeSlice";
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
  const { url, genres } = useSelector((state) => state.home);
  //console.log("URL ==>", url, " Generes =>", genres);

  const fetchApiConfig = async () => {
    await fetchDatafromAPI("/configuration")
      .then((res) => {
        //console.log("configurations =>", res);
        const url = {
          backdrop: res?.images?.secure_base_url + "original",
          poster: res?.images?.secure_base_url + "original",
          profile: res?.images?.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
      })
      .catch((e) => {
        console.log("error =>>", e);
      });
  };

  const genersCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];

    let allGeneres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDatafromAPI(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    //console.log("Data in App.jsx =>>",data);
    data.map((items) =>
      items?.data?.genres.map((item) => (allGeneres[item.id] = item))
    );

    // console.log("All Generes =>",allGeneres);
    if (allGeneres != "" && allGeneres != []) dispatch(getGenres(allGeneres));
  };

  useEffect(() => {
    //console.log("Calling getMovieData");
    fetchApiConfig();
    genersCall();
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
