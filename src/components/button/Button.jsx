import propTypes from 'prop-types'

export function Button({text, onClick}) {
    return (
        <button onClick={onClick}>
            
            {text}
        </button>
    )
}

Button.propTypes = {
    text: propTypes.oneOfType([propTypes.element, propTypes.string]).isRequired,
    onClick: propTypes.func.isRequired
}