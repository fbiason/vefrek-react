const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { matchRoutes } = require("react-router-config");
const routes = require("./src/routes").default; // Ajusta esto según la estructura de tu proyecto

const generateSitemap = async () => {
  const smStream = new SitemapStream({ hostname: "https://vefrek.com" });
  const writeStream = createWriteStream("./public/sitemap.xml");

  smStream.pipe(writeStream);

  const routesList = matchRoutes(routes, "/").map(({ route }) => route.path);

  routesList.forEach((route) => {
    smStream.write({ url: route, changefreq: "daily", priority: 0.7 });
  });

  smStream.end();

  await streamToPromise(smStream);

  console.log("Sitemap generated successfully!");
};

generateSitemap().catch(console.error);
