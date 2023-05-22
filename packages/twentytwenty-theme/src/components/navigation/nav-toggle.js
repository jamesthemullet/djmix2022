import { styled, css } from "frontity";

// Base styling for all toggle buttons
export const BaseToggle = styled.button`
  appearance: none;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  text-align: inherit;
  user-select: none;
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  font-size: inherit;
  font-weight: 400;
  letter-spacing: inherit;
  padding: 0;
  text-transform: none;
  align-items: center;
  display: flex;
  overflow: visible;
  color: #000000;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 1220px) {
    padding: 0 4rem;
  }

  @media (min-width: 1000px) {
    height: 4.4rem;
    padding: 0;
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    top: auto;
    width: auto;
    ${(props) =>
      props.isMobile &&
      css`
        display: none !important;
      `}
  }
`;

// Used for the menu toggle button on Mobile
export const NavToggle = styled(BaseToggle)`
  @media (max-width: 768px) {
    display: block;
  }
  position: absolute;
  display: none;
  bottom: 60%;
  right: 10px;
  top: 0;
  width: 4.6rem;
`;

export const CloseNavToggle = styled(BaseToggle)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  color: #000000;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 3.1rem 0;

  @media (max-width: 700px) {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  svg {
    height: 1.6rem;
    width: 1.6rem;
    fill: currentColor;
  }

  > span {
    margin-right: 1.6rem;
  }
`;

// Used for the search toggle button on Mobile
export const SearchToggle = styled(BaseToggle)`
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
`;

// Generic, reusable component for displaying icon and label
export const LabeledIcon = ({ icon: Icon, label }) => (
  <ToggleInner>
    <Icon />
    <ToggleText>{label}</ToggleText>
  </ToggleInner>
);

export const ToggleInner = styled.div`
  display: flex;
  align-items: center;
  height: 2.3rem;
  position: relative;
  bottom: 0.5rem;
  fill: #fff;

  @media (min-width: 1000px) {
    position: static;
  }

  svg {
    height: 2.5rem;
    max-width: 2.3rem;
    width: 2.3rem;
    display: block;
    position: relative;
    z-index: 1;
  }
`;

export const ToggleText = styled.span`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  padding-left: 1.5rem;
  top: calc(100% + 0.5rem);
  width: auto;
  white-space: nowrap;
  word-break: break-all;

  @media (min-width: 1000px) {
    left: 0;
    right: 0;
    text-align: center;
    top: calc(100% - 0.3rem);
    width: auto;
  }
`;

// This wraps each toggle button
export const ToggleWrapper = styled.div`
  @media (min-width: 1000px) {
    position: relative;
  }
`;
