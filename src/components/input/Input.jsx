import { Button } from "../button/Button"

export function Input(props) {
    return (
        <form>
            <div>
                <label>{props.num1}:</label>
                <input></input>
            </div>
            <div>
                <label>{props.num2}:</label>
                <input></input>
            </div>
            <Button text='Innskrá'/>
        </form>
    )
}