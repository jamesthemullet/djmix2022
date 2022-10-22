import { connect, styled } from "frontity";
import Link from "./link";
import Navigation from "./navigation/navigation";
import SearchButton from "./search/search-button";
import SearchModal from "./search/search-modal";
import MobileMenuButton from "./mobile/menu-button";
import MobileMenuModal from "./mobile/menu-modal";
import PopularPosts from "./PopularPosts";
import Genres from "./genres-list";

import mq from "./breakpoints";

const Header = ({ state }) => {
  const { title, description } = state.frontity;
  const { headerBg } = state.theme.colors;

  return (
    <PageHeader bg={headerBg} id="site-header">
      <HeaderInner>
        <TitleWrapper>
          {/* Heading and Description of the site */}
          <TitleGroup>
            <SiteTitle>
              <StyledLink link="/">{title}</StyledLink>
            </SiteTitle>
            <SiteDescription>{description}</SiteDescription>
          </TitleGroup>

          {/* Mobile menu button and modal */}
          <MobileMenuButton />
          <MobileMenuModal />
        </TitleWrapper>

        <HeaderNavigationWrapper>
          {/* Desktop navigation links */}
          <Navigation />
        </HeaderNavigationWrapper>
        {/* Desktop search button */}
        {state.theme.showSearchInHeader && <SearchButton />}
        <PopularPosts></PopularPosts>
        <Genres></Genres>
      </HeaderInner>
      {/* Global search modal */}
      <SearchModal />
    </PageHeader>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const TitleGroup = styled.div`
  ${mq("lg")} {
    align-items: baseline;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100%;
  color: #fff;
`;

const PageHeader = styled.header`
  z-index: 1;
  background: ${(props) => props.bg};
  position: relative;
  max-width: 300px;
  background-color: #5d3fd3;
  ${mq("sm")} {
    max-width: 100%;
    width: 100%;
  }
`;

const HeaderInner = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.8rem 0;
  max-width: 168rem;
  z-index: 100;
  margin: 0 24px;
`;

const SiteTitle = styled.h1`
  font-size: 4rem;
  font-weight: 400;
  line-height: 1;
  margin: 0;
  letter-spacing: 1.5px;
`;

const SiteDescription = styled.div`
  margin: 0;
  margin-top: 1rem;
  color: #fff;
  font-size: 2.2rem;
  font-weight: 500;
  transition: all 0.15s linear;
  letter-spacing: 1px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderNavigationWrapper = styled.div`
  display: flex;
  width: 100%;
`;
