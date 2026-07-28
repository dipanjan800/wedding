import Link from "next/link";

export default function WeddingNotFound() {
  return (
    <div
      className="min-h-screen bg-[#08080A] flex flex-col items-center justify-center text-center"
      style={{
        paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
        paddingRight: "clamp(1.5rem, 5vw, 5rem)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,150,46,0.04) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      {/* Eyebrow */}
      <span
        className="font-sans font-light uppercase block mb-8"
        style={{
          fontSize: "10px",
          letterSpacing: "0.35em",
          color: "rgba(212,175,55,0.45)",
        }}
      >
        404 — Not Found
      </span>

      {/* Headline */}
      <h1
        className="font-serif font-light mb-6"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
          color: "#F7F6F3",
        }}
      >
        This story{" "}
        <em
          style={{
            fontStyle: "italic",
            background:
              "linear-gradient(110deg, #B8962E, #D4AF37 45%, #F0D697 65%, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          doesn&apos;t exist.
        </em>
      </h1>

      <p
        className="font-sans font-light mb-14"
        style={{
          fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
          color: "rgba(247,246,243,0.3)",
          maxWidth: "420px",
        }}
      >
        The wedding you&apos;re looking for may have been moved or doesn&apos;t exist in our
        portfolio.
      </p>

      <Link
        href="/#weddings"
        className="group inline-flex items-center gap-4 font-sans font-light uppercase"
        style={{
          fontSize: "11px",
          letterSpacing: "0.26em",
          color: "rgba(247,246,243,0.4)",
        }}
      >
        <span className="group-hover:text-[#D4AF37] transition-colors duration-400">
          Back to All Weddings
        </span>
        <span
          className="h-px w-8 group-hover:w-16 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            background: "linear-gradient(to right, rgba(212,175,55,0.6), transparent)",
          }}
        />
      </Link>
    </div>
  );
}
