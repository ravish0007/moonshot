import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useAggregateQuery(age, gender, startDate, endDate) {
  return useQuery({
    queryKey: ["aggregates", age, gender, startDate, endDate],
    queryFn: () => API.getAggregates(age, gender, startDate, endDate),
    placeholderData: () => [],
  });
}

export function useTimeTrendQuery(age, gender, startDate, endDate, label) {
  return useQuery({
    queryKey: ["timetrend", age, gender, startDate, endDate, label],
    queryFn: () => API.getTimeTrend(age, gender, startDate, endDate, label),
    placeholderData: () => [],
  });
}
