"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = () => {
  const root = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return root.push("/login");
    }
  }, []);
  return (
    <div className=" container w-full h-screen pt-40 ">
      <div>
        <textarea
          className="text-4xl bg-transparent w-full"
          style={{ resize: "none" }}
          placeholder=" Sarlavha"
        ></textarea>
        <p className="text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
          gravida ipsum, at ultricies diam. Donec vel neque at mauris elementum
          consectetur.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
