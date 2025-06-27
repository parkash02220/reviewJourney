import { useCallback, useRef, useState } from "react";

const useGetJourneyData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hasFetchedDataOnce = useRef(false);

  const getJourneyData = useCallback(async (baseUrl, userId, journeyId) => {
    if (!baseUrl || !userId || !journeyId) {
      setError("Missing baseUrl, user_id or journey_id");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const summaryRes = await fetch(
        `${baseUrl}/users/get-summary?journey_id=${journeyId}`,
        {
          method: "GET",
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );

      if (!summaryRes.ok) {
        throw new Error(`Summary API failed: ${summaryRes.status}`);
      }

      const summaryData = await summaryRes.json();

      const userRes = await fetch(
        `${baseUrl}/users?user_id=${userId}&journey_id=${journeyId}`,
        {
          method: "GET",
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );

      if (!userRes.ok) {
        throw new Error(`User API failed: ${userRes.status}`);
      }

      const userData = await userRes.json();

      setData({ summary: summaryData?.summary, user: userData?.user });
    } catch (err) {
      if (err.name === "AbortError") {
        console.warn("Fetch aborted");
      } else {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
      hasFetchedDataOnce.current = true;
    }
  }, []);

  return {
    data,
    loading,
    error,
    getJourneyData,
    hasFetchedDataOnce: hasFetchedDataOnce.current,
  };
};

export default useGetJourneyData;
