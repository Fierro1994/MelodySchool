import React from "react";
import styles from "./user.module.css"
import { CheckboxList } from "./FormMenuSettings";

const SettingsMenuStudent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.h1style}>
                <h1>Настройки профиля</h1>
            </div>
            <div className={styles.menu}>

                <div className={styles.group_settings}>
                    <h2>Внешний вид</h2>
                    <div>Цвет</div>
                </div>

                <div className={styles.group_settings}>
                    <h2>Элементы главного меню</h2>
                <CheckboxList data={JSON.parse(localStorage.getItem("menuModules"))} />  

                </div>

                <div className={styles.group_settings}>
                    <h2>Настройки безопасности</h2>
                    <input></input>
                </div>


            </div>

        </div>

    );
}

export default SettingsMenuStudent;

