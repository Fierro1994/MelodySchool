import React, { useState } from "react";
import styles from "../../components/profile/menu.module.css"
import { Link } from "react-router-dom";


const ProfileModuleMomentsArhiv = ()=> {
      return (     
        <Link className={styles.item_menu_a} to={"/"}>Архив</Link>

      );
    }
    export default ProfileModuleMomentsArhiv;