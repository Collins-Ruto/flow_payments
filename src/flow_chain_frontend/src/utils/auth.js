import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authClient, setAuthClient] = useState(null);
  const [authState, setAuthState] = useState({
    walletAddress: null,
    principal: null,
    authProvider: null,
  });

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const client = window.auth.client;

      setAuthClient(client);
      const isAuthenticated = await client.isAuthenticated();
      console.log("authd", isAuthenticated);
      if (isAuthenticated) {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        const storedProvider = localStorage.getItem("auth_provider");
        setAuthState({
          walletAddress: principal.toText(),
          principal: principal,
          authProvider: storedProvider || null,
        });
      }
      setIsAuthenticated(isAuthenticated);
    } catch (error) {
      console.error("Error initializing auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithII = async () => {
    if (!authClient) {
      throw new Error("Auth client not initialized");
    }
    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: "http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943/", //change this for local dev
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days
        derivationOrigin: window.location.origin,
        windowOpenerFeatures:
          `left=${window.screen.width / 2 - 525 / 2},` +
          `top=${window.screen.height / 2 - 705 / 2},` +
          `toolbar=0,location=0,menubar=0,width=525,height=705`,
        onSuccess: async () => {
          try {
            const identity = authClient.getIdentity();
            const principal = identity.getPrincipal();
            const principalId = principal.toText();
            console.log("Generated Principal ID:", principalId);
            setAuthState({
              walletAddress: principalId,
              principal: principal,
              authProvider: "II",
            });
            localStorage.setItem("auth_provider", "II");
            localStorage.setItem("ii_principal", principalId);
            setIsAuthenticated(true);
            resolve(true);
          } catch (error) {
            console.error("Error getting identity:", error);
            reject(error);
          }
        },
        onError: (error) => {
          console.error("Login error:", error);
          reject(error);
        },
      });
    });
  };

  const loginWithNFID = async () => {
    if (!authClient) {
      throw new Error("Auth client not initialized");
    }
    return new Promise((resolve, reject) => {
      authClient.login({
        identityProvider: "https://nfid.one/authenticate/",
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        windowOpenerFeatures:
          `left=${window.screen.width / 2 - 525 / 2},` +
          `top=${window.screen.height / 2 - 705 / 2},` +
          `toolbar=0,location=0,menubar=0,width=525,height=705`,
        onSuccess: async () => {
          try {
            const identity = authClient.getIdentity();
            const principal = identity.getPrincipal();
            setAuthState({
              walletAddress: principal.toText(),
              principal: principal,
              authProvider: "NFID",
            });
            localStorage.setItem("auth_provider", "NFID");
            localStorage.setItem("nfid_wallet", principal.toText());
            setIsAuthenticated(true);
            resolve(true);
          } catch (error) {
            console.error("Error getting identity:", error);
            reject(error);
          }
        },
        onError: (error) => {
          console.error("Login error:", error);
          reject(error);
        },
      });
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setAuthState({
      walletAddress: null,
      principal: null,
      authProvider: null,
    });
    localStorage.removeItem("auth_provider");
    localStorage.removeItem("nfid_wallet");
    localStorage.removeItem("ii_principal");
  };

  return {
    isAuthenticated,
    isLoading,
    loginWithII,
    loginWithNFID,
    logout,
    authClient,
    walletAddress: authState.walletAddress,
    principal: authState.principal,
    authProvider: authState.authProvider,
  };
};
