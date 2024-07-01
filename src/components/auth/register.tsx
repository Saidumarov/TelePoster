"use client";
import React, { useEffect, useState } from "react";
import { BottomGradient, LabelInputContainer } from "../ui";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { Live, LiveView, Loading } from "@/constants/svg";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterComponenet = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState(false);
  const root = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await axios.post("/api/auth/register", user);
      const data = await response.data;
      // console.log(data);
      if (data?.message === "Register successful") {
        localStorage.setItem("user", JSON.stringify(data));
        root.push("/step");
      }
    } catch (error) {
      console.log(error);
      if (
        error instanceof Error &&
        (error as { response?: { data: { message: string } } }).response?.data
          .message === "User already registered"
      ) {
        toast.error("Bu foydalanuvchi mavjud");
      }
    } finally {
      setUser({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
      setisLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      root.push("/dashboard");
    }
  }, []);
  return (
    <div className=" h-screen flex  items-center justify-center">
      <div className="sign max-w-md w-full mx-auto rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black  ">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Hisob yarating
        </h2>
        <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300 ">
          "TelePoster" da ishlashni davom ettirish uchun
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2h-[1px] w-full" />
        <form className="mt-[1rem]" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Ism</Label>
              <Input
                onChange={handleChange}
                required
                name="firstname"
                id="firstname"
                type="text"
                value={user.firstname}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Familiya</Label>
              <Input
                onChange={handleChange}
                required
                name="lastname"
                id="lastname"
                type="text"
                value={user.lastname}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Pochta</Label>
            <Input
              onChange={handleChange}
              required
              name="email"
              id="email"
              type="email"
              value={user.email}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 relative  ">
            <Label htmlFor="password">Parol</Label>
            <Input
              onChange={handleChange}
              required
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              value={user.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-7 opacity-[0.7] bg-red z-10"
            >
              {showPassword ? <Live /> : <LiveView />}
            </button>
          </LabelInputContainer>

          <button
            disabled={isLoading}
            className={`${
              isLoading && "dark:bg-[#1a1e3e] cursor-not-allowed  bg-[#eaf0f6]"
            } group/btn  uppercase relative bg-[#f0f5fa] border  dark:bg-[#10132b] dark:text-[#f0f5fa] flex w-full px-5 py-3 items-center justify-center gap-1 rounded-md text-[14px] font-[500]`}
            type="submit"
          >
            {isLoading ? (
              <Loading />
            ) : (
              <>
                Davom etish <span className="block">&rarr;</span>
              </>
            )}
            <BottomGradient />
          </button>
          <p className="text-[13px] flex gap-2 pt-3 pl-3 ">
            Akkount bormi ?
            <Link href={"/login"} className="text-blue-500 hover:underline ">
              Krish
            </Link>
          </p>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
};

export default RegisterComponenet;
