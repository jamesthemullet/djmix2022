import { styled, connect, decode } from "frontity";
import PostMetaItem from "./post-meta-item";
import { UserIcon, CalendarIcon } from "../icons";

export const PostMetaWrapper = styled.div`
  margin-top: 2rem;
  @media (min-width: 700px) {
    margin-top: 3rem;
  }
`;

export const PostMetaList = styled.ul`
  justify-content: center;
  color: #5d3fd3;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.5rem;
  font-weight: 800;
  list-style: none;
  margin: -1rem 0 0 -2rem;

  svg {
    fill: currentColor;
  }

  @media (min-width: 700px) {
    font-size: 2rem;
    letter-spacing: 1px;
    margin: -1.4rem 0 0 -3rem;
  }
`;

const PostMeta = ({ state, item }) => {
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <PostMetaWrapper>
      <PostMetaList>
        {/* If the post has an author, we render a clickable author text. */}
        {author && (
          <PostMetaItem icon={UserIcon} label="Post Author" link={author.link}>
            By {decode(author.name)}
          </PostMetaItem>
        )}
        <PostMetaItem icon={CalendarIcon} label="Post Date">
          {date.toDateString()}
        </PostMetaItem>
        {/* <PostMetaItem icon={ChatIcon} label="Post Comments">
          {2} Comments
        </PostMetaItem> */}
      </PostMetaList>
    </PostMetaWrapper>
  );
};

export default connect(PostMeta);
