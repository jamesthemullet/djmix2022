import server from "@frontity/core/src/server";
import frontity__mars_theme_default from "@frontity/mars-theme/src/index";
import frontity__wp_source_default from "@frontity/wp-source/src/index";
import frontity__tiny_router_default from "@frontity/tiny-router/src/index";
import frontity__html2react_default from "@frontity/html2react/src/index";
import _10up__frontity_elasticpress_default from "@10up/frontity-elasticpress/src/index";

const packages = {
  frontity__mars_theme_default,
  frontity__wp_source_default,
  frontity__tiny_router_default,
  frontity__html2react_default,
  _10up__frontity_elasticpress_default,
};

export default server({ packages });

