// src/main.js
// Empty for now — ready for your future JS
console.log('Yo, thank you for visiting my site.');

// Smooth fade-in animation when sections scroll into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-start');
        observer.unobserve(entry.target); // optional: only animate once
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-init'); // set initial hidden state
    observer.observe(section);
  });
  
  // Subtle background movement effect
const bgEffect = document.getElementById('bg-effect');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  bgEffect.style.background = `
    radial-gradient(
      600px circle at ${x * 100}% ${y * 100}%,
      rgba(0, 184, 148, 0.1),
      transparent 80%
    )
  `;
});
