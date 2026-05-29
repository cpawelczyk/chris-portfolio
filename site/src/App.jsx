import { useEffect, useState } from "react";
import {
  Server,
  ShieldCheck,
  Video,
  KeyRound,
  RadioTower,
  Cloud,
  Terminal,
  Workflow,
  MonitorCog,
  Network,
  TicketCheck,
  Wrench,
} from "lucide-react";
import profilePhoto from "./assets/profile.png";

const techCards = [
  { label: "Milestone XProtect", icon: Video },
  { label: "C•CURE 9000", icon: KeyRound },
  { label: "Windows Server", icon: Server },
  { label: "Active Directory", icon: ShieldCheck },
  { label: "GSOC Operations", icon: MonitorCog },
  { label: "ServiceNow ITSM", icon: TicketCheck },
  { label: "PowerShell", icon: Terminal },
  { label: "Armis Centrix", icon: Wrench },
  { label: "Vulnerability Remediation", icon: ShieldCheck },
  { label: "Network Coordination", icon: Network },
  { label: "Cloud-Hosted Platforms", icon: Cloud },
  { label: "Platform Modernization", icon: Workflow },
];

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
        <nav className="fixed left-0 top-0 z-50 flex w-full justify-center gap-6 bg-[#18181a]/80 px-6 py-4 text-sm font-semibold backdrop-blur-md md:justify-end md:gap-10 md:px-12 md:text-base">
          <a href="#home" className="transition hover:text-red-400">Home</a>
          <a href="#about" className="transition hover:text-red-400">About</a>
          <a href="#case-studies" className="transition hover:text-red-400">Case Studies</a>
          <a href="#contact" className="transition hover:text-red-400">Contact</a>
        </nav>

        <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
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

          <a href="#case-studies" className="mt-10 border border-red-400 px-8 py-3 text-red-400 transition hover:bg-red-400 hover:text-white">
            View my work ↓
          </a>
        </section>

        <section id="about" className="min-h-screen px-6 py-28 md:px-12">
          <h2 className="text-center text-5xl font-bold md:text-6xl">
            About
            <span className="mx-auto mt-1 block h-3 w-36 bg-red-400" />
          </h2>

          <div className="mx-auto mt-20 grid max-w-7xl gap-14 md:grid-cols-[0.9fr_1.2fr] md:items-center">
            <div className="text-center md:text-left">
              <img
                src={profilePhoto}
                alt="Chris Pawelczyk"
                className="mx-auto h-60 w-60 rounded-full border border-red-400/40 object-cover shadow-[0_0_60px_rgba(248,113,113,0.24)] md:mx-0 md:h-64 md:w-64"
              />

              <h3 className="mt-10 text-3xl font-bold md:text-4xl">Chris Pawelczyk</h3>
              <p className="mt-2 text-red-400">
                Enterprise Systems & Infrastructure Professional
              </p>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
                I work on enterprise security technology platforms where
                infrastructure, operations, and physical security systems meet.
                My background includes video surveillance, access control,
                platform modernization, GSOC operations, vulnerability
                remediation, and cross-functional enterprise deployments.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {techCards.map(({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`flex min-h-32 flex-col items-center justify-center rounded-xl border border-red-400/35 bg-[#18181a]/75 p-5 text-center shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-red-400 hover:shadow-[0_0_35px_rgba(248,113,113,0.22)] ${
                    index % 3 === 1 ? "md:translate-y-8" : ""
                  }`}
                >
                  <Icon className="mb-3 h-8 w-8 text-red-400" />
                  <span className="text-sm font-semibold text-gray-200">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
