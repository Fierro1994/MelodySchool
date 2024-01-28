import React, { useState } from "react";
import styles from "../../components/profile/menu.module.css"
import { Link } from "react-router-dom";


const ProfileModuleMomentsAdd = ()=> {
      return (     
        <Link className={styles.item_menu_a} to={"/app/moments/add"}>Добавить</Link>

      );
    }
    export default ProfileModuleMomentsAdd;