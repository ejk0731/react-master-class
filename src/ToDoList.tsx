import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    }
  });
  const onValid = (data: any) => {
    console.log(data);
  };
  // console.log(register("toDo"));
  // console.log(watch());
  console.log(errors);
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", { required: "Email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Only naver.com emails allowed" } })}
          type="text"
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "write here" })} type="text" placeholder="First Name" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "write here" })} type="text" placeholder="Last Name" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("username", { required: "write here", minLength: { value: 10, message: "Your username is too short" } })} type="text" placeholder="Username" />
        <span>{errors?.username?.message}</span>
        <input {...register("password", { required: "write here", minLength: { value: 5, message: "Your password is too short" } })} type="text" placeholder="Password" />
        <span>{errors?.password?.message}</span>
        <input {...register("password1", { required: "Password is required", minLength: { value: 5, message: "Your password is too short" }, maxLength: 10 })} type="text" placeholder="Password1" />
        <span>{errors?.password1?.message}</span>
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
