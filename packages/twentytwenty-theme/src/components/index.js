import { connect, Global, Head, styled } from "frontity";
import Switch from "@frontity/components/switch";
import Footer from "./footer";
import globalStyles from "./styles/global-styles";
import FontFaces from "./styles/font-faces";
import Header from "./header";
import Archive from "./archive";
import Loading from "./loading";
import Post from "./post";
import SearchResults from "./search/search-results";
import SkipLink from "./styles/skip-link";
import MetaTitle from "./page-meta-title";
import PageError from "./page-error";
import LeagueTable from "./league-table";
import Newsletter from "./newsletter";
import GenrePage from "./GenrePage";
import Pagination from "./pagination";
import mq from "./breakpoints";
/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  return (
    <>
      {/* Add global styles for the whole site, like body or a's or font-faces. 
        Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles(state.theme.colors)} />
      <FontFaces />

      {/* Add some metatags to the <head> of the HTML. */}
      <MetaTitle />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Accessibility: Provides ability to skip to main content */}
      <SkipLink as="a" href="#main">
        Skip to main content
      </SkipLink>

      <div style={{ minHeight: "calc(100vh - 190px)" }}>
        {/* Add the header of the site. */}
        <Wrapper>
          <Header />
          {/* Add the main section. It renders a different component depending
          on the type of URL we are in. */}
          <Main id="main" noFlex={data.isSearch}>
            {/* {data.isFetching ? <Loading>...loading</Loading> : ""} */}
            <Switch>
              <SearchResults when={data.isSearch} />
              <Archive when={data.isArchive} />
              <LeagueTable when={data.route === "/league-of-mixes/"} />
              <Newsletter when={data.route === "/newsletter-sign-up/"} />
              <GenrePage when={data.route.startsWith("/genre/")} data={data} />
              <Post when={data.isPostType} />
              <PageError when={data.isError} />
              <Loading when={data.isFetching} />
            </Switch>
          </Main>
        </Wrapper>
        <Pagination />
      </div>
      <Footer />
    </>
  );
};

export default connect(Theme);

const Main = styled.main`
  flex: 1;
  justify-content: flex-start;
  min-width: 300px;
  ${({ noFlex }) => !noFlex && "display: flex;"};
  flex-wrap: wrap;
  align-content: baseline;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  ${mq("md")} {
    flex-direction: column;
  }
`;
