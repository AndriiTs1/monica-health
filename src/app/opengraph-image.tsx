import { ImageResponse } from "next/og";

export const alt =
  "Monica Ceruolo — Infermiera indipendente a domicilio a Lugano";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f1e8",
          color: "#24372d",
          fontFamily: "Arial, sans-serif",
          padding: "54px 62px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "62%",
            paddingRight: "48px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4b765f",
              marginBottom: 24,
            }}
          >
            Assistenza infermieristica a domicilio
          </div>

          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 18,
            }}
          >
            Monica Ceruolo
          </div>

          <div
            style={{
              fontSize: 30,
              lineHeight: 1.25,
              color: "#4f5f56",
              marginBottom: 34,
            }}
          >
            Infermiera indipendente
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 23,
              lineHeight: 1.45,
              color: "#66736c",
              maxWidth: 610,
            }}
          >
            Assistenza professionale e personale a domicilio a Lugano,
            Figino e nelle zone vicine.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 38,
              fontSize: 20,
              fontWeight: 600,
              color: "#3d6f57",
            }}
          >
            Lugano · Ticino
          </div>
        </div>

        <div
          style={{
            width: "38%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://monica-ceruolo.vercel.app/images/monica.png"
            alt=""
            width="390"
            height="500"
            style={{
              objectFit: "cover",
              width: 390,
              height: 500,
              borderRadius: 32,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
