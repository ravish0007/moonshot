import ProfileAvatar from "@/components/ProfileAvatar";
import Share from "@/components/Share";
import Filters from "@/components/Filters";
import { AggregateChart } from "@/components/AggregateChart";
import { FeatureTrendChart } from "@/components/FeatureTrendChart";

export default function DashBoard() {
  return (
    <div className="mx-auto border  border-zinc-300  min-h-svh w-full md:w-2/3   pt-3 px-6">
      <div className="flex justify-between items-center">
        <Share />
        <ProfileAvatar />
      </div>

      <Filters className="mt-8" />

      <div className="mt-8 flex flex-col md:flex-row flex-start gap-4">
        <AggregateChart className="md:w-1/2" />
        <FeatureTrendChart className="md:w-1/2" />
      </div>
    </div>
  );
}
