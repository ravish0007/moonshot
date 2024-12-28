import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "react-router-dom";

import { DatePickerWithRange } from "./DateRangePicker";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import usePreferenceStore from "@/store/preferenceStore";
import { useMemo } from "react";

const Close = ({ onClick, visible }) => {
  if (!visible) {
    return <X color="white" />;
  }

  return (
    <X
      onClick={onClick}
      color="#3f3f46"
      className="cursor-pointer  rounded border border-transparent "
    />
  );
};

export default function Filters({ className }) {
  const { gender, label, startDate, endDate, age, setPreference } =
    usePreferenceStore((state) => state);

  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = (key, value) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    });
  };

  const setDate = (x) => {
    setPreference({
      age,
      label,
      gender,
      startDate: x.from?.toISOString(),
      endDate: x.to?.toISOString(),
    });
    setParams("startDate", x.from?.toISOString());
    setParams("endDate", x.to?.toISOString());
  };

  const setGender = (gender) => {
    setPreference({ age, label, gender, startDate, endDate });
    setParams("gender", gender);
  };

  const setAge = (age) => {
    setPreference({ age, label, gender, startDate, endDate });
    setParams("age", age);
  };

  const date = useMemo(
    () => ({
      from: startDate ? new Date(startDate) : undefined,
      to: endDate ? new Date(endDate) : undefined,
    }),
    [startDate, endDate]
  );

  return (
    <div
      className={cn(
        "flex justify-around py-4 px-6  border border-zinc-300 rounded-md flex-wrap gap-2 items-start",
        className
      )}
    >
      <div className="flex justify-center gap-2 items-center">
        <Select key={gender} value={gender} onValueChange={setGender}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
          </SelectContent>
        </Select>

        <Close onClick={() => setGender(undefined)} visible={!!gender} />
      </div>

      <div className="flex justify-center gap-2 items-center">
        <Select key={age} value={age} onValueChange={setAge}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15-25">15-25</SelectItem>
            <SelectItem value=">25">{">25"}</SelectItem>
          </SelectContent>
        </Select>
        <Close onClick={() => setAge(undefined)} visible={!!age} />
      </div>

      <div className="flex justify-center gap-2 items-center">
        <DatePickerWithRange date={date} setDate={setDate} />
        <Close
          onClick={() => setDate({ from: null, to: null })}
          visible={!!startDate || !!endDate}
        />
      </div>
    </div>
  );
}
