import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation/navigation";
import React from "react";

const Home = () => {
  return (
    <div>
      <div className="mx-8">
        <Header />
        <Navigation />
      </div>
    </div>
  );
};

export default Home;
