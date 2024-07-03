"use client";
import { BottomGradient, LabelInputContainer } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/constants/svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Step = () => {
  const root = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [isActive, setisActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [info, setInfo] = useState({
    name: "",
    link: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisLoading(true);

    try {
      const response = await axios.put("/api/auth/register", {
        ...userInfo.user,
        ...info,
      });
      const data = await response.data;
      console.log(data);
      if (data?.message === "User information updated") {
        localStorage.setItem("user", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
    if (!user) {
      root.push("/login");
    }
  }, []);

  return (
    <div className="w-full  h-screen flex  items-center justify-center">
      <div
        className={`absolute w-full h-screen dark:bg-[#030517] bg-[#f0f5fa] z-[150]  transition-all duration-300 ${
          isActive ? "left-0" : "left-[-100%]"
        }`}
      >
        <div className="w-full h-full flex items-center justify-center ">
          <video
            ref={videoRef}
            width="100%"
            className="h-screen max-[900px]:h-auto "
            controls
          >
            <source src="/video/video.mp4" type="video/mp4" />
          </video>
        </div>
        <button
          onClick={() => (
            setisActive(false), videoRef.current && videoRef.current.pause()
          )}
          className="mt-4 group/btn  uppercase absolute top-0 right-10 bg-[#deebf7] border  dark:bg-[#10132b] dark:text-[#f0f5fa] flex  px-5 py-3 items-center justify-center gap-1 rounded-md text-[14px] font-[500]"
        >
          <IoIosCloseCircleOutline size={30} />
        </button>
      </div>
      <div className="max-w-[800px]  max-[768px]:mt-20 flex-wrap flex justify-between  w-full mx-auto rounded-2xl  p-4 md:p-8 shadow-input  bg-white dark:bg-black overflow-hidden ">
        <div className="w-[47%] max-[768px]:w-full">
          <p className="text-muted-foreground pt-10">
            TelePoster botni kanalga admin qiling u yordamida postlar teligramga
            kanalga chiqadi!
            <br /> <br />
            <span className="text-white">
              Bot:{" "}
              <a target="_blank" href="https://t.me/poster_gram_bot">
                @poster_gram_bot
              </a>
            </span>
          </p>
          <button
            onClick={() => (
              setisActive(true), videoRef.current && videoRef.current.play()
            )}
            className=" mt-5 group/btn  uppercase relative bg-[#f0f5fa] border  dark:bg-[#10132b] dark:text-[#f0f5fa] flex w-full px-5 py-3 items-center justify-center gap-1 rounded-md text-[14px] font-[500]"
          >
            Vedio qo'llanma
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </div>
        <div className="w-[47%]  max-[768px]:w-full">
          <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
            Ma'lumotlarni tuldring !
          </h2>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-2h-[1px] w-full" />
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Kanal nomi</Label>
              <Input
                onChange={handleChange}
                required
                name="name"
                id="name"
                type="text"
                value={info.name}
                placeholder="IT Blog"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4 relative  ">
              <Label htmlFor="link">Kanal havolasi</Label>
              <Input
                onChange={handleChange}
                required
                name="link"
                id="link"
                type="text"
                placeholder="@it_blog"
                value={info.link}
              />
            </LabelInputContainer>

            <button
              disabled={isLoading}
              className={`${
                isLoading &&
                "dark:bg-[#1a1e3e] cursor-not-allowed  bg-[#eaf0f6]"
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

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step;
