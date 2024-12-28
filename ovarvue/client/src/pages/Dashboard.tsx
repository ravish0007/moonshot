import ProfileAvatar from "@/components/ProfileAvatar";
import Share from "@/components/Share";
import Filters from "@/components/Filters";

import { useAggregateQuery } from "@/queries";

import usePreferenceStore from "@/store/preferenceStore";

export default function DashBoard() {
  const { age, label, startDate, endDate, gender, setPreference } =
    usePreferenceStore((state) => state);

  const query = useAggregateQuery(age, gender, startDate, endDate);

  return (
    <div className="mx-auto  min-h-svh w-full md:w-1/2   pt-3 px-6">
      <div className="flex justify-between items-center">
        <Share />
        <ProfileAvatar />
      </div>

      <Filters className="mt-8" />

      {query.data?.map((h) => (
        <p>
          {h.label} {h.time}
        </p>
      ))}
    </div>
  );
}
