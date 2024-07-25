import { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  // console.log(register("toDo"));
  // console.log(watch());
  console.log(formState.errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true, pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Only naver.com emails allowed" } })} type="text" placeholder="Email" />
        <input {...register("firstName", { required: true })} type="text" placeholder="First Name" />
        <input {...register("lastName", { required: true })} type="text" placeholder="Last Name" />
        <input {...register("username", { required: true, minLength: 10 })} type="text" placeholder="Username" />
        <input {...register("password", { required: true, minLength: 5 })} type="text" placeholder="Password" />
        <input {...register("password1", { required: "Password is required", minLength: { value: 5, message: "Your password is too short" }, maxLength: 10 })} type="text" placeholder="Password1" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;

// without React Hook Form /////////////////////////////////////////////////////////////////////

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo)
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} type="text" placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }
// export default ToDoList;
