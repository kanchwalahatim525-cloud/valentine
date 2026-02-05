// Make the "No" button dodge the user's attempts to click it.
// Also handle touch and focus. Keep the No button inside the visible area of the card.

(function () {
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const buttonRow = document.getElementById('buttonRow');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');

  // Place noBtn initially to the right of Yes with a safe offset
  function placeInitial() {
    // position inside buttonRow (which is relative)
    const rowRect = buttonRow.getBoundingClientRect();
    noBtn.style.top = '6px';
    noBtn.style.left = (rowRect.width / 2 + 10) + 'px';
  }

  // Get a random position for the noBtn inside the buttonRow
  function moveNoButton(avoidRect) {
    const rowRect = buttonRow.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // buttonRow may be smaller on mobile; compute available space
    const padding = 8; // keep a small padding inside the row
    const maxLeft = Math.max(0, rowRect.width - btnRect.width - padding);
    const maxTop = Math.max(0, rowRect.height - btnRect.height - padding);

    let tries = 0;
    let newLeft, newTop, newRect;

    do {
      newLeft = Math.round(Math.random() * maxLeft);
      newTop = Math.round(Math.random() * maxTop);
      newRect = {
        left: rowRect.left + newLeft,
        top: rowRect.top + newTop,
        right: rowRect.left + newLeft + btnRect.width,
        bottom: rowRect.top + newTop + btnRect.height,
        width: btnRect.width,
        height: btnRect.height
      };
      tries++;
      // avoid overlapping the yes button or the user's pointer area (avoidRect)
    } while (
      (
        rectsOverlap(newRect, {
          left: yesRect.left - 12,
          top: yesRect.top - 12,
          right: yesRect.right + 12,
          bottom: yesRect.bottom + 12
        })
      ) ||
      (avoidRect && rectsOverlap(newRect, avoidRect)) && tries < 30
    );

    // apply coordinates relative to the row
    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';

    // visual nudge
    noBtn.style.transition = 'transform .15s ease';
    noBtn.style.transform = 'translateY(-6px)';
    setTimeout(() => (noBtn.style.transform = ''), 160);
  }

  function rectsOverlap(a, b) {
    return !(a.left >= b.right || a.right <= b.left || a.top >= b.bottom || a.bottom <= b.top);
  }

  // When user hovers or tries to focus the No btn, move it.
  function handlePointerEnter(e) {
    const pointerX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || null;
    const pointerY = e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || null;
    let avoidRect = null;
    if (pointerX !== null && pointerY !== null) {
      avoidRect = {
        left: pointerX - 32,
        top: pointerY - 32,
        right: pointerX + 32,
        bottom: pointerY + 32
      };
    }
    moveNoButton(avoidRect);
  }

  // Prevent clicking No: treat click as another move
  function handleNoClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // small jitter and move
    moveNoButton();
  }

  // If keyboard focus tries to land on No, move it away
  function handleNoFocus(e) {
    moveNoButton();
    // blur to keep keyboard from activating it
    noBtn.blur();
  }

  // On touch devices, use touchstart to dodge
  function attachEvents() {
    // hover/cursor
    noBtn.addEventListener('mouseenter', handlePointerEnter);
    // pointerdown is important for some browsers
    noBtn.addEventListener('pointerdown', handlePointerEnter);

    // touch
    noBtn.addEventListener('touchstart', function (e) {
      handlePointerEnter(e);
    }, {passive: true});

    // keyboard
    noBtn.addEventListener('focus', handleNoFocus);
    noBtn.addEventListener('click', handleNoClick);

    // helpful: if user tries many times with cursor near center, slowly slide away
    yesBtn.addEventListener('click', function () {
      showModal();
    });

    closeModal.addEventListener('click', function () {
      hideModal();
    });

    // if window resizes, re-place the no button in a valid spot
    window.addEventListener('resize', () => {
      placeInitial();
    });

    // prevent tabbing into No for easier keyboard users — allow tabbing to Yes only
    noBtn.setAttribute('tabindex', '0'); // still focusable, but it will immediately move on focus
  }

  function showModal() {
    modal.setAttribute('aria-hidden', 'false');
    // small animation: make heart confetti with text (simple CSS hearts can be created here if desired)
    // optionally add any celebration logic
  }

  function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  // Kick off
  placeInitial();
  attachEvents();

  // Extra: if user tab-navigates repeatedly to the no button, keep it away
  // (attempt to be accessible: focus will be moved back to Yes if No keeps evading)
  let focusAttempts = 0;
  noBtn.addEventListener('focus', () => {
    focusAttempts++;
    if (focusAttempts > 2) {
      yesBtn.focus();
      focusAttempts = 0;
    }
  });
})();