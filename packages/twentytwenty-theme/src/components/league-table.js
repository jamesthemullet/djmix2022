import { styled, connect, decode } from "frontity";
import {
  EntryContent,
  Post as _Post,
  PostHeader,
  PostInner,
  PostTitle,
  PostCaption,
  SectionContainer,
} from "./post/post-item";
import { useEffect, useState } from "react";

import PostMeta from "./post/post-meta";

const LeagueOfMixes = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];

  const Html2React = libraries.html2react.Component;

  let test = [];

  const LeagueTable = () => {
    const [data, dataSet] = useState();
    useEffect(() => {
      (async () => {
        try {
          const response = await libraries.source.api.get({
            endpoint: "rating",
            params: {
              per_page: 100,
            },
          });

          const pages = libraries.source.getTotalPages(response);

          await libraries.source.populate({
            state,
            response,
          });

          const requests = [];

          for (let page = 1; page <= pages; page++) {
            requests.push(
              libraries.source.api.get({
                endpoint: "rating",
                params: {
                  per_page: 100,
                  page,
                },
              })
            );
          }

          const responses = await Promise.all(requests);

          await Promise.all(
            responses.map((response) =>
              libraries.source.populate({ state, response })
            )
          );
        } catch (e) {
          return;
        }
      })();
      (async () => {
        try {
          const response = await libraries.source.api.get({
            endpoint: "posts",
            params: {
              per_page: 100,
            },
          });

          const pages = libraries.source.getTotalPages(response);

          await libraries.source.populate({
            state,
            response,
          });

          const requests = [];

          for (let page = 1; page <= pages; page++) {
            requests.push(
              libraries.source.api.get({
                endpoint: "posts",
                params: {
                  per_page: 100,
                  page,
                },
              })
            );
          }

          const responses = await Promise.all(requests);

          await Promise.all(
            responses.map((response) =>
              libraries.source.populate({ state, response })
            )
          );

          test = state.source.post;

          const dataArray = [];
          const testArray = Object.entries(test);
          testArray.forEach((item) => {
            if (state.source.rating[item[1].rating[0]]) {
              item[1].rating.ratingNumber = Number(
                state.source.rating[item[1].rating[0]].name
              );
            }
            dataArray.push(item[1]);
          });

          dataArray.sort(
            (a, b) => b.rating.ratingNumber - a.rating.ratingNumber
          );
          dataSet(dataArray);
        } catch (e) {
          console.log(e);
          return;
        }
      })();
    }, []);
    return (
      <div>
        <ul>
          {data &&
            data.map((item, index) => {
              const ratingId = item.rating;
              return (
                <ListItem key={item.id}>
                  {index + 1}
                  {". "}
                  <a href={item.link}>{decode(item.title.rendered)}</a> -
                  {!!ratingId[0] &&
                    state.source.rating[ratingId] &&
                    state.source.rating[ratingId].name}
                </ListItem>
              );
            })}
        </ul>
      </div>
    );
  };

  return data.isReady ? (
    <PostArticle>
      <Header>
        <SectionContainer>
          <PostTitle
            as="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {/* If the post has a caption (like attachments), render it */}
          {post.caption && (
            <PostCaption
              dangerouslySetInnerHTML={{ __html: post.caption.rendered }}
            />
          )}
          {/* The post's metadata like author, publish date, and comments */}
          <PostMeta item={post} />
        </SectionContainer>
        <PostInner size="thin" featuredImage={post.featured_media > 0}>
          <EntryContent>
            <Html2React html={post.content.rendered} />
            <p>League table baby</p>
            <LeagueTable />
          </EntryContent>
        </PostInner>
      </Header>
    </PostArticle>
  ) : null;
};

const PostArticle = styled(_Post)`
  padding-top: 0 !important;
`;

const Header = styled(PostHeader)`
  background-color: #fff;
  margin: 0;
  padding: 2rem 0;
`;

const ListItem = styled.li`
  text-align: left;
  margin: 0 0 0 2rem;
  list-style-type: none;
`;

export default connect(LeagueOfMixes);
