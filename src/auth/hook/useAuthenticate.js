import { useState } from "react";
import axios from "axios";
import {Navigate } from "react-router-dom";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:8001/api/login");

  const fetchData = async (employee_id, password) => {
    if (!employee_id) {
      setError(new Error("Employee ID is required"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const authResponse = await axios.post(`${apiUrl}`, {
        employee_id: employee_id,
        password: password
      }, {
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
        }
      });

      if (authResponse.status !== 200) {
        setError(new Error(authResponse.data.message || "Employee not found in records."));
        return;
      }

      const token = authResponse.data;
      console.log("✅ Authentication successful:", token);
      localStorage.setItem("authentication", JSON.stringify(token));
      setData(token);
      window.location.href = `/${token.role}`;

    } catch (err) {
      console.error("❌ Error:", err.response?.data?.message || err.message);
      setError(new Error(err.response?.data?.message || "An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchData };
};

export default useAuthenticate;
