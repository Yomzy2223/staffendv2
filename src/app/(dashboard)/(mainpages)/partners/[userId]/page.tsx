import React from "react";
import Details from "./details";

const Page = ({ params }: { params: { userId: string } }) => {
  return <Details userId={params.userId} />;
};

export default Page;
