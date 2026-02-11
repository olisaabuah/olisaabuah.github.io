/* script.js
   Core interactions: smooth scrolling, nav effects, reveal animations, skill bars and form validation
*/

// Wait for DOM
document.addEventListener('DOMContentLoaded',()=>{
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',(e)=>{
      const href = a.getAttribute('href');
      if(href.length>1 && href.startsWith('#')){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
        navLinks.classList.remove('open');
      }
    });
  });

  // Scroll progress indicator
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', ()=>{
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height ? (scrolled/height)*100 : 0;
    progressBar.style.width = pct + '%';

    // Nav shadow on scroll
    const nav = document.getElementById('topNav');
    if(scrolled > 20) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  });

  // Reveal animations using IntersectionObserver
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.section, .card, .skill, .project, .timeline-item').forEach(el=>observer.observe(el));

  // Animate skill bars when visible
  const skillObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const bar = e.target.querySelector('.skill-bar');
        if(bar){
          const percent = bar.dataset.percent || 0;
          bar.querySelector('span').style.width = percent + '%';
        }
        skillObserver.unobserve(e.target);
      }
    });
  },{threshold:0.2});
  document.querySelectorAll('.skill').forEach(s=>skillObserver.observe(s));

  // Form validation
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    feedback.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      feedback.textContent = 'Please complete all fields.';
      return;
    }
    if(!/^\S+@\S+\.\S+$/.test(email)){
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }
    // Simple success behaviour (replace with real submission as needed)
    feedback.textContent = 'Thanks — your message looks good. I will respond shortly.';
    form.reset();
  });

  // Theme toggle (light/dark) persisted and respects system preference
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  // apply saved preference or system preference
  if(saved === 'light') document.body.classList.add('light');
  else if(saved === 'dark') document.body.classList.add('dark');
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) document.body.classList.add('dark');

  themeToggle.addEventListener('click', ()=>{
    if(document.body.classList.contains('light')){
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme','light');
    }
  });

  // Animated counters (if any) - simple example
  document.querySelectorAll('[data-counter]').forEach(el=>{
    const end = +el.dataset.counter || 0;
    let val = 0; const step = Math.max(1, Math.floor(end/80));
    const int = setInterval(()=>{
      val += step; if(val>=end){ val=end; clearInterval(int); }
      el.textContent = val;
    },12);
  });
});
