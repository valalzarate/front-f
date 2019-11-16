import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React from "react";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import ProductHero from "./modules/views/ProductHero";
import ProductCTA from "./modules/views/ProductCTA";
import Album from "./modules/components/eventCard.js";
function Index() {
  return (
    <div>
      <ProductHero />    
      <ProductCategories />
      <Album />
      <ProductCTA />
      <ProductSmokingHero />
    </div>
  );
}

export default withRoot(Index);
