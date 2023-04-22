import { styled, connect } from "frontity";
import {
  Post as _Post,
  PostHeader,
  PostInner,
  PostTitle,
  SectionContainer,
} from "./post/post-item";
import { useEffect, useState } from "react";

const Newsletter = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    const iframe = document.querySelector("iframe");

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
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
        </SectionContainer>
        <PostBody>
          <iframe
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

const ListItem = styled.li`
  text-align: left;
  margin: 0 0 0 2rem;
  list-style-type: none;
`;

export default connect(Newsletter);
