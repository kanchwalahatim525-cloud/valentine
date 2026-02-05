:root{
  --bg1:#ffe6ee;
  --bg2:#ffd7e6;
  --accent:#ff4d7e;
  --accent-2:#ff839f;
  --card-bg: rgba(255,255,255,0.92);
  --glass: rgba(255,255,255,0.85);
  --shadow: 0 12px 40px rgba(16, 12, 30, 0.12);
  --radius: 20px;
  --heart-color: #ff3b6b;
  font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: radial-gradient(1200px 600px at 10% 10%, rgba(255,255,255,0.25), transparent),
              linear-gradient(135deg,var(--bg1),var(--bg2));
  overflow:hidden;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  padding:32px;
}

/* floating heart background */
.scene .hearts{
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;
  background-image:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04) 0px, transparent 2px),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.03) 0px, transparent 2px);
}

/* center card */
.card{
  position:relative;
  z-index:2;
  width:min(92vw,760px);
  background: linear-gradient(180deg,var(--card-bg),var(--glass));
  border-radius:var(--radius);
  padding:40px;
  text-align:center;
  box-shadow:var(--shadow);
  border: 1px solid rgba(255,255,255,0.6);
  transform: translateY(0px);
  transition: transform .28s cubic-bezier(.2,.9,.2,1);
}

/* Floating hearts decor */
.card::before, .card::after{
  content:"";
  position:absolute;
  width:22px;height:22px;
  background:var(--heart-color);
  transform: rotate(45deg);
  left:16px; top:16px;
  border-radius:4px 4px 0 0;
  opacity:.85;
  filter: drop-shadow(0 6px 20px rgba(123,12,46,0.06));
}
.card::after{
  right:16px; left:auto; top:auto; bottom:16px;
  opacity:.7;
}

/* heading */
.title{
  font-family: 'Great Vibes', cursive;
  font-size:3.4rem;
  margin:0;
  color: #7b0c2e;
  letter-spacing:0.6px;
  text-shadow: 0 6px 18px rgba(123,12,46,0.06);
}
.subtitle{
  margin:10px 0 26px;
  color:#7a3740;
  font-weight:500;
  font-size:1.05rem;
}

/* buttons row */
.button-row{
  display:flex;
  gap:18px;
  justify-content:center;
  align-items:center;
  padding-top:10px;
  position:relative;
  min-height:78px;
}

/* base button */
.btn{
  -webkit-tap-highlight-color: transparent;
  border: none;
  cursor:pointer;
  font-weight:700;
  padding:14px 26px;
  border-radius:14px;
  font-size:1rem;
  transition:transform .16s ease, box-shadow .16s ease, opacity .12s ease;
  box-shadow: 0 10px 30px rgba(12, 10, 20, 0.08);
  user-select:none;
}

/* yes */
.btn.yes{
  background: linear-gradient(180deg,var(--accent),var(--accent-2));
  color:white;
  min-width:180px;
  font-size:1.05rem;
  letter-spacing:0.4px;
}
.btn.yes:hover{ transform: translateY(-4px) scale(1.01) }

/* no (absolute so we can move it) */
.btn.no{
  position:absolute;
  min-width:120px;
  background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6));
  color:#7b0c2e;
  border:2px solid rgba(123,12,46,0.08);
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 22px rgba(12,10,20,0.06);
  transform-origin:center;
}

/* modal */
.modal{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(0deg, rgba(0,0,0,0.26), rgba(0,0,0,0.36));
  opacity:0;
  pointer-events:none;
  transition:opacity .22s ease;
  z-index:10;
}
.modal[aria-hidden="false"]{
  opacity:1;
  pointer-events:auto;
}
.modal-content{
  background:white;
  border-radius:16px;
  padding:26px 30px;
  max-width:480px;
  text-align:center;
  box-shadow:0 20px 70px rgba(0,0,0,0.25);
}
.modal-content h2{
  margin:0 0 8px;
  font-family:'Great Vibes', cursive;
  font-size:2.4rem;
  color:var(--heart-color);
}
.modal-content p{ margin:0 0 18px; color:#444; font-size:1rem; }
.modal-actions{ display:flex; gap:12px; justify-content:center; }

/* small devices */
@media (max-width:520px){
  .title{ font-size:2.2rem }
  .button-row{ min-height:96px; gap:12px }
  .btn{ padding:12px 16px; font-size:.98rem }
  .btn.yes{ min-width:150px }
}

/* subtle animated hearts in the background */
@keyframes float-up-slow {
  0%{ transform: translateY(60vh) rotate(0) scale(.9); opacity:0 }
  10%{ opacity:1 }
  100%{ transform: translateY(-20vh) rotate(180deg) scale(1.1); opacity:0 }
}
.hearts::after{
  content: " ";
  position:absolute;
  left:12%;
  width:120px;height:120px;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 40%),
              radial-gradient(circle at 60% 60%, rgba(255,255,255,0.03), transparent 40%);
  border-radius:50%;
  opacity:.6;
  animation: float-up-slow 9s linear infinite;
}
