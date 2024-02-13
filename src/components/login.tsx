"use client";
import Image from "next/image";
import React, { useState } from "react";
import OldMan from "@/asserts/oldman.png";
import { Button, InputAdornment, TextField } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormVlaue = {
  email: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const notify = () => toast("login successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormVlaue>();

  const [data, setData] = useState({ email: "", password: "" });

  const onSubmit: SubmitHandler<FormVlaue> = (data) => {
    console.log("final data", data);
    notify();
    setData({ email: "", password: "" });
    reset();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <>
        <div className="hidden md:flex ">
          <div className="md:flex-1 md:flex md:justify-center md:items-center  w-full">
            <Image
              src={OldMan}
              alt=""
              width={500}
              height={500}
              className="w-full h-full object-fill"
            />
          </div>
          <div className="md:flex-1 md:flex md:justify-center md:mt-10 md:my-5 lg:flex lg:justify-center lg:mt-10 lg:my-5 xl:my-0 xl:flex xl:justify-center xl:mt-20">
            <form
              className=" md:w-[330px] md:h-[545px] xl:w-[430px] xl:h-[545px] 2xl:w-[430px] 2xl:h-[545px]"
              onSubmit={handleSubmit(onSubmit)}>
              <div className="xl:h-[144px] 2xl:h-[144px]">
                <h1 className="font-normal md:text-[24px] lg:text-[30px] xl:text-[40px]">
                  Welcome Back <br /> to{" "}
                  <span className="font-semibold">[Company Name]</span> <br />
                  Log in to Your Account
                </h1>
              </div>
              <div className="md:mt-5 xl:mt-14 ">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="xl:text-lg">
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
                    <label htmlFor="password" className="xl:text-lg">
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
                          const containsSpecialChar =
                            /[!@#$%^&*(),.?":{}|<>]/.test(value);
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
                  <p className="cursor-pointer text-[#196FE1] underline text-sm xl:text-md">
                    Forget password?
                  </p>
                </div>
                <div className="my-6">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth
                    className="text-white bg-blue-600  font-semibold  xl:text-lg rounded-lg
                  lg:py-2 xl:py-2">
                    LOG IN
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </>
    </>
  );
};

export default Login;
