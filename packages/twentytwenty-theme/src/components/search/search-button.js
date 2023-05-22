import { connect, styled } from "frontity";
import { SearchIcon } from "../icons";
import {
  BaseToggle,
  LabeledIcon,
  ToggleWrapper,
} from "../navigation/nav-toggle";
import mq from "../breakpoints";

const SearchButton = ({ state, actions }) => {
  // Get the state of the search modal
  const { isSearchModalOpen } = state.theme;
  const { openSearchModal } = actions.theme;

  return (
    <HeaderToggle>
      <ToggleWrapper>
        <BaseToggle
          aria-expanded={isSearchModalOpen}
          onClick={openSearchModal}
          aria-label="Click to open search bar..."
        >
          <LabeledIcon icon={SearchIcon} label="Search" />
        </BaseToggle>
      </ToggleWrapper>
    </HeaderToggle>
  );
};

export default connect(SearchButton);

const HeaderToggle = styled.div`
  width: 100%;
  ${mq("md")} {
    margin-top: 0px;
  }
  margin-top: 24px;
`;
