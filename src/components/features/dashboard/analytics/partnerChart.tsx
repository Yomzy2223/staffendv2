import { useGetAllRequestsQuery, useGetServiceRequestsQuery } from "@/services/request";
import { useGetAllUsersQuery } from "@/services/users";
import { getAllUsers } from "@/services/users/operations";
import { format, isValid } from "date-fns";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TOverviewStatus } from "../overview";
import Wrapper from "./wrapper";

const PartnerChart = ({ dateFrom, dateTo, activeServiceId }: IProps) => {
  const partnersRes = useGetAllUsersQuery({ isPartner: true, isStaff: false });
  const partners = partnersRes.data?.data?.data;

  const allRequestsRes = useGetAllRequestsQuery({
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
  });

  const serviceRequestsRes = useGetServiceRequestsQuery({
    serviceId: activeServiceId || "",
    startDate: dateFrom ? format(dateFrom, "yyyy-MM-dd") : "",
    endDate: dateTo ? format(dateTo, "yyyy-MM-dd") : "",
  });

  const requests = activeServiceId
    ? serviceRequestsRes.data?.data?.data
    : allRequestsRes.data?.data?.data;

  const assignedRequests = requests?.filter((request) => request.status === "ASSIGNED");
  const acceptedRequests = requests?.filter((request) => request.status === "ACCEPTED");
  const completedRequests = requests?.filter((request) => request.status === "COMPLETED");

  const requestsLoading = activeServiceId ? serviceRequestsRes.isLoading : allRequestsRes.isLoading;

  const data = partners?.map((partner) => ({
    name: partner.fullName?.split(" ")?.[0],
    completed: completedRequests?.filter((el) => el.partnerInCharge === partner.id)?.length || 0,
    ongoing: acceptedRequests?.filter((el) => el.partnerInCharge === partner.id)?.length || 0,
    assigned: assignedRequests?.filter((el) => el.partnerInCharge === partner.id)?.length || 0,
  }));

  return (
    <Wrapper
      activeService="Partner analytics"
      className="gap-6"
      rangeLabel=""
      total={0}
      totalCompare={0}
      compareLabel=""
      hideDescription
    >
      <div className="min-h-64 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: -30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="assigned" stackId="a" fill="#bdccdb" />
            <Bar dataKey="ongoing" stackId="a" fill="#00a4d6" />
            <Bar dataKey="completed" stackId="a" fill="#66cc66" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
};

export default PartnerChart;

interface IProps {
  dateFrom?: Date;
  dateTo?: Date;
  activeServiceId?: string;
}

interface IDayData {
  dayDate: string;
  dayData: any[];
}
