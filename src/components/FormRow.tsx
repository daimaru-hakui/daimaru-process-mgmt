// import { FC } from 'react';

// type Props = {
//   type: string;
//   name: string;
//   labelText?: string;
//   defaultValue: string;
//   register: any;
//   className?: string;
//   placeholder?: string;
//   size?: "xs" | "sm" | "md" | "lg";
// };

// const FormRow: FC<Props> = ({ type, name, labelText, defaultValue, placeholder, register, className, size = "md" }) => {

//   let padding = "";
//   switch (size) {
//     case "xs":
//       padding = "p-0 text-xs";
//       break;
//     case "sm":
//       padding = "p-1 text-sm";
//       break;
//     case "md":
//       padding = "p-2";
//       break;
//     case "lg":
//       padding = "p-3 text-lg";
//       break;
//     default:
//       padding = "p2";
//   }

//   return (
//     <div className={`flex flex-col ${className}`}>
//       <label htmlFor={name} className="" > {labelText || name}</label>
//       <input
//         type={type}
//         id={name}
//         placeholder={placeholder}
//         defaultValue={defaultValue}
//         className={`mt-1 border rounded-md outline-2 ${padding} placeholder:text-slate-400 focus:outline-cyan-500`}
//         {...register}
//       />
//     </div >
//   );
// };

// export default FormRow;