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

const GenrePage = ({ state, libraries, data }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    (async () => {
      if (!data.id || data.id === "") {
        return;
      }

      try {
        const genreResponse = await libraries.source.api.get({
          endpoint: "genre",
          params: {
            per_page: 100,
          },
        });

        const genres = await genreResponse.json();

        const genrePageCount = genres.filter((genre) => genre.id === data.id)[0]
          .count;

        const roundedGenrePageCount = Math.ceil(genrePageCount / 12);

        const requests = [];

        for (let page = 1; page <= roundedGenrePageCount; page++) {
          requests.push(
            libraries.source.api.get({
              endpoint: "posts",
              params: {
                per_page: 12,
                genre: data.id,
                page,
              },
            })
          );
        }

        const genreArrays = await Promise.all(requests).then((responses) =>
          Promise.all(responses.map((r) => r.json()))
        );

        let genreArray = Object.values(genreArrays).flat();

        setGenres(genreArray);
      } catch (e) {
        console.log(e);
        return;
      }
    })();
  }, [data.id]);

  return (
    <>
      {genres &&
        genres.map((item) => {
          const genreArray = [];

          return (
            <Post key={item.featured_media}>
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
