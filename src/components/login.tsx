"use client";
import Image from "next/image";
import React, { useState } from "react";
import OldMan from "@/asserts/oldman.png";
import { Button, InputAdornment, TextField } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Image
          src={OldMan}
          alt=""
          width={500}
          height={700}
          className="h-screen w-full object-center"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <form className="w-[430px] h-[545px]">
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
                />
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
                />
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
                className="text-white bg-blue-700  font-semibold  text-xl rounded-lg py-3">
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
