  const image = document.getElementById("dynamicImage");
  const effects = ["grayscale", "orange", "original"];
  let index = 0;

  setInterval(() => {
    image.className = "fixed-image " + effects[index];
    index = (index + 1) % effects.length;
  }, 5000);

  // Social icon HTML for Font Awesome
  const faIcons = {
    behance: '<i class="fab fa-behance"></i>',
    blogger: '<i class="fab fa-blogger-b"></i>',
    medium: '<i class="fab fa-medium-m"></i>',
    tumblr: '<i class="fab fa-tumblr"></i>',
  };

  // Data for the profiles
  const profiles = {
    art: {
      title: "Visual Artist",
      desc: "A passionate creator who brings imagination to life through digital painting, illustration, and portraiture. Focused on color, emotion, and storytelling in every piece.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      specialties: ["Digital Painting", "Illustration", "Portraits"],
      progress: 85,
      socials: [
        { icon: faIcons.behance, url: "https://behance.net/", label: "Behance" },
        { icon: faIcons.blogger, url: "https://blogger.com/", label: "Blogger" },
        { icon: faIcons.medium, url: "https://medium.com/", label: "Medium" },
        { icon: faIcons.tumblr, url: "https://tumblr.com/", label: "Tumblr" }
      ]
    },
    writer: {
      title: "Creative Writer",
      desc: "Crafting stories and poetry that connect hearts and spark minds. Specializing in evocative prose, vivid imagery, and meaningful narratives across media.",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      specialties: ["Poetry", "Short Stories", "Blogging"],
      progress: 90,
      socials: [
        { icon: faIcons.medium, url: "https://medium.com/", label: "Medium" },
        { icon: faIcons.blogger, url: "https://blogger.com/", label: "Blogger" },
        { icon: faIcons.tumblr, url: "https://tumblr.com/", label: "Tumblr" },
        { icon: faIcons.behance, url: "https://behance.net/", label: "Behance" }
      ]
    }
  };

  // DOM elements
  const profileCard = document.getElementById("twoinonecardCard");
  const primeSides = document.getElementById("twoinonecardPrimeSides");
  const artBtn = document.getElementById("twoinonecardArtBtn");
  const writerBtn = document.getElementById("twoinonecardWriterBtn");

  // Landscape details panel HTML
  function detailsHTML(profile, type) {
    return `
      <div class="twoinonecard-slide-panel" id="twoinonecardSlidePanel">
        <div class="twoinonecard-details" tabindex="0">
          <div class="twoinonecard-left-img">
            <div class="twoinonecard-img-box">
              <img src="${profile.img}" alt="${profile.title}">
            </div>
          </div>
          <div class="twoinonecard-right-content">
            <div class="twoinonecard-title">
              <i class="fas ${type === "art" ? "fa-paint-brush" : "fa-pen-nib"}" style="margin-right:6px;"></i>
              ${profile.title}
            </div>
            <div class="twoinonecard-desc">${profile.desc}</div>
            <ul class="twoinonecard-specialties">
              ${profile.specialties.map(s => `<li>${s}</li>`).join('')}
            </ul>
            <div class="twoinonecard-progress-bar">
              <div class="twoinonecard-progress" style="width: 0"></div>
            </div>
            <div class="twoinonecard-socials">
              ${profile.socials.map(s =>
                `<a class="twoinonecard-social-icon" href="${s.url}" target="_blank" aria-label="${s.label}">${s.icon}</a>`
              ).join('')}
            </div>
            <button class="twoinonecard-back-btn" id="twoinonecardBackBtn" tabindex="0">
              <i class="fas fa-arrow-left"></i>
              Back
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Show details panel with sliding animation
  function showDetails(type) {
    primeSides.classList.add("twoinonecard-prime-hide");
    const panel = document.createElement("div");
    panel.innerHTML = detailsHTML(profiles[type], type);
    profileCard.appendChild(panel.firstElementChild);
    setTimeout(() => {
      const prog = document.querySelector(".twoinonecard-slide-panel .twoinonecard-progress");
      if (prog) prog.style.width = profiles[type].progress + "%";
    }, 40);
    const backBtn = document.getElementById("twoinonecardBackBtn");
    backBtn.onclick = () => hideDetails();
    document.getElementById("twoinonecardSlidePanel").addEventListener("keydown", function(e) {
      if (e.key === "Escape") hideDetails();
    });
    setTimeout(() => {
      document.querySelector(".twoinonecard-slide-panel .twoinonecard-details").focus();
    }, 150);
  }

  // Hide details and show prime again (slide-out anim)
  function hideDetails() {
    const panel = document.getElementById("twoinonecardSlidePanel");
    if (!panel) return;
    panel.classList.add("hide");
    setTimeout(() => {
      if (panel) panel.remove();
      primeSides.classList.remove("twoinonecard-prime-hide");
    }, 550);
  }

  artBtn.onclick = () => showDetails('art');
  writerBtn.onclick = () => showDetails('writer');
  artBtn.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") showDetails('art');
  });
  writerBtn.addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") showDetails('writer');
  });
