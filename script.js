// playful "No" dodging logic and "Yes" confirmation
(function(){
  const noBtn = document.getElementById('noBtn');
  const yesBtn = document.getElementById('yesBtn');
  const buttonsArea = document.getElementById('buttons');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  // Keep track so we don't move off-screen on tiny viewports
  function moveNoButtonRandomly() {
    const areaRect = buttonsArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // compute max available area (subtract button size)
    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const maxY = Math.max(0, areaRect.height - btnRect.height);

    // choose a random-ish position with bias away from the cursor center
    const left = Math.random() * maxX;
    const top  = Math.random() * maxY;

    // Use transform translate to animate nicely
    noBtn.style.left = `${left}px`;
    noBtn.style.top  = `${top}px`;
    // add small random rotate for fun, but keep subtle
    noBtn.style.transform = `translate(0,0) rotate(${(Math.random()-0.5)*8}deg)`;
  }

  // On hover, focus, touch or attempt to click, dodge away
  function dodge(event) {
    event.preventDefault();
    // small delay to allow the cursor to "miss"
    moveNoButtonRandomly();
  }

  // Mobile: if user taps the No button (touchstart), dodge
  noBtn.addEventListener('mouseenter', dodge);
  noBtn.addEventListener('mouseover', dodge);
  noBtn.addEventListener('touchstart', dodge, {passive:false});
  noBtn.addEventListener('focus', dodge);
  noBtn.addEventListener('click', dodge);

  // also make sure keyboard users can't select it: on keydown (Tab/Enter/Space) move it
  noBtn.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Tab') {
      e.preventDefault();
      moveNoButtonRandomly();
      // move focus back to the yes button to keep flow
      yesBtn.focus();
    }
  });

  // When Yes is clicked show popup
  yesBtn.addEventListener('click', function(){
    popup.setAttribute('aria-hidden','false');
    // move focus into popup for a11y
    closePopup.focus();
    // small confetti-like effect (CSS-free): create floating hearts quickly
    spawnHearts(14);
  });

  closePopup.addEventListener('click', function(){
    popup.setAttribute('aria-hidden','true');
    yesBtn.focus();
  });

  // clicking outside popup closes it
  popup.addEventListener('click', function(e){
    if (e.target === popup) {
      popup.setAttribute('aria-hidden','true');
      yesBtn.focus();
    }
  });

  // window resize: ensure the No button stays inside area
  window.addEventListener('resize', function(){
    // if it's outside, reposition to center-left area
    const areaRect = buttonsArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    if (btnRect.right - areaRect.left > areaRect.width || btnRect.bottom - areaRect.top > areaRect.height) {
      // place it at a reasonable default spot
      noBtn.style.left = `${Math.min(20, areaRect.width*0.2)}px`;
      noBtn.style.top = `${Math.min(20 + areaRect.height*0.5, areaRect.height*0.7)}px`;
      noBtn.style.transform = 'translate(0,0)';
    }
  });

  // cute floating hearts generator (temporary DOM elements that fade)
  function spawnHearts(count) {
    for (let i=0;i<count;i++){
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      document.body.appendChild(heart);

      // random starting position near the card center
      const baseX = window.innerWidth/2 + (Math.random()-0.5)*160;
      const baseY = window.innerHeight/2 + (Math.random()-0.5)*60;
      heart.style.left = `${baseX}px`;
      heart.style.top  = `${baseY}px`;

      // animate:
      heart.animate([
        { transform: `translateY(0) scale(0.6)`, opacity:1 },
        { transform: `translateY(-140px) translateX(${(Math.random()-0.5)*80}px) scale(1)`, opacity:0 }
      ], {
        duration: 1200 + Math.random()*800,
        easing: 'cubic-bezier(.2,.8,.2,1)',
      });

      // remove after animation
      setTimeout(()=> heart.remove(), 2200 + Math.random()*300);
    }
  }

  // small CSS for hearts injected once
  (function injectHeartStyles(){
    const s = document.createElement('style');
    s.textContent = `
      .floating-heart{
        position:fixed;
        width:18px;height:18px;
        pointer-events:none;
        background: radial-gradient(circle at 35% 30%, #fff8, #fff0 40%), linear-gradient(180deg,#ff6aa6,#ff3f88);
        transform: rotate(45deg);
        border-radius:3px;
        box-shadow: 0 6px 18px rgba(195,43,106,0.12);
      }
      .floating-heart::before,
      .floating-heart::after{
        content:"";
        position:absolute;
        width:18px;height:18px;
        border-radius:50%;
        background:linear-gradient(180deg,#ff6aa6,#ff3f88);
        top:-9px; left:0;
      }
      .floating-heart::after{ left:9px; top:0; }
    `;
    document.head.appendChild(s);
  })();

  // initial safe placement once DOM is ready
  function init() {
    // if inline styles not set, ensure a starting spot relative to container
    const areaRect = buttonsArea.getBoundingClientRect();
    noBtn.style.left = `${Math.min(20, areaRect.width*0.2)}px`;
    noBtn.style.top  = `${Math.min(areaRect.height*0.7, 120)}px`;
    noBtn.style.transform = 'translate(0,0)';
  }

  // wait a bit for layout
  setTimeout(init, 60);
})();
