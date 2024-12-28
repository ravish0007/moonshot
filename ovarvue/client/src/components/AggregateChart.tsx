import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useAggregateQuery } from "@/queries";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

const chartConfig = {
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function AggregateChart({ className }) {
  const { age, startDate, endDate, gender, setPreference } = usePreferenceStore(
    (state) => state
  );

  const setLabel = (label) => {
    setPreference({ age, startDate, endDate, gender, label });
  };

  const query = useAggregateQuery(age, gender, startDate, endDate);

  const data = useMemo(() => {
    return query.data.sort((a, b) => a.label.localeCompare(b.label));
  }, [query.data]);

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

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Features Time Consumption</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={query.data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="label"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="time" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="time"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
              onClick={(data) => {
                setLabel(data.label);
              }}
            >
              <LabelList
                dataKey="label"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="time"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
