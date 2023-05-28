import { styled, connect } from "frontity";
import { useEffect, useState } from "react";
import CustomLink from "./custom-link";

const Genres = ({ libraries }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await libraries.source.api.get({
          endpoint: "genre",
          params: {
            per_page: 100,
          },
        });

        const genres = await response.json();

        const filteredGenres = genres.filter((genre) => genre.count > 1);
        filteredGenres.sort((a, b) => b.count - a.count);

        setGenres(filteredGenres);
      } catch (e) {
        console.log(e);
      }
    };

    fetchGenres();
  }, []);
  return (
    <Genre>
      <GenreHeading>Click for your favourite genre:</GenreHeading>
      <GenreList>
        {genres &&
          genres.map((item, index) => {
            return (
              <ListItem key={index}>
                <CustomLink link={item.link}>{item.name}</CustomLink>{" "}
                <span>
                  ({item.count} {item.count > 1 ? "mixes" : "mix"})
                </span>{" "}
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

const GenreHeading = styled.h2`
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
