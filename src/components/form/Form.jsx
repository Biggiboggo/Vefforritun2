export function Form(props) {
    return (
        <form>
            <div>
                <label>{props.num1}:</label>
                <input></input>
            </div>
            <div>
                <label>{props.num2}:</label>
                <textarea></textarea>
            </div>
        </form>
    )
}