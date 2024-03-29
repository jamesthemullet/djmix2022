import { connect, styled } from "frontity";
import Archive from "../archive";
import ArchiveHeader from "../archive/archive-header";
import SectionContainer from "../styles/section-container";
import SearchForm from "./search-form";

const reverseFormat = (query) => query.replace("+", " ");

const SearchResults = ({ state }) => {
  const { primary } = state.theme.colors;

  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  // data.total → total pages that match the current path/url
  // data.searchQuery → query done to get search results
  const { total, searchQuery } = data;
  const isEmpty = data.total === 0;

  return (
    <>
      <ArchiveHeader label="Search" labelColor={primary}>
        {searchQuery && <span>{`“${reverseFormat(searchQuery)}”`}</span>}
        <IntroText size="thin">
          {isEmpty ? (
            <Text>
              We could not find any results for your search. You can give it
              another try through the search form below.
            </Text>
          ) : (
            <Text>
              We found {total} {total === 1 ? "result" : "results"} for your
              search.
            </Text>
          )}
        </IntroText>
      </ArchiveHeader>

      {isEmpty ? (
        <SearchContainer size="thin">
          <SearchForm />
        </SearchContainer>
      ) : (
        <Archive showExcerpt={true} showMedia={false} />
      )}
    </>
  );
};

export default connect(SearchResults);

const IntroText = styled(SectionContainer)`
  width: 100%;
  margin-top: 2rem;
  font-weight: initial;

  @media (min-width: 700px) {
    font-size: 2rem;
    margin-top: 2.5rem;
  }
`;

const Text = styled.p`
  margin: 0 0 1em 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchContainer = styled(SectionContainer)`
  max-width: 500px;

  button {
    background-color: #5d3fd3;
    padding: 10px 20px;
    color: white;
    font-family: "Oswald", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      Helvetica, sans-serif;
    letter-spacing: 1px;
    text-transform: capitalize;
    font-weight: 500;
  }
`;
