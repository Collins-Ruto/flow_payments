import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../utils/auth";
// import { Notification } from "../../components/utils/Notifications";
import Login from "./Login";
import { getSupplyCompanyByOwner } from "../../utils/supplyCompany";
// import { Loader } from "../../components/utils";
import ActivateSupplierAccount from "./ActivateSupplierAccount";
import SupplierDashboard from "../dashboard/SupplierDashboard";

const Supplier = () => {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginWithII, loginWithNFID, walletAddress, isAuthenticated } =
    useAuth();

  const fetchSupplier = useCallback(async () => {
    try {
      setLoading(true);
      setSupplier(
        await getSupplyCompanyByOwner().then(async (res) => {
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

  console.log("supplier", supplier);
  console.log("supplier2 auth", isAuthenticated);

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <>
      {/* <Notification /> */}
      {isAuthenticated ? (
        !loading ? (
          supplier?.name ? (
            <main>
              <SupplierDashboard supplier={supplier} />
            </main>
          ) : (
            <ActivateSupplierAccount fetchSupplier={fetchSupplier} />
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

export default Supplier;
