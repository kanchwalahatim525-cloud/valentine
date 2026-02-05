:root{
  --bg1:#ffdde1;
  --bg2:#ee9ca7;
  --accent:#ff6b9a;
  --accent-2:#ffb3c6;
  --card-bg: rgba(255,255,255,0.9);
  --glass: rgba(255,255,255,0.75);
  --shadow: 0 8px 30px rgba(0,0,0,0.12);
  --radius: 18px;
  --heart-color: #ff4d7e;
  font-family: 'Poppins', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

*{box-sizing:border-box}
html,body,#root{height:100%}
body{
  margin:0;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(135deg,var(--bg1),var(--bg2));
  overflow:hidden;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

/* floating heart background */
.scene .hearts{
  position:fixed;
  inset:0;
  pointer-events:none;
  background-image:
    radial-gradient(circle at 10% 10%, rgba(255,255,255,0.05) 0px, transparent 2px),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04) 0px, transparent 2px);
  z-index:0;
}

.card{
  position:relative;
  z-index:2;
  width:min(92vw,720px);
  background: linear-gradient(180deg,var(--card-bg),var(--glass));
  border-radius:var(--radius);
  padding:36px;
  text-align:center;
  box-shadow:var(--shadow);
  border: 1px solid rgba(255,255,255,0.55);
}

.title{
  font-family: 'Great Vibes', cursive;
  font-size:3.2rem;
  margin:0;
  color: #7b0c2e;
  letter-spacing:0.5px;
}

.subtitle{
  margin:8px 0 22px;
  color:#7a3740;
  font-weight:500;
}

/* buttons */
.button-row{
  display:flex;
  gap:18px;
  justify-content:center;
  align-items:center;
  padding-top:10px;
  position:relative;
  min-height:68px;
}

/* base button */
.btn{
  -webkit-tap-highlight-color: transparent;
  border: none;
  cursor:pointer;
  font-weight:700;
  padding:12px 22px;
  border-radius:12px;
  font-size:1rem;
  transition:transform .14s ease, box-shadow .14s ease;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  user-select:none;
}

/* yes */
.btn.yes{
  background: linear-gradient(180deg,var(--accent),var(--accent-2));
  color:white;
  min-width:150px;
}

.btn.yes:active{ transform:scale(.98) }

/* no (positioned absolute to allow movement) */
.btn.no{
  position:absolute;
  right:calc(50% - 80px); /* initial offset; will be repositioned by JS */
  top:0;
  min-width:110px;
  background:transparent;
  color:#7b0c2e;
  border:2px solid rgba(123,12,46,0.12);
  background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.35));
  backdrop-filter: blur(6px);
}

/* Modal */
.modal{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(0deg, rgba(0,0,0,0.28), rgba(0,0,0,0.4));
  opacity:0;
  pointer-events:none;
  transition:opacity .25s ease;
  z-index:10;
}
.modal[aria-hidden="false"]{
  opacity:1;
  pointer-events:auto;
}
.modal-content{
  background:white;
  border-radius:14px;
  padding:24px 28px;
  max-width:420px;
  text-align:center;
  box-shadow:0 18px 50px rgba(0,0,0,0.25);
}
.modal-content h2{
  margin:0 0 8px;
  font-family:'Great Vibes', cursive;
  font-size:2.6rem;
  color:var(--heart-color);
}
.modal-content p{ margin:0 0 18px; color:#444; }

/* responsive */
@media (max-width:520px){
  .title{ font-size:2.4rem }
  .button-row{ min-height:86px; gap:12px }
  .btn{ padding:10px 14px }
}

/* little heart floating decoration near corners (pure CSS) */
.card::before, .card::after{
  content:"";
  position:absolute;
  width:16px;height:16px;
  background:var(--heart-color);
  transform: rotate(45deg) scale(.9);
  left:14px; top:14px;
  border-radius:3px 3px 0 0;
  box-shadow:0 6px 18px rgba(0,0,0,0.06);
  opacity:.85;
}
.card::after{
  right:14px; left:auto; top:auto; bottom:14px;
  opacity:.7;
}

/* subtle floating hearts animation in the scene */
@keyframes float-up {
  0%{ transform: translateY(40vh) rotate(0) scale(0.9); opacity:0 }
  10%{ opacity:1 }
  100%{ transform: translateY(-20vh) rotate(180deg) scale(1.1); opacity:0 }
}
.hearts::after{
  content: " ";
  position:absolute;
  left:15%;
  width:120px;height:120px;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.07), transparent 40%),
              radial-gradient(circle at 60% 60%, rgba(255,255,255,0.03), transparent 40%);
  background-blend-mode:screen;
  border-radius:50%;
  opacity:.6;
  animation: float-up 8s linear infinite;
}