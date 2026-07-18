import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import ParticleNetwork from "./ParticleNetwork";
import {
  ArrowDown,
  Atom,
  Bot,
  BrainCircuit,
  Server,
  ShieldCheck,
  Video,
  KeyRound,
  Cloud,
  GitBranch,
  Terminal,
  Workflow,
  MonitorCog,
  Network,
  TicketCheck,
  Wind,
  X,
} from "lucide-react";
import profilePhoto from "./assets/profile.webp";
import cs1Thumbnail from "./assets/case-studies/CS1-thumbnail.webp";
import cs2Thumbnail from "./assets/case-studies/CS2-thumbnail.webp";
import cs3Thumbnail from "./assets/case-studies/CS3-thumbnail.webp";
import milestoneArchitecture from "./assets/case-studies/milestone-architecture.webp";
import cs1SummaryBanner from "./assets/case-studies/cs1-summary-banner.webp";
import cs2SummaryBanner from "./assets/case-studies/cs2-summary-banner.webp";
import cs2ApproachPhoto from "./assets/case-studies/cs2-approach-photo.webp";
import cs3SummaryBanner from "./assets/case-studies/cs3-summary-banner.webp";
import cs3ApproachPhoto from "./assets/case-studies/cs3-approach-photo.webp";

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
      "Multiple legacy systems. Limited visibility. Growing risk. See how a fragmented surveillance environment was transformed into a centralized enterprise platform.",
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
      "Valuable operational data was hiding in plain sight. Discover how video analytics turned everyday guest activity into actionable business intelligence.",
    focusAreas: [
      "Video analytics",
      "Operational intelligence",
      "Hospitality operations",
    ],
  },
  {
    slug: "modern-gsoc",
    title:
      "Modernizing the GSOC: Automated Video Workflows for Situational Awareness",
    image: cs3Thumbnail,
    description:
      "When seconds matter, operators need context—not more screens. Learn how event-driven workflows reduced information overload and enabled coordinated response.",
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
  "Federated Architecture",
  "Centralized Management",
  "Enterprise Infrastructure",
  "Platform Consolidation",
  "Cybersecurity Alignment",
];

const videoAnalyticsFocusAreas = [
  "Axis Object Analytics",
  "Milestone XProtect",
  "Operational Intelligence",
  "Visitor Analytics",
  "Dwell Time Monitoring",
  "Traffic Flow Analysis",
  "Queue Management",
  "Guest Experience Optimization",
];

const modernGsocFocusAreas = [
  "Milestone XProtect Smart Wall",
  "Event-Driven Workflows",
  "GSOC Operations",
  "Incident Response",
  "Situational Awareness",
  "Operational Automation",
];

const buildTechnologies = [
  { label: "React", icon: Atom },
  { label: "Tailwind CSS", icon: Wind },
  { label: "Framer Motion", icon: Workflow },
  { label: "Azure Static Web Apps", icon: Cloud },
  { label: "Git", icon: GitBranch },
  { label: "OpenAI Codex", icon: Bot },
  { label: "GPT-5.5", icon: BrainCircuit },
];

const caseStudyAnchorPrefix = "case-study";

const getCaseStudyAnchor = (slug) => `${caseStudyAnchorPrefix}-${slug}`;

const backLinkClass =
  "inline-flex rounded-full border border-red-400/50 px-5 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-400 hover:text-white";
const homeSectionHeadingClass =
  "text-center text-4xl font-semibold leading-tight md:text-5xl";
const homeSectionAccentClass =
  "mx-auto mt-4 block h-0.5 w-32 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_22px_rgba(248,113,113,0.62)]";
const contactSectionHeadingClass =
  "text-center text-5xl font-semibold leading-tight md:text-7xl lg:text-8xl";
const contactSectionAccentClass =
  "mx-auto mt-6 block h-0.5 w-48 bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_24px_rgba(248,113,113,0.66)] md:w-64 lg:w-80";
const navLinkClass =
  "relative shrink-0 whitespace-nowrap py-1 leading-none text-gray-300 transition duration-300 after:absolute after:inset-x-0 after:-bottom-2 after:h-0.5 after:origin-center after:scale-x-0 after:bg-red-400 after:shadow-[0_0_12px_rgba(248,113,113,0.62)] after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 sm:leading-normal sm:after:-bottom-1";
const activeNavLinkClass = "text-white after:scale-x-100";
const articleSurfaceClass =
  "mx-auto max-w-4xl rounded-3xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(20,24,34,0.9),rgba(12,15,22,0.96))] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.32),0_0_34px_rgba(248,113,113,0.045)] md:p-10 lg:p-12";
const articleImageClass =
  "w-full rounded-xl border border-white/[0.13] shadow-[0_18px_60px_rgba(0,0,0,0.26),0_0_22px_rgba(248,113,113,0.045)]";
const caseStudyThumbnailFrameClass =
  "flex h-full items-center justify-center p-4 sm:p-5 md:p-6";
const caseStudyThumbnailViewportClass =
  "aspect-[3/2] w-full overflow-hidden rounded-xl border border-white/[0.13] shadow-[0_18px_70px_rgba(0,0,0,0.34),0_0_24px_rgba(248,113,113,0.06)]";
const caseStudyThumbnailImageClass =
  "h-full w-full scale-[1.02] object-cover object-center md:scale-[1.075]";
const focusPillClass =
  "rounded-full border border-white/[0.13] bg-[linear-gradient(135deg,rgba(24,29,40,0.78),rgba(13,16,24,0.9))] px-4 py-2 text-sm font-semibold text-red-200 shadow-[0_12px_28px_rgba(0,0,0,0.2)]";
const redGlassSurfaceClass =
  "border-2 border-red-300/35 bg-[linear-gradient(135deg,rgba(92,25,32,0.42),rgba(30,17,24,0.96))] ring-1 ring-red-200/[0.1] shadow-[0_14px_34px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(248,113,113,0.1)] transition duration-300 hover:border-red-200/55 hover:bg-[linear-gradient(135deg,rgba(112,31,39,0.5),rgba(36,18,26,0.98))] hover:text-red-100 hover:shadow-[0_16px_38px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12),0_0_26px_rgba(248,113,113,0.18)]";
const heroCtaClass =
  "group mt-12 inline-flex items-center justify-center gap-2 rounded-sm border border-red-400/70 bg-[#111316]/20 px-8 py-3 text-sm font-semibold text-red-300 ring-1 ring-white/[0.04] shadow-[0_14px_34px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-sm transition duration-300 hover:border-red-300 hover:bg-red-400 hover:text-white hover:shadow-[0_18px_48px_rgba(0,0,0,0.3),0_0_26px_rgba(248,113,113,0.18)]";
const homepageSectionIds = [
  "home",
  "about",
  "case-studies",
  "contact",
  "build-notes",
];

const desktopMediaQuery = "(min-width: 768px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(desktopMediaQuery).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMediaQuery);
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDesktop;
}

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

function PageTransition({ children, transitionKey }) {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const shouldUseTransition = isDesktop && !shouldReduceMotion;

  return (
    <motion.div
      key={transitionKey}
      initial={
        shouldUseTransition ? { opacity: 0, y: 12, scale: 0.995 } : { opacity: 1 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        shouldUseTransition ? { duration: 0.24, ease: "easeOut" } : { duration: 0.01 }
      }
      style={{ willChange: shouldUseTransition ? "transform, opacity" : "auto" }}
    >
      {children}
    </motion.div>
  );
}

function LightboxImage({ src, alt, className }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="group block w-full cursor-zoom-in"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${className} transition duration-300 group-hover:scale-[1.01] group-hover:border-red-400/35`}
        />
      </button>

      {isOpen &&
        createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 z-10 rounded-full border border-red-400/40 bg-[#111113]/90 p-3 text-red-300 transition hover:border-red-400 hover:bg-red-400 hover:text-white"
            aria-label="Close enlarged image"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="flex max-h-[90dvh] max-w-[92vw] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="block h-auto max-h-[90dvh] w-auto max-w-[92vw] rounded-xl border border-red-400/25 object-contain shadow-[0_0_60px_rgba(248,113,113,0.16)]"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

function UnifiedVideoPlatformPage() {
  const backToCard = `/#${getCaseStudyAnchor("unified-video-platform")}`;

  return (
    <section className="min-h-screen px-7 py-24 sm:px-6 md:px-12">
      <article className={articleSurfaceClass}>
        <Link
          to={backToCard}
          className={backLinkClass}
        >
          Back to Portfolio
        </Link>

        <header className="mt-12">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Transforming Distributed Video Systems into a Unified Platform
          </h1>
          <p className="mt-6 text-xl italic leading-8 text-gray-300">
            How fragmented surveillance deployments can evolve into a
            centralized enterprise video platform.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-lg leading-8 text-gray-300">
          <section>
            <h2 className="text-3xl font-bold text-white">Executive Summary</h2>
            <div className="mt-5 space-y-5">
              <p>
                You&apos;re a senior security executive, responsible for physical security across a
                global manufacturing enterprise. Over the years, acquisitions,
                regional preferences, and independent projects have left you
                with a patchwork of surveillance systems: different
                manufacturers, different management interfaces, proprietary
                hardware, and limited centralized visibility.
              </p>
              <p>
                What was once considered a building system has quietly become
                critical enterprise infrastructure.
              </p>
              <p>
                At the same time, your cybersecurity department is increasing scrutiny.
                Unsupported operating systems, aging hardware, and inconsistent
                patching practices create growing operational and security risks. Maintaining the
                environment becomes increasingly expensive, while expanding or
                modernizing it becomes increasingly difficult.
              </p>
            </div>
            <figure className="mt-8">
              <LightboxImage
                src={cs1SummaryBanner}
                alt="Executive-level view of surveillance fragmentation, operational risk, and limited visibility"
                className={articleImageClass}
              />
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
                The chosen solution was Milestone XProtect, an open-platform
                video management system capable of supporting a wide range of
                camera manufacturers and legacy devices. This open architecture
                enabled existing investments to be preserved while providing a
                clear migration path away from proprietary solutions.
              </p>

              <figure className="py-3">
                <LightboxImage
                  src={milestoneArchitecture}
                  alt="Conceptual modernization architecture for a centralized enterprise video platform"
                  className={articleImageClass}
                />
              </figure>

              <p>
                Legacy recording appliances and NVRs were systematically
                replaced with enterprise-grade Dell PowerEdge recording servers
                designed for resiliency, scalability, and long-term
                supportability.
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
                  className={focusPillClass}
                >
                  {area}
                </span>
              ))}
            </div>
          </section>
        </div>

        <Link to={backToCard} className={`${backLinkClass} mt-12`}>
          Back to Portfolio
        </Link>
      </article>
    </section>
  );
}

function VideoAnalyticsPage() {
  const backToCard = `/#${getCaseStudyAnchor("video-analytics")}`;

  return (
    <section className="min-h-screen px-7 py-24 sm:px-6 md:px-12">
      <article className={articleSurfaceClass}>
        <Link to={backToCard} className={backLinkClass}>
          Back to Portfolio
        </Link>

        <header className="mt-12">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Operational Intelligence Through Video Analytics
          </h1>
          <p className="mt-6 text-xl italic leading-8 text-gray-300">
            Using existing surveillance infrastructure to generate business
            insights in a luxury hospitality environment.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-lg leading-8 text-gray-300">
          <section>
            <h2 className="text-3xl font-bold text-white">Executive Summary</h2>
            <div className="mt-5 space-y-5">
              <p>
                You&apos;re the Director of Operations at a luxury five-star
                resort.
              </p>
              <p>
                When guests are paying a premium for their experience,
                expectations are exceptionally high. Long wait times, crowded
                spaces, or operational bottlenecks can quickly impact guest
                satisfaction. Every decision matters, and the best decisions are
                driven by reliable data.
              </p>
              <p>
                Hospitality leaders spend significant time looking for ways to
                improve operations utilizing data-driven insights. Reservation
                systems, point-of-sale platforms, guest surveys, and occupancy
                reports all provide valuable information. Yet many of the most
                important questions remain difficult to answer.
              </p>
              <p>
                How long are guests waiting in common areas? Which amenities
                experience the highest utilization? When do traffic patterns
                change throughout the day? Where are operational bottlenecks
                forming before they become guest complaints?
              </p>
              <p>The answer was already in place.</p>
              <p>
                The resort&apos;s existing video surveillance infrastructure
                provided a unique opportunity to capture operational insights
                that traditional business systems could not.
              </p>
            </div>

            <figure className="mt-8">
              <LightboxImage
                src={cs2SummaryBanner}
                alt="Operational intelligence summary for video analytics in hospitality operations"
                className={articleImageClass}
              />
            </figure>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Challenge</h2>
            <div className="mt-5 space-y-5">
              <p>
                The organization wanted to improve guest experience through
                data-driven decision making, but lacked visibility into how
                guests were actually interacting with physical spaces throughout
                the property.
              </p>
              <p>
                Traditional business systems could report reservations,
                transactions, and occupancy trends, but they could not provide
                meaningful insight into guest movement, traffic flow, queue
                formation, or space utilization.
              </p>
              <p>
                Without reliable data, operational improvements often relied on
                assumptions rather than measurable trends.
              </p>
              <p>
                The challenge was to transform existing surveillance
                infrastructure into a source of actionable business intelligence
                without introducing significant new hardware or operational
                complexity.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Approach</h2>
            <div className="mt-5 space-y-5">
              <p>
                Using Axis cameras integrated with the Milestone XProtect
                platform, the solution leveraged both Axis Object Analytics and
                BriefCam to generate operational intelligence from existing
                camera deployments.
              </p>
              <p>
                Rather than focusing solely on security events, analytics were
                configured to measure and evaluate patterns occurring throughout
                the resort environment.
              </p>
              <p>The platform provided visibility into:</p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Visitor counts</li>
                <li>Dwell time analysis</li>
                <li>Traffic flow patterns</li>
                <li>Peak and off-peak utilization periods</li>
                <li>Queue formation and congestion trends</li>
              </ul>
              <p>
                This transformed the surveillance platform from a passive
                security system into an active source of operational insight.
              </p>
              <figure className="py-3">
                <LightboxImage
                  src={cs2ApproachPhoto}
                  alt="Video analytics approach for measuring guest movement and operational patterns"
                  className={articleImageClass}
                />
              </figure>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Outcome</h2>
            <div className="mt-5 space-y-5">
              <p>
                The resulting analytics provided operational teams with a
                clearer understanding of how guests interacted with resort
                spaces throughout the day.
              </p>
              <p>
                Instead of relying solely on observations and assumptions,
                leadership gained measurable data that could be used to improve
                staffing decisions, optimize space utilization, identify
                operational bottlenecks, and enhance the overall guest
                experience.
              </p>
              <p>
                Most importantly, the project demonstrated that modern video
                platforms can deliver value far beyond traditional security
                applications.
              </p>
              <p>
                The same infrastructure responsible for protecting people and
                property became a strategic source of business intelligence
                capable of supporting operational excellence across the resort.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Focus Areas</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {videoAnalyticsFocusAreas.map((area) => (
                <span
                  key={area}
                  className={focusPillClass}
                >
                  {area}
                </span>
              ))}
            </div>
          </section>
        </div>

        <Link to={backToCard} className={`${backLinkClass} mt-12`}>
          Back to Portfolio
        </Link>
      </article>
    </section>
  );
}

function ModernGsocPage() {
  const backToCard = `/#${getCaseStudyAnchor("modern-gsoc")}`;

  return (
    <section className="min-h-screen px-7 py-24 sm:px-6 md:px-12">
      <article className={articleSurfaceClass}>
        <Link to={backToCard} className={backLinkClass}>
          Back to Portfolio
        </Link>

        <header className="mt-12">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Modernizing the GSOC: Automated Video Workflows for Situational
            Awareness
          </h1>
          <p className="mt-6 text-xl italic leading-8 text-gray-300">
            Using event-driven workflows to bring the right operational context
            to security operators when seconds matter.
          </p>
        </header>

        <div className="mt-14 space-y-12 text-lg leading-8 text-gray-300">
          <section>
            <h2 className="text-3xl font-bold text-white">Executive Summary</h2>
            <div className="mt-5 space-y-5">
              <p>
                You&apos;re responsible for managing a Global Security Operations Center
                (GSOC), supporting dozens of facilities across an enterprise.
                Every day, operators are expected to monitor alarms, access
                control events, live video, intercom calls, and critical
                incidents occurring across geographically distributed locations.
              </p>
              <p>
                The challenge isn&apos;t a lack of information. It&apos;s getting
                the right information to the right people when seconds matter.
              </p>
              <p>
                When an incident occurs, operators often find themselves
                scrambling between systems to locate camera views, site maps,
                procedures, and supporting intelligence before they can even
                begin responding. Valuable time is spent navigating technology
                instead of managing the event itself.
              </p>
              <p>
                The focus shifted from simply monitoring security systems to
                creating a unified operational picture that enables operators
                to understand events as they unfold and respond effectively in
                real time.
              </p>
            </div>
            <figure className="mt-8">
              <LightboxImage
                src={cs3SummaryBanner}
                alt="Operator-facing view of information overload during security operations"
                className={articleImageClass}
              />
            </figure>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Challenge</h2>
            <div className="mt-5 space-y-5">
              <p>
                The existing GSOC environment relied heavily on manual
                workflows. Operators were required to assemble information
                themselves whenever an event occurred, often moving between
                multiple applications, camera views, maps, and supporting
                resources to establish situational awareness.
              </p>
              <p>
                Even routine activities introduced inefficiencies. Different
                operator shifts required different video wall layouts,
                priorities, and monitoring strategies. Critical incidents
                demanded rapid access to cameras, floor plans, procedures, and
                intelligence sources, but much of this context had to be
                gathered manually during the event itself.
              </p>
              <p>
                As the enterprise expanded, the operational burden on the GSOC
                continued to increase. Operators were spending more time
                managing systems and less time managing incidents.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Approach</h2>
            <div className="mt-5 space-y-5">
              <p>
                Using Milestone XProtect Smart Wall, XProtect Smart Map, automated rules,
                and event-driven workflows, we redesigned how information was
                presented to operators.
              </p>
              <p>
                Rather than requiring operators to search for information, the
                system was designed to bring information directly to them.
              </p>
              <p>
                Video walls automatically adjusted based on operational needs,
                including scheduled layouts aligned to shift responsibilities.
                For higher-priority events, automated workflows could
                dynamically populate Smart Wall with curated camera views
                relevant to the incident.
              </p>
              <p>
                Additional context was delivered alongside video, including
                interactive Smart Maps with camera overlays, embedded web
                resources, operational dashboards, and other intelligence
                sources required to support decision-making.
              </p>
              <p>
                The result was a workflow-driven operating environment where
                security events automatically triggered the information
                operators needed most.
              </p>

              <figure className="py-3">
                <LightboxImage
                  src={cs3ApproachPhoto}
                  alt="Event-driven workflow for automated Smart Wall layouts and operator context"
                  className={articleImageClass}
                />
              </figure>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Outcome</h2>
            <div className="mt-5 space-y-5">
              <p>
                The GSOC evolved from a collection of independent tools into a
                unified operational platform.
              </p>
              <p>
                Operators gained immediate access to the most relevant
                information without manually assembling it during an incident.
                Situational awareness improved, response workflows became more
                consistent, and critical context was available within seconds
                instead of minutes.
              </p>
              <p>
                By automating information delivery and standardizing operator
                workflows, the organization reduced operational friction and
                enabled the GSOC to focus on what mattered most: responding to
                events effectively and protecting people, facilities, and
                business operations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white">Focus Areas</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {modernGsocFocusAreas.map((area) => (
                <span
                  key={area}
                  className={focusPillClass}
                >
                  {area}
                </span>
              ))}
            </div>
          </section>
        </div>

        <Link to={backToCard} className={`${backLinkClass} mt-12`}>
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
    return <UnifiedVideoPlatformPage />;
  }

  if (caseStudy.slug === "video-analytics") {
    return <VideoAnalyticsPage />;
  }

  if (caseStudy.slug === "modern-gsoc") {
    return <ModernGsocPage />;
  }

  return (
    <section className="min-h-screen px-7 py-24 sm:px-6 md:px-12">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(20,24,34,0.88),rgba(12,15,22,0.96))] p-6 shadow-[0_26px_90px_rgba(0,0,0,0.32),0_0_34px_rgba(248,113,113,0.045)] md:p-10 lg:p-12">
        <Link
          to="/#case-studies"
          className={backLinkClass}
        >
          Back to Portfolio
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(13,17,25,0.92),rgba(8,11,17,0.98))] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.32),0_0_22px_rgba(248,113,113,0.045)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(248,113,113,0.06),transparent_42%)]" />
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              loading="lazy"
              decoding="async"
              className="relative w-full rounded-xl border border-white/[0.13] bg-[#0c1018]/80 object-contain shadow-[0_18px_60px_rgba(0,0,0,0.28),0_0_18px_rgba(248,113,113,0.045)]"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">
              Case Study
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
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
              className="rounded-2xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(24,29,40,0.76),rgba(13,16,24,0.9))] p-6 shadow-[0_16px_42px_rgba(0,0,0,0.22),0_0_20px_rgba(248,113,113,0.035)]"
            >
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <p className="mt-4 leading-7 text-gray-300">{section.body}</p>
            </article>
          ))}

          <article className="rounded-2xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(24,29,40,0.76),rgba(13,16,24,0.9))] p-6 shadow-[0_16px_42px_rgba(0,0,0,0.22),0_0_20px_rgba(248,113,113,0.035)] md:col-span-2">
            <h2 className="text-2xl font-bold">Technologies / Focus Areas</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {caseStudy.focusAreas.map((area) => (
                <span
                  key={area}
                  className={focusPillClass}
                >
                  {area}
                </span>
              ))}
            </div>
          </article>
        </div>

        <Link to="/#case-studies" className={`${backLinkClass} mt-12`}>
          Back to Portfolio
        </Link>
      </div>
    </section>
  );
}

function App() {
  const [showNav, setShowNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const showNavRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const shouldUseMotion = isDesktop && !shouldReduceMotion;
  const location = useLocation();
  const { pathname, hash } = location;
  const buildNotesReveal = {
    hidden: shouldUseMotion ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinks = [
    { label: "Home", to: "/", sectionId: "home" },
    { label: "About", to: "/#about", sectionId: "about" },
    {
      label: "Case Studies",
      to: "/#case-studies",
      sectionId: "case-studies",
    },
    { label: "Contact", to: "/#contact", sectionId: "contact" },
    {
      label: "Build Notes",
      to: "/#build-notes",
      sectionId: "build-notes",
    },
  ];

  useEffect(() => {
    const updateNavVisibility = () => {
      const nextShowNav = window.scrollY > 100;

      if (showNavRef.current !== nextShowNav) {
        showNavRef.current = nextShowNav;
        setShowNav(nextShowNav);
      }
    };

    updateNavVisibility();
    window.addEventListener("scroll", updateNavVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateNavVisibility);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return undefined;
    }

    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.38;
      let currentSection = "home";

      homepageSectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && section.getBoundingClientRect().top <= marker) {
          currentSection = sectionId;
        }
      });

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection,
      );
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(scheduleUpdate, {
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0,
    });

    homepageSectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);

      if (section) {
        observer.observe(section);
      }
    });

    if (hash && homepageSectionIds.includes(hash.slice(1))) {
      frame = requestAnimationFrame(() => {
        frame = 0;
        setActiveSection(hash.slice(1));
      });
    } else {
      scheduleUpdate();
    }

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [hash, pathname]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f10] text-white">
      <ScrollToHash />
      <div className="ambient-background pointer-events-none fixed inset-0 z-0">
        {isDesktop && <ParticleNetwork />}
      </div>

      <div className="relative z-10">
        <nav
          className={`fixed left-0 top-0 z-50 flex min-h-14 w-full items-center justify-start gap-4 overflow-x-auto border-b border-white/[0.12] bg-[#111316]/72 px-4 py-3.5 text-[0.75rem] font-semibold tracking-wide shadow-[0_12px_44px_rgba(0,0,0,0.24),0_0_18px_rgba(248,113,113,0.035)] backdrop-blur-xl transition duration-500 [-ms-overflow-style:none] [scrollbar-width:none] sm:min-h-0 sm:items-stretch sm:justify-center sm:gap-6 sm:px-6 sm:py-4 sm:text-sm md:justify-end md:gap-10 md:px-12 md:text-base [&::-webkit-scrollbar]:hidden ${
            showNav
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`${navLinkClass} ${
                pathname === "/" && activeSection === link.sectionId
                  ? activeNavLinkClass
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Routes location={location}>
          <Route
            path="/"
            element={
              <PageTransition transitionKey={pathname}>
              <>
        <section id="home" className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="max-w-5xl text-4xl font-light leading-tight sm:text-5xl md:text-7xl">
            Hello, I&apos;m <span className="text-red-400">Chris</span>.
            <br />
            I modernize complex security technology platforms.
          </h1>

          <a href="#about" className={heroCtaClass}>
            <span>Learn More</span>
            <ArrowDown
              aria-hidden="true"
              className="h-4 w-4 transition duration-300 group-hover:translate-y-0.5"
              strokeWidth={1.8}
            />
          </a>
        </section>

        <section
          id="about"
          className="min-h-screen scroll-mt-20 px-6 pb-20 pt-2 md:px-12 md:pb-24 md:pt-4"
        >
          <motion.h2
            className={homeSectionHeadingClass}
            initial={shouldUseMotion ? "hidden" : false}
            whileInView={shouldUseMotion ? "visible" : undefined}
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeIn}
            transition={
              shouldUseMotion ? { duration: 0.55, ease: "easeOut" } : { duration: 0.01 }
            }
          >
            About
            <span className={homeSectionAccentClass} />
          </motion.h2>

          <div className="mx-auto mt-10 grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.2fr] md:items-start">
            <div className="text-center md:-translate-y-10 md:text-left">
              <motion.img
                src={profilePhoto}
                alt="Chris Pawelczyk"
                width="208"
                height="208"
                loading="lazy"
                decoding="async"
                className="mx-auto h-48 w-48 rounded-full border border-red-400/40 object-cover shadow-[0_0_60px_rgba(248,113,113,0.24)] md:mx-0 md:h-52 md:w-52"
                initial={shouldUseMotion ? "hidden" : false}
                whileInView={shouldUseMotion ? "visible" : undefined}
                viewport={{ once: false, amount: 0.3 }}
                variants={photoIn}
                transition={
                  shouldUseMotion ? { duration: 0.65, ease: "easeOut" } : { duration: 0.01 }
                }
              />

              <motion.div
                initial={shouldUseMotion ? "hidden" : false}
                whileInView={shouldUseMotion ? "visible" : undefined}
                viewport={{ once: false, amount: 0.3 }}
                variants={textIn}
                transition={
                  shouldUseMotion
                    ? { duration: 0.55, delay: 0.18, ease: "easeOut" }
                    : { duration: 0.01 }
                }
              >
                <h3 className="mt-7 text-3xl font-bold md:text-4xl">Chris Pawelczyk</h3>
                <p className="mt-2 text-red-400">
                  Enterprise Security Systems & Infrastructure
                </p>

                <div className="mt-5 max-w-xl space-y-5 text-lg leading-8 text-gray-300">
                  <p>
                    Over the past decade, I&apos;ve worked across physical
                    security systems, infrastructure, and enterprise operations.
                    What started as hands-on work with cameras and access
                    control systems gradually evolved into designing,
                    supporting, and modernizing large-scale security technology
                    platforms.
                  </p>
                  <p>
                    This portfolio highlights a few of the projects and
                    initiatives that shaped that journey. 
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3"
              initial={shouldUseMotion ? "hidden" : false}
              whileInView={shouldUseMotion ? "visible" : undefined}
              viewport={{ once: false, amount: 0.3 }}
              variants={skillGridIn}
            >
              {techCards.map(({ label, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  variants={skillCardIn}
                  transition={
                    shouldUseMotion ? { duration: 0.45, ease: "easeOut" } : { duration: 0.01 }
                  }
                >
                  <div
                    className={`flex min-h-32 flex-col items-center justify-center rounded-xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(24,29,40,0.76),rgba(13,16,24,0.9))] p-5 text-center shadow-[0_16px_42px_rgba(0,0,0,0.22),0_0_20px_rgba(248,113,113,0.035)] transition hover:-translate-y-1 hover:border-red-400/30 hover:shadow-[0_20px_55px_rgba(0,0,0,0.28),0_0_26px_rgba(248,113,113,0.09)] ${
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

        <section
          id="case-studies"
          className="min-h-screen scroll-mt-16 px-6 pb-28 pt-10 md:px-12 md:pt-12"
        >
          <h2
            className={homeSectionHeadingClass}
          >
            Case Studies
            <span className={homeSectionAccentClass} />
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-7 text-gray-300 md:text-lg md:leading-8">
            This portfolio goes beyond a resume by providing a closer look at
            several projects I&apos;ve helped deliver throughout my
            career. Click any case study to explore the business challenge,
            technical approach, and operational impact of each initiative.
          </p>

          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-10">
            {caseStudies.map((caseStudy, index) => {
              const imageFirst = index !== 1;

              return (
                <Link
                  key={caseStudy.title}
                  id={getCaseStudyAnchor(caseStudy.slug)}
                  to={`/case-studies/${caseStudy.slug}`}
                  className="group block scroll-mt-28 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f10] md:scroll-mt-32"
                >
                  <article className="grid overflow-hidden rounded-2xl border border-white/[0.13] bg-[linear-gradient(135deg,rgba(22,27,38,0.78),rgba(12,16,24,0.92))] shadow-[0_24px_90px_rgba(0,0,0,0.28),0_0_28px_rgba(248,113,113,0.035)] transition duration-300 group-hover:-translate-y-1 group-hover:border-red-400/25 group-hover:shadow-[0_28px_100px_rgba(0,0,0,0.34),0_0_34px_rgba(248,113,113,0.075)] md:grid-cols-2">
                    <div
                      className={`${caseStudyThumbnailFrameClass} ${
                        imageFirst ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <div className={caseStudyThumbnailViewportClass}>
                        <img
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          loading="lazy"
                          decoding="async"
                          className={caseStudyThumbnailImageClass}
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-col justify-center p-6 pt-3 sm:p-8 md:p-12 ${
                        imageFirst ? "md:order-2" : "md:order-1"
                      }`}
                    >
                      <h3 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                        {caseStudy.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                        {caseStudy.description}
                      </p>
                      <span className="mt-6 w-fit rounded-full border border-red-400/45 bg-[#111827]/45 px-6 py-3 text-sm font-semibold text-red-200 transition group-hover:border-red-400/80 group-hover:bg-red-400 group-hover:text-white sm:mt-8">
                        Learn More
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          id="contact"
          className="flex min-h-screen scroll-mt-24 flex-col justify-between px-6 py-20 sm:py-28 md:px-12"
        >
          <div className="mx-auto flex w-full max-w-5xl flex-1 -translate-y-4 flex-col items-center justify-center text-center sm:-translate-y-8 md:-translate-y-12">
            <h2 className={contactSectionHeadingClass}>
              Let&apos;s connect.
              <span className={contactSectionAccentClass} />
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              I&apos;m always interested in conversations about enterprise
              technology, security operations, infrastructure modernization, and
              solving real-world business challenges.
            </p>

            <div className="mt-10 flex w-full max-w-2xl flex-col gap-4 sm:grid sm:grid-cols-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cjpawelczyk@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-red-300/35 bg-[linear-gradient(135deg,rgba(24,29,40,0.78),rgba(13,16,24,0.9))] px-6 py-4 text-sm font-semibold text-red-200 ring-1 ring-red-200/[0.1] shadow-[0_16px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(248,113,113,0.08)] transition duration-300 hover:border-red-200/55 hover:bg-red-400 hover:text-white hover:shadow-[0_18px_52px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12),0_0_26px_rgba(248,113,113,0.18)]"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/chrispawelczyk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-red-300/35 bg-[linear-gradient(135deg,rgba(24,29,40,0.78),rgba(13,16,24,0.9))] px-6 py-4 text-sm font-semibold text-red-200 ring-1 ring-red-200/[0.1] shadow-[0_16px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(248,113,113,0.08)] transition duration-300 hover:border-red-200/55 hover:bg-red-400 hover:text-white hover:shadow-[0_18px_52px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12),0_0_26px_rgba(248,113,113,0.18)]"
              >
                LinkedIn
              </a>
              <a
                href="/Chris_Pawelczyk_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-red-300/35 bg-[linear-gradient(135deg,rgba(24,29,40,0.78),rgba(13,16,24,0.9))] px-6 py-4 text-sm font-semibold text-red-200 ring-1 ring-red-200/[0.1] shadow-[0_16px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08),0_0_20px_rgba(248,113,113,0.08)] transition duration-300 hover:border-red-200/55 hover:bg-red-400 hover:text-white hover:shadow-[0_18px_52px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12),0_0_26px_rgba(248,113,113,0.18)]"
              >
                Resume
              </a>
            </div>
          </div>
        </section>

        <section
          id="build-notes"
          className="flex min-h-screen scroll-mt-24 flex-col justify-center px-6 py-32 md:px-12 md:py-36"
        >
          <motion.div
            className="mx-auto w-full max-w-4xl -translate-y-10 md:-translate-y-14"
            initial={shouldUseMotion ? "hidden" : false}
            whileInView={shouldUseMotion ? "visible" : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={
              shouldUseMotion ? { staggerChildren: 0.13 } : { duration: 0.01 }
            }
          >
            <motion.h2
              className={homeSectionHeadingClass}
              variants={buildNotesReveal}
              transition={
                shouldUseMotion
                  ? { duration: 0.48, ease: "easeOut" }
                  : { duration: 0.01 }
              }
            >
              Build Notes
            </motion.h2>
            <motion.span
              className={homeSectionAccentClass}
              variants={buildNotesReveal}
              transition={
                shouldUseMotion
                  ? { duration: 0.38, ease: "easeOut" }
                  : { duration: 0.01 }
              }
            />
            <div className="mx-auto mt-12 max-w-3xl space-y-7 text-left text-lg font-medium leading-8 text-gray-200 md:text-xl md:leading-9">
              <motion.p
                variants={buildNotesReveal}
                transition={
                  shouldUseMotion
                    ? { duration: 0.52, ease: "easeOut" }
                    : { duration: 0.01 }
                }
              >
                Beyond showcasing my professional experience, this portfolio
                became a personal project to explore modern AI-assisted
                development workflows. While I had no prior experience
                building React applications, I used AI as a collaborative tool
                to design, build, refine, troubleshoot, and optimize this site
                from concept to completion.
              </motion.p>
              <motion.p
                variants={buildNotesReveal}
                transition={
                  shouldUseMotion
                    ? { duration: 0.52, ease: "easeOut" }
                    : { duration: 0.01 }
                }
              >
                The result is both a portfolio of my professional work and a
                practical example of how AI can accelerate learning, execution,
                and problem solving when paired with strong technical and
                operational foundations.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-3 pt-5"
                variants={buildNotesReveal}
                transition={
                  shouldUseMotion
                    ? { duration: 0.52, ease: "easeOut" }
                    : { duration: 0.01 }
                }
              >
                {buildTechnologies.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className={`${focusPillClass} inline-flex items-center gap-2 ${redGlassSurfaceClass}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-red-200 drop-shadow-[0_0_8px_rgba(248,113,113,0.32)]"
                      strokeWidth={1.8}
                    />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </section>
              </>
              </PageTransition>
            }
          />
          <Route
            path="/case-studies/:slug"
            element={
              <PageTransition transitionKey={pathname}>
                <CaseStudyPage />
              </PageTransition>
            }
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;
