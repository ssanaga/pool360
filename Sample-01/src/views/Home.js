// import React, { Fragment } from "react";

// import Hero from "../components/Hero";
// import Content from "../components/Content";
// import NPTPool from "../components/NPTPoolLogin";

// const Home = () => (
//   <Fragment>
//     <NPTPool />
//     <Hero />
//     <hr />
//     <Content />
//   </Fragment>
// );

// export default Home;


import React, { Fragment } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook

import Hero from '../components/Hero';
import HeroAuth from '../components/HeroAuth'; // Import HeroAuth component
import Content from '../components/Content';


const Home = () => {
  const { isAuthenticated } = useAuth0(); // Destructure isAuthenticated from useAuth0

  return (
    <Fragment>

      {isAuthenticated ? <HeroAuth /> : <Hero />}
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;

