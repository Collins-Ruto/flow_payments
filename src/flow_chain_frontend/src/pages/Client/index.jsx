import React, { useEffect, useState, useCallback } from "react";

// import {flow_chain_backend} from "../../../../declarations/flow_chain_backend";
import ClientDashboard from "../dashboard/ClientDashboard";
import Login from "./Login";
import { useAuth } from "../../utils/auth";
import ActivateClientAccount from "./ActivateClientAccount";
import { getClientCompanyByOwner } from "../../utils/clientCompany";

const Client = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);
  const { loginWithII, loginWithNFID, walletAddress, isAuthenticated } =
  useAuth();

  
  const fetchClient = useCallback(async () => {
    try {
      setLoading(true);
      setClient(
        await getClientCompanyByOwner().then(async (res) => {
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

  console.log("client1", client);

  useEffect(() => {
    fetchClient();
  }, []);

  return (

      <>
      {/* <Notification /> */}
      {isAuthenticated ? (
        !loading ? (
          client?.name ? (
            <main>
              <ClientDashboard client={client} />
            </main>
          ) : (
            <ActivateClientAccount fetchClient={fetchClient} />
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

export default Client;
