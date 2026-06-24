import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Special Day for Dev Raj 🎂" },
      { name: "description", content: "A surprise birthday calendar for Dev Raj — tap June 24 to unwrap his wish." },
      { property: "og:title", content: "A Special Day for Dev Raj 🎂" },
      { property: "og:description", content: "Tap June 24 to unwrap a birthday surprise." },
    ],
  }),
  component: Index,
});

function Index() {
  const firstDay = new Date(2026, 5, 1).getDay();
  const daysInMonth = 30;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8" style={{ background: "var(--gradient-night)" }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            background: i % 2 ? "var(--birthday-gold)" : "var(--birthday-pink)",
            filter: "blur(0.5px)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="relative mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--birthday-gold)" }}>
            A Special Month
          </p>
          <h1
            className="mt-2 text-5xl font-extrabold"
            style={{
              background: "var(--gradient-fest)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            June 2026
          </h1>
          <p className="mt-3 text-sm" style={{ color: "oklch(0.8 0.03 320)" }}>
            Tap the glowing date to reveal something magical ✨
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl p-5 backdrop-blur-xl"
          style={{
            background: "oklch(1 0 0 / 0.05)",
            border: "1px solid oklch(1 0 0 / 0.1)",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <div
            className="mb-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold"
            style={{ color: "var(--birthday-gold)" }}
          >
            {weekdays.map((w, i) => (
              <div key={i} className="py-2">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} className="aspect-square" />;
              const isBirthday = d === 24;
              if (isBirthday) {
                return (
                  <Link key={i} to="/birthday" className="relative aspect-square">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: [
                          "0 0 0px oklch(0.78 0.18 350 / 0.8)",
                          "0 0 25px oklch(0.78 0.18 350 / 0.9)",
                          "0 0 0px oklch(0.78 0.18 350 / 0.8)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="relative flex h-full w-full items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{ background: "var(--gradient-fest)" }}
                    >
                      {d}
                      <motion.span
                        animate={{ y: [-2, -6, -2], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 text-base"
                      >
                        🎂
                      </motion.span>
                    </motion.div>
                  </Link>
                );
              }
              return (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-xl text-sm"
                  style={{ background: "oklch(1 0 0 / 0.04)", color: "oklch(0.85 0.02 320)" }}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-xs"
          style={{ color: "oklch(0.7 0.05 320)" }}
        >
          For <span style={{ color: "var(--birthday-pink)" }}>Dev Raj</span> — with love 💖
        </motion.p>
      </div>
    </div>
  );
}