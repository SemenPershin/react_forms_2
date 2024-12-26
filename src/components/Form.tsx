import { useRef, useState } from "react";
import classes from "./Form.module.css"
import { Board } from "./Board";

export function Form() {
    const [formData, setFormData] = useState(Array<IFormData>)
    const inputDate = useRef<HTMLInputElement>(null);
    const inputDistance = useRef<HTMLInputElement>(null);

    interface IFormData {
        date: string;
        distance: string;
    }

    let itemArr: Array<IFormData>

    const isValid = () => {

        const dataVerify = /^([1-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[0-2])\.\d{4}$/;
        const distanceVerify = /(^\d+$|^\d+.\d+$)/;

        if (!dataVerify.test(inputDate.current === null ? "Non Valid String" : inputDate.current.value)) {

            inputDate.current?.setCustomValidity("Неправильно указана дата");
            inputDate.current?.reportValidity();

        } else {
            inputDate.current?.setCustomValidity("");
        }

        if (!distanceVerify.test(inputDistance.current === null ? "Non Valid String" : inputDistance.current.value)) {

            inputDistance.current?.setCustomValidity("Неправильно указано расстояние");
            inputDistance.current?.reportValidity()

        }
        else {
            inputDistance.current?.setCustomValidity("");
        }
    }

    const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        itemArr = formData;
        console.log(formData)
        let date = inputDate.current?.value;
        let distance = inputDistance.current?.value;
        if (date === undefined || distance === undefined) {
            return
        }
        if (itemArr.length === 0) {
            itemArr.push({ date: date, distance: distance })
        } else {
            let count: number = 0;
            itemArr.forEach((element) => {
                if (element.date === date) {
                    element.distance = String(Number(element.distance) + Number(distance))
                } else {
                    count++;
                }
            })
            if (count === itemArr.length) {
                itemArr.push({ date: date, distance: distance })
            }
        }

        let sortItemArr = itemArr.sort((a, b) => {
            
            if (new Date(a.date) > new Date(b.date)) {
                return 1
            } else if (new Date(a.date) < new Date(b.date)) {
                return -1
            }
            return 0
        })

        setFormData([...sortItemArr])

    }

    return (<>
        <form className={classes["form"]} onSubmit={formSubmit}>
            <div className={classes["box"]}>
                <label className={classes["label"]} htmlFor="date">{"Дата (ДД.ММ.ГГГГ)"}</label>
                <input className={classes["input"]} ref={inputDate} type="text" id="date" placeholder="ДД.ММ.ГГГГ" name="date" />
            </div>
            <div className={classes["box"]}>
                <label className={classes["label"]} htmlFor="distance">Пройдено, км</label>
                <input className={classes["input"]} ref={inputDistance} type="text" id="distance" name="distance" placeholder="10.5" />
            </div>
            <button className={classes["button"]} onClick={isValid}>ОК</button>
        </form>
        <Board item={formData} />
    </>
    )
}