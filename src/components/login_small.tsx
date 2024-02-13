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

const LoginSmall = () => {
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
        <div className="md:hidden relative ">
          <div className="w-full h-full ">
            <Image
              src={OldMan}
              alt=""
              width={500}
              height={500}
              className="w-full h-screen opacity-70"
            />
          </div>
          <div className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-900">
            <div className="backdrop-blur p-5 sm border rounded-md shadow-xl w-[350px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center">
                  <h1 className="text-md">
                    Welcome Back to{" "}
                    <span className="font-semibold text-xl">
                      [Company Name]
                    </span>
                    <br />
                    Log in to Your Account
                  </h1>
                </div>
                <div className="my-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-[14px]">
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
                        <p className="error-msg text-red-500 text-[12px]">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="password" className="text-[14px]">
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
                                <RemoveRedEyeOutlinedIcon className="cursor-pointer text-slate-700" />
                              ) : (
                                <VisibilityOffOutlinedIcon className="cursor-pointer text-slate-700" />
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
                        <p className="error-msg text-red-500 text-[12px]">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="cursor-pointer text-[#196FE1] underline text-[12px] my-3">
                      Forget password?
                    </p>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      className="text-white bg-blue-600 text-sm  font-semibold rounded-lg py-3">
                      LOG IN
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default LoginSmall;
