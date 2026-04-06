import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl underline">Welcome to my SaaS app</h1>
      <Button className="bg-purple-500 hover:bg-yellow-600 text-yellow-400">Lets get started</Button>
    </div>
  );
};

export default Page;
