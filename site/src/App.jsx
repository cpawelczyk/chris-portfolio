function App() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <nav className="fixed top-0 left-0 z-50 flex w-full justify-end gap-10 bg-[#222]/90 px-12 py-5 text-lg font-semibold backdrop-blur">
        <a href="#home" className="hover:text-red-400">Home</a>
        <a href="#about" className="hover:text-red-400">About</a>
        <a href="#case-studies" className="hover:text-red-400">Case Studies</a>
        <a href="#contact" className="hover:text-red-400">Contact</a>
      </nav>

      <section
        id="home"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-red-400">
          Enterprise Systems & Infrastructure
        </p>

        <h1 className="max-w-5xl text-5xl font-light leading-tight md:text-7xl">
          Hello, I&apos;m <span className="text-red-400">Chris</span>.
          <br />
          I modernize complex security technology platforms.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300">
          I work across infrastructure, physical security systems, and enterprise
          operations to turn real-world business needs into practical technical
          solutions.
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
    </main>
  );
}

export default App;