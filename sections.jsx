// sections.jsx — content sections for the GamePeople landing.
// Exports all section components + shared data/icons to window for app.jsx.
const { useState, useEffect } = React;

/* ----------------------------- shared data ----------------------------- */
const GP_SHEET_API = "https://script.google.com/macros/s/AKfycbyWLyL-daXga9jRHyZvJcGKBZ9vMIIkli5oinj32EAGuBoaKdItsBNffGkqFszcyVL3cA/exec"; // Inserisci qui l'URL dell'applicazione web di Google Apps Script per attivare il catalogo dinamico
const GP_ADDRESS = "C.C. I Sanniti · Via dei Longobardi 24, Benevento 82100";
const GP_MAPS = "https://maps.app.goo.gl/tSnkSwuz2pxaMR4X9";
const GP_IG = "https://www.instagram.com/gamepeople_benevento/";
const GP_FB = "https://www.facebook.com/gamepeoplebn";
const GP_PHONE = "+393935236895";
const GP_EMAIL = "gamepeoplebenevento@gmail.com";

const GAMES = [
  { name: "Videogiochi & Console", tag: "Nuovo e Usato", slot: "game-videogames", img: "../img/other/IMG_3093-01.jpeg" },
  { name: "Funko & Art Toys", tag: "Pop Culture", slot: "game-funko", img: "../img/other/IMG_3104-01.jpeg" },
  { name: "Carte Collezionabili", tag: "TCG", slot: "game-tcg", img: "../img/other/IMG_3097-01.jpeg" },
  { name: "Snack & Drink", tag: "Cibi dal mondo", slot: "game-food", img: "../img/other/IMG_3106-01.jpeg" },
  { name: "Giochi da Tavolo", tag: "Boardgames", slot: "game-board", img: "../img/other/IMG_3108-01.jpeg" },
  { name: "Abbigliamento", tag: "Merchandise", slot: "game-merch", img: "../img/other/IMG_3090-01.jpeg" },
];

// Mini-catalogo di esempio — sostituisci con i tuoi prodotti reali.
const PRODUCTS = [
  { game: "Videogiochi", name: "Ritiro Usato: Portaci i tuoi giochi", price: "Valutazione", cat: "Usato", tag: "Vantaggio", slot: "p-usato", img: "../img/other/IMG_3094-01.jpeg" },
  { game: "Collezionismo", name: "Statue Tsume & Box Acrilici", price: "da 29,90", cat: "Kidult", slot: "p-tsume", img: "../img/other/IMG_3111-01.jpeg" },
  { game: "Carte", name: "Marvel Mission Arena & TCG", price: "Variabile", cat: "Carte", tag: "Novità", slot: "p-cards", img: "../img/other/IMG_3100-01.jpeg" },
  { game: "Snack", name: "Snack & Drink dal mondo (Monster, Reese's)", price: "da 1,50", cat: "Food", slot: "p-food", img: "../img/other/IMG_3107-01.jpeg" },
  { game: "Console", name: "PlayStation 5, Switch e Xbox", price: "da 299,00", cat: "Console", slot: "p-console", img: "../img/other/IMG_3116-01.jpeg" },
  { game: "Servizi Digitali", name: "Ricariche PSN, eShop & SaveTheGame", price: "Variabile", cat: "Servizi", tag: "Pronto Uso", slot: "p-digital", img: "../img/other/IMG_3099-01.jpeg" },
  { game: "Merchandise", name: "Minifigure Bullyland & Mugs", price: "da 9,90", cat: "Kidult", slot: "p-merch", img: "../img/other/IMG_3109-01.jpeg" },
  { game: "Home Video", name: "Film e Serie TV (DVD/Blu-Ray)", price: "da 9,90", cat: "Usato", slot: "p-homevideo", img: "../img/other/IMG_3092-01.jpeg" },
];
const CATS = ["Tutti", "Usato", "Kidult", "Carte", "Food", "Console", "Servizi"];

// Eventi di esempio — aggiorna con il tuo calendario reale.
const EVENTS = [
  { day: "Sab", mon: "Sett", name: "Torneo One Piece Card Game", game: "One Piece TCG", format: "Store Tournament", time: "16:00", whatsapp: "https://chat.whatsapp.com/JhgjbGMAe6xCqAgLaZLNO3?mode=gi_c" },
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

/* ----------------------------- Reservation Modal ----------------------------- */
function ReservationModal({ isOpen, onClose, product, onSubmit }) {
  if (!isOpen || !product) return null;
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError("Il nome è obbligatorio");
      return;
    }
    setSubmitting(true);
    setError(null);
    onSubmit({ nome, telefono })
      .catch((err) => {
        console.error("Errore salvataggio prenotazione:", err);
        // Procediamo comunque con WhatsApp in caso di errore di salvataggio
      })
      .finally(() => {
        setSubmitting(false);
        // WhatsApp redirection
        const cleanPhone = telefono.trim() ? ` (Tel: ${telefono.trim()})` : "";
        const text = `Ciao GamePeople Benevento! Sono ${nome.trim()}${cleanPhone}. Vorrei prenotare il prodotto: ${product.name} (Prezzo: ${product.price}).`;
        const whatsappUrl = `https://wa.me/393935236895?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        onClose();
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Chiudi modal">&times;</button>
        <div className="eyebrow" style={{ color: "var(--gp-magenta-bright)", marginBottom: 8 }}>Prenotazione Prodotto</div>
        <h3 className="modal-title" style={{ margin: "0 0 8px 0", color: "#fff", fontSize: 24, textTransform: "uppercase", fontFamily: "var(--font-display)" }}>{product.name}</h3>
        <p className="modal-price" style={{ margin: "0 0 20px 0", color: "var(--fg-2)" }}>
          Prezzo: <strong style={{ color: "var(--gp-blue-bright)" }}>
            {product.price.toString().toLowerCase().includes("valutazione") || product.price.toString().toLowerCase().includes("variabile") ? (
              product.price
            ) : (
              (product.price.toString().startsWith("da") ? "" : "€ ") + product.price
            )}
          </strong>
        </p>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group" style={{ marginBottom: 16 }}>
            <label htmlFor="modal-name" style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--fg-2)" }}>Nome e Cognome *</label>
            <input 
              id="modal-name"
              type="text" 
              required 
              placeholder="Inserisci il tuo nome e cognome" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={submitting}
              style={{ width: "100%", padding: "12px 18px", borderRadius: "30px", border: "1px solid var(--border-strong)", background: "rgba(255,255,255,0.06)", color: "#fff", outline: "none", fontSize: 15 }}
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label htmlFor="modal-phone" style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--fg-2)" }}>Numero di Telefono (Consigliato per WhatsApp)</label>
            <input 
              id="modal-phone"
              type="tel" 
              placeholder="Inserisci il tuo numero" 
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              disabled={submitting}
              style={{ width: "100%", padding: "12px 18px", borderRadius: "30px", border: "1px solid var(--border-strong)", background: "rgba(255,255,255,0.06)", color: "#fff", outline: "none", fontSize: 15 }}
            />
          </div>
          
          {error && <div className="modal-error" style={{ color: "#ff4a4a", fontSize: 14, marginBottom: 12 }}>{error}</div>}
          
          <div className="modal-actions" style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={submitting} style={{ padding: "10px 20px", fontSize: 13 }}>
              Annulla
            </button>
            <button type="submit" className="btn btn--magenta" disabled={submitting} style={{ padding: "10px 20px", fontSize: 13 }}>
              {submitting ? "Salvataggio..." : "Prenota su WhatsApp"}
            </button>
          </div>
        </form>
        <p className="modal-note" style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 18, lineHeight: 1.4 }}>
          * La tua prenotazione verrà inserita nel nostro database per tenerti da parte il prodotto, e verrai indirizzato a WhatsApp per confermare i dettagli.
        </p>
      </div>
    </div>
  );
}

/* ----------------------------- Catalog ----------------------------- */
function Catalog() {
  const [cat, setCat] = useState("Tutti");
  const [products, setProducts] = useState(PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!GP_SHEET_API) return;
    setLoading(true);
    fetch(GP_SHEET_API)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero dei dati");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item) => ({
            id: item.id ? String(item.id) : String(Math.random()),
            game: item.categoria || "Prodotto",
            name: item.prodotto || "",
            price: item.prezzo || "",
            cat: item.categoria || "Tutti",
            tag: item.tag || "",
            slot: item.id ? "p-" + item.id : "",
            img: item.fotourl || ""
          }));
          setProducts(formatted);
        }
      })
      .catch((err) => {
        console.error("Errore caricamento prodotti da Google Sheets, uso fallback:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleReservationSubmit = (formData) => {
    if (!GP_SHEET_API) {
      return Promise.resolve();
    }
    return fetch(GP_SHEET_API, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prodotto: selectedProduct.name,
        nome: formData.nome,
        telefono: formData.telefono
      })
    });
  };

  const list = cat === "Tutti" ? products : products.filter((p) => p.cat === cat);
  const uniqueCats = ["Tutti", ...new Set(products.map((p) => p.cat).filter(Boolean))];

  return (
    <section id="catalogo" className="pad" style={{ background: "linear-gradient(180deg,#0C1014 0%,#0e131a 100%)" }}>
      <div className="wrap">
        <div className="eyebrow">In evidenza</div>
        <h2 className="sec-title">Mini-catalogo</h2>
        {loading ? (
          <div style={{ color: "var(--fg-2)", padding: "40px 0", textAlign: "center", fontSize: "16px" }}>
            Caricamento prodotti in corso...
          </div>
        ) : (
          <React.Fragment>
            <div className="filters">
              {uniqueCats.map((c) => (
                <button key={c} className={"chip" + (c === cat ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <div className="catalog">
              {list.map((p) => (
                <article className="product" key={p.name + p.id}>
                  <div className="product__img">
                    {p.tag && <span className="product__tag">{p.tag}</span>}
                    <image-slot id={p.slot} src={p.img} placeholder={"Foto prodotto"}></image-slot>
                  </div>
                  <div className="product__body">
                    <div className="product__game">{p.game}</div>
                    <div className="product__name">{p.name}</div>
                    <div className="product__row">
                      <div className="product__price">
                        {p.price.toString().toLowerCase().includes("valutazione") || p.price.toString().toLowerCase().includes("variabile") ? (
                          p.price
                        ) : (
                          (p.price.toString().startsWith("da") ? "" : "€ ") + p.price
                        )}
                      </div>
                      <button 
                        className="product__ask" 
                        style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProduct(p);
                        }}
                      >
                        Prenota
                        <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, display: 'inline-block', verticalAlign: 'middle', marginLeft: 4, transition: 'transform 0.15s ease' }}>
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </React.Fragment>
        )}
        <p className="catalog__note">
          * Catalogo di esempio: prezzi e disponibilità indicativi. Nessun acquisto online: prenoti scrivendoci sui social o vieni in negozio.
        </p>
      </div>
      
      <ReservationModal 
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onSubmit={handleReservationSubmit}
      />
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
          Ogni settimana tavoli aperti, tornei ufficiali e serate a tema. Iscrizioni in negozio o in DM: i posti sono limitati.
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
                {e.whatsapp && (
                  <a className="btn btn--whatsapp" href={e.whatsapp} target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14, marginRight: 6 }}><path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.479 1.332 5.006L2 22l5.148-1.349c1.472.802 3.129 1.226 4.854 1.226 5.507 0 9.989-4.482 9.989-9.988C22 6.482 17.518 2 12.012 2zm4.721 13.493c-.26.731-1.348 1.325-1.854 1.41-.482.082-.973.309-3.078-.564-2.529-1.05-4.148-3.626-4.274-3.797-.127-.171-1.03-1.371-1.03-2.617 0-1.246.654-1.859.886-2.112.233-.254.508-.318.677-.318.169 0 .338.001.486.009.157.008.369-.06.578.448.212.516.72 1.761.783 1.892.063.13.106.282.021.451-.085.169-.127.272-.254.423-.127.151-.267.338-.381.464-.127.141-.26.294-.112.548.148.254.66.1.758.1c1.365.986 2.274 1.349 2.507 1.478.233.129.369.109.508-.051.139-.16 1.057-1.233 1.141-1.361.085-.129.169-.109.296-.063.127.047.807.382 1.484.72.677.338 1.129.507 1.214.65.085.142.085.823-.175 1.554z" /></svg>
                    Gruppo WhatsApp
                  </a>
                )}
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
          <image-slot id="about-shop" src="../img/other/IMG_3091-01.jpeg" placeholder="Foto del negozio / dei clienti"></image-slot>
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
