const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const detail = document.getElementById(targetId);

    if (!detail) return;

    const isOpen = detail.classList.contains('open');
    detail.classList.toggle('open', !isOpen);
    btn.classList.toggle('active', !isOpen);
    btn.querySelector('.arrow').textContent = isOpen ? '↓' : '↑';
  });
});

function selectPlan(card, storage) {
  document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const modelSelect = document.getElementById('model');
  if (modelSelect) {
    const map = { '256GB': '256gb', '512GB': '512gb', '1TB': '1tb' };
    modelSelect.value = map[storage] || '';
  }
}

const orderForm = document.getElementById('order-form');
const formSuccess = document.getElementById('form-success');

if (orderForm) {
  orderForm.addEventListener('submit', function (e) {
    e.preventDefault();
    orderForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
  });
}
