
  const image = document.getElementById("dynamicImage");
  const effects = ["grayscale", "cyberpink", "original"];
  let index = 0;

  setInterval(() => {
    image.className = "fixed-image " + effects[index];
    index = (index + 1) % effects.length;
  }, 5000);
