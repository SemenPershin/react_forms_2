import { IFormData } from "./Form";
import classes from "./Board.module.css";
import { ReactNode } from "react";

interface IProps {
    item: Array<IFormData>
    delete: (index: number) => void;
}

export function Board(props: IProps) {

    console.log(props)
    const boardItems: Array<ReactNode> = props.item.map((element, index) => {
        return (
            <div className={classes["boars_item"]} key={index}>
                <div className={classes["props_item"]}>{element.date}</div>
                <div className={classes["props_item"]}>{element.distance}</div>
                <div className={classes["props_item"]}>
                    <div className={classes["delet_button"]} onClick={() => {props.delete(index)}}>X</div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className={classes["board_nav"]}>
                <div className={classes["nav_item"]}>{"Дата(ДД.ММ.ГГГГ)"}</div>
                <div className={classes["nav_item"]}>Пройдено, км</div>
                <div className={classes["nav_item"]}>Действия</div>
            </div>
            <div className={classes["board"]}>{boardItems}</div>
        </div>
    )
}