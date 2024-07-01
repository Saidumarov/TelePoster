"use client";
import { Logo } from "@/constants/svg";
import { ThemeSwitcher } from "../dark-light-module";
import Link from "next/link";
import Image from "next/image";
import NextTopLoader from "nextjs-toploader";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { UserContext } from "@/context/user";
import { UserMenu } from "../shared/menu";
const Header = () => {
  const { theme } = useTheme();
  const { userInfo } = useContext(UserContext);

  return (
    <>
      <NextTopLoader
        color={theme == "light" ? "#000" : "#fff"}
        showSpinner={false}
      />
      <header className=" z-50 text-gray-600 body-font fixed  w-full shadow-sm dark:border-b-[#1f273d] border-b-[0.2px]">
        <div className="container mx-auto flex p-4  justify-between items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 "
          >
            <Logo />
            <p className=" ml-2 max-[500px]:text-[20px] text-[28px] font-bold font-space-grotesk dark:text-[#f7fafc]">
              TelePoster
            </p>
          </Link>

          <div className="flex items-center gap-2 max-[500px]:gap-2">
            <ThemeSwitcher />
            {userInfo ? (
              <UserMenu />
            ) : (
              <>
                <Link href={"/login"}>
                  <button className="flex items-center gap-1 max-[500px]:gap-0 dark:bg-[#10132b] dark:text-[#f0f5fa] bg-[#f0f5fa] py-[7px] max-[500px]:py-[6px]  px-5 max-[500px]:px-3 max-[500px]:text-[13px]  hover:bg-[#f4f6f9]  dark:hover:bg-[#151838] transition duration-200 border  rounded text-base ">
                    Krish
                    <span>
                      <Image
                        src="/chaqmoq.gif"
                        alt="gif"
                        width={100}
                        height={100}
                        className="w-[28px] h-[28px] max-[500px]:w-[20px] max-[500px]:h-[20px] "
                      />
                    </span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
