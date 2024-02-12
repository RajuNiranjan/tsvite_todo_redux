"use client";
import Image from "next/image";
import React, { useState } from "react";
import OldMan from "@/asserts/oldman.png";
import { Button, InputAdornment, TextField } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { SubmitHandler, useForm } from "react-hook-form";

type FormVlaue = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormVlaue>();

  const [data, setData] = useState({ email: "", password: "" });

  const onSubmit: SubmitHandler<FormVlaue> = (data) => {
    console.log("final data", data);
    // alert(data.email);
    setData({ email: "", password: "" });
    reset();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Image src={OldMan} alt="" width={500} height={700} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <form className="w-[430px] h-[545px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="h-[144px]">
            <h1 className="font-normal text-[40px]">
              Welcome Back <br /> to{" "}
              <span className="font-semibold">[Company Name]</span> <br />
              Log in to Your Account
            </h1>
          </div>
          <div className="mt-14 ">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-lg">
                  Email ID / Username
                </label>
                <TextField
                  placeholder="Enter Active Email ID/ username"
                  fullWidth
                  required
                  id="eamil"
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid Email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="error-msg text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <TextField
                  placeholder="Enter your password"
                  fullWidth
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={toggleShowPassword}>
                        {showPassword ? (
                          <RemoveRedEyeOutlinedIcon className="cursor-pointer" />
                        ) : (
                          <VisibilityOffOutlinedIcon className="cursor-pointer" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password id required",
                    minLength: {
                      value: 10,
                      message: "password should be atleast 10 char",
                    },
                    validate: (value) => {
                      const containUpperCase = /[A-Z]/.test(value);
                      const contaiLowerCase = /[a-z]/.test(value);
                      const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
                        value
                      );
                      return (
                        (contaiLowerCase &&
                          containUpperCase &&
                          containsSpecialChar) ||
                        "Password must contain at least one uppercase letter, one lowercase letter, and one special character"
                      );
                    },
                  })}
                />
                {errors.password && (
                  <p className="error-msg text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end my-2">
              <p className="cursor-pointer text-[#196FE1] underline">
                Forget password?
              </p>
            </div>
            <div className="my-10">
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                className="text-white bg-blue-600  font-semibold  text-xl rounded-lg py-3">
                LOG IN
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
