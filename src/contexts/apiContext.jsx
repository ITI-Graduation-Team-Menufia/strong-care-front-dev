import React, { createContext, useContext, useState, useEffect } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import i18next from "i18next";

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

export default ApiContext;

export function ApiProvider({ children }) {
  const { makeApiRequest, loading } = useApiRequest();

  const [data, setData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [baseUrl, setBaseUrl] = useState(null);
  const [loggedUserData, setLoggedUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {}, [loggedUserData]);

  const createResource = async (newResource, baseURL = baseUrl) => {
    try {
      const result = await makeApiRequest(baseURL, "post", newResource, {
        token,
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const getResource = async (id, baseURL = baseUrl) => {
    try {
      const result = await makeApiRequest(`${baseURL}/${id}`, "get", null, {
        token,
      });
      setData(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const updateResource = async (id, updatedResource, baseURL = baseUrl) => {
    try {
      const result = await makeApiRequest(
        `${baseURL}/${id}`,
        "put",
        updatedResource,
        { token }
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const editPartOfResource = async (id, updatedPart, baseURL = baseUrl) => {
    try {
      const result = await makeApiRequest(
        `${baseURL}/${id}`,
        "patch",
        updatedPart,
        { token }
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteResource = async (id, baseURL = baseUrl) => {
    try {
      const result = await makeApiRequest(`${baseURL}/${id}`, "delete", null, {
        token,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllResources = async (baseURL = baseUrl) => {
    try {
      const result = await makeApiRequest(baseURL, "get", null, {
        token,
      });
      setData(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const setNewToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    }
    setToken(newToken);
  };

  const apiContextValue = {
    data,
    loading,
    createResource,
    getResource,
    updateResource,
    editPartOfResource,
    deleteResource,
    getAllResources,
    token,
    baseUrl,
    setToken: setNewToken,
    setBaseUrl,
    loggedUserData,
    setLoggedUserData,
  };

  return (
    <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  );
}
