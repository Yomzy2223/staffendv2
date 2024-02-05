import useServiceApi from "@/hooks/useServiceApi";
import { Service } from "custom-types";
import slugify from "slugify";

export const useActions = () => {
  const { getAllServicesQuery } = useServiceApi();
  const { data } = getAllServicesQuery;

  const getServicesRoute = () => {
    const services = data?.data?.data;
    if (services) {
      return services.map((service: Service) => ({
        name: service.name,
        to: `/services/${slugify(service.name)}`,
      }));
    }
  };

  // Dashboard navigation routes
  const navRoutes = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Services",
      to: "/services",
      type: "select",
      options: getServicesRoute(),
    },
    {
      name: "Countries",
      to: "/countries",
    },
    {
      name: "Hiring and Payroll",
      to: "/hiring-and-payroll",
    },
    {
      name: "Bank Accounts",
      to: "/bank-accounts",
    },
    {
      name: "Rewards",
      to: "/rewards",
    },
    {
      name: "Promocodes",
      to: "/promocodes",
    },
    {
      name: "User management",
      to: "/user-management",
    },
    {
      name: "Payment",
      to: "/payment",
    },
    {
      name: "Resources",
      to: "/promocodes",
    },
    {
      name: "Partners",
      to: "/partners",
    },
  ];

  return { navRoutes };
};

// [
//       {
//         name: "Business Registration",
//         to: "/services/launch",
//       },
//       {
//         name: "Manage",
//         to: "/services/manage",
//       },
//       {
//         name: "Tax",
//         to: "/services/tax",
//       },
//       {
//         name: "Compliance",
//         to: "/services/compliance",
//       },
//     ],
