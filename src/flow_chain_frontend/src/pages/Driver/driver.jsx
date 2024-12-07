import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../utils/auth";
import Login from "./Login";
import { get_driver_by_owner } from "../../utils/driver";
import DriverRegistrationForm from "../../components/forms/DriverRegistrationForm";
import DriverDashboard from "./driverDashboard";

const Driver = () => {
  const [driver, setDriver] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginWithII,  isAuthenticated } =
    useAuth();

  const fetchDriver = useCallback(async () => {
    try {
      setLoading(true);
      const res = await get_driver_by_owner();
      setDriver(
        await get_driver_by_owner().then(async (res) => {
          console.log("res", res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  console.log("Driver", driver);

  useEffect(() => {
    fetchDriver();
  }, []);

  return (
    <>
      {/* <Notification /> */}
      {isAuthenticated ? (
        !loading ? (
          driver?.full_name ? (
            <main>
              <DriverDashboard driver={ driver } />
            </main>
          ) : (
            <DriverRegistrationForm fetchDriver={fetchDriver} />
          )
        ) : (
          // <Loader />
          <div>Loading</div>
        )
      ) : (
        <Login login={loginWithII} />
      )}
    </>
  );
};

export default Driver;
