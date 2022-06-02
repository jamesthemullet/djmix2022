import React from "react";
import { connect, styled } from "frontity";
import Loading from "../loading";

const CommentsForm = ({ actions, state, postId }) => {
  const form = state.comments.forms[postId];
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.comments.submit(postId);
        }}
      >
        {/* If the form is submitting, we can show some kind of a loading state */}
        {form?.isSubmitting && <Loading />}
        <label>
          What do you think of this mix?
          <TextArea
            name="content"
            onChange={(e) =>
              actions.comments.updateFields(postId, {
                content: e.target.value,
              })
            }
            value={state.comments.forms[postId]?.fields?.content || ""}
          />
          {/* Show the errors for the individual fields.
            E.g. content of a comment cannot be empty and the email must be valid */}
          {form?.errors?.content}
        </label>

        <label>
          Name:
          <Input
            name="author_name"
            onChange={(e) =>
              actions.comments.updateFields(postId, {
                authorName: e.target.value,
              })
            }
            value={state.comments.forms[postId]?.fields?.authorName || ""}
          />
          {form?.errors?.authorName}
        </label>

        <label>
          Email:
          <Input
            name="author_email"
            onChange={(e) =>
              actions.comments.updateFields(postId, {
                authorEmail: e.target.value,
              })
            }
            value={state.comments.forms[postId]?.fields?.authorEmail || ""}
          />
          {form?.errors?.authorEmail}
        </label>

        {/* Show the REST API error messages.
            E.g. "Sorry, you must be logged in to comment." */}
        {form?.errorMessage && <div>ERROR: {form?.errorMessage}</div>}

        {/* If the form was submitted successfully we can show a confirmation */}
        <div>
          {form?.isSubmitted && "The comment was submitted successfully!"}
        </div>

        <Submit type="submit" />
      </form>
    </>
  );
};

const TextArea = styled.textarea`
  width: 100%;
  min-height: 8rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  display: block;
  margin-top: 1rem;
  min-height: 3rem;
`;

const Submit = styled.input`
  display: inline-block;
  background: #5d3fd3;
  padding: 10px 20px;
  color: white;
  margin-top: 20px;
  font-family: inherit;
  font-size: inherit;
  border: none;
  font-style: italic;
`;

export default connect(CommentsForm);
