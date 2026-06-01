import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";
import {
  Server,
  ShieldCheck,
  Video,
  KeyRound,
  Cloud,
  Terminal,
  Workflow,
  MonitorCog,
  Network,
  TicketCheck,
} from "lucide-react";
import profilePhoto from "./assets/profile.png";
import cs1Thumbnail from "./assets/case-studies/CS1-thumbnail.png";
import cs2Thumbnail from "./assets/case-studies/CS2-thumbnail.png";
import cs3Thumbnail from "./assets/case-studies/CS3-thumbnail.png";

const techCards = [
  { label: "Milestone XProtect", icon: Video },
  { label: "C•CURE 9000", icon: KeyRound },
  { label: "Windows Server", icon: Server },
  { label: "Active Directory", icon: ShieldCheck },
  { label: "PowerShell", icon: Terminal },
  { label: "ServiceNow ITSM", icon: TicketCheck },
  { label: "Network Infrastructure", icon: Network },
  { label: "Cloud-Hosted Platforms", icon: Cloud },
  { label: "Platform Modernization", icon: Workflow },
  { label: "GSOC Operations", icon: MonitorCog },
  { label: "Video Analytics", icon: Video },
  { label: "Vulnerability Remediation", icon: ShieldCheck },
];

const caseStudies = [
  {
    title: "Transforming Distributed Video Systems into a Unified Platform",
    image: cs1Thumbnail,
    description:
      "Modernized a fragmented video surveillance environment by consolidating multiple legacy systems into a centralized enterprise platform. The initiative improved operational consistency, simplified administration, and established a scalable foundation for future growth across geographically distributed facilities.",
  },
  {
    title: "Operational Intelligence Through Video Analytics",
    image: cs2Thumbnail,
    description:
      "Leveraged video analytics to transform surveillance data into actionable business intelligence. By measuring occupancy, dwell time, and movement patterns, the solution provided operational insights that improved visibility, decision-making, and guest experience within a luxury hospitality environment.",
  },
  {
    title:
      "Modernizing the GSOC: Enhancing Situational Awareness Through Automated Video Workflows",
    image: cs3Thumbnail,
    description:
      "Designed automated workflows that transformed security events into actionable operator intelligence. By integrating alerts, video, mapping, and response tools into a unified operating picture, the project improved situational awareness and accelerated decision-making within the security operations center.",
  },
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const photoIn = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
};

const textIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const skillGridIn = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const skillCardIn = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

function App() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f10] text-white">
      <div className="ambient-background pointer-events-none fixed inset-0 z-0">
        <ParticleNetwork />
      </div>

      <div className="relative z-10">
        <nav
          className={`fixed left-0 top-0 z-50 flex w-full justify-center gap-6 bg-[#18181a]/80 px-6 py-4 text-sm font-semibold backdrop-blur-md transition duration-500 md:justify-end md:gap-10 md:px-12 md:text-base ${
            showNav
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          }`}
        >
          <a href="#home" className="transition hover:text-red-400">Home</a>
          <a href="#about" className="transition hover:text-red-400">About</a>
          <a href="#case-studies" className="transition hover:text-red-400">Case Studies</a>
          <a href="#contact" className="transition hover:text-red-400">Contact</a>
        </nav>

        <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-5xl text-5xl font-light leading-tight md:text-7xl">
            Hello, I&apos;m <span className="text-red-400">Chris</span>.
            <br />
            I modernize complex security technology platforms.
          </h1>

          <a href="#about" className="mt-12 border border-red-400 px-8 py-3 text-red-400 transition hover:bg-red-400 hover:text-white">
            Learn More ↓
          </a>
        </section>

        <section className="min-h-screen px-6 pb-20 pt-14 md:px-12 md:pb-24 md:pt-16">
          <motion.h2
            id="about"
            className="scroll-mt-24 text-center text-5xl font-bold md:text-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeIn}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            About
            <span className="mx-auto mt-1 block h-3 w-36 bg-red-400" />
          </motion.h2>

          <div className="mx-auto mt-14 grid max-w-7xl gap-14 md:grid-cols-[0.9fr_1.2fr] md:items-start">
            <div className="text-center md:text-left">
              <motion.img
                src={profilePhoto}
                alt="Chris Pawelczyk"
                className="mx-auto h-60 w-60 rounded-full border border-red-400/40 object-cover shadow-[0_0_60px_rgba(248,113,113,0.24)] md:mx-0 md:h-64 md:w-64"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={photoIn}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={textIn}
                transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
              >
                <h3 className="mt-10 text-3xl font-bold md:text-4xl">Chris Pawelczyk</h3>
                <p className="mt-2 text-red-400">
                  Enterprise Security Systems & Infrastructure
                </p>

                <div className="mt-6 max-w-xl space-y-5 text-lg leading-8 text-gray-300">
                  <p>
                    I work at the intersection of security technology,
                    infrastructure, and enterprise operations, with experience
                    across video management systems, access control platforms,
                    GSOC workflows, and the supporting infrastructure that keeps
                    critical systems running at scale.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={skillGridIn}
            >
              {techCards.map(({ label, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  variants={skillCardIn}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div
                    className={`flex min-h-32 flex-col items-center justify-center rounded-xl border border-red-400/35 bg-[#18181a]/75 p-5 text-center shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur transition hover:-translate-y-1 hover:border-red-400 hover:shadow-[0_0_35px_rgba(248,113,113,0.22)] ${
                      index % 3 === 1 ? "md:translate-y-8" : ""
                    }`}
                  >
                    <Icon className="mb-3 h-8 w-8 text-red-400" />
                    <span className="text-sm font-semibold text-gray-200">
                      {label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="case-studies" className="min-h-screen scroll-mt-24 px-6 py-28 md:px-12">
          <h2 className="text-center text-5xl font-bold md:text-6xl">
            Case Studies
            <span className="mx-auto mt-1 block h-3 w-52 bg-red-400" />
          </h2>

          <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-10">
            {caseStudies.map((caseStudy, index) => {
              const imageFirst = index !== 1;

              return (
                <article
                  key={caseStudy.title}
                  className="grid overflow-hidden rounded-2xl border border-red-400/20 bg-[#18181a]/70 shadow-[0_0_45px_rgba(248,113,113,0.08)] backdrop-blur md:grid-cols-2"
                >
                  <div
                    className={`relative flex min-h-[24rem] items-center justify-center overflow-hidden bg-[#111113] p-4 md:min-h-[30rem] xl:min-h-[34rem] ${
                      imageFirst ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(248,113,113,0.2),transparent_40%)]" />
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="relative h-full min-h-[22rem] w-full rounded-xl border border-red-400/25 bg-[#0f0f10]/70 object-contain object-center shadow-[0_0_55px_rgba(248,113,113,0.2)] md:min-h-[28rem] xl:min-h-[32rem]"
                    />
                  </div>

                  <div
                    className={`flex flex-col justify-center p-8 md:p-12 ${
                      imageFirst ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <h3 className="text-3xl font-bold leading-tight md:text-4xl">
                      {caseStudy.title}
                    </h3>
                    <p className="mt-5 text-lg leading-8 text-gray-300">
                      {caseStudy.description}
                    </p>
                    <button
                      type="button"
                      className="mt-8 w-fit rounded-full border border-red-400/60 px-6 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-400 hover:text-white"
                    >
                      Learn More
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="contact"
          className="flex min-h-screen scroll-mt-24 flex-col justify-between px-6 py-28 md:px-12"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">
              Contact
            </p>
            <h2 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
              Let&apos;s connect.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              I&apos;m open to conversations about enterprise systems,
              infrastructure operations, security technology, and technical
              opportunities where practical execution matters.
            </p>

            <div className="mt-10 flex w-full max-w-3xl flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="mailto:cjpawelczyk@gmail.com"
                className="rounded-xl border border-red-400/40 bg-[#18181a]/75 px-6 py-4 text-sm font-semibold text-red-300 shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur transition hover:border-red-400 hover:bg-red-400 hover:text-white"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/chrispawelczyk"
                className="rounded-xl border border-red-400/40 bg-[#18181a]/75 px-6 py-4 text-sm font-semibold text-red-300 shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur transition hover:border-red-400 hover:bg-red-400 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/cpawelczyk"
                className="rounded-xl border border-red-400/40 bg-[#18181a]/75 px-6 py-4 text-sm font-semibold text-red-300 shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur transition hover:border-red-400 hover:bg-red-400 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="/resume.pdf"
                className="rounded-xl border border-red-400/40 bg-[#18181a]/75 px-6 py-4 text-sm font-semibold text-red-300 shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur transition hover:border-red-400 hover:bg-red-400 hover:text-white"
              >
                Download Resume
              </a>
            </div>
          </div>

          <footer className="mx-auto mt-16 w-full max-w-7xl border-t border-white/10 pt-6 text-center text-sm text-gray-500 md:text-left">
            Chris Pawelczyk &copy; 2026
          </footer>
        </section>
      </div>
    </main>
  );
}

export default App;
