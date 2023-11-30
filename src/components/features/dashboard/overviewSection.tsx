import AnalyticsCard1 from "@/components/cards/analytics/analyticsCard1";
import AnalyticsCard2 from "@/components/cards/analytics/analyticsCard2";
import AnalyticsCard3 from "@/components/cards/analytics/analyticsCard3";
import React from "react";

const OverviewSection = () => {
  return (
    <div className="snap snap-mandatory snap-x flex gap-8 max-w-full overflow-auto">
      <AnalyticsCard1
        previous={50}
        current={51}
        title="Website visits"
        total="163.5K"
        className="snap-end"
      />
      <AnalyticsCard2 title="User signups" total="345.6k" />
      <AnalyticsCard3
        title="Submitted registrations"
        total="4500"
        current={2500}
        previous={4700}
        className="snap-end"
      />
      <AnalyticsCard3
        title="Completed registrations"
        total="5200"
        current={2500}
        previous={1700}
        className="snap-end"
      />
      <AnalyticsCard3
        title="Pending registrations"
        total="32"
        current={1500}
        previous={1700}
        className="snap-end"
      />
      <AnalyticsCard3
        title="Registration in draft"
        total="300"
        current={2500}
        previous={1000}
        className="snap-end"
      />
    </div>
  );
};

export default OverviewSection;
