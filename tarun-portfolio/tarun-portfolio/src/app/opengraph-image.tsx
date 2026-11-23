import { ImageResponse } from "next/og";

export const alt = "Tarun M K — Engineering Intelligence. Building the Future.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 80% 20%, #1b2a66 0%, #07080b 55%)",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 10, color: "#8aa7ff", marginBottom: 32 }}>TARUN M K</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, display: "flex", flexDirection: "column" }}>
          <span>Engineering Intelligence.</span>
          <span style={{ color: "#a78bfa" }}>Building the Future.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#8a909c" }}>
          Technology Founder · AI Developer · Systems Engineer
        </div>
      </div>
    ),
    size,
  );
}
