import { connect } from "frontity";
import { useState } from "react";

const CustomLink = ({ state, link, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const getBaseUrl = () => {
    return state.frontity.url; // Get the base URL from Frontity state
  };

  const constructLink = () => {
    const baseUrl = getBaseUrl();
    return `${window.location.origin}${link.replace(baseUrl, "")}`; // Construct the link using the base URL and provided link
  };

  const handleClick = async () => {
    setIsLoaded(true);
  };

  return (
    <a href={constructLink()} onClick={handleClick}>
      {children}
    </a>
  );
};

export default connect(CustomLink);
