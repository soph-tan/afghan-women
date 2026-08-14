// Get the container that holds all the carousel slides
const track = document.getElementById("carousel-track");

// Turn the slides (images) into an array for easier manipulation
const slides = Array.from(track.children);

// Get the navigation dots container
const dotsNav = document.getElementById("carousel-dots");

// Also turn the individual dots into an array
const dots = Array.from(dotsNav.children);

// Set the width of each slide
const slideWidth = 520;

// Start on the first real slide (not the cloned one at the beginning)
let currentIndex = 1;

/**
 * This function moves the carousel to show the current slide.
 * It centers the slide, styles it, and updates the navigation dots.
 */
function updateCarousel() {
  // Calculate how much to move the carousel so the current slide is centered
  const offset = window.innerWidth / 2 - slideWidth / 2;
  const amountToMove = -(currentIndex * slideWidth) + offset;

  // Move the track to the correct position using transform
  track.style.transform = `translateX(${amountToMove}px)`;

  // Reset styles on all slides (so only the active one stands out)
  slides.forEach((slide) => {
    slide.classList.remove("active"); // Remove "active" class
    slide.style.opacity = "0.6"; // Make non-active slides semi-transparent
    slide.style.transform = "scale(0.85)"; // Slightly shrink the size
    slide.style.zIndex = "1"; // Push to the back
  });

  // Style the currently active slide
  slides[currentIndex].classList.add("active");
  slides[currentIndex].style.opacity = "1"; // Full opacity
  slides[currentIndex].style.transform = "scale(1)"; // Full size
  slides[currentIndex].style.zIndex = "10"; // Bring to front

  // Reset all dots to not be active
  dots.forEach((dot) => dot.classList.remove("active"));

  // Figure out which dot corresponds to the current real slide
  let dotIndex = currentIndex - 1;

  // If we're at a clone, fix the index so it wraps around
  if (dotIndex < 0) dotIndex = dots.length - 1;
  if (dotIndex >= dots.length) dotIndex = 0;

  // Set the correct dot to active
  dots[dotIndex].classList.add("active");
}

/**
 * Changes the carousel to a specific slide (based on index)
 * @param {number} index - the slide to go to
 */
function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

/**
 * When a dot is clicked, go to the corresponding slide
 */
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index + 1); // Add 1 because the first "real" slide starts at index 1 (after clone)
  });
});

/**
 * Automatically move to the next slide every 5 seconds
 */
setInterval(() => {
  currentIndex++;

  // If we reach the end, loop back to the first real slide
  if (currentIndex >= slides.length - 1) {
    currentIndex = 1;
  }

  updateCarousel();
}, 5000);

/**
 * Re-center the carousel whenever the window is resized
 */
window.addEventListener("resize", updateCarousel);

/**
 * Initialize the carousel when the page loads
 */
updateCarousel();
