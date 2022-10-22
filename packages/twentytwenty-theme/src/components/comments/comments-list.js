import React from "react";
import { connect, styled } from "frontity";

const CommentsList = ({ state, libraries, postId }) => {
  const data = state.source.get(`@comments/${postId}`);
  const Html2React = libraries.html2react.Component;

  return (
    <>
      <Container>
        <p>
          {data.items.length} comment{data.items.length !== 1 ? "s" : ""}
        </p>
        {data.items.map(({ id }) => {
          return (
            <>
              <Comment>
                <div>
                  {state.source.comment[id].author_name || "Anonymous"} says:
                </div>
                <CommentContent>
                  <Html2React
                    html={state.source.comment[id].content.rendered}
                  />
                </CommentContent>
              </Comment>
            </>
          );
        })}
      </Container>
    </>
  );
};

export default connect(CommentsList);

const Container = styled.div`
  margin: 40px 0 20px;
  border-bottom: 1px solid #5d3fd3;
`;

const Comment = styled.div`
  padding: 10px 0;
`;
const CommentContent = styled.div`
  padding-left: 10px;
`;
