import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
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
import milestoneArchitecture from "./assets/case-studies/milestone-architecture.png";
import cs1SummaryBanner from "./assets/case-studies/cs1-summary-banner.png";

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
    slug: "unified-video-platform",
    title: "Transforming Distributed Video Systems into a Unified Platform",
    image: cs1Thumbnail,
    description:
      "Modernized a fragmented video surveillance environment by consolidating multiple legacy systems into a centralized enterprise platform. The initiative improved operational consistency, simplified administration, and established a scalable foundation for future growth across geographically distributed facilities.",
    focusAreas: [
      "Video management systems",
      "Enterprise platform consolidation",
      "Distributed facility operations",
    ],
  },
  {
    slug: "video-analytics",
    title: "Operational Intelligence Through Video Analytics",
    image: cs2Thumbnail,
    description:
      "Leveraged video analytics to transform surveillance data into actionable business intelligence. By measuring occupancy, dwell time, and movement patterns, the solution provided operational insights that improved visibility, decision-making, and guest experience within a luxury hospitality environment.",
    focusAreas: [
      "Video analytics",
      "Operational intelligence",
      "Hospitality operations",
    ],
  },
  {
    slug: "modern-gsoc",
    title:
      "Modernizing the GSOC: Enhancing Situational Awareness Through Automated Video Workflows",
    image: cs3Thumbnail,
    description:
      "Designed automated workflows that transformed security events into actionable operator intelligence. By integrating alerts, video, mapping, and response tools into a unified operating picture, the project improved situational awareness and accelerated decision-making within the security operations center.",
    focusAreas: [
      "GSOC operations",
      "Automated workflows",
      "Situational awareness",
    ],
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

const unifiedVideoFocusAreas = [
  "Milestone XProtect",
  "Enterprise Video Management",
  "Platform Consolidation",
  "Recording Server Architecture",
  "Cybersecurity Alignment",
  "Centralized Administration",
  "Lifecycle Management",
  "Distributed Facilities",
];

const backLinkClass =
  "inline-flex rounded-full border border-red-400/50 px-5 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-400 hover:text-white";

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash, pathname]);

  return null;
}

function UnifiedVideoPlatformPage({ caseStudy }) {
  return (
    <section className="min-h-screen px-6 py-24 md:px-12">
      <article className="mx-auto max-w-4xl rounded-3xl border border-red-400/20 bg-[#111113]/82 p-6 shadow-[0_0_60px_rgba(248,113,113,0.12)] backdrop-blur-md md:p-10 lg:p-12">
        <Link
          to="/"
          className={backLinkClass}
        >
          Back to Portfolio
        </Link>

        <header className="mt-12">
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Transforming Distributed Video Systems into a Unified Platform
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            How fragmented surveillance deployments can evolve into a
            centralized enterprise video platform.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-lg leading-8 text-gray-300">
          <section>
            <h2 className="text-3xl font-bold text-white">Executive Summary</h2>
            <div className="mt-5 space-y-5">
              <p>
                Imagine you&apos;re responsible for physical security across a
                global manufacturing enterprise. Over the years, acquisitions,
                regional preferences, and independent projects have left you
                with a patchwork of surveillance systems: different
                manufacturers, different management interfaces, proprietary
                hardware, standalone recorders, and limited centralized
                visibility.
              </p>
              <p>
                What was once considered a building system has quietly become
                critical enterprise infrastructure.
              </p>
              <p>
                At the same time, cybersecurity teams are increasing scrutiny.
                Unsupported operating systems, aging hardware, inconsistent
                patching practices, and limited visibility into system health
                create growing operational and security risks. Maintaining the
                environment becomes increasingly expensive, while expanding or
                modernizing it becomes increasingly difficult.
              </p>
            </div>
            <figure className="mt-8">
              <img
                src={cs1SummaryBanner}
                alt="Executive-level view of surveillance fragmentation, operational risk, and limited visibility"
                className="w-full rounded-xl border border-red-400/20 shadow-[0_0_30px_rgba(248,113,113,0.12)]"
              />
              <figcaption className="mt-3 text-sm leading-6 text-gray-500">
                Executive-level view of surveillance fragmentation, operational
                risk, and limited visibility across a distributed enterprise
                environment.
              </figcaption>
            </figure>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Challenge</h2>
            <div className="mt-5 space-y-5">
              <p>
                The existing environment consisted of multiple independent video
                surveillance systems distributed across geographically separated
                facilities. Each site operated as its own island, often with
                different hardware standards, software versions, recording
                architectures, and operational procedures.
              </p>
              <p>This fragmentation created several challenges:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Limited enterprise-wide visibility</li>
                <li>Inconsistent cybersecurity posture</li>
                <li>Aging proprietary hardware</li>
                <li>Complex support and maintenance requirements</li>
                <li>Difficult system expansion and modernization</li>
                <li>Lack of centralized administration and governance</li>
              </ul>
              <p>
                As the environment continued to grow, the organization needed a
                strategy that treated video surveillance as enterprise
                infrastructure rather than a collection of standalone building
                systems.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Approach</h2>
            <div className="mt-5 space-y-5">
              <p>
                The modernization strategy centered around standardization,
                consolidation, and platform unification.
              </p>
              <p>
                The selected platform was Milestone XProtect, an open-platform
                video management system capable of supporting a wide range of
                camera manufacturers and legacy devices. This open architecture
                enabled existing investments to be preserved while providing a
                clear migration path away from proprietary solutions.
              </p>

              <figure className="py-3">
                <img
                  src={milestoneArchitecture}
                  alt="Conceptual modernization architecture for a centralized enterprise video platform"
                  className="w-full rounded-xl border border-red-400/20 shadow-[0_0_30px_rgba(248,113,113,0.12)]"
                />
                <figcaption className="mt-3 text-sm leading-6 text-gray-500">
                  Conceptual modernization architecture illustrating the
                  transition from fragmented site-level video systems to a
                  centralized enterprise video platform.
                </figcaption>
              </figure>

              <p>
                Legacy recording appliances and NVRs were systematically
                replaced with enterprise-grade Dell PowerEdge recording servers
                designed for resiliency, scalability, and long-term
                supportability.
              </p>
              <p>
                By migrating geographically distributed facilities onto a common
                platform, the organization established centralized
                administration, consistent operational standards, improved
                cybersecurity alignment, standardized hardware architecture,
                simplified support and lifecycle management, and enterprise-wide
                visibility across locations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Outcome</h2>
            <div className="mt-5 space-y-5">
              <p>
                The result was a unified surveillance ecosystem operating as a
                single enterprise platform rather than a collection of
                disconnected systems.
              </p>
              <p>
                Security teams gained centralized visibility and control while
                maintaining local operational flexibility. Infrastructure became
                easier to support, easier to secure, and easier to scale. Future
                expansion could be accomplished using established standards
                rather than introducing additional complexity.
              </p>
              <p>
                Most importantly, the surveillance environment evolved from a
                legacy building technology into a modern enterprise system
                capable of supporting long-term security and operational
                objectives.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Focus Areas</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {unifiedVideoFocusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-red-400/35 bg-[#18181a]/70 px-4 py-2 text-sm font-semibold text-red-300 shadow-[0_0_20px_rgba(248,113,113,0.08)] backdrop-blur"
                >
                  {area}
                </span>
              ))}
            </div>
          </section>
        </div>

        <Link to="/" className={`${backLinkClass} mt-12`}>
          Back to Portfolio
        </Link>
      </article>
    </section>
  );
}

function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find((study) => study.slug === slug) ?? caseStudies[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const sections = [
    {
      title: "Overview",
      body: "A concise overview of the project context, business goals, and security technology environment will be added here.",
    },
    {
      title: "Challenge",
      body: "This section will outline the operational constraints, legacy platform limitations, and stakeholder needs that shaped the work.",
    },
    {
      title: "Approach",
      body: "This section will describe the technical strategy, implementation model, and cross-functional coordination behind the solution.",
    },
    {
      title: "Outcome",
      body: "This section will summarize the practical improvements, operational impact, and lessons learned from the engagement.",
    },
  ];

  if (caseStudy.slug === "unified-video-platform") {
    return <UnifiedVideoPlatformPage caseStudy={caseStudy} />;
  }

  return (
    <section className="min-h-screen px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl rounded-3xl border border-red-400/20 bg-[#111113]/82 p-6 shadow-[0_0_60px_rgba(248,113,113,0.12)] backdrop-blur-md md:p-10 lg:p-12">
        <Link
          to="/"
          className={backLinkClass}
        >
          Back to Portfolio
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-red-400/25 bg-[#111113] p-4 shadow-[0_0_55px_rgba(248,113,113,0.16)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(248,113,113,0.18),transparent_42%)]" />
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="relative w-full rounded-xl border border-red-400/20 bg-[#0f0f10]/70 object-contain shadow-[0_0_45px_rgba(248,113,113,0.14)]"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">
              Case Study
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              {caseStudy.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {caseStudy.description}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-red-400/20 bg-[#18181a]/70 p-6 shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur"
            >
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="mt-4 leading-7 text-gray-300">{section.body}</p>
            </article>
          ))}

          <article className="rounded-2xl border border-red-400/20 bg-[#18181a]/70 p-6 shadow-[0_0_30px_rgba(248,113,113,0.08)] backdrop-blur md:col-span-2">
            <h2 className="text-2xl font-bold">Technologies / Focus Areas</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {caseStudy.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-red-400/35 px-4 py-2 text-sm font-semibold text-red-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </article>
        </div>

        <Link to="/" className={`${backLinkClass} mt-12`}>
          Back to Portfolio
        </Link>
      </div>
    </section>
  );
}

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
      <ScrollToHash />
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
          <Link to="/" className="transition hover:text-red-400">Home</Link>
          <Link to="/#about" className="transition hover:text-red-400">About</Link>
          <Link to="/#case-studies" className="transition hover:text-red-400">Case Studies</Link>
          <Link to="/#contact" className="transition hover:text-red-400">Contact</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
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
                    <Link
                      to={`/case-studies/${caseStudy.slug}`}
                      className="mt-8 w-fit rounded-full border border-red-400/60 px-6 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-400 hover:text-white"
                    >
                      Learn More
                    </Link>
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
              </>
            }
          />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
