import { styled } from "frontity";

// const getMaxWidth = (props) => maxWidths[props.size] || maxWidths["medium"];

const SectionContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: calc(100%);

  @media (min-width: 700px) {
    width: calc(100%);
  }
  ${({ isHomePage }) =>
    isHomePage &&
    `img {
      height: 250px;
    }
  `};
`;

export default SectionContainer;
