import React from "react";
import Navbar from "../components//Navbar/NavBar";
import Content from "../components/Content/Content";
import Footer from "../components/Footer/Footer";
import PromoAction from "../components/PromoAction/PromoAction";

const Home = () => {
    return (
    <div>
  <Navbar/>
  <Content/>
  <PromoAction/>
  <Footer/>
      </div>
         );
}
export default Home;