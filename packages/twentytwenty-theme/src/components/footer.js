import { styled, connect } from "frontity";
import Link from "./link";
import SectionContainer from "./styles/section-container";
import SearchButton from "./search/search-button";
import PopularPosts from "./PopularPosts";
import Genres from "./genres-list";

import mq from "./breakpoints";

const Footer = ({ state }) => {
  console.log(100000, state);
  const currentYear = new Date().getFullYear();
  const { footerBg } = state.theme.colors;

  return (
    <SiteFooter bg={footerBg} role="contentinfo">
      {state.theme.isMobile && (
        <MobileExtra>
          {state.theme.showSearchInHeader && <SearchButton />}
          <PopularPosts></PopularPosts>
          <Genres></Genres>
        </MobileExtra>
      )}
      <SiteFooterInner>
        <Credits>
          <Copyright>
            &copy; {currentYear}{" "}
            <Link link={state.frontity.url}>{state.frontity.title}</Link>
          </Copyright>
        </Credits>
      </SiteFooterInner>
    </SiteFooter>
  );
};

export default connect(Footer);

const SiteFooterInner = styled(SectionContainer)`
  align-items: baseline;
  display: flex;
  justify-content: center;
`;

const SiteFooter = styled.footer`
  border-color: #dcd7ca;
  border-style: solid;
  border-width: 0;
  padding: 3rem 0;
  background-color: ${(props) => props.bg};
  color: #000000;

  @media (min-width: 700px) {
    font-size: 1.8rem;
    padding: 4.3rem 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Credits = styled.div`
  @media (min-width: 700px) {
    display: flex;
  }
`;

const Copyright = styled.p`
  font-weight: 600;
  margin: 0;

  @media (min-width: 700px) {
    font-weight: 700;
  }
`;

const MobileExtra = styled.div`
  display: none;
  ${mq("md")} {
    padding: 2rem;
    background-color: #5d3fd3;
    display: flex;
    flex-direction: column;
  }
`;
