import { useEffect, useState } from "react";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f10] text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 70, 95, 0.18), transparent 45%)`,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:42px_42px] opacity-30" />

      <div className="relative z-10">
        <nav className="fixed left-0 top-0 z-50 flex w-full justify-end gap-10 bg-[#18181a]/80 px-12 py-5 text-base font-semibold backdrop-blur-md">
          <a href="#home" className="transition hover:text-red-400">
            Home
          </a>
          <a href="#about" className="transition hover:text-red-400">
            About
          </a>
          <a href="#case-studies" className="transition hover:text-red-400">
            Case Studies
          </a>
          <a href="#contact" className="transition hover:text-red-400">
            Contact
          </a>
        </nav>

        <section
          id="home"
          className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-red-400">
            Enterprise Systems & Infrastructure
          </p>

          <h1 className="max-w-5xl text-5xl font-light leading-tight md:text-7xl">
            Hello, I&apos;m <span className="text-red-400">Chris</span>.
            <br />
            I modernize complex security technology platforms.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
            I work across infrastructure, physical security systems, and
            enterprise operations to turn real-world business needs into
            practical technical solutions.
          </p>

          <a
            href="#case-studies"
            className="mt-10 border border-red-400 px-8 py-3 text-red-400 transition hover:bg-red-400 hover:text-white"
          >
            View my work ↓
          </a>
        </section>

        <section id="about" className="min-h-screen px-12 py-28">
          <h2 className="text-center text-5xl font-bold">About</h2>
        </section>

        <section id="case-studies" className="min-h-screen px-12 py-28">
          <h2 className="text-center text-5xl font-bold">Case Studies</h2>
        </section>

        <section id="contact" className="min-h-screen px-12 py-28">
          <h2 className="text-center text-5xl font-bold">Contact</h2>
        </section>
      </div>
    </main>
  );
}

export default App;