import { useState } from "react";
import classes from "./Form.module.css"

export function Form() {
    const [formData, setFormData] = useState({date: "", distance: ""})

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }))
    }

    const handleForm = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataVerify = /^([1-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[0-2])\.\d{4}$/;
        const distanceVerify = /^\d+$/;

        if (!dataVerify.test(formData.date)) {
            alert("Введите дату правильно!")
            setFormData((prevForm) => ({
                ...prevForm,
                date: "",
            }))
        }
        if (!distanceVerify.test(formData.distance)) {
            alert("Введите дистанцию правильно!")
            setFormData((prevForm) => ({
                ...prevForm,
                distance: "",
            }))
        }

        if (dataVerify.test(formData.date) && distanceVerify.test(formData.distance)) {
            console.log(1)
        }
    }

    return (
        <form className={classes["form"]} onSubmit={handleForm}>
            <div className={classes["box"]}>
                <label className={classes["label"]} htmlFor="date">{"Дата (ДД.ММ.ГГ)"}</label>
                <input className={classes["input"]} type="text" id="date" value={formData.date} name="date" onChange={inputChange}/>
            </div>
            <div className={classes["box"]}>
                <label className={classes["label"]} htmlFor="distance">Пройдено, км</label>
                <input className={classes["input"]} type="text" id="distance" name="distance" value={formData.distance} onChange={inputChange} />
            </div>
            <button className={classes["button"]}>ОК</button>
        </form>
    )
}