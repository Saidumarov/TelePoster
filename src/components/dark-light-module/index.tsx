"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <button
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
        className="flex dark:bg-[#10132b] dark:hover:bg-[#151838] transition duration-200 dark:text-[#f0f5fa] bg-[#f0f5fa]  hover:bg-[#f4f6f9] h-[43px] max-[500px]:h-[37px] px-3 items-center border rounded text-base"
      >
        <Sun className="h-[1.3rem] w-[1.3rem] rotate-0 scale-0 transition-all text-white opacity-[0.8] dark:-rotate-90 dark:scale-100 max-[500px]:h-[1rem] max-[500px]:w-[1rem]" />
        <Moon className="absolute h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 dark:text-slate-300 max-[500px]:h-[1rem] max-[500px]:w-[1rem]" />
      </button>
    </>
  );
}
