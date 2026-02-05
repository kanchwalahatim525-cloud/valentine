// script.js
// Improved dodge logic, confetti on Yes, modal handling, and accessibility tweaks.

(function () {
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const buttonRow = document.getElementById('buttonRow');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');

  // Keep track of focus attempts for keyboard users
  let focusAttempts = 0;

  // Place the No button initially to the right of Yes (or sensible spot)
  function placeInitial() {
    // Set position: relative to buttonRow; buttonRow should be position:relative in CSS
    const rowW = buttonRow.clientWidth;
    const rowH = buttonRow.clientHeight;
    const yesRect = yesBtn.getBoundingClientRect();

    // default center positions
    const defaultTop = Math.max(6, Math.round((rowH - noBtn.offsetHeight) / 2));
    // put No to the right of Yes if it fits, else next to center
    const yesOffsetLeft = yesBtn.offsetLeft || (rowW / 2 - yesBtn.offsetWidth / 2);

    let left = yesOffsetLeft + yesBtn.offsetWidth + 14;
    if (left + noBtn.offsetWidth > rowW - 10) {
      left = Math.max(10, Math.round(rowW / 2 + 12));
    }
    // ensure left within bounds
    left = Math.min(Math.max(6, left), Math.max(6, rowW - noBtn.offsetWidth - 6));

    noBtn.style.left = left + 'px';
    noBtn.style.top = defaultTop + 'px';
  }

  // Utility: check overlap (rects in page coordinates)
  function rectsOverlap(a, b) {
    return !(a.left >= b.right || a.right <= b.left || a.top >= b.bottom || a.bottom <= b.top);
  }

  // Move No button to a random safe place inside buttonRow, avoiding yesRect and avoidRect (both page coords)
  function moveNoButton(avoidRect) {
    const rowRect = buttonRow.getBoundingClientRect();
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    const yesRect = yesBtn.getBoundingClientRect();

    const padding = 8;
    const maxLeft = Math.max(0, rowRect.width - btnW - padding);
    const maxTop = Math.max(0, rowRect.height - btnH - padding);

    let tries = 0;
    let newLeft, newTop;
    let newRect;

    do {
      newLeft = Math.round(Math.random() * maxLeft) + padding;
      newTop = Math.round(Math.random() * maxTop) + padding;

      newRect = {
        left: rowRect.left + newLeft,
        top: rowRect.top + newTop,
        right: rowRect.left + newLeft + btnW,
        bottom: rowRect.top + newTop + btnH,
        width: btnW,
        height: btnH
      };

      tries++;
      // avoid overlapping yes button (with a small margin)
      const yesMargin = {
        left: yesRect.left - 14,
        top: yesRect.top - 14,
        right: yesRect.right + 14,
        bottom: yesRect.bottom + 14
      };

      const overlapsYes = rectsOverlap(newRect, yesMargin);
      const overlapsAvoid = avoidRect ? rectsOverlap(newRect, avoidRect) : false;

      // If we're failing to find a random spot after many tries, pick a deterministic fallback:
      if (tries > 40) {
        // try mirrored position relative to center
        newLeft = Math.max(padding, Math.min(maxLeft + padding, rowRect.width - newLeft - btnW));
        newTop = Math.max(padding, Math.min(maxTop + padding, rowRect.height - newTop - btnH));
        newRect.left = rowRect.left + newLeft;
        newRect.top = rowRect.top + newTop;
        newRect.right = newRect.left + btnW;
        newRect.bottom = newRect.top + btnH;
        if (!rectsOverlap(newRect, yesMargin) && (!avoidRect || !rectsOverlap(newRect, avoidRect))) break;
      }

      if (!overlapsYes && !overlapsAvoid) break;
    } while (tries < 200);

    // apply coordinates relative to the row
    // smooth animation
    noBtn.style.transition = 'left .18s cubic-bezier(.2,.9,.2,1), top .18s cubic-bezier(.2,.9,.2,1), transform .12s ease';
    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';
    // tiny bounce
    noBtn.style.transform = 'translateY(-6px)';
    setTimeout(() => (noBtn.style.transform = ''), 160);
  }

  // Build an avoid rectangle around pointer coords (page coords)
  function pointerAvoidRect(clientX, clientY, radius = 64) {
    return {
      left: clientX - radius,
      top: clientY - radius,
      right: clientX + radius,
      bottom: clientY + radius
    };
  }

  // Event handlers
  function handlePointerApproach(e) {
    // pointer events cover mouse/finger/stylus
    if (e.type === 'pointerenter' || e.type === 'pointerover' || e.type === 'pointerdown') {
      const cx = e.clientX;
      const cy = e.clientY;
      const avoid = (typeof cx === 'number' && typeof cy === 'number') ? pointerAvoidRect(cx, cy, 72) : null;
      moveNoButton(avoid);
    }
  }

  function handleTouchStart(e) {
    if (e.touches && e.touches.length) {
      const t = e.touches[0];
      const avoid = pointerAvoidRect(t.clientX, t.clientY, 88);
      moveNoButton(avoid);
    } else {
      moveNoButton();
    }
  }

  function handleNoClick(e) {
    // prevent the "No" from being clicked
    e.preventDefault();
    e.stopPropagation();
    // if somehow clicked, jump away
    moveNoButton();
  }

  function handleNoFocus(e) {
    // move away on focus for keyboard users, and redirect after a couple attempts
    focusAttempts++;
    moveNoButton();
    if (focusAttempts > 2) {
      yesBtn.focus();
      focusAttempts = 0;
    }
  }

  // Modal show/hide and celebration
  function showModal() {
    modal.setAttribute('aria-hidden', 'false');

    // play confetti if available
    if (typeof confetti === 'function') {
      // a couple of bursts
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.4 }
      }), 250);
    }

    // optional audio: if you add <audio id="romanceAudio"> to index.html, uncomment:
    // const audio = document.getElementById('romanceAudio');
    // if (audio) { audio.currentTime = 0; audio.play().catch(() => {}); }

    // return focus to modal close button for accessibility
    setTimeout(() => closeModal.focus(), 220);
  }

  function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
    yesBtn.focus();
  }

  // Attach events
  function attachEvents() {
    // pointer events (covers mouse, stylus; better than mouse events)
    noBtn.addEventListener('pointerenter', handlePointerApproach);
    noBtn.addEventListener('pointerover', handlePointerApproach);
    noBtn.addEventListener('pointerdown', handlePointerApproach);

    // touch
    noBtn.addEventListener('touchstart', handleTouchStart, {passive: true});

    // click / focus
    noBtn.addEventListener('click', handleNoClick);
    noBtn.addEventListener('focus', handleNoFocus);

    // Yes button
    yesBtn.addEventListener('click', showModal);

    // Modal
    closeModal.addEventListener('click', hideModal);

    // close modal on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        hideModal();
      }
    });

    // reposition on resize / orientation change
    window.addEventListener('resize', () => {
      setTimeout(placeInitial, 120);
    });

    // reset focusAttempts if user interacts with yes
    yesBtn.addEventListener('focus', () => focusAttempts = 0);

    // prevent accidental selection drag on mobile when trying to catch No
    document.addEventListener('dragstart', (e) => e.preventDefault());
  }

  // Kick off
  // Wait for layout so offsetWidth/height are accurate
  window.addEventListener('load', () => {
    placeInitial();
    attachEvents();
    // If layout changes later, keep No inside bounds
    setInterval(() => {
      // ensure No is visible and within bounds (fix edge cases)
      const rowW = buttonRow.clientWidth;
      const rowH = buttonRow.clientHeight;
      let left = parseInt(noBtn.style.left || 0, 10);
      let top = parseInt(noBtn.style.top || 0, 10);
      const maxLeft = Math.max(6, rowW - noBtn.offsetWidth - 6);
      const maxTop = Math.max(6, rowH - noBtn.offsetHeight - 6);

      let changed = false;
      if (left > maxLeft) { left = maxLeft; changed = true; }
      if (top > maxTop) { top = maxTop; changed = true; }
      if (left < 6) { left = 6; changed = true; }
      if (top < 6) { top = 6; changed = true; }

      if (changed) {
        noBtn.style.left = left + 'px';
        noBtn.style.top = top + 'px';
      }
    }, 6000);
  });
})();
