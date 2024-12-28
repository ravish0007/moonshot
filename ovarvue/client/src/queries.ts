import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useAggregateQuery(age, gender, startDate, endDate) {
  return useQuery({
    queryKey: ["aggregates", age, gender, startDate, endDate],
    queryFn: () => API.getAggregates(age, gender, startDate, endDate),
  });
}
