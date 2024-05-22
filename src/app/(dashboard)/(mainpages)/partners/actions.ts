import {
  IRowInfo,
  ITableBody,
} from "@/components/tables/generalTable/constants";
import { useGlobalFunctions } from "@/hooks/globalFunctions";
import { cn } from "@/lib/utils";
import {
  useActivatePartnerMutation,
  useDeactivatePartnerMutation,
  useDeclinePartnerMutation,
  useGetPartnerFormQAQuery,
} from "@/services/partner";
import { useGetAllUsersQuery } from "@/services/user";
import { compareAsc, format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

// Table information
export const useActions = ({
  setOpenActivate,
  setOpenDeactivate,
  setSelectedPartner,
  preview,
  setPreview,
  status,
}: {
  setOpenActivate: Dispatch<SetStateAction<boolean>>;
  setOpenDeactivate: Dispatch<SetStateAction<boolean>>;
  setSelectedPartner: Dispatch<SetStateAction<string[] | undefined>>;
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
  status?: string;
}) => {
  const [searchValue, setSearchValue] = useState("");

  const { isDesktop } = useGlobalFunctions();

  const router = useRouter();
  const normalize = (text: string) => text?.trim()?.toLowerCase();

  const partnersRes = useGetAllUsersQuery({ isPartner: true, isStaff: false });
  const partners = partnersRes.data?.data?.data || [];
  let filteredPartners = partners
    ?.sort((a, b) => compareAsc(b.createdAt, a.createdAt))
    .filter(
      (p) =>
        normalize(p.fullName).includes(normalize(searchValue)) ||
        normalize(p?.country || "").includes(normalize(searchValue)) ||
        normalize(p.email).includes(normalize(searchValue)) ||
        normalize(p?.partnerStatus || "").includes(normalize(searchValue)) ||
        normalize(p?.phone || "").includes(normalize(searchValue)) ||
        normalize(p?.username || "").includes(normalize(searchValue)) ||
        normalize(p.createdAt).includes(normalize(searchValue))
    );

  if (status && normalize(status) !== "all")
    filteredPartners = filteredPartners.filter(
      (p) => normalize(p?.partnerStatus || "") === normalize(status)
    );

  const activePartner = partners.find((p) => p.id === preview);

  const activatePartner = useActivatePartnerMutation();
  const deactivatePartner = useDeactivatePartnerMutation();
  const declinePartner = useDeclinePartnerMutation();

  const handleSearch = (value?: string) => {
    setSearchValue(value || "");
  };

  const handleClick = (
    e: MouseEvent<HTMLTableRowElement>,
    rowId: string,
    rowInfo: IRowInfo[]
  ) => {
    isDesktop ? setPreview(rowId) : router.push(`/partners/${rowId}`);
  };

  const handleActivateClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpenActivate(true);
    setSelectedPartner([rowId]);
  };

  const handleDeactivateClick = (
    e: MouseEvent<HTMLTableCellElement>,
    rowId: string,
    text: string
  ) => {
    e.stopPropagation();
    setOpenDeactivate(true);
    setSelectedPartner([rowId]);
  };

  // Partners table header
  const tableHeaders = [
    "S/N",
    "PARTNER NAME",
    "PARTNER EMAIL",
    "PHONE NUMBER",
    "CURRENT STATE",
    "COUNTRY",
    "DATE JOINED",
    "ACTION",
  ];

  // Partners table body
  const tableBody =
    filteredPartners?.map((partner, i: number): ITableBody => {
      const canActivate =
        partner.partnerStatus === "SUBMITTED" ||
        partner.partnerStatus === "DEACTIVATED";
      const isActive = partner.partnerStatus === "ACTIVE";
      let actionText = "Pending";
      if (canActivate) actionText = "Activate";
      if (isActive) actionText = "Deactivate";

      return {
        rowId: partner.id,
        handleClick,
        rowInfo: [
          {
            text: (i + 1).toString().padStart(2, "0"),
          },
          { text: partner?.fullName || "No registered name" },
          { text: partner?.email },
          {
            text: partner.phone?.toString() || "Not provided",
          },
          { text: partner?.partnerStatus || "" },
          { text: partner.country || "Not provided" },
          { text: format(partner.createdAt, "MMMM dd, yyyy") },
          {
            text: actionText,
            handleClick: canActivate
              ? handleActivateClick
              : isActive
              ? handleDeactivateClick
              : (e) => {
                  e.stopPropagation();
                },
            cellProps: {
              className: cn("text-foreground-5 italic", {
                "text-primary underline not-italic": canActivate || isActive,
              }),
            },
          },
        ],
      };
    }) || [];

  const partnerTableNav = [
    "All",
    "Active",
    "Submitted",
    "Deactivated",
    "Declined",
    "Inactive",
  ];

  return {
    partnerTableNav,
    tableHeaders,
    tableBody,
    activatePartner,
    deactivatePartner,
    declinePartner,
    partnersLoading: partnersRes.isLoading,
    partnersErrMsg: partnersRes.error?.message,
    handleSearch,
    activePartner,
  };
};

const cellClassName =
  "[&_span]:bg-yellow-300 [&_span]:px-[10px] [&_span]:py-[2px] [&_span]:rounded-md  text-xs";
