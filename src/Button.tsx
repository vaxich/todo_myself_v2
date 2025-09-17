
type ButtonPropsType = {
    title: string
}

export const Button = (props : ButtonPropsType) => {
    return (
        <div>
            <button>{props.title}</button>
        </div>
    )
}