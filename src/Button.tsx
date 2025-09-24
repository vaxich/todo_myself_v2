import { FilterValueType } from "./App"

type ButtonPropsType = {
    title: string | FilterValueType
    onClick?: (value: string) => void
    filterValue?: FilterValueType

}

export const Button = (props: ButtonPropsType) => {

    
        return (
            <div>
                <button >{props.title}</button>
            </div>
        )
    }


// export const Button = (props: ButtonPropsType) => {
// const handleClick = () => {
// if (props.onClick && props.filterValue !== undefined) {
// props.onClick(props.filterValue);
// }
// };

// return (
// <div>
// <button onClick={handleClick}>{props.title}</button>
// </div>
// );
// };