import React, { useEffect, useState } from "react";
import { GenerateBatteryReport } from "../../wailsjs/go/services/System";

export default function Battery() {
  const [reportHtml, setReportHtml] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const generateReport = async () => {
      setIsLoading(true);
      setError("");
      try {
        const html = await GenerateBatteryReport();
        setReportHtml(html);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    generateReport();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <button
          onClick={generateReport}
          disabled={isLoading}
          style={{ padding: "8px 16px" }}
        >
          {isLoading ? "Generating..." : "Generate Battery Report"}
        </button>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </div> */}

      {reportHtml ? (
        <iframe
          srcDoc={reportHtml}
          title="Battery Report"
          style={{ flex: 1, border: "none", width: "100%" }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "#666",
          }}
        >
          {isLoading ? "Generating report..." : "No report generated yet"}
        </div>
      )}
    </div>
  );
}
