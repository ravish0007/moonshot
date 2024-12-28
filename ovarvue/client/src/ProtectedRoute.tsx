import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import useUserStore from "@/store/userStore";
import usePreferenceStore from "@/store/preferenceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import API from "@/api";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

// ProtectedRoute Component
const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const email = useUserStore((state: any) => state.email);
  const { age, gender, startDate, endDate, setPreference } = usePreferenceStore(
    (state) => state
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [params, setParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token && email) {
      const preference = {
        age: undefined,
        gender: undefined,
        startDate: undefined,
        endDate: undefined,
      };

      const validations = {
        gender: /^(MALE|FEMALE)$/,
        age: /^(15-25|>25)$/,
        startDate:
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[\+\-]\d{2}:\d{2})$/,
        endDate:
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(Z|[\+\-]\d{2}:\d{2})$/,
      };

      for (const pref of ["age", "startDate", "endDate", "gender"]) {
        if (params.has(pref)) {
          if (validations[pref].test(params.get(pref))) {
            preference[pref] = params.get(pref);
          }
        }
      }

      // only set preference if params found if not use local and restore search params
      if ([...params.keys()].length > 0) {
        setPreference(preference);
      } else {
        setParams((prev) => {
          for (const pref of [
            ["age", age],
            ["gender", gender],
            ["startDate", startDate],
            ["endDate", endDate],
          ]) {
            if (pref[1]) {
              prev.set(pref[0], pref[1]);
            }
          }
          return prev;
        });
      }

      API.setAccessToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login", { state: { location } });
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="h-full flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Hang in there.</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Setting up...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return element;
};

export default ProtectedRoute;
