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

const LoginComponenet = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState(false);
  const root = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const response = await axios.post("/api/auth/login", user);
      const data = await response.data;
      console.log(data);
      if (data?.message === "Login successful") {
        localStorage.setItem("user", JSON.stringify(data));
        root.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      if (
        error instanceof Error &&
        (error as { response?: { data: { message: string } } }).response?.data
          .message === "User not found"
      ) {
        toast.error("Bu foydalanuvchi mavjud emas");
      }
      if (
        error instanceof Error &&
        (error as { response?: { data: { message: string } } }).response?.data
          .message === "Incorrect password"
      ) {
        toast.error("Parol xato");
      }
    } finally {
      setUser({
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
    <div className="h-screen  flex items-center justify-center ">
      <div className="sign max-w-md w-full mx-auto rounded-2xl  p-4 md:p-8 shadow-input bg-white dark:bg-black  ">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Kirish
        </h2>
        <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-300 ">
          "TelePoster" da ishlashni davom ettirish uchun
        </p>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2h-[1px] w-full" />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
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
            Akkount yo'qmi ?{" "}
            <Link href={"/register"} className="text-blue-500 hover:underline ">
              Ro'yxatdan o'tish
            </Link>
          </p>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
};

export default LoginComponenet;
