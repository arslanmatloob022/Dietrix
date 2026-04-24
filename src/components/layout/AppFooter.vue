<template>
  <footer class="site-footer">
    <div class="footer-top">
      <div class="container footer-grid">
        <!-- Brand col -->
        <div class="brand-col">
          <RouterLink to="/" class="footer-brand" aria-label="Dietrix Nutrition home">
            <div class="brand-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="url(#fbg)"/>
                <path d="M10 16c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="16" cy="10" r="1.8" fill="white"/>
                <defs>
                  <linearGradient id="fbg" x1="1" y1="1" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#059669"/><stop offset="1" stop-color="#0d9488"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span class="brand-name">Dietrix <em>Nutrition</em></span>
            </div>
          </RouterLink>
          <p class="brand-desc">
            Remote nutrition consultations for weight loss, PCOS, diabetes, and lifestyle health coaching. Evidence-based care, globally accessible.
          </p>
          <div class="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer noopener" aria-label="Instagram" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer noopener" aria-label="YouTube" class="social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div class="link-col">
          <h3>Quick Links</h3>
          <nav aria-label="Footer navigation" class="footer-links">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/services">Services & Pricing</RouterLink>
            <RouterLink to="/booking">Book Consultation</RouterLink>
            <RouterLink to="/testimonials">Success Stories</RouterLink>
            <RouterLink to="/blog">Nutrition Blog</RouterLink>
            <RouterLink to="/contact">Contact</RouterLink>
          </nav>
        </div>

        <!-- Services -->
        <div class="link-col">
          <h3>Specialities</h3>
          <ul class="speciality-list">
            <li>Weight Loss Programs</li>
            <li>PCOS Nutrition Therapy</li>
            <li>Diabetes Management</li>
            <li>Gut Health Coaching</li>
            <li>Thyroid Support</li>
            <li>Sports Nutrition</li>
            <li>Corporate Wellness</li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="contact-col">
          <h3>Contact</h3>
          <div class="contact-items">
            <a href="mailto:hello@dietrixnutrition.com" class="contact-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 5 6-5M2 4h12v9H2V4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              hello@dietrixnutrition.com
            </a>
            <a href="https://wa.me/15552108102" target="_blank" rel="noreferrer" class="contact-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 017 7c0 3.87-3.13 7-7 7a6.97 6.97 0 01-3.43-.9L1 15l.9-3.57A6.97 6.97 0 011 8a7 7 0 017-7zm3.6 9.42c-.18-.09-1.07-.53-1.24-.59-.17-.06-.29-.09-.41.09s-.47.59-.58.71c-.1.12-.21.13-.39.04-.18-.09-.76-.28-1.44-.89-.53-.47-.89-1.05-.99-1.23-.1-.18-.01-.27.08-.36.08-.08.18-.21.27-.32.09-.1.12-.18.18-.3.06-.12.03-.22-.01-.31-.05-.09-.41-1-.56-1.37-.15-.36-.3-.31-.41-.32-.1-.01-.22-.01-.34-.01s-.31.04-.47.22c-.16.18-.62.6-.62 1.47 0 .86.63 1.7.72 1.82.09.11 1.24 1.9 3 2.66.42.18.74.29.99.37.42.13.8.11 1.1.07.34-.05 1.04-.43 1.19-.84.14-.41.14-.76.1-.83-.04-.07-.16-.12-.34-.21z"/></svg>
              WhatsApp +1 555-210-8102
            </a>
            <p class="contact-item response">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v4l2.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              Responds within 1 business day
            </p>
          </div>
          <RouterLink to="/booking" class="book-cta">
            Book a Consultation →
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container bottom-row">
        <p>© {{ new Date().getFullYear() }} Dietrix Nutrition. All rights reserved.</p>
        <p class="disclaimer">Evidence-based nutrition coaching. Not a substitute for medical advice.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--emerald-950);
  margin-top: 0;
}

.footer-top { padding: clamp(48px, 6vw, 80px) 0 clamp(40px, 5vw, 60px); }

.footer-grid {
  display: grid;
  gap: 40px;
}

/* Brand */
.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  margin-bottom: 16px;
}
.brand-col { display: flex; flex-direction: column; gap: 16px; }
.brand-name {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
}
.brand-name em { font-style: normal; color: var(--emerald-400); }

.brand-desc {
  color: rgba(255,255,255,0.5);
  font-size: 0.9rem;
  line-height: 1.7;
  max-width: 300px;
}

.socials { display: flex; gap: 10px; }
.social-link {
  width: 38px; height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: rgba(255,255,255,0.55);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  transition: color 220ms, background 220ms, transform 220ms;
}
.social-link:hover { color: white; background: rgba(16, 185, 129, 0.2); transform: translateY(-2px); }

/* Links */
h3 {
  color: white;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.footer-links { display: flex; flex-direction: column; gap: 8px; }
.footer-links a {
  color: rgba(255,255,255,0.52);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 200ms, padding-left 200ms;
}
.footer-links a:hover { color: var(--emerald-400); padding-left: 4px; }

.speciality-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.speciality-list li {
  color: rgba(255,255,255,0.52);
  font-size: 0.9rem;
  position: relative;
  padding-left: 14px;
}
.speciality-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--emerald-500);
}

/* Contact */
.contact-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.55);
  font-size: 0.88rem;
  text-decoration: none;
  transition: color 200ms;
}
a.contact-item:hover { color: var(--emerald-400); }
.contact-item.response { color: rgba(255,255,255,0.4); }
.contact-item svg { flex-shrink: 0; opacity: 0.7; }

.book-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, var(--emerald-700), var(--teal-600));
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 10px 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: transform 220ms, box-shadow 220ms;
}
.book-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(5, 150, 105, 0.35); }

/* Bottom bar */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 18px 0;
}
.bottom-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
}
.bottom-row p {
  color: rgba(255,255,255,0.3);
  font-size: 0.82rem;
}
.disclaimer { font-size: 0.78rem !important; }

@media (min-width: 640px) {
  .footer-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1000px) {
  .footer-grid { grid-template-columns: 1.4fr 0.8fr 0.9fr 1fr; }
  .brand-col { grid-column: auto; }
}
</style>
