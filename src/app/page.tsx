"use client";
import Image from "next/image";
import Link from "next/link";
import experience from "../../public/lottie/code.json";
import AnimationLottie from "@/components/helper/animation-lottie";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
const Home = () => {
  const words = ["creative", "dolzarb", "qiziqarli"];
  return (
    <div className=" mx-auto h-screen flex items-center justify-between container ">
      <div className=" w-[50%] relative z-20 max-[768px]:w-full overflow-hidden ">
        <h2 className=" max-[768px]:text-center text-4xl xl:leading-[3.5rem] max-[450px]:text-3xl  text-start xl:text-[55px] font-bold text-foreground dark:text-white">
          TelePosterda <FlipWords words={words} /> <br /> postlar yarating !
        </h2>
        <Link href={"/login"} className="max-[768px]:flex  justify-center ">
          <button className=" flex  justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground h-11  px-8    md:text-xl font-semibold md:py-7 max-[768px]:mt-5 relative mt-10 ml-0  items-center gap-1 max-[500px]:gap-0 bg-[#10132b] dark:text-[#10132b] dark:bg-[#f0f5fa] py-4 max-[500px]:py-[6px]    max-[500px]:text-[13px] dark:hover:bg-[#f4f6f9]  hover:bg-[#151838]  text-[20px]  duration-200 border  rounded-md text-base ">
            Qani ketdik
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
      </div>
      <div className="w-[50%] max-[768px]:hidden">
        <AnimationLottie animationPath={experience} />
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Home;
