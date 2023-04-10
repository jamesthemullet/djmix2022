import { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../link";

/**
 * Pagination Component
 *
 * It's used to allow the user to paginate between a list of posts.
 *
 * The `state`, `actions`, `libraries` props are provided by the global context,
 * when we wrap this component in `connect(...)`
 */
const Pagination = ({ state, actions }) => {
  // Get the total posts to be displayed based for the current link
  const { next, previous } = state.source.get(state.router.link);

  // Pre-fetch the the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (next) actions.source.fetch(next);
  }, []);

  return (
    <PaginationSection>
      {/* If there's a next page, render this link */}
      {next && (
        <Link role="button" link={next}>
          <Text>← Older posts</Text>
        </Link>
      )}

      {/* If there's a previous page, render this link */}
      {previous && (
        <Link role="button" link={previous}>
          <Text>Newer posts →</Text>
        </Link>
      )}
    </PaginationSection>
  );
};

/**
 * Connect Pagination to global context to give it access to
 * `state`, `actions`, `libraries` via props
 */
export default connect(Pagination);

const Text = styled.em`
  display: inline-block;
  background: #5d3fd3;
  padding: 10px 20px;
  color: white;
  margin: 0 20px;
  margin-top: 20px;
`;

const PaginationSection = styled.div`
  color: #000000;
  display: flex;
  justify-content: center;

  a {
    color: inherit;
    text-decoration: none;
  }
`;
