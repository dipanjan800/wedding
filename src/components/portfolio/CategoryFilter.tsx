"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type ProjectCategory, ALL_CATEGORIES } from "@/lib/portfolio-data";

interface CategoryFilterProps {
  active: ProjectCategory;
  onChange: (cat: ProjectCategory) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const [hovered, setHovered] = useState<ProjectCategory | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % ALL_CATEGORIES.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + ALL_CATEGORIES.length) % ALL_CATEGORIES.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = ALL_CATEGORIES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    onChange(ALL_CATEGORIES[nextIndex]);
  };

  return (
    <div
      className="relative flex items-center flex-wrap gap-1.5 py-1"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {ALL_CATEGORIES.map((cat, i) => {
        const isActive = cat === active;
        const isHovered = hovered === cat && !isActive;

        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(cat)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onMouseEnter={() => setHovered(cat)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex-shrink-0 focus-visible:outline-none"
            style={{
              padding: "6px 16px",
              fontSize: "9.5px",
              letterSpacing: "0.22em",
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              textTransform: "uppercase",
              cursor: "pointer",
              borderRadius: "2px",
              color: isActive
                ? "#08080A"
                : isHovered
                ? "rgba(247,246,243,0.75)"
                : "rgba(247,246,243,0.32)",
              transition: "color 0.35s cubic-bezier(0.16,1,0.3,1)",
              zIndex: 1,
            }}
          >
            {/* Active gold pill — layout-animated with spring */}
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, #A0791E 0%, #C9A227 35%, #D4AF37 55%, #E8CC78 75%, #D4AF37 100%)",
                  borderRadius: "2px",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 38 }}
              />
            )}

            {/* Hover ghost — subtle highlight for inactive buttons */}
            {isHovered && (
              <motion.span
                layoutId="filter-hover"
                className="absolute inset-0"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "2px",
                }}
                transition={{ duration: 0.18 }}
              />
            )}

            <span className="relative">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
