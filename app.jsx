// app.jsx — shell: Nav, Hero, Footer + mount. Sections come from sections.jsx (on window).
const { useState: useStateApp } = React;

function Nav() {
  const [open, setOpen] = useStateApp(false);
  const links = [
    ["Giochi", "#giochi"], ["Catalogo", "#catalogo"], ["Eventi", "#eventi"],
    ["Chi siamo", "#chisiamo"], ["Trovaci", "#trovaci"],
  ];
  return (
    <div className="nav">
      <div style={{ background: "var(--gp-magenta)", color: "#fff", fontSize: "12px", fontWeight: "700", textAlign: "center", padding: "6px 28px", letterSpacing: ".04em", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        Aperti tutti i giorni! Mar-Sab: 09:00-21:00 | Dom, Lun e Festivi: 10:00-21:00
      </div>
      <div className="wrap nav__inner">
        <a href="#top" aria-label="GamePeople Benevento">
          <img className="nav__logo" src="../assets/logo-pill.svg" alt="GamePeople Benevento" />
        </a>
        <nav className="nav__links">
          {links.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
        </nav>
        <div className="nav__social">
          <a href={window.GP_IG} target="_blank" rel="noopener" aria-label="Instagram"><window.IgIcon /></a>
          <a href={window.GP_FB} target="_blank" rel="noopener" aria-label="Facebook"><window.FbIcon /></a>
        </div>
        <a className="btn btn--magenta nav__cta" href="https://ig.me/m/gamepeople_benevento" target="_blank" rel="noopener">Contattaci</a>
        <button className="nav__burger" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={"mobilemenu" + (open ? " open" : "")} onClick={() => setOpen(false)}>
        {links.map(([t, h]) => <a key={h} href={h}>{t}</a>)}
        <a href="https://ig.me/m/gamepeople_benevento" target="_blank" rel="noopener">Contattaci</a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__bg">
        <image-slot id="hero-bg" src="../img/other/IMG_3089-01.jpeg" placeholder="Foto hero: interno negozio / card in mano"></image-slot>
      </div>
      <div className="hero__scrim"></div>
      <div className="wrap hero__inner">
        <div className="eyebrow">Il tuo punto di riferimento a Benevento</div>
        <h1>Gioca.<br />Colleziona.<em>Vivi.</em></h1>
        <p className="hero__sub">
          L'epicentro dell'intrattenimento al C.C. I Sanniti. Videogiochi nuovi e usati, TCG, Snack dal Mondo, Funko, Art Toys e Area Tornei. Molto più di un semplice negozio.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#eventi">Scopri gli eventi</a>
          <a className="btn btn--ghost" href="#trovaci">Vieni in negozio</a>
        </div>
      </div>
      <a className="hero__scroll" href="#giochi" aria-label="Scorri">
        <span>Scopri</span>
        <img src="../assets/icon-chevron-down.svg" alt="" />
      </a>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <img className="foot__logo" src="../assets/logo-pill.svg" alt="GamePeople Benevento" />
        <nav className="foot__links">
          <a href="#giochi">Giochi</a>
          <a href="#catalogo">Catalogo</a>
          <a href="#eventi">Eventi</a>
          <a href="#trovaci">Trovaci</a>
        </nav>
        <div className="foot__social">
          <a href={window.GP_IG} target="_blank" rel="noopener" aria-label="Instagram"><window.IgIcon /></a>
          <a href={window.GP_FB} target="_blank" rel="noopener" aria-label="Facebook"><window.FbIcon /></a>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 32, marginTop: -10 }}>
        <div className="foot__legal">
          © {new Date().getFullYear()} GamePeople Benevento · C.C. I Sanniti, Via dei Longobardi 24, Benevento 82100 ·
          Vetrina informativa · Nessuna vendita online. · Sito creato da <a href="https://leukoslabs.framer.website/" target="_blank" rel="noopener" style={{ color: "#fff", textDecoration: "underline" }}>Leukos</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <window.Games />
      <window.Catalog />
      <window.Events />
      <window.About />
      <window.Visit />
      {/* <window.Newsletter /> */}
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
