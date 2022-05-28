import { styled, connect } from "frontity";
import { useEffect, useState } from "react";

const GenrePage = ({ state, libraries }) => {
  console.log(2, state);
  console.log(3, state.router.link.replace("/genre/", ""));
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await libraries.source.api.get({
          endpoint: "genrde",
          params: {
            per_page: 100,
          },
        });

        await libraries.source.populate({
          state,
          response,
        });

        console.log(60, state.source.genre);

        // let genreArray = [];
        // Object.entries(state.source.genre).forEach((item) => {
        //   console.log(39, item[1]);
        //   genreArray.push(item[1]);
        // });

        // console.log(40, genreArray);

        // genreArray.sort((a, b) => b.count - a.count);

        // setGenres(genreArray);
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, []);
  return (
    <>
      <p> genre yo</p>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(GenrePage);
