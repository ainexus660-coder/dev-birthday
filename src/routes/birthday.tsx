import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/birthday")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Dev Raj! 🎉" },
      { name: "description", content: "A heartfelt birthday wish for Dev Raj — may your day shine brighter than ever." },
      { property: "og:title", content: "Happy Birthday, Dev Raj! 🎉" },
      { property: "og:description", content: "A heartfelt birthday wish, animated with love." },
    ],
  }),
  component: Birthday,
});

const wishes = [
  {
    title: "To the One Who Lights Up Every Room",
    body: "Happy Birthday, my friend! 🎉\nWishing you a day filled with happiness, laughter, and all the things you love. You’re not just a friend, but someone who makes life better and brighter. May this new year of your life bring you success, good health, endless joy, and all your dreams come true. Stay blessed and keep shining. Enjoy your special day! 🎂✨",
  },
  {
    title: "Here's to Your Dreams",
    body: "May every goal you chase find you, every door you knock on open wide, and every step forward feel like flying.",
  },
  {
    title: "Forever Grateful",
    body: "Grateful for the friend, the brother, the human you are. Happy Birthday, Dev.",
  },
];

function fireConfetti() {
  const end = Date.now() + 1500;
  const colors = ["#ff6ec7", "#ffd166", "#a78bfa", "#7dd3fc"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function Birthday() {
  const [revealed, setRevealed] = useState(false);
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setVh(window.innerHeight);
    fireConfetti();
    const t = setTimeout(() => setRevealed(true), 1800);
    const interval = setInterval(fireConfetti, 6000);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  }, []);

  const name = "DEV RAJ";

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-10" style={{ background: "var(--gradient-night)" }}>
      {/* floating balloons */}
      {["🎈", "🎈", "🎂", "🎁", "🎉", "🌟", "💖", "🎈"].map((emoji, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute text-3xl"
          style={{ left: `${(i * 13 + 5) % 95}%`, bottom: -50 }}
          animate={{ y: [-50, -(vh + 100)], x: [0, i % 2 ? 30 : -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8 + (i % 4), repeat: Infinity, delay: i * 1.2, ease: "linear" }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-xs"
            style={{ background: "oklch(1 0 0 / 0.08)", color: "oklch(0.9 0.02 320)", border: "1px solid oklch(1 0 0 / 0.1)" }}
          >
            ← back to calendar
          </Link>
        </motion.div>

        {/* Headline */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-sm uppercase tracking-[0.4em]"
            style={{ color: "var(--birthday-gold)" }}
          >
            🎂 June 24, 2026 🎂
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="mt-4 text-5xl font-extrabold leading-tight sm:text-7xl"
            style={{
              background: "var(--gradient-fest)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Happy Birthday
          </motion.h1>

          <div className="mt-3 flex justify-center gap-1 sm:gap-2">
            {name.split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0, rotate: 90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring", bounce: 0.6 }}
                className="inline-block text-3xl font-black sm:text-5xl"
                style={{
                  color: c === " " ? "transparent" : i % 2 ? "var(--birthday-pink)" : "var(--birthday-cyan)",
                  textShadow: c === " " ? "none" : "0 4px 20px oklch(0.78 0.18 350 / 0.6)",
                }}
              >
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: [0, 1.3, 1], rotate: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-6 text-7xl"
          >
            🎂
          </motion.div>
        </div>

        {/* Wishes */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-10 space-y-4"
            >
              {wishes.map((w, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.25, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="rounded-2xl p-5 backdrop-blur-xl"
                  style={{
                    background: "oklch(1 0 0 / 0.06)",
                    border: "1px solid oklch(1 0 0 / 0.12)",
                    boxShadow: "0 10px 30px -10px oklch(0.55 0.22 300 / 0.4)",
                  }}
                >
                  <h3
                    className="mb-2 text-lg font-bold"
                    style={{ color: i % 2 ? "var(--birthday-pink)" : "var(--birthday-gold)" }}
                  >
                    {w.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "oklch(0.92 0.02 320)" }}>
                    {w.body}
                  </p>
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fireConfetti}
                className="mx-auto mt-6 block rounded-full px-8 py-4 text-base font-bold text-white"
                style={{
                  background: "var(--gradient-fest)",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                🎉 Celebrate Again
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="pt-6 pb-4 text-center text-sm italic"
                style={{ color: "oklch(0.8 0.04 320)" }}
              >
                "May your year be as wonderful as you've made ours." 💫
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}