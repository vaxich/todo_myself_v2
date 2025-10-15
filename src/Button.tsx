import { FilterValueType } from "./App"

type ButtonPropsType = {
    title: string | FilterValueType
    onClick?: () => void
    className? : string

}

export const Button = ({ title, onClick, className }: ButtonPropsType) => {
  return <button className={className} onClick={onClick}>{title}</button>
}

