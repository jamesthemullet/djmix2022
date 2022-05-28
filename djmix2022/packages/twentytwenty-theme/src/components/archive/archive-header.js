import { styled } from "frontity";
import SectionContainer from "../styles/section-container";

const Header = ({ label, children, labelColor }) => {
  return (
    <ArchiveHeader>
      <ArchiveHeaderInner>
        <ArchiveTitle>
          <ColoredText color={labelColor}>{label}: </ColoredText>
          {children}
        </ArchiveTitle>
      </ArchiveHeaderInner>
    </ArchiveHeader>
  );
};

export default Header;

const ArchiveHeader = styled.header`
  width: 100%;
  color: #000000;
  text-align: center;
  background-color: #fff;
  padding: 4rem 0;

  @media (min-width: 700px) {
    padding: 8rem 0;
  }
`;

const ArchiveHeaderInner = SectionContainer;

const ArchiveTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;

  @media (min-width: 700px) {
    font-size: 3.2rem;
  }
`;

const ColoredText = styled.span`
  color: #5d3fd3;
  text-transform: capitalize;
`;
