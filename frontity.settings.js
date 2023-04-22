const settings = {
  name: "djmix2022",
  state: {
    frontity: {
      url: "https://blog.djmixoftheweek.com",
      title: "DJ Mix Of The Week",
      description:
        "One house/techno or something similar DJ mix recommended to you almost every week",
    },
  },
  packages: [
    {
      name: "@frontity/twentytwenty-theme",
      state: {
        theme: {
          menu: [
            ["Home", "/"],
            ["About", "/about/"],
            ["League Of Mixes", "/league-of-mixes/"],
            ["What About My Mix?", "/what-about-my-mix/"],
            ["Newsletter Sign-up", "/newsletter-sign-up/"],
          ],
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://blog.djmixoftheweek.com",
          params: {
            per_page: 12,
            _embed: true,
          },
        },
      },
    },
    {
      name: "@frontity/google-analytics",
      state: {
        googleAnalytics: {
          trackingId: "G-29LKC2P8CY",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/wp-comments",
    "@frontity/yoast",
  ],
};

export default settings;
