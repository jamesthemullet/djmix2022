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

  const [leagueData, setLeagueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ratingResponse, postsResponse] = await Promise.all([
          libraries.source.api.get({
            endpoint: "rating",
            params: {
              per_page: 36,
            },
          }),
          libraries.source.api.get({
            endpoint: "posts",
            params: {
              per_page: 36,
            },
          }),
        ]);

        const ratingPages = libraries.source.getTotalPages(ratingResponse);
        const postPages = libraries.source.getTotalPages(postsResponse);

        const ratingRequests = [];
        const postRequests = [];

        for (let page = 1; page <= ratingPages; page++) {
          ratingRequests.push(
            libraries.source.api.get({
              endpoint: "rating",
              params: {
                per_page: 36,
                page,
              },
            })
          );
        }

        for (let page = 1; page <= postPages; page++) {
          postRequests.push(
            libraries.source.api.get({
              endpoint: "posts",
              params: {
                per_page: 36,
                page,
              },
            })
          );
        }

        const [ratingResponses, postResponses] = await Promise.all([
          Promise.all(ratingRequests),
          Promise.all(postRequests),
        ]);

        await Promise.all([
          ...ratingResponses.map((response) =>
            libraries.source.populate({ state, response })
          ),
          ...postResponses.map((response) =>
            libraries.source.populate({ state, response })
          ),
        ]);

        const dataArray = Object.values(state.source.post).map((item) => {
          const ratingId = item.rating;
          if (state.source.rating[ratingId[0]]) {
            item.rating.ratingNumber = Number(
              state.source.rating[ratingId[0]].name
            );
          }
          return item;
        });

        dataArray.sort((a, b) => b.rating.ratingNumber - a.rating.ratingNumber);

        setLeagueData(dataArray);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return data.isReady ? (
    <PostArticle>
      <Header>
        <SectionContainer>
          <PostTitle
            as="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {post.caption && (
            <PostCaption
              dangerouslySetInnerHTML={{ __html: post.caption.rendered }}
            />
          )}
          <PostMeta item={post} />
        </SectionContainer>
        <PostInner size="thin" featuredImage={post.featured_media > 0}>
          <EntryContent>
            <Html2React html={post.content.rendered} />
            <p>League table baby</p>
            <LeagueTable data={leagueData} state={state} />
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

const LeagueTable = ({ data, state }) => (
  <div>
    <ul>
      {data &&
        data.map((item, index) => {
          const ratingId = item.rating;
          return (
            <ListItem key={item.id}>
              {index + 1}. <a href={item.link}>{decode(item.title.rendered)}</a>{" "}
              -
              {!!ratingId[0] &&
                state.source.rating[ratingId] &&
                state.source.rating[ratingId].name}
            </ListItem>
          );
        })}
    </ul>
  </div>
);

export default connect(LeagueOfMixes);
