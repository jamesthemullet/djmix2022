import { styled, connect } from "frontity";
import { useEffect, useState } from "react";
import {
  Post,
  PostItemTitle,
  PostLink,
  PostHeader,
  SectionContainer,
  Genre,
} from "./post/post-item";
import FeaturedMedia from "./post/featured-media";
import PostCategories from "./post/post-categories";

const GenrePage = ({ state, libraries, data }) => {
  let [id, setid] = useState("");
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    setid(data.id);
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await libraries.source.api.get({
          endpoint: "posts",
          params: {
            per_page: 100,
            genre: id,
          },
        });

        const returnedData = await response.json();

        setGenres(returnedData);
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, [id]);

  return (
    <>
      {genres &&
        genres.map((item, index) => {
          const genre = item.genre;
          const genreArray = [];
          genre &&
            Object.entries(genre).map((genre) => {
              genreArray.push(state.source.genre[genre[1]].name);
            });
          return (
            <Post>
              <PostHeader>
                <SectionContainer
                  featuredImage={state.theme.featuredMedia.showOnArchive}
                  isHomePage={
                    state.router.link === "/" ||
                    state.router.link.includes("/page/")
                  }
                >
                  <PostLink link={item.link}>
                    <PostItemTitle
                      className="heading-size-1"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                  </PostLink>

                  {item.featured_media && (
                    <PostLink link={item.link}>
                      <ImageContainer>
                        <FeaturedMedia id={item.featured_media} />
                      </ImageContainer>
                    </PostLink>
                  )}
                  <Genre>{[...genreArray.join(", ")]}</Genre>
                </SectionContainer>
              </PostHeader>
            </Post>
          );
        })}
    </>
  );
};

const ImageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

// Connect the Header component to get access to the `state` in it's `props`
export default connect(GenrePage);
