import { useEffect, useRef } from "react";

const PRIMARY_CLUSTER_PARTICLES = 50;
const REGIONAL_CLUSTER_PARTICLES = 26;
const FIELD_DENSITY = 26000;
const MIN_FIELD_PARTICLES = 44;
const MAX_FIELD_PARTICLES = 72;
const CLUSTER_LINK_DISTANCE = 140;
const FIELD_LINK_DISTANCE = 108;
const MOUSE_RADIUS = 250;
const MOUSE_FORCE = 0.26;
const GRID_SIZE = 150;

const CLUSTER_REGIONS = [
  { x: -0.04, y: -0.05, width: 0.56, height: 0.6, strength: 1 },
  { x: 0.38, y: -0.06, width: 0.5, height: 0.5, strength: 0.82 },
  { x: 0.5, y: 0.34, width: 0.52, height: 0.62, strength: 0.9 },
  { x: -0.05, y: 0.38, width: 0.5, height: 0.6, strength: 0.74 },
];

function createParticle(width, height, region = null) {
  const cluster = Boolean(region);
  const x = cluster
    ? (region.x + Math.random() * region.width) * width
    : Math.random() * width;
  const y = cluster
    ? (region.y + Math.random() * region.height) * height
    : Math.random() * height;

  return {
    x,
    y,
    homeX: x,
    homeY: y,
    vx: (Math.random() - 0.5) * (cluster ? 0.12 : 0.1),
    vy: (Math.random() - 0.5) * (cluster ? 0.12 : 0.1),
    floatPhase: Math.random() * Math.PI * 2,
    floatSpeed: Math.random() * 0.00042 + (cluster ? 0.00028 : 0.00016),
    floatRadius: cluster ? Math.random() * 28 + 12 : Math.random() * 14 + 6,
    radius: cluster
      ? Math.random() * 1.3 + 0.68 + region.strength * 0.18
      : Math.random() * 1 + 0.55,
    cluster,
    strength: region?.strength ?? 0.62,
    accent: !cluster && Math.random() > 0.82,
  };
}

function getParticleCount(width, height, reducedMotion) {
  if (reducedMotion) {
    return {
      clusters: [30, 18, 18, 16],
      field: Math.max(20, Math.min(34, Math.floor((width * height) / 52000))),
    };
  }

  return {
    clusters: [
      PRIMARY_CLUSTER_PARTICLES,
      REGIONAL_CLUSTER_PARTICLES,
      REGIONAL_CLUSTER_PARTICLES + 8,
      REGIONAL_CLUSTER_PARTICLES,
    ],
    field: Math.max(
      MIN_FIELD_PARTICLES,
      Math.min(MAX_FIELD_PARTICLES, Math.floor((width * height) / FIELD_DENSITY)),
    ),
  };
}

export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
    let particles = [];
    let animationFrame;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let startedAt = performance.now();
    let isPaused = document.hidden;

    const buildSpatialGrid = () => {
      const grid = new Map();

      particles.forEach((particle, index) => {
        const cellX = Math.floor(particle.x / GRID_SIZE);
        const cellY = Math.floor(particle.y / GRID_SIZE);
        const key = `${cellX},${cellY}`;
        const cell = grid.get(key);

        if (cell) {
          cell.push(index);
        } else {
          grid.set(key, [index]);
        }
      });

      return grid;
    };

    const draw = () => {
      if (isPaused) {
        return;
      }

      const elapsed = performance.now() - startedAt;

      context.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        if (!motionQuery.matches) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < MOUSE_RADIUS && distance > 0) {
            const influence =
              (1 - distance / MOUSE_RADIUS) *
              (particle.cluster
                ? MOUSE_FORCE + particle.strength * 0.08
                : MOUSE_FORCE * 0.82);
            particle.x += (dx / distance) * influence;
            particle.y += (dy / distance) * influence;
            particle.vx += mouse.vx * 0.0022 * (1 - distance / MOUSE_RADIUS);
            particle.vy += mouse.vy * 0.0022 * (1 - distance / MOUSE_RADIUS);
          }

          const floatX =
            Math.cos(elapsed * particle.floatSpeed + particle.floatPhase) *
            particle.floatRadius;
          const floatY =
            Math.sin(elapsed * particle.floatSpeed * 0.8 + particle.floatPhase * 1.7) *
            particle.floatRadius *
            0.72;
          const targetX = particle.homeX + floatX;
          const targetY = particle.homeY + floatY;

          particle.vx += (targetX - particle.x) * (particle.cluster ? 0.00011 : 0.00007);
          particle.vy += (targetY - particle.y) * (particle.cluster ? 0.00011 : 0.00007);
          particle.vx *= 0.998;
          particle.vy *= 0.998;
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -40 || particle.x > width + 40) particle.vx *= -1;
          if (particle.y < -40 || particle.y > height + 40) particle.vy *= -1;
        }

        particle.x = Math.max(-60, Math.min(width + 60, particle.x));
        particle.y = Math.max(-60, Math.min(height + 60, particle.y));
      }

      const grid = buildSpatialGrid();
      const checkedPairs = new Set();

      grid.forEach((cellIndexes, key) => {
        const [cellX, cellY] = key.split(",").map(Number);

        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
            const neighborIndexes = grid.get(`${cellX + offsetX},${cellY + offsetY}`);

            if (!neighborIndexes) {
              continue;
            }

            cellIndexes.forEach((firstIndex) => {
              neighborIndexes.forEach((secondIndex) => {
                if (secondIndex <= firstIndex) {
                  return;
                }

                const pairKey = `${firstIndex}:${secondIndex}`;

                if (checkedPairs.has(pairKey)) {
                  return;
                }

                checkedPairs.add(pairKey);

                const first = particles[firstIndex];
                const second = particles[secondIndex];
          const bothCluster = first.cluster && second.cluster;
          const midX = (first.x + second.x) / 2;
          const midY = (first.y + second.y) / 2;
          const mouseDistance = Math.hypot(midX - mouse.x, midY - mouse.y);
          const nearMouse = mouseDistance < MOUSE_RADIUS;
          const linkDistance =
            (bothCluster ? CLUSTER_LINK_DISTANCE : FIELD_LINK_DISTANCE) + (nearMouse ? 52 : 0);
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < linkDistance) {
            const mouseBoost =
              mouseDistance < MOUSE_RADIUS ? (1 - mouseDistance / MOUSE_RADIUS) * 0.34 : 0;
            const clusterStrength = bothCluster ? (first.strength + second.strength) / 2 : 0.65;
            const baseOpacity = bothCluster ? 0.22 + clusterStrength * 0.13 : 0.12;
            const opacity = (1 - distance / linkDistance) * baseOpacity + mouseBoost;
            const gradient = context.createLinearGradient(first.x, first.y, second.x, second.y);

            gradient.addColorStop(0, `rgba(55, 170, 255, ${opacity})`);
            gradient.addColorStop(0.55, `rgba(120, 220, 255, ${opacity * 0.82})`);
            gradient.addColorStop(1, `rgba(87, 118, 255, ${opacity * 0.72})`);

            context.strokeStyle = gradient;
            context.lineWidth = bothCluster ? 1.25 : nearMouse ? 1 : 0.8;
            context.shadowColor = "rgba(58, 169, 255, 0.28)";
            context.shadowBlur = nearMouse || bothCluster ? 6 : 0;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
            context.shadowBlur = 0;
          }
              });
            });
          }
        }
      });

      particles.forEach((particle) => {
        const mouseDistance = Math.hypot(particle.x - mouse.x, particle.y - mouse.y);
        const mouseBoost =
          mouseDistance < MOUSE_RADIUS ? (1 - mouseDistance / MOUSE_RADIUS) * 0.42 : 0;
        const color = particle.accent ? "248, 70, 95" : "80, 190, 255";
        const baseOpacity = particle.cluster ? 0.58 + particle.strength * 0.22 : 0.56;

        context.shadowColor = particle.accent
          ? "rgba(248, 70, 95, 0.35)"
          : "rgba(67, 185, 255, 0.42)";
        context.shadowBlur = particle.cluster || mouseBoost > 0 ? 7 : 3;
        context.fillStyle = `rgba(${color}, ${baseOpacity + mouseBoost})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      });

      if (!motionQuery.matches && !isPaused) {
        mouse.vx *= 0.82;
        mouse.vy *= 0.82;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = getParticleCount(width, height, motionQuery.matches);
      particles = [
        ...CLUSTER_REGIONS.flatMap((region, index) =>
          Array.from({ length: particleCount.clusters[index] }, () =>
            createParticle(width, height, region),
          ),
        ),
        ...Array.from({ length: particleCount.field }, () => createParticle(width, height)),
      ];
      cancelAnimationFrame(animationFrame);
      if (!isPaused) {
        draw();
      }
    };

    const handleMouseMove = (event) => {
      if (isPaused) {
        return;
      }

      mouse.vx = event.clientX - mouse.x;
      mouse.vy = event.clientY - mouse.y;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;

      if (isPaused) {
        cancelAnimationFrame(animationFrame);
      } else if (!motionQuery.matches) {
        startedAt = performance.now();
        animationFrame = requestAnimationFrame(draw);
      } else {
        draw();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="particle-network pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
