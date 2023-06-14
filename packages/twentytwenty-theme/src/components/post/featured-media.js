import { connect, styled } from "frontity";
import Img from "@frontity/components/image";
import SectionContainer from "../styles/section-container";

/**
 * The featured image/video of the post.
 *
 * @param props -
 * - `state`: The Frontity state
 * - `id`: The ID of the featured image/video.
 * - `className`: Required in order to wrap the component with `styled()`.
 * @returns React element.
 */
const FeaturedMedia = ({ state, id, className, isHomePage, postId }) => {
  console.log(30, postId);
  const media = state.source.attachment[id];
  const homePageSizes = isHomePage ? "(max-width: 1024px) 100vw, 400px" : "";

  if (!media) return null;

  const data = state.source.get(state.router.link);
  console.log(24, data);
  const firstPostId = data.items[0].id;
  console.log(25, firstPostId);

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Figure className={className}>
      <SectionContainer
        size="medium"
        isHomePage={
          state.router.link === "/" || state.router.link.includes("/page/")
        }
      >
        {postId === firstPostId ? (
          <img
            alt={media.title.rendered}
            src={media.source_url}
            srcSet={srcset}
            sizes={homePageSizes}
          />
        ) : (
          <Image
            alt={media.title.rendered}
            src={media.source_url}
            srcSet={srcset}
            sizes={homePageSizes}
          />
        )}
      </SectionContainer>
    </Figure>
  );
};

export default connect(FeaturedMedia);

const Figure = styled.figure`
  position: relative;
`;

const Image = styled(Img)`
  margin: 0 auto;
  max-width: 100%;
  display: block;
  height: auto;
  object-fit: cover;
  width: 100%;
`;
