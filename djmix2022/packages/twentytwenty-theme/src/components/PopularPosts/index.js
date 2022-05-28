import { styled, connect, decode } from "frontity";
import { fetch } from "frontity";
import Link from "../link";
import { useEffect, useState } from "react";

const PopularPosts = ({ state }) => {
  const [popular, popularSet] = useState([]);
  const data = state.source.get("/");

  useEffect(() => {
    (async () => {
      try {
        const test = await fetch(
          `https://djmixoftheweek.com/wp-json/top-10/v1/popular-posts`
        );
        const response = await test.json();
        popularSet(response);
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, []);
  return (
    <TitleGroup>
      <p>Popular posts:</p>
      <List>
        {popular &&
          popular.map((item, index) => {
            return (
              <ListItem key={item.id}>
                {index + 1}
                {". "}
                <Link link={item.link}>{decode(item.title.rendered)}</Link> (
                {item.visits})
              </ListItem>
            );
          })}
      </List>
    </TitleGroup>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(PopularPosts);

const TitleGroup = styled.div`
  color: white;
  margin-top: 30px;
`;

const List = styled.ul`
  margin: 0;
  font-size: 14px;
`;

const ListItem = styled.li`
  text-align: left;
  margin: 0 0 5px;
  list-style-type: none;
`;
