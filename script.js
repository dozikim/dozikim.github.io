const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const mobileNav = document.querySelector("#mobileNav");
const header = document.querySelector(".site-header");
const typeText = document.querySelector("#typeText");

const savedTheme = localStorage.getItem("bharat-portfolio-theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("bharat-portfolio-theme", root.classList.contains("dark") ? "dark" : "light");
});

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  header.dataset.elevated = String(window.scrollY > 12);
});

const phrases = [
  "I secure web apps.",
  "I build Python security tools.",
  "I practice VAPT and recon.",
  "I turn security ideas into products."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function tickTypewriter() {
  const phrase = phrases[phraseIndex];
  if (deleting) {
    charIndex -= 1;
  } else {
    charIndex += 1;
  }

  typeText.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(tickTypewriter, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(tickTypewriter, deleting ? 34 : 58);
}

tickTypewriter();

/* ==========================================
   Certifications Interactivity & Animations
   ========================================== */
const certificationsData = [
  {
    title: "Cyber, Data & Tech Risk",
    issuer: "PwC Launchpad (Tekstac)",
    description: "Comprehensive understanding of principles, technologies, and practices to secure digital systems and information.",
    type: "badge",
    mediaUrl: "https://pwc.tekstac.com/blocks/tekbadges/get_badge_image.php?path=/opt/moodledata/Tekbadge/10/Advisory_Launchpad_Badges05.png",
    actionUrl: "https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=11366&text=g3AdW",
    actionText: "Verify Badge"
  },
  {
    title: "PF PowerShell",
    issuer: "PwC Launchpad (Tekstac)",
    description: "Programming Fundamentals – PowerShell Micro Certification.",
    type: "badge",
    mediaUrl: "https://pwc.tekstac.com/blocks/tekbadges/get_badge_image.php?path=/opt/moodledata/Tekbadge/7/Advisory_Launchpad_Badges03.png",
    actionUrl: "https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=9218&text=JzbTw",
    actionText: "Verify Badge"
  },
  {
    title: "Modern Data Systems",
    issuer: "PwC Launchpad (Tekstac)",
    description: "Modern Data Systems Micro Certification.",
    type: "badge",
    mediaUrl: "https://pwc.tekstac.com/blocks/tekbadges/get_badge_image.php?path=/opt/moodledata/Tekbadge/5/Advisory_Launchpad_Badges02.png",
    actionUrl: "https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=3592&text=tcybu",
    actionText: "Verify Badge"
  },
  {
    title: "Gen AI",
    issuer: "PwC Launchpad (Tekstac)",
    description: "GenAI – Prompt Engineering and Intro to AI Agents Micro Certification.",
    type: "badge",
    mediaUrl: "https://pwc.tekstac.com/blocks/tekbadges/get_badge_image.php?path=/opt/moodledata/Tekbadge/4/Advisory_Launchpad_Badges01.png",
    actionUrl: "https://pwc.tekstac.com/blocks/tekbadges/badge.php?id=1973&text=uTFTk",
    actionText: "Verify Badge"
  },
  {
    title: "Belkasoft Certified",
    issuer: "Belkasoft",
    description: "BelkaGPT: Effective Artificial Intelligence in DFIR. Completed with 6 CPE credits.",
    type: "pdf",
    mediaUrl: "assets/BELKASOFT_CERTIFICATE.pdf",
    actionUrl: "assets/BELKASOFT_CERTIFICATE.pdf",
    actionText: "Open Full PDF"
  },
  {
    title: "Certified Red Team Analyst (CRTA)",
    issuer: "CyberWarFare Labs (CWL)",
    description: "Hands-on certification focusing on red teaming, Active Directory exploitation, and network security operations.",
    type: "pdf",
    mediaUrl: "assets/BHARAT_CRTA.pdf",
    actionUrl: "assets/BHARAT_CRTA.pdf",
    actionText: "Open Full PDF"
  },
  {
    title: "Cybersecurity Foundation",
    issuer: "Palo Alto Networks",
    description: "Fundamental concepts of network security, cloud security, and cybersecurity operations.",
    type: "pdf",
    mediaUrl: "assets/PALOALTO_CERTIFICATE.pdf",
    actionUrl: "assets/PALOALTO_CERTIFICATE.pdf",
    actionText: "Open Full PDF"
  }
];

const certCards = document.querySelectorAll(".cert-card");
const certModal = document.querySelector("#certModal");
const modalIssuer = document.querySelector("#modalIssuer");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalPreview = document.querySelector("#modalPreview");
const modalActionBtn = document.querySelector("#modalActionBtn");
const modalCloseBtn = document.querySelector("#modalCloseBtn");
const modalOverlay = document.querySelector(".cert-modal-overlay");

let lastFocusedElement = null;

// 1. Entrance Scroll Animations (Staggered reveal)
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15
};

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      animObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

certCards.forEach((card) => {
  animObserver.observe(card);
});

const revealCards = document.querySelectorAll(".reveal-card");
revealCards.forEach((card) => {
  animObserver.observe(card);
});

// 2. 3D Parallax Tilt & Mouse-Tracking Glow
certCards.forEach((card) => {
  // Check if system prefers reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    // Relative offset percentage for glow radial gradient
    const px = (x / width) * 100;
    const py = (y / height) * 100;

    // Tilt angle (maximum 8 degrees)
    const rx = ((y - height / 2) / (height / 2)) * -8;
    const ry = ((x - width / 2) / (width / 2)) * 8;

    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${px}%`);
    card.style.setProperty("--my", `${py}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  });
});

// General Reveal Cards 3D Parallax Tilt & dynamic Glow element injection
revealCards.forEach((card) => {
  // Check if system prefers reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  // Dynamically create and append glow element
  if (!card.querySelector(".card-glow")) {
    const glow = document.createElement("div");
    glow.className = "card-glow";
    card.appendChild(glow);
  }

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const px = (x / width) * 100;
    const py = (y / height) * 100;

    const rx = ((y - height / 2) / (height / 2)) * -8;
    const ry = ((x - width / 2) / (width / 2)) * 8;

    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${px}%`);
    card.style.setProperty("--my", `${py}%`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  });
});

// 3. Lightbox Modal Functionality
function openModal(index) {
  const data = certificationsData[index];
  if (!data) return;

  // Save last active element
  lastFocusedElement = document.activeElement;

  // Update content
  modalIssuer.textContent = data.issuer;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  modalPreview.innerHTML = "";
  if (data.type === "badge") {
    const img = document.createElement("img");
    img.src = data.mediaUrl;
    img.alt = `${data.title} badge`;
    modalPreview.appendChild(img);
  } else {
    const iframe = document.createElement("iframe");
    iframe.src = data.mediaUrl;
    iframe.title = `${data.title} PDF Document`;
    modalPreview.appendChild(iframe);
  }

  modalActionBtn.href = data.actionUrl;
  modalActionBtn.textContent = data.actionText;

  // Show Modal
  certModal.classList.add("open");
  certModal.setAttribute("aria-hidden", "false");

  // Prevent background scroll
  document.body.style.overflow = "hidden";

  // Focus modal close button
  setTimeout(() => {
    modalCloseBtn.focus();
  }, 100);

  // Esc key & Focus Trap
  document.addEventListener("keydown", handleModalKeydown);
}

function closeModal() {
  certModal.classList.remove("open");
  certModal.setAttribute("aria-hidden", "true");

  // Restore background scroll
  document.body.style.overflow = "";

  // Wait for animation to finish, then clear preview to stop loading iframe
  setTimeout(() => {
    modalPreview.innerHTML = "";
  }, 300);

  document.removeEventListener("keydown", handleModalKeydown);

  // Restore focus
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function handleModalKeydown(e) {
  if (e.key === "Escape") {
    closeModal();
    return;
  }

  if (e.key === "Tab") {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = certModal.querySelectorAll(focusableSelectors);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
}

// 4. Click event listeners for opening modal
certCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Do not open modal if they clicked the anchor button directly
    if (e.target.closest("a")) return;

    const index = parseInt(card.getAttribute("data-index"));
    openModal(index);
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (e.target.closest("a")) return;
      e.preventDefault();
      const index = parseInt(card.getAttribute("data-index"));
      openModal(index);
    }
  });
});

// Close triggers
modalCloseBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

/* ==========================================
   GitHub Profile In-Portfolio Modal
   ========================================== */
const GH_USERNAME = "dozikim";
const ghModal = document.querySelector("#ghModal");
const ghModalBody = document.querySelector("#ghModalBody");
const ghModalClose = document.querySelector("#ghModalClose");
const ghOverlay = document.querySelector(".gh-modal-overlay");

let ghDataCache = null;
let ghLastFocused = null;

// Intercept all GitHub trigger links
document.querySelectorAll(".gh-modal-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openGhModal();
  });
});

async function fetchGitHubData() {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GH_USERNAME}`),
    fetch(`https://api.github.com/users/${GH_USERNAME}/repos?sort=updated&per_page=30`)
  ]);

  if (!userRes.ok) throw new Error(`User API: ${userRes.status}`);
  if (!reposRes.ok) throw new Error(`Repos API: ${reposRes.status}`);

  const user = await userRes.json();
  const repos = await reposRes.json();

  // Sort repos by stars descending, take top 5
  const topRepos = repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  // Calculate total stars
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return { user, topRepos, totalStars };
}

function renderGhProfile(data) {
  const { user, topRepos, totalStars } = data;
  const name = user.name || user.login;
  const bio = user.bio || "No bio provided.";

  let repoHTML = "";
  topRepos.forEach((repo) => {
    const lang = repo.language
      ? `<span class="gh-repo-lang">${repo.language}</span>`
      : "";
    repoHTML += `
      <a class="gh-repo" href="${repo.html_url}" target="_blank" rel="noopener" aria-label="${repo.name} repository">
        <span class="gh-repo-name">${repo.name}</span>
        <div class="gh-repo-meta">
          ${lang}
          <span>★ ${repo.stargazers_count}</span>
        </div>
      </a>`;
  });

  ghModalBody.innerHTML = `
    <div class="gh-profile">
      <div class="gh-profile-banner">
        <img class="gh-avatar" src="${user.avatar_url}" alt="${name} GitHub avatar" />
        <div class="gh-identity">
          <div class="gh-name">${name}</div>
          <div class="gh-username">@${user.login}</div>
          <div class="gh-bio">${bio}</div>
        </div>
      </div>
      <div class="gh-stats">
        <div class="gh-stat"><strong>${user.public_repos}</strong><span>Repos</span></div>
        <div class="gh-stat"><strong>${user.followers}</strong><span>Followers</span></div>
        <div class="gh-stat"><strong>${user.following}</strong><span>Following</span></div>
        <div class="gh-stat"><strong>${totalStars}</strong><span>Stars</span></div>
      </div>
      ${topRepos.length > 0 ? `<div class="gh-repos-heading">Top Repositories</div><div class="gh-repos">${repoHTML}</div>` : ""}
      <div class="gh-footer">
        <a class="neo-button primary" href="${user.html_url}" target="_blank" rel="noopener">View Full Profile on GitHub</a>
      </div>
    </div>`;
}

function renderGhError() {
  ghModalBody.innerHTML = `
    <div class="gh-error">
      <p>Could not load GitHub profile.</p>
      <a href="https://github.com/${GH_USERNAME}" target="_blank" rel="noopener">Open on github.com</a>
    </div>`;
}

function showGhLoading() {
  ghModalBody.innerHTML = `
    <div class="gh-loading">
      <div class="gh-spinner"></div>
      <span>Fetching profile...</span>
    </div>`;
}

async function openGhModal() {
  ghLastFocused = document.activeElement;

  ghModal.classList.add("open");
  ghModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  setTimeout(() => ghModalClose.focus(), 100);
  document.addEventListener("keydown", handleGhKeydown);

  if (ghDataCache) {
    renderGhProfile(ghDataCache);
    return;
  }

  showGhLoading();

  try {
    ghDataCache = await fetchGitHubData();
    // Only render if modal is still open
    if (ghModal.classList.contains("open")) {
      renderGhProfile(ghDataCache);
    }
  } catch (err) {
    console.error("GitHub fetch error:", err);
    if (ghModal.classList.contains("open")) {
      renderGhError();
    }
  }
}

function closeGhModal() {
  ghModal.classList.remove("open");
  ghModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.removeEventListener("keydown", handleGhKeydown);

  if (ghLastFocused) {
    ghLastFocused.focus();
  }
}

function handleGhKeydown(e) {
  if (e.key === "Escape") {
    closeGhModal();
    return;
  }

  if (e.key === "Tab") {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(ghModal.querySelectorAll(focusableSelectors));
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }
}

ghModalClose.addEventListener("click", closeGhModal);
ghOverlay.addEventListener("click", closeGhModal);
