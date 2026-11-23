import "./style.css";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Loader ---------- */
function hideLoader() {
  const loader = document.querySelector("[data-loader]");
  if (!loader) return;
  loader.classList.add("is-hidden");
  window.setTimeout(() => loader.remove(), 700);
}

window.addEventListener("load", () => {
  window.setTimeout(hideLoader, 450);
});

/* Fallback: nunca travar a tela de carregamento */
window.setTimeout(hideLoader, 3500);

/* ---------- Header ---------- */
const header = document.querySelector("[data-header]");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

/* ---------- Menu mobile ---------- */
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

function closeMobileMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  document.body.style.overflow = "";
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

/* ---------- Hero video ---------- */
const heroVideo = document.querySelector("[data-hero-video]");

if (heroVideo) {
  if (prefersReducedMotion) {
    heroVideo.pause();
    heroVideo.removeAttribute("autoplay");
  } else {
    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* O poster e a imagem de fundo cobrem a falha de autoplay */
      });
    }
  }

  heroVideo.addEventListener("error", () => {
    heroVideo.style.display = "none";
  });
}

/* ---------- Reveal on scroll ---------- */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* ---------- Link ativo do menu ---------- */
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && navLinks.length && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-38% 0px -55% 0px" }
  );

  sections.forEach((section) => navObserver.observe(section));
}

/* ---------- Agenda: carrossel com pausa de 3 segundos ---------- */
const FALLBACK_AGENDA = {
  semanaTitulo: "Programacao Cultural da Semana",
  observacao: "Cultura viva no casarao da Praca Joao Candido. Chegue cedo para garantir sua mesa!",
  eventos: [
    {
      id: "quarta-espetaculosa",
      diaSemana: "Quarta Espetaculosa",
      data: "25 de Novembro",
      horario: "20h",
      artista: "Areia Branca",
      subtitulo: "Samba, brasilidades e abertura da semana em grande estilo",
      imagem: "/assets/images/gallery/roda-de-samba-palco.webp",
      alt: "Grupo musical apresentando roda de samba ao vivo no palco iluminado do Patuscada em Curitiba"
    },
    {
      id: "quinta-samba-raiz",
      diaSemana: "Quinta Samba de Raiz",
      data: "26 de Novembro",
      horario: "20h",
      artista: "Grupo Caxambu",
      subtitulo: "Classicos do samba de raiz para cantar junto do inicio ao fim",
      imagem: "/assets/images/gallery/cantor-ao-vivo-patuscada.webp",
      alt: "Vocalista cantando samba ao vivo com publico animado no Bar Patuscada"
    },
    {
      id: "sexta-batuscada",
      diaSemana: "Sexta Batuscada",
      data: "27 de Novembro",
      horario: "22h",
      artista: "Sapataria da Gabi",
      subtitulo: "Batuscada brasileira, percussao pulsante e pista cheia de energia",
      imagem: "/assets/images/gallery/fita-colorida-festa.webp",
      alt: "Salao do Patuscada decorado com fitas coloridas no teto e publico curtindo show de sexta-feira"
    },
    {
      id: "sabado-caipira",
      diaSemana: "Sabado Caipira",
      data: "28 de Novembro",
      horario: "18h",
      artista: "Roda Caipira",
      subtitulo: "Viola, sanfona e modas tradicionais no fim de tarde do Sao Francisco",
      imagem: "/assets/images/gallery/musica-instrumental-detalhe.webp",
      alt: "Detalhe de musico tocando instrumento de cordas durante apresentacao ao vivo no Patuscada"
    },
    {
      id: "sabado-especial",
      diaSemana: "Sabado Especial Patuscada",
      data: "28 de Novembro",
      horario: "22h",
      artista: "O Bloco e Convidados",
      subtitulo: "Folia de carnaval fora de epoca, marchinhas e ritmos populares",
      imagem: "/assets/images/gallery/publico-casa-cheia.webp",
      alt: "Publico reunido nas mesas e salao cheio durante noite especial no Bar Patuscada"
    },
    {
      id: "domingo-almoco",
      diaSemana: "Domingo Almoco Cultural",
      data: "29 de Novembro",
      horario: "13h",
      artista: "Proleta e Choro Cruzado",
      subtitulo: "Chorinho e samba acompanhando moqueca, macarronada e bife a rolezao",
      imagem: "/assets/images/gallery/palco-instrumentos-neon.webp",
      alt: "Palco de madeira do Patuscada preparado com instrumentos musicais e letreiro neon colorido"
    },
    {
      id: "domingueira",
      diaSemana: "Domingueira Patuscada",
      data: "29 de Novembro",
      horario: "18h",
      artista: "Grupo Canjao",
      subtitulo: "Pagode e roda animada para fechar o domingo com chave de ouro",
      imagem: "/assets/images/gallery/noite-intimista-neon.webp",
      alt: "Apresentacao musical noturna sob bandeirinhas e letreiro neon do Patuscada"
    }
  ]
};

const track = document.querySelector("[data-carousel-track]");
const prevBtn = document.querySelector("[data-carousel-prev]");
const nextBtn = document.querySelector("[data-carousel-next]");
const dotsWrap = document.querySelector("[data-carousel-dots]");
const progressBar = document.querySelector("[data-carousel-progress]");
const carouselRegion = document.querySelector("[data-carousel]");

let currentIndex = 0;
let totalSlides = 0;
let autoTimer = null;
let progressTimer = null;
let progressValue = 0;
const SLIDE_DELAY = 3000;
const PROGRESS_STEP = 30;

function buildEventCard(event) {
  const article = document.createElement("article");
  article.className = "event-card";
  article.setAttribute("aria-label", `${event.diaSemana}: ${event.artista}`);

  const media = document.createElement("div");
  media.className = "event-media";

  const img = document.createElement("img");
  img.src = event.imagem;
  img.alt = event.alt || `Show de ${event.artista} no Patuscada Bar e Cultura`;
  img.loading = "lazy";
  img.decoding = "async";

  const dateBadge = document.createElement("span");
  dateBadge.className = "event-date";
  dateBadge.textContent = event.data;

  media.append(img, dateBadge);

  const body = document.createElement("div");
  body.className = "event-body";

  const day = document.createElement("p");
  day.className = "event-day";
  day.textContent = event.diaSemana;

  const artist = document.createElement("h3");
  artist.className = "event-artist";
  artist.textContent = event.artista;

  const sub = document.createElement("p");
  sub.className = "event-sub";
  sub.textContent = event.subtitulo;

  const meta = document.createElement("div");
  meta.className = "event-meta";

  const time = document.createElement("span");
  time.className = "event-time";
  time.textContent = `A partir das ${event.horario}`;

  const tag = document.createElement("span");
  tag.className = "event-tag";
  tag.textContent = "Musica ao vivo";

  meta.append(time, tag);
  body.append(day, artist, sub, meta);
  article.append(media, body);

  return article;
}

function goToSlide(index) {
  if (!track || totalSlides === 0) return;
  currentIndex = (index + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  if (dotsWrap) {
    dotsWrap.querySelectorAll(".dot").forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  restartProgress();
}

function restartProgress() {
  if (progressTimer) window.clearInterval(progressTimer);
  progressValue = 0;
  if (progressBar) progressBar.style.width = "0%";
  if (prefersReducedMotion) return;

  progressTimer = window.setInterval(() => {
    progressValue += PROGRESS_STEP;
    if (progressBar) {
      progressBar.style.width = `${Math.min(progressValue, 100)}%`;
    }
    if (progressValue >= 100) {
      window.clearInterval(progressTimer);
    }
  }, SLIDE_DELAY / (100 / PROGRESS_STEP));
}

function startAutoplay() {
  stopAutoplay();
  if (prefersReducedMotion || totalSlides < 2) return;
  autoTimer = window.setInterval(() => {
    goToSlide(currentIndex + 1);
  }, SLIDE_DELAY);
}

function stopAutoplay() {
  if (autoTimer) window.clearInterval(autoTimer);
  autoTimer = null;
}

function renderAgenda(data) {
  if (!track || !data || !Array.isArray(data.eventos) || data.eventos.length === 0) return;

  track.innerHTML = "";
  data.eventos.forEach((event) => {
    track.appendChild(buildEventCard(event));
  });

  totalSlides = data.eventos.length;

  if (dotsWrap) {
    dotsWrap.innerHTML = "";
    data.eventos.forEach((event, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Ir para ${event.diaSemana}: ${event.artista}`);
      dot.addEventListener("click", () => {
        goToSlide(index);
        startAutoplay();
      });
      dotsWrap.appendChild(dot);
    });
  }

  goToSlide(0);
  startAutoplay();
}

if (track) {
  fetch("/data/agenda.json", { headers: { Accept: "application/json" } })
    .then((response) => {
      if (!response.ok) throw new Error("Agenda indisponivel");
      return response.json();
    })
    .then(renderAgenda)
    .catch(() => renderAgenda(FALLBACK_AGENDA));

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoplay();
    });
  }

  if (carouselRegion) {
    carouselRegion.addEventListener("mouseenter", stopAutoplay);
    carouselRegion.addEventListener("mouseleave", startAutoplay);
    carouselRegion.addEventListener("focusin", stopAutoplay);
    carouselRegion.addEventListener("focusout", startAutoplay);

    let touchStartX = null;
    carouselRegion.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.touches[0].clientX;
        stopAutoplay();
      },
      { passive: true }
    );

    carouselRegion.addEventListener(
      "touchend",
      (event) => {
        if (touchStartX === null) return;
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(deltaX) > 42) {
          goToSlide(currentIndex + (deltaX < 0 ? 1 : -1));
        }
        touchStartX = null;
        startAutoplay();
      },
      { passive: true }
    );

    carouselRegion.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        goToSlide(currentIndex + 1);
        startAutoplay();
      }
      if (event.key === "ArrowLeft") {
        goToSlide(currentIndex - 1);
        startAutoplay();
      }
    });
  }
}

/* ---------- Cookie consent ---------- */
const COOKIE_KEY = "patuscada_cookie_consent";
const cookieBanner = document.querySelector("[data-cookie-banner]");
const cookieAccept = document.querySelector("[data-cookie-accept]");
const cookieDecline = document.querySelector("[data-cookie-decline]");

function showCookieBanner() {
  if (!cookieBanner) return;
  try {
    if (!window.localStorage.getItem(COOKIE_KEY)) {
      window.setTimeout(() => cookieBanner.classList.add("is-visible"), 1400);
    }
  } catch {
    cookieBanner.classList.add("is-visible");
  }
}

function saveCookieConsent(value) {
  try {
    window.localStorage.setItem(COOKIE_KEY, value);
  } catch {
    /* armazenamento indisponivel */
  }
  if (cookieBanner) cookieBanner.classList.remove("is-visible");
}

if (cookieAccept) {
  cookieAccept.addEventListener("click", () => saveCookieConsent("accepted"));
}

if (cookieDecline) {
  cookieDecline.addEventListener("click", () => saveCookieConsent("declined"));
}

showCookieBanner();

/* ---------- Formulario de reserva ---------- */
const reservationForm = document.querySelector("[data-reservation-form]");

function setFieldError(field, message) {
  if (!field) return;
  const wrapper = field.closest(".field");
  if (!wrapper) return;
  const errorEl = wrapper.querySelector(".field-error");
  if (message) {
    wrapper.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    if (errorEl) errorEl.textContent = message;
  } else {
    wrapper.classList.remove("has-error");
    field.removeAttribute("aria-invalid");
    if (errorEl) errorEl.textContent = "";
  }
}

if (reservationForm) {
  reservationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = reservationForm.querySelector("#nome");
    const phone = reservationForm.querySelector("#telefone");
    const date = reservationForm.querySelector("#data");
    const guests = reservationForm.querySelector("#pessoas");

    let firstInvalid = null;

    if (!name.value.trim() || name.value.trim().length < 2) {
      setFieldError(name, "Informe seu nome para fazermos a reserva.");
      firstInvalid = firstInvalid || name;
    } else {
      setFieldError(name, "");
    }

    const digits = phone.value.replace(/\D/g, "");
    if (!digits || digits.length < 10) {
      setFieldError(phone, "Informe um telefone ou WhatsApp valido com DDD.");
      firstInvalid = firstInvalid || phone;
    } else {
      setFieldError(phone, "");
    }

    if (!date.value) {
      setFieldError(date, "Escolha a data da sua visita.");
      firstInvalid = firstInvalid || date;
    } else {
      setFieldError(date, "");
    }

    if (!guests.value) {
      setFieldError(guests, "Selecione quantas pessoas vao na mesa.");
      firstInvalid = firstInvalid || guests;
    } else {
      setFieldError(guests, "");
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    window.location.href = "/obrigado.html";
  });

  reservationForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => setFieldError(field, ""));
    field.addEventListener("change", () => setFieldError(field, ""));
  });
}

/* ---------- Horario de hoje ---------- */
const todayRows = document.querySelectorAll("[data-weekday]");

if (todayRows.length) {
  const today = new Date().getDay();
  todayRows.forEach((row) => {
    const day = Number(row.getAttribute("data-weekday"));
    if (day === today) {
      row.classList.add("is-today");
      const cell = row.querySelector("td");
      if (cell) {
        const pill = document.createElement("span");
        pill.className = "today-pill";
        pill.textContent = "Hoje";
        cell.appendChild(pill);
      }
    }
  });
}

/* ---------- Ano dinamico ---------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
