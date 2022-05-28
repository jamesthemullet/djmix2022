import { styled, connect } from "frontity";
import { useEffect, useState } from "react";
import Link from "./link";

const Genres = ({ state, libraries }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await libraries.source.api.get({
          endpoint: "genre",
          params: {
            per_page: 100,
          },
        });

        await libraries.source.populate({
          state,
          response,
        });

        let genreArray = [];
        Object.entries(state.source.genre).forEach((item) => {
          console.log(39, item[1]);
          genreArray.push(item[1]);
        });

        console.log(40, genreArray);

        genreArray.sort((a, b) => b.count - a.count);

        setGenres(genreArray);
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, []);
  return (
    <Genre>
      <GenreHeading>Click for your favourite genre:</GenreHeading>
      <GenreList>
        {genres &&
          genres.map((item, index) => {
            return (
              <ListItem key={index}>
                <Link link={item.link}>{item.name}</Link>{" "}
                <span>
                  ({item.count} {item.count > 1 ? "mixes" : "mix"})
                </span>
              </ListItem>
            );
          })}
      </GenreList>
    </Genre>
  );
};

const Genre = styled.div`
  color: white;
  margin-top: 30px;
  text-align: left;
`;

const GenreHeading = styled.h4`
  line-height: 1.5;
  margin: 0 0 1em 0;
  font-size: inherit;
`;

const GenreList = styled.ul`
  list-style-type: none;
  margin: 0;
`;

const ListItem = styled.li`
  margin: 0;
  font-size: 0.8em;
  span {
    padding-left: 4px;
  }
`;

export default connect(Genres);
