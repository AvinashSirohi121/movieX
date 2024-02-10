/* eslint-disable react/prop-types */
import "./Genres.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  // console.log("Generes in Generes =>",genres);
  return (
    <div className="genres">
      {data &&
        data?.map((g) => {
          if (!genres[g]?.name) return;
          return (
            <div className="genre" key={g}>
              {genres[g]?.name}
            </div>
          );
        })}
    </div>
  );
};

export default Genres;
