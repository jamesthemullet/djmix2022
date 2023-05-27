import { styled, connect } from "frontity";
import {
  Post as _Post,
  PostHeader,
  PostInner,
  PostTitle,
  SectionContainer,
} from "./post/post-item";

const Newsletter = ({ state }) => {
  const data = state.source.get(state.router.link);

  return data.isReady ? (
    <PostArticle>
      <Header>
        <SectionContainer>
          <PostTitle
            as="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: "Newsletter Sign-Up" }}
          />
        </SectionContainer>
        <PostBody>
          <iframe
            title="Newsletter Sign-Up"
            src="https://blog.djmixoftheweek.com/newsletter-sign-up/"
            height="300px"
          ></iframe>
        </PostBody>
      </Header>
    </PostArticle>
  ) : null;
};

const PostBody = styled(PostInner)`
  padding: 0;
  margin: 50px auto 0;
  height: 300px; ;
`;

const PostArticle = styled(_Post)`
  padding-top: 0 !important;
`;

const Header = styled(PostHeader)`
  background-color: #fff;
  margin: 0;
  padding: 2rem 0;
`;

export default connect(Newsletter);
