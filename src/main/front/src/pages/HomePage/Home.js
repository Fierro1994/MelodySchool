import React from "react";
import Header from "../Header/Header";
import Content from "./Content/Content";
import Footer from "../Footer/Footer";
import PromoAction from "./PromoAction/PromoAction";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.auth);
    return (
    <div>
      <Header/>
      <Content/>
      {(!auth._id) &&
      <PromoAction/>}
       {!auth._id &&
        <Footer/>}
    
      
      </div>
         );
}
export default Home;