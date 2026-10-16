const $ = id => document.getElementById(id);
// Mobile menu
$('burger').addEventListener('click', () => $('menu').classList.toggle('open'));
$('menu').addEventListener('click', e => { if (e.target.closest('a')) $('menu').classList.remove('open'); });

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Services carousel
const track = $('track'), cards = [...track.children], dots = $('dots');
cards.forEach(() => dots.appendChild(document.createElement('i')));
const step = () => cards[0].getBoundingClientRect().width + 24;
const sync = () => [...dots.children].forEach((d, i) => d.classList.toggle('on', i === Math.round(track.scrollLeft / step())));
$('next').onclick = () => track.scrollBy({ left: step() });
$('prev').onclick = () => track.scrollBy({ left: -step() });
track.addEventListener('scroll', sync, { passive: true }); sync();

// Contact form
const form = $('contactForm'), anon = $('anon');
anon.addEventListener('change', () => { $('name').disabled = anon.checked; if (anon.checked) $('name').value = ''; });
const err = (id, m) => { $(id + '-err').textContent = m; return !m; };
form.addEventListener('submit', e => {
  e.preventDefault();
  const a = err('email', /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('email').value.trim()) ? '' : 'Enter a valid email address.');
  const b = err('msg', $('msg').value.trim() ? '' : 'Please write a message.');
  if (a && b) { $('ok').textContent = 'Thanks! We will reply soon.'; form.reset(); $('name').disabled = false; }
  else $('ok').textContent = '';
});
