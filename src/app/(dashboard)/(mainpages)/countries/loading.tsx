import CountryCardSkeleton from "@/components/cards/countryCard/countryCardSkeleton";
import ItemsWrapperSkt from "@/components/wrappers/skeleton/itemsWrapperSkt";
import React from "react";

const loading = () => {
  return (
    <ItemsWrapperSkt
      LoadingSkt={Array(4)
        .fill("")
        .map((el, i) => (
          <CountryCardSkeleton key={i} />
        ))}
    />
  );
};

export default loading;
