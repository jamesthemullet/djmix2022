import { styled, connect } from "frontity";
import { useEffect, useState, useRef } from "react";
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
  const [genrePosts, setGenrePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPagesAvailable, setTotalPagesAvailable] = useState(0);
  const [totalPageesLoaded, setTotalPagesLoaded] = useState(0);
  const [allGenres, setAllGenres] = useState({});

  const loadMorePosts = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await libraries.source.api.get({
        endpoint: "posts",
        params: {
          per_page: 12,
          genre: data.id,
          page: page + 1, // Load the next page of posts
        },
      });

      const posts = await response.json();

      posts.map((post) => {
        const genreNames = post.genre.map((genreId) => {
          const genre = allGenres.find((genre) => genre.id === genreId);
          return genre.name;
        });
        post.genreNames = genreNames;
      });

      setGenrePosts((prevGenres) => [...prevGenres, ...posts]);
      setPage((prevPage) => prevPage + 1);
      const pagesLoadedSoFar = totalPageesLoaded;
      setTotalPagesLoaded(pagesLoadedSoFar + 1);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const genreResponse = await libraries.source.api.get({
          endpoint: "genre",
          params: {
            per_page: 100,
          },
        });

        const genres = await genreResponse.json();
        setAllGenres(genres);

        const selectedGenre = genres.find(
          (genre) =>
            genre.slug === data.link.replace("/genre/", "").replace("/", "")
        );

        const genrePageCount = selectedGenre.count;

        const roundedGenrePageCount = Math.ceil(genrePageCount / 12);

        const response = await libraries.source.api.get({
          endpoint: "posts",
          params: {
            per_page: 12 * roundedGenrePageCount,
            genre: selectedGenre.id,
          },
        });

        const posts = await response.json();

        // for each post, maps the genres ids from the genre array on post, to get the genre name from the genres array state
        posts.map((post) => {
          const genreNames = post.genre.map((genreId) => {
            const genre = genres.find((genre) => genre.id === genreId);
            return genre.name;
          });
          post.genreNames = genreNames;
        });

        setGenrePosts(posts);
        setTotalPagesAvailable(roundedGenrePageCount);
        const pagesLoadedSoFar = totalPageesLoaded;
        setTotalPagesLoaded(pagesLoadedSoFar + 1);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      {genrePosts.length > 0 && // Only render if there are posts in genres array
        genrePosts.map((item, index) => (
          <Post key={index}>
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
                <Genre>{[...item.genreNames.join(", ")]}</Genre>
              </SectionContainer>
            </PostHeader>
          </Post>
        ))}

      {totalPagesAvailable > totalPageesLoaded && (
        <MoreButton onClick={loadMorePosts}>Load More</MoreButton>
      )}
    </>
  );
};

const ImageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const MoreButton = styled.button`
  background-color: #5d3fd3;
  padding: 10px 20px;
  color: white;
  font-family: "Oswald", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, sans-serif;
  letter-spacing: 1px;
  text-transform: capitalize;
  font-weight: 500;
  margin: 20px auto 0;
  cursor: pointer;
`;

export default connect(GenrePage);
