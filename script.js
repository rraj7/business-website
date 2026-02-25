(function bootstrapPortfolio() {
  const cfg = window.PORTFOLIO_CONFIG;
  if (!cfg) return;

  const allowedSchemes = new Set(["https:", "mailto:", "tel:"]);

  function safeUrl(raw, fallback = "#") {
    if (typeof raw !== "string") return fallback;
    const candidate = raw.trim();
    if (!candidate) return fallback;

    const hasScheme = /^[a-zA-Z][a-zA-Z\\d+.-]*:/.test(candidate);
    if (!hasScheme) {
      // Keep relative paths relative to the current document (works on project pages).
      if (candidate.startsWith("//")) return fallback;
      return candidate;
    }

    try {
      const resolved = new URL(candidate);
      if (allowedSchemes.has(resolved.protocol)) {
        return resolved.href;
      }
    } catch (err) {
      return fallback;
    }
    return fallback;
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (!node || typeof value !== "string") return;
    node.textContent = value;
  }

  function sanitizeFilename(value, fallback) {
    if (typeof value !== "string") return fallback;
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    const cleaned = trimmed.replace(/[^a-zA-Z0-9._-]/g, "_");
    return cleaned || fallback;
  }

  function setLink(id, href, opts = {}) {
    const node = document.getElementById(id);
    if (!node) return;
    node.setAttribute("href", safeUrl(href));
    if (opts.download) {
      const filename = sanitizeFilename(opts.downloadName, "RishiRaj_Resume.pdf");
      node.setAttribute("download", filename);
    }
  }

  function makeCard(item) {
    const article = document.createElement("article");
    article.className = "card";

    const h3 = document.createElement("h3");
    h3.textContent = item.title || "Untitled";

    const p = document.createElement("p");
    p.textContent = item.detail || "";

    article.append(h3, p);
    return article;
  }

  function makeStatCard(item) {
    const card = document.createElement("article");
    card.className = "stat-card";

    const value = document.createElement("p");
    value.className = "stat-value";
    value.dataset.target = String(item.value || 0);
    value.textContent = "0";

    const label = document.createElement("p");
    label.className = "stat-label";
    label.textContent = item.label || "Stat";

    card.append(value, label);
    return card;
  }

  setText("brand-name", cfg.name);
  setText("hero-title", cfg.heroTitle);
  setText("hero-bio", cfg.heroBio);
  setText("about-summary", cfg.aboutSummary);
  setText("footer-name", cfg.name);
  setText("footer-role", cfg.role);
  setText("footer-location", cfg.location);

  const emailHref = `mailto:${cfg.email}`;
  const defaultCalendarInviteUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE&add=${encodeURIComponent(cfg.email)}` +
    `&text=${encodeURIComponent(`Intro Call with ${cfg.name}`)}` +
    `&details=${encodeURIComponent(`Hi ${cfg.name}, I would like to discuss a role with you.`)}` +
    `&location=${encodeURIComponent("Google Meet")}`;
  const configuredCalendarUrl = typeof cfg.calendarUrl === "string" ? cfg.calendarUrl.trim() : "";
  const calendarHref =
    configuredCalendarUrl && !configuredCalendarUrl.includes("/calendar/appointments/schedules")
      ? configuredCalendarUrl
      : defaultCalendarInviteUrl;

  setLink("email-cta", emailHref);
  setLink("contact-email-link", emailHref);
  setLink("contact-email-card", emailHref);
  setText("contact-email-link", cfg.email);

  setLink("nav-github-link", cfg.githubUrl);
  setLink("github-cta", cfg.githubUrl);
  setLink("contact-github-link", cfg.githubUrl);
  setLink("linkedin-cta", cfg.linkedinUrl);
  setLink("contact-linkedin-link", cfg.linkedinUrl);
  setLink("calendar-cta", calendarHref);
  setLink("contact-calendar-link", calendarHref);
  setLink("header-resume-link", cfg.resumeUrl, {
    download: true,
    downloadName: cfg.resumeDownloadName,
  });
  setLink("contact-resume-link", cfg.resumeUrl, {
    download: true,
    downloadName: cfg.resumeDownloadName,
  });

  const profileImage = document.getElementById("profile-image");
  if (profileImage && typeof cfg.profileImage === "string") {
    profileImage.src = safeUrl(cfg.profileImage, "assets/profile-placeholder.svg");
  }

  const statsRoot = document.getElementById("stats");
  if (statsRoot && Array.isArray(cfg.stats)) {
    cfg.stats.forEach((item) => statsRoot.append(makeStatCard(item)));
  }

  const achievementsRoot = document.getElementById("achievement-grid");
  if (achievementsRoot && Array.isArray(cfg.achievements)) {
    cfg.achievements.forEach((item) => achievementsRoot.append(makeCard(item)));
  }

  const projectsRoot = document.getElementById("project-grid");
  if (projectsRoot && Array.isArray(cfg.projects)) {
    cfg.projects.forEach((item) => projectsRoot.append(makeCard(item)));
  }

  const revealNodes = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealNodes.forEach((node) => observer.observe(node));

  const statValues = document.querySelectorAll(".stat-value");
  let hasCounted = false;
  const statsObserver = new IntersectionObserver(
    (entries) => {
      if (hasCounted) return;
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        hasCounted = true;
        statValues.forEach((node) => {
          const target = Number(node.dataset.target || 0);
          const durationMs = 900;
          const started = performance.now();
          function tick(now) {
            const progress = Math.min((now - started) / durationMs, 1);
            node.textContent = String(Math.floor(progress * target));
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              node.textContent = String(target);
            }
          }
          requestAnimationFrame(tick);
        });
      });
    },
    { threshold: 0.45 }
  );
  if (statsRoot) statsObserver.observe(statsRoot);

})();
