import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <Card className="max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-600">
            Oops! The page you're looking for doesn't exist.
          </p>
          <div className="mt-6">
            <Button onClick={() => navigate("/")} className="w-full">
              Go Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
