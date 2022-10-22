import { connect, styled } from "frontity";
import Link from "../link";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Navigation = ({ state }) => (
  <NavWrapper>
    <MenuNav>
      <Menu>
        {state.theme.menu.map(([name, link]) => {
          // Check if the link matched the current page url
          const isCurrentPage = state.router.link === link;
          return (
            <MenuItem key={name}>
              {/* If link url is the current page, add `aria-current` for a11y */}
              <MenuLink
                link={link}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {name}
              </MenuLink>
            </MenuItem>
          );
        })}
      </Menu>
    </MenuNav>
  </NavWrapper>
);

export default connect(Navigation);

const NavWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const MenuNav = styled.nav`
  width: 100%;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  font-weight: 500;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  margin: 0;
  margin-top: 24px;
`;

const MenuItem = styled.li`
  font-size: inherit;
  position: relative;
  padding-bottom: 4px;
`;

const MenuLink = styled(Link)`
  display: block;
  line-height: 1.2;
  text-decoration: none;
  letter-spacing: 1px;
  padding-bottom: 2px;

  &:hover,
  &[aria-current="page"] {
    text-decoration: underline;
  }
`;
