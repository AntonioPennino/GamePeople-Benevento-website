// sections.jsx — content sections for the GamePeople landing.
// Exports all section components + shared data/icons to window for app.jsx.
const { useState } = React;

/* ----------------------------- shared data ----------------------------- */
const GP_ADDRESS = "C.C. I Sanniti — Via dei Longobardi 24, Benevento 82100";
const GP_MAPS = "https://maps.app.goo.gl/tSnkSwuz2pxaMR4X9";
const GP_IG = "https://www.instagram.com/gamepeople_benevento/";
const GP_FB = "https://www.facebook.com/gamepeoplebn";
const GP_PHONE = "082450302";
const GP_EMAIL = "gamepeoplebenevento@gmail.com";

const GAMES = [
  { name: "Videogiochi & Console", tag: "Nuovo e Usato", slot: "game-videogames", img: "../assets/cat_videogames_1780049095090.png" },
  { name: "Funko & Art Toys", tag: "Pop Culture", slot: "game-funko", img: "../assets/cat_funko_1780049108417.png" },
  { name: "Carte Collezionabili", tag: "TCG", slot: "game-tcg", img: "../assets/cat_tcg_1780049121595.png" },
  { name: "Manga & Fumetti", tag: "Editoria Visiva", slot: "game-manga", img: "../assets/cat_manga_1780049134786.png" },
  { name: "Giochi da Tavolo", tag: "Boardgames", slot: "game-board", img: "../assets/cat_boardgames_1780049158870.png" },
  { name: "Abbigliamento", tag: "Merchandise", slot: "game-merch", img: "../assets/cat_merch_1780049174728.png" },
];

// Mini-catalogo di esempio — sostituisci con i tuoi prodotti reali.
const PRODUCTS = [
  { game: "Videogiochi", name: "Ritiro Usato — Portaci i tuoi giochi", price: "Valutazione", cat: "Usato", tag: "Vantaggio", slot: "p-usato" },
  { game: "Collezionismo", name: "Statue Tsume & Box Acrilici", price: "da 29,90", cat: "Kidult", slot: "p-tsume" },
  { game: "Carte", name: "Marvel Mission Arena & TCG", price: "Variabile", cat: "Carte", tag: "Novità", slot: "p-cards" },
  { game: "Manga", name: "Novità settimanali e serie complete", price: "da 5,20", cat: "Manga", slot: "p-manga" },
  { game: "Console", name: "PlayStation 5, Switch e Xbox", price: "da 299,00", cat: "Console", slot: "p-console" },
  { game: "Servizi Digitali", name: "Ricariche PSN, eShop & SaveTheGame", price: "Variabile", cat: "Servizi", tag: "Pronto Uso", slot: "p-digital" },
  { game: "Merchandise", name: "Minifigure Bullyland & Monogram", price: "da 9,90", cat: "Kidult", slot: "p-merch" },
  { game: "Home Video", name: "Film e Serie TV (DVD/Blu-Ray)", price: "da 9,90", cat: "Usato", slot: "p-homevideo" },
];
const CATS = ["Tutti", "Usato", "Kidult", "Carte", "Manga", "Console", "Servizi"];

// Eventi di esempio — aggiorna con il tuo calendario reale.
const EVENTS = [
  { day: "07", mon: "Giu", name: "Torneo Pokémon — Standard", game: "Pokémon", format: "Swiss + Top 8", time: "15:00" },
  { day: "14", mon: "Giu", name: "Marvel Mission Arena — Release", game: "Marvel", format: "Release Party", time: "16:00" },
  { day: "21", mon: "Giu", name: "Yu-Gi-Oh! — Sealed Night", game: "Yu-Gi-Oh!", format: "Sealed", time: "15:30" },
  { day: "28", mon: "Giu", name: "Magic — Commander Party", game: "Magic", format: "Commander", time: "17:00" },
];

/* ----------------------------- icons ----------------------------- */
const IgIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.46 8.5 3.45 8.85 3.45 12s0 3.5.07 4.74c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 0 0-.68-1.06 2.85 2.85 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8A3.14 3.14 0 1 0 12 15.14 3.14 3.14 0 0 0 12 8.86zm6.27-2.94a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" /></svg>
);
const FbIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
);
window.IgIcon = IgIcon; window.FbIcon = FbIcon;
window.GP_ADDRESS = GP_ADDRESS; window.GP_MAPS = GP_MAPS; window.GP_IG = GP_IG; window.GP_FB = GP_FB;
window.GP_PHONE = GP_PHONE; window.GP_EMAIL = GP_EMAIL;

/* ----------------------------- Games ----------------------------- */
function Games() {
  return (
    <section id="giochi" className="pad">
      <div className="wrap">
        <div className="eyebrow">Il nostro universo</div>
        <h2 className="sec-title">Esplora i <span className="glow">Reparti</span></h2>
        <p className="lead" style={{ marginTop: 16 }}>
          Dal mercato dell'usato garantito alle esclusive Db-Line, fino all'editoria visiva e l'abbigliamento tematico.
        </p>
        <div className="games">
          {GAMES.map((g) => (
            <a className="game" key={g.name} href="#catalogo">
              <image-slot id={g.slot} src={g.img} placeholder={"Foto " + g.name}></image-slot>
              <div className="game__scrim"></div>
              <div className="game__name"><small>{g.tag}</small>{g.name}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Catalog ----------------------------- */
function Catalog() {
  const [cat, setCat] = useState("Tutti");
  const list = cat === "Tutti" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === cat);
  return (
    <section id="catalogo" className="pad" style={{ background: "linear-gradient(180deg,#0C1014 0%,#0e131a 100%)" }}>
      <div className="wrap">
        <div className="eyebrow">In evidenza</div>
        <h2 className="sec-title">Mini-catalogo</h2>
        <div className="filters">
          {CATS.map((c) => (
            <button key={c} className={"chip" + (c === cat ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="catalog">
          {list.map((p) => (
            <article className="product" key={p.name}>
              <div className="product__img">
                {p.tag && <span className="product__tag">{p.tag}</span>}
                <image-slot id={p.slot} placeholder={"Foto prodotto"}></image-slot>
              </div>
              <div className="product__body">
                <div className="product__game">{p.game}</div>
                <div className="product__name">{p.name}</div>
                <div className="product__row">
                  <div className="product__price">€ {p.price}</div>
                  <a className="product__ask" href={GP_IG} target="_blank" rel="noopener">Disponibilità →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="catalog__note">
          * Catalogo di esempio — prezzi e disponibilità indicativi. Nessun acquisto online: prenoti scrivendoci sui social o vieni in negozio.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- Events ----------------------------- */
function Events() {
  return (
    <section id="eventi" className="pad">
      <div className="wrap">
        <div className="eyebrow">Calendario</div>
        <h2 className="sec-title">Eventi & <span className="glow">tornei</span></h2>
        <p className="lead" style={{ marginTop: 16 }}>
          Ogni settimana tavoli aperti, tornei ufficiali e serate a tema. Iscrizioni in negozio o in DM — i posti sono limitati.
        </p>
        <div className="events">
          {EVENTS.map((e) => (
            <div className="event" key={e.name}>
              <div className="event__date">
                <div className="event__day">{e.day}</div>
                <div className="event__mon">{e.mon}</div>
              </div>
              <div>
                <div className="event__name">{e.name}</div>
                <div className="event__meta"><span><b>{e.game}</b></span><span>{e.format}</span></div>
              </div>
              <div className="event__time">alle {e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- About ----------------------------- */
function About() {
  return (
    <section id="chisiamo" className="pad" style={{ background: "linear-gradient(180deg,#0e131a 0%,#0C1014 100%)" }}>
      <div className="wrap about">
        <div>
          <div className="eyebrow">Chi siamo</div>
          <h2 className="sec-title">Più di un <span className="glow">negozio</span></h2>
          <p className="lead" style={{ marginTop: 18 }}>
            GamePeople Benevento è il tuo ecosistema aggregativo. Offriamo il meglio del mercato videoludico, ritiriamo il tuo usato e ti accompagniamo nel vasto mondo Kidult e della Pop Culture. La nostra Area Tornei è il punto d'incontro ideale per i giocatori.
          </p>
          <div className="about__stats">
            <div><div className="stat__n">360°</div><div className="stat__l">intrattenimento</div></div>
            <div><div className="stat__n">7/7</div><div className="stat__l">giorni aperti</div></div>
            <div><div className="stat__n">100%</div><div className="stat__l">passione</div></div>
          </div>
        </div>
        <div className="about__media">
          <image-slot id="about-shop" src="../assets/about_shop_1780049082250.png" placeholder="Foto del negozio / dei clienti"></image-slot>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Visit (hours + map) ----------------------------- */
function Visit() {
  const days = [
    ["lunedì", "10–21"], ["martedì", "09–21"], ["mercoledì", "09–21"],
    ["giovedì", "09–21"], ["venerdì", "09–21"], ["sabato", "09–21"], ["domenica", "10–21"],
  ];
  const jsDay = new Date().getDay(); // 0=Sun..6=Sat
  const todayIdx = jsDay === 0 ? 6 : jsDay - 1;
  return (
    <section id="trovaci" className="pad">
      <div className="wrap">
        <div className="eyebrow">Vieni a trovarci</div>
        <h2 className="sec-title">Dove siamo</h2>
        <div className="visit" style={{ marginTop: 36 }}>
          <div className="panel">
            <div className="visit__addr">
              <img src="../assets/icon-pin-cyan.svg" alt="" width="24" height="24" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>C.C. I Sanniti (Piano Terra)</div>
                <div style={{ color: "var(--fg-2)", marginTop: 4, fontSize: 16 }}>Via dei Longobardi 24<br />Benevento, 82100</div>
              </div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`tel:${GP_PHONE}`} className="btn btn--ghost" style={{ flex: 1, justifyContent: 'center' }}>Chiama Ora</a>
              <a href={`mailto:${GP_EMAIL}`} className="btn btn--ghost" style={{ flex: 1, justifyContent: 'center' }}>Scrivici</a>
            </div>
            <ul className="hours">
              {days.map(([d, h], i) => (
                <li key={d} className={i === todayIdx ? "today" : ""}>
                  <span className="d">{d}{i === todayIdx ? " · oggi" : ""}</span>
                  <span className="h">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="visit__map">
            <iframe 
              src="https://maps.google.com/maps?q=Centro+Commerciale+I+Sanniti,+Benevento&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Mappa GamePeople Benevento">
            </iframe>
            <a className="btn btn--primary visit__mapcta" href={GP_MAPS} target="_blank" rel="noopener">Indicazioni</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Newsletter ----------------------------- */
function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contatti" className="pad" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="news">
          <h3>Resta nel gioco</h3>
          <p>Nuovi arrivi, drop e tornei: iscriviti e non perderti nessuna uscita.</p>
          {sent ? (
            <div className="news__ok">Grazie! Ci sentiamo presto.</div>
          ) : (
            <form className="news__form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input type="email" required placeholder="La tua email" aria-label="La tua email" />
              <button className="btn" type="submit" style={{ background: "#fff", color: "#B31E80" }}>Iscriviti</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Games, Catalog, Events, About, Visit, Newsletter });
