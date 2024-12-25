import {useRef, useState } from "react";
import classes from "./Form.module.css"
import { Board } from "./Board";

export function Form() {
    const [formData, setFormData] = useState({ date: "", distance: "" })
    const inputDate = useRef<HTMLInputElement>(null);
    const inputDistance = useRef<HTMLInputElement>(null);

    let item

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }))
    }

    const isValid = () => {

        const dataVerify = /^([1-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[0-2])\.\d{4}$/;
        const distanceVerify = /(^\d+$|^\d+.\d+$)/;

        if (!dataVerify.test(formData.date)) {
            if (inputDate.current !== null) {
                inputDate.current.setCustomValidity("Неправильно указана дата");
                inputDate.current.reportValidity();
            }
        } else {
            if (inputDate.current !== null) {
                inputDate.current.setCustomValidity("");
            }

        }

        if (!distanceVerify.test(formData.distance)) {
            if (inputDistance.current !== null) {
                inputDistance.current.setCustomValidity("Неправильно указано расстояние");
                inputDistance.current.reportValidity()
            }
        }
        else {
            if (inputDistance.current !== null) {
                inputDistance.current.setCustomValidity("");
            }

        }
    }

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        item = formData;
        
        setFormData({ date: "", distance: "" }); 
        console.log(item)
    }

    return (<>
        <form className={classes["form"]} onSubmit={formSubmit}>
            <div className={classes["box"]}>
                <label className={classes["label"]} htmlFor="date">{"Дата (ДД.ММ.ГГГГ)"}</label>
                <input className={classes["input"]} ref={inputDate} type="text" id="date" value={formData.date} placeholder="ДД.ММ.ГГГГ" name="date" onChange={inputChange} />
            </div>
            <div className={classes["box"]}>
                <label className={classes["label"]} htmlFor="distance">Пройдено, км</label>
                <input className={classes["input"]} ref={inputDistance} type="text" id="distance" name="distance" value={formData.distance} placeholder="10.5" onChange={inputChange} />
            </div>
            <button className={classes["button"]} onClick={isValid}>ОК</button>
        </form>
        <Board item = {item}/>
        </>
    )
}