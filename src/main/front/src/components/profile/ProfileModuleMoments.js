
import React, { useState } from "react";
import styles from "./menu.module.css"
import { Link } from "react-router-dom";

const ProfileModuleMoments = ()=> {


      return (     
        <Link  className={styles.item_menu_a} to={"/app/moments"}>Моменты</Link>
      );
    }
    export default ProfileModuleMoments;