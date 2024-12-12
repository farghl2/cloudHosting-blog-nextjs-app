
type InputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'month'
  | 'week';
interface CustomInputProps  extends React.InputHTMLAttributes<HTMLInputElement> {
    styles?:string,
    placeholder:string,
    type:InputType,



}
const CustomInput = ({styles ,placeholder,type,...props}:CustomInputProps) => {
  return (
    <input  className={`mb-4 border rounded p-2 text-xl ${styles}`}
    type={type}
    placeholder={placeholder}
    {...props}
    
    />
  )
}

export default CustomInput