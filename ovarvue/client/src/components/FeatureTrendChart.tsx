import {
  CartesianGrid,
  Line,
  LabelList,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import usePreferenceStore from "@/store/preferenceStore";
import { useTimeTrendQuery } from "@/queries";

import { format } from "date-fns"; // Import date-fns

import { cn } from "@/lib/utils";

export function FeatureTrendChart({ className }) {
  const { age, startDate, endDate, gender, label } = usePreferenceStore(
    (state) => state
  );

  const query = useTimeTrendQuery(age, gender, startDate, endDate, label);

  if (!label) {
    return;
  }

  if (query.isLoading) {
    return <Skeleton className="h-[300px] md:w-1/2  rounded-xl" />;
  }

  if (query.isError) {
    return (
      <Alert>
        <TriangleAlert color="#ef4444" className="h-4 w-4" />
        <AlertTitle className="text-red-500">
          Error Fetching Results!
        </AlertTitle>
        <AlertDescription>Try again later.</AlertDescription>
      </Alert>
    );
  }

  const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
  ];

  const chartConfig = {
    time: {
      label: "time",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Trending of '{label}'</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={query.data}>
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(timestamp) =>
                format(new Date(timestamp), "dd-MMM-yy")
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="time"
              type="linear"
              stroke="var(--color-time)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-time)",
              }}
            ></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
