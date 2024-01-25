
import React, { useState } from "react";
import styles from "./menu.module.css"
import { Link } from "react-router-dom";


const ProfileInfo = ()=> {


      return (     
        <Link  className={styles.item_menu_a} to={"/"}>Профиль</Link>

      );
    }
    export default ProfileInfo;