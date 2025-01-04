import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

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

  const options = {
    scales: {
      x: {
        ticks: {
          color: "black",
        },
        grid: {
          display: false, // Disable grid lines on the x-axis
        },
      },
      y: {
        ticks: {
          color: "black",
        },
        grid: {
          display: false, // Disable grid lines on the y-axis
        },
      },
    },
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        displayColors: false,
        titleColor: "black",
        bodyColor: "black",
        callbacks: {
          label: function (tooltipItem) {
            return `time ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true, // Enable panning
          mode: "xy", // Allow panning on both axes
        },
        zoom: {
          enabled: true, // Enable zooming
          mode: "xy", // Allow zooming on both axes
          pinch: {
            enabled: true, // Enable zooming using pinch gestures
          },
          wheel: {
            enabled: true, // Enable zooming with the mouse wheel
          },
        },
      },
    },
  };

  const labels = query.data.map((x) => format(new Date(x.date), "dd-MMM-yy"));

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: query.data.map((x) => x.time),
        borderColor: "rgb(0, 0, 0)",
        pointBackgroundColor: ["black"],
      },
    ],
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Time trend of "{label}"</CardTitle>
      </CardHeader>
      <div className="pl-3">
        <Line options={options} data={data} />
      </div>
    </Card>
  );
}
