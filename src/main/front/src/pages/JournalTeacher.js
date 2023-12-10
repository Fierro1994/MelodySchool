import React from "react";
import Navbar from "../components//Navbar/NavbarNoButton";
import JournalTeacher from "../components/JournalTeacher/JournalTeacher"
import Footer from "../components/Footer/FooterNoButton";


const Home = () => {
    return (
    <div>
  <Navbar/>
  <JournalTeacher/>
  <Footer/>
      </div>
         );
}
export default Home;