module.exports = {
  siteUrl: "https://fe-technical-test.herokuapp.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/dashboard" },
      { userAgent: "*", allow: "/" },
    ],
  },
  exclude: ["*/dashboard", "*/dashboard/developer-logs"],
};
