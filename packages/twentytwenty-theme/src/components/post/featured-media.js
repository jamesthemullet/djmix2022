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
  const media = state.source.attachment[id];
  const caption = media?.caption?.rendered;
  const homePageSizes = isHomePage ? "(max-width: 1024px) 100vw, 400px" : "";
  const homePageSizesFirstImage = isHomePage
    ? "(max-width: 1024px) 100vw, 500px"
    : "";

  if (!media) return null;

  const data = state.source.get(state.router.link);

  const firstPostId = isHomePage ? data.items[0]?.id : null;

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
        {isHomePage && postId === firstPostId ? (
          <FirstImage
            alt={media.title.rendered}
            src={media.source_url}
            srcSet={srcset}
            sizes={homePageSizesFirstImage}
            width="100%"
          />
        ) : (
          <Image
            alt={media.title.rendered}
            src={media.source_url}
            srcSet={srcset}
            sizes={homePageSizes}
          />
        )}
        {caption && !isHomePage && (
          <StyledFigCaption
            dangerouslySetInnerHTML={{ __html: caption }}
          ></StyledFigCaption>
        )}
      </SectionContainer>
    </Figure>
  );
};

export default connect(FeaturedMedia);

const Figure = styled.figure`
  position: relative;
`;

const StyledFigCaption = styled.figcaption`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
  margin: 0;
  letter-spacing: 0.5px;

  p {
    margin: 0;
  }
`;

const Image = styled(Img)`
  margin: 0 auto;
  max-width: 100%;
  display: block;
  height: auto;
  object-fit: cover;
  width: 100%;
`;

const FirstImage = styled.img`
  object-fit: cover;
`;
