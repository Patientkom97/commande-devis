/* ==================== RÉGLAGES (modifiables) ==================== */
const PRESTATAIRE = {
  nom: "Nkokwe Digital Solutions",
  description: "Développeur & Concepteur Web",
  ville: "Kinshasa, RD Congo",
  email: "contact@nkokwedigsol.net",
  site: "https://nkokwedigsol.net",
  tel: "+243 854 656 169",
};
const LOGO_SRC = "logo.png";
const DEVISE = "USD";
const PREFIXE = "DV";
const CLE_DERNIER_NUMERO = "devis_dernier_numero";
const CLE_BROUILLON = "devis_brouillon";   // dernier devis en cours, restauré à l'ouverture
const CLE_CLIENTS = "devis_clients";       // carnet des clients mémorisés
const CHAMPS_MEMOIRE = ["client-nom", "client-contact", "client-tel", "client-email", "client-ville",
  "projet", "objet", "remarques", "delai", "modes", "validite", "acompte"];
const PRESTATIONS_PAR_DEFAUT = [
  { titre: "Pack Web Essentiel RDC", detail: "Conception du design moderne & responsive (adapté aux smartphones, tablettes, ordinateurs, TV, …)\nIntégration des pages de contenus (Accueil, Présentation, Actualités/Événements, Contact)\nFormulaire de contact et intégration WhatsApp\nOptimisation de la bande passante (chargement rapide économique en données)", qte: 1, prix: 250 },
  { titre: "Configuration Infrastructure & Déploiement", detail: "Réservation et configuration du nom de domaine (.com ou .org) pour 1 an\nHébergement web optimisé avec certificat de sécurité SSL (HTTPS)\nLiens de partage vers les réseaux sociaux (WhatsApp, Facebook, Telegram)", qte: 1, prix: 100 },
  { titre: "Extension de Garantie & Maintenance (Inclus 1 an)", detail: "Mises à jour de sécurité mensuelles\nSauvegardes automatiques du site et de la base de données\nSupport technique prioritaire et corrections de bugs", qte: 1, prix: 100 },
];
/* Catalogue des services (page « Nos tarifs ») : modifiable ici.
   unite : mention affichée dans le titre (ex. "USD/mois") ; apres : "à partir de" */
const CATALOGUE_SERVICES = [
  {
    categorie: "Conception de sites web", code: "WEB", items: [
      { titre: "Site vitrine", prix: 250, detail: "Design responsive mobile\n1-5 pages personnalisées\nFormulaire de contact" },
      { titre: "Site d'entreprise", prix: 450, detail: "Jusqu'à 10 pages\nBlog intégré\nOptimisation SEO" },
      { titre: "Site ONG / association", prix: 350, detail: "Pages de projet et don\nGalerie multimédia\nBlog d'actualités" },
      { titre: "Blog / site d'actualités", prix: 300, detail: "Système de publication\nCatégories et tags\nZone commentaires" },
      { titre: "Boutique en ligne", prix: 700, detail: "Catalogue produits\nPanier et paiement\nGestion des commandes" },
      { titre: "Portail institutionnel", prix: 800, detail: "Espace membre sécurisé\nBase documentaire\nModules personnalisés" },
      { titre: "Plateforme web sur mesure (Premium)", prix: 1200, detail: "Architecture sur mesure\nAPI et intégrations\nScalabilité et sécurité" },
    ]
  },
  {
    categorie: "Applications mobiles", code: "APP", items: [
      { titre: "Application Android", prix: 1000, apres: "à partir de", detail: "App native Android\nPublication Google Play\nNotifications push" },
      { titre: "Application iOS", prix: 1200, apres: "à partir de", detail: "App native iOS / Swift\nPublication App Store\nNotifications push" },
      { titre: "Application hybride", prix: 1800, apres: "à partir de", detail: "Android + iOS en un seul code\nFlutter / React Native\nCoût et délai optimisés" },
      { titre: "Marketplace mobile (Premium)", prix: 3500, apres: "à partir de", detail: "Mise en relation acheteurs / vendeurs\nPaiement intégré (Stripe / PayPal)\nBack-office de gestion" },
    ]
  },
  {
    categorie: "Design graphique", code: "DES", items: [
      { titre: "Création de logo", prix: 80, detail: "3 concepts uniques\nFichiers vectoriels\nDroits d'auteur inclus" },
      { titre: "Charte graphique", prix: 200, detail: "Palette couleurs\nTypographie et règles\nGuide d'utilisation" },
      { titre: "Affiche publicitaire", prix: 20, detail: "Format imprimable HD\nDesign percutant\n2 révisions incluses" },
      { titre: "Flyer", prix: 15, detail: "Recto/verso\nPrêt à imprimer\n2 révisions incluses" },
      { titre: "Carte de visite", prix: 15, detail: "Design professionnel\nRecto/verso\nFichier PDF" },
      { titre: "Brochure (4 pages)", prix: 60, detail: "Design éditorial\nPrête à imprimer\n3 révisions incluses" },
    ]
  },
  {
    categorie: "Communication digitale", code: "COM", items: [
      { titre: "Gestion des réseaux sociaux", prix: 200, unite: "USD/mois", detail: "3 plateformes incluses\n15 publications/mois\nRapport mensuel" },
      { titre: "Création de contenu", prix: 10, unite: "USD/pub", detail: "Visuel personnalisé\nTexte engageant\nFormat adapté" },
      { titre: "Campagne Meta/Google", prix: 100, detail: "Ciblage avancé\nCréatifs optimisés\nSuivi des performances" },
      { titre: "Référencement SEO", prix: 300, detail: "Audit de site complet\nOptimisation on-page\nRapport de position" },
      { titre: "Audit et stratégie digitale", prix: 150, detail: "Analyse concurrentielle\nRecommandations détaillées\nPlan d'action priorisé" },
    ]
  },
];
// Code de référence : préfixe de la catégorie + numéro (ex. WEB-01, APP-03)
const codeService = (ci, si) => `${CATALOGUE_SERVICES[ci].code}-${String(si + 1).padStart(2, "0")}`;
const libelleService = (s) => `${s.titre}${s.unite ? " (" + s.unite + ")" : s.apres ? " (" + s.apres + ")" : ""}`;

const DELAI_PAR_DEFAUT = "20 à 30 jours ouvrables à compter de la réception de l'acompte";
const MODES_PAR_DEFAUT = "Mobile Money (M-Pesa, Orange Money, Airtel Money), Cash ou Virement Bancaire";

/* ==================== UTILITAIRES ==================== */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nombre = (v) => { const n = parseFloat(String(v).replace(",", ".")); return isFinite(n) ? n : 0; };
const arrondi = (n) => Math.round(n * 100) / 100;
const montant = (n) => arrondi(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const dateFr = (d) => `${String(d.getDate()).padStart(2, "0")} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
const dateLocaleISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseDateLocale = (s) => { const [a, m, j] = s.split("-").map(Number); return new Date(a, m - 1, j); };

/* ==================== LIGNES DE PRESTATIONS ==================== */
function creerLigne(p = {}) {
  const div = document.createElement("div");
  div.className = "ligne-prest";
  div.innerHTML = `
    <input class="titre" placeholder="Titre de la prestation" value="${esc(p.titre)}">
    <input class="qte" type="number" min="0" step="1" value="${esc(p.qte ?? 1)}">
    <input class="prix" type="number" min="0" step="0.01" value="${esc(p.prix ?? "")}" placeholder="0.00">
    <button type="button" class="suppr" title="Supprimer">✕</button>
    <textarea class="detail plein" placeholder="Détails (une ligne par point)">${esc(p.detail)}</textarea>`;
  div.querySelector(".detail").className = "detail";
  $("lignes").appendChild(div);
  return div;
}

function lireLignes() {
  return [...document.querySelectorAll(".ligne-prest")].map((el) => ({
    titre: el.querySelector(".titre").value.trim(),
    detail: el.querySelector(".detail").value,
    qte: Math.max(0, Math.round(nombre(el.querySelector(".qte").value))),
    prix: Math.max(0, nombre(el.querySelector(".prix").value)),
  })).filter((l) => l.titre || l.prix);
}

/* ==================== DONNÉES DU DEVIS ==================== */
function lireDonnees() {
  const lignes = lireLignes();
  const total = arrondi(lignes.reduce((s, l) => s + l.qte * l.prix, 0));
  const pct = Math.min(100, Math.max(0, nombre($("acompte").value)));
  const acompte = arrondi(total * pct / 100);
  const dateVal = $("date").value ? parseDateLocale($("date").value) : new Date();
  const validite = Math.max(1, Math.round(nombre($("validite").value) || 30));
  const dateValidite = new Date(dateVal.getTime());
  dateValidite.setDate(dateValidite.getDate() + validite);
  const client = $("client-nom").value.trim();
  return {
    numero: $("numero").value.trim(),
    dateEmission: dateVal,
    validite, dateValidite, pct,
    client: {
      nom: client,
      contact: $("client-contact").value.trim(),
      tel: $("client-tel").value.trim(),
      email: $("client-email").value.trim(),
      ville: $("client-ville").value.trim(),
    },
    projet: $("projet").value.trim(),
    objet: $("objet").value.trim() || `Design, Development, mise en ligne et support d'un site web pour ${client}`,
    lignes, total, acompte, solde: arrondi(total - acompte),
    remarques: $("remarques").value.trim(),
    delai: $("delai").value.trim(),
    modes: $("modes").value.trim(),
  };
}

/* ==================== APERÇU / DEVIS ==================== */
function rendreDevis() {
  sauvegarderBrouillon();
  const d = lireDonnees();
  const logo = `<div class="logo"><img src="${LOGO_SRC}" alt="${esc(PRESTATAIRE.nom)}"></div>`;
  const lignesHtml = d.lignes.map((l) => `
    <tr>
      <td class="desc"><b>${esc(l.titre)}</b>${l.detail.trim() ? `<ul>${l.detail.split("\n").filter((x) => x.trim()).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</td>
      <td class="num">${l.qte}</td>
      <td class="num">${montant(l.prix)}</td>
      <td class="num">${montant(l.qte * l.prix)}</td>
    </tr>`).join("");
  const c = d.client;

  $("devis").innerHTML = `
    ${logo}
    <h1>DEVIS PRESTATAIRE</h1>
    <div class="meta">
      <p><b>Date :</b> ${dateFr(d.dateEmission)}</p>
      <p><b>Numéro de devis :</b> ${esc(d.numero)}</p>
      <p><b>Validité :</b> ${d.validite} jours (jusqu'au ${dateFr(d.dateValidite)})</p>
    </div>
    <table class="parties"><tr>
      <td>
        <b>PRESTATAIRE</b><br><b>${esc(PRESTATAIRE.nom)}</b><br>
        ${esc(PRESTATAIRE.description)}<br>${esc(PRESTATAIRE.ville)}<br>
        Email : ${esc(PRESTATAIRE.email)}<br>Site Web : ${esc(PRESTATAIRE.site)}<br>Tél : ${esc(PRESTATAIRE.tel)}
      </td>
      <td>
        <b>CLIENT</b><br><b>${esc(c.nom)}</b><br>
        ${c.contact ? esc(c.contact) + "<br>" : ""}${esc(c.ville)}<br>
        ${c.email ? "Email : " + esc(c.email) + "<br>" : ""}${c.tel ? "Tél : " + esc(c.tel) + "<br>" : ""}
        ${d.projet ? "<br>Projet : " + esc(d.projet).replace(/\n/g, "<br>") : ""}
      </td>
    </tr></table>
    <p class="objet"><b>Objet :</b> ${esc(d.objet)}</p>
    <table class="lignes">
      <thead><tr>
        <th>Description de la prestation</th><th class="num">Qté</th>
        <th class="num">Prix Unit.<br>(${DEVISE})</th><th class="num">Total (${DEVISE})</th>
      </tr></thead>
      <tbody>${lignesHtml || `<tr><td colspan="4">Aucune prestation</td></tr>`}</tbody>
      <tfoot><tr>
        <td colspan="3" style="text-align:right"><b>TOTAL NET À PAYER</b></td>
        <td class="num total-valeur">${montant(d.total)}<br>${DEVISE}</td>
      </tr></tfoot>
    </table>
    ${d.remarques ? `<div class="remarques"><b>Remarques</b><br>${esc(d.remarques)}</div>` : ""}
    <div class="conditions">
      <h2>CONDITIONS DE PAIEMENT</h2>
      <ul>
        <li>• Acompte au lancement : ${d.pct}% soit ${montant(d.acompte)} ${DEVISE} pour le démarrage des travaux informatique.</li>
        <li>• Solde à la livraison : ${arrondi(100 - d.pct)}% soit ${montant(d.solde)} ${DEVISE} après validation finale et mise en ligne du site.</li>
        ${d.modes ? `<li>• Modes de paiement acceptés : ${esc(d.modes)}.</li>` : ""}
        ${d.delai ? `<li>• Délai d'exécution : ${esc(d.delai)}.</li>` : ""}
      </ul>
    </div>
    <table class="signatures"><tr>
      <td>Pour le Prestataire<div class="ligne">_________________________</div></td>
      <td>Pour le Client<div class="ligne">_________________________</div></td>
    </tr></table>`;
}

/* ==================== NUMÉROTATION ==================== */
function numeroSuivant() {
  const annee = new Date().getFullYear();
  const dernier = JSON.parse(localStorage.getItem(CLE_DERNIER_NUMERO) || "null");
  const seq = dernier && dernier.annee === annee ? dernier.seq + 1 : 1;
  return `${PREFIXE}-${annee}-${String(seq).padStart(4, "0")}`;
}
function memoriserNumero(numero) {
  const m = numero.match(/-(\d{4})-(\d+)$/);
  if (!m) return;
  localStorage.setItem(CLE_DERNIER_NUMERO, JSON.stringify({ annee: Number(m[1]), seq: Number(m[2]) }));
}

/* ==================== CATALOGUE DE SERVICES ==================== */
function afficherCatalogue() {
  $("service-select").innerHTML = `<option value="">— Choisir un service —</option>` +
    CATALOGUE_SERVICES.map((cat, ci) => `
      <optgroup label="${esc(cat.categorie)}">
        ${cat.items.map((s, si) => `<option value="${ci}-${si}">${codeService(ci, si)} · ${esc(libelleService(s))} — ${s.apres ? "à partir de " : ""}${s.prix} USD</option>`).join("")}
      </optgroup>`).join("");
}
$("ajouter-service").addEventListener("click", () => {
  const v = $("service-select").value;
  if (v === "") { notifier("Choisissez d'abord un service dans la liste."); return; }
  const [ci, si] = v.split("-").map(Number);
  const s = CATALOGUE_SERVICES[ci].items[si];
  creerLigne({ titre: `${codeService(ci, si)} · ${libelleService(s)}`, detail: s.detail, qte: 1, prix: s.prix });
  $("message").classList.remove("visible");
  rendreDevis();
});

/* ==================== MÉMOIRE (brouillon + clients) ==================== */
function sauvegarderBrouillon() {
  const champs = {};
  CHAMPS_MEMOIRE.forEach((id) => { champs[id] = $(id).value; });
  // Le numéro et la date ne sont pas mémorisés : ils sont recalculés à chaque devis
  localStorage.setItem(CLE_BROUILLON, JSON.stringify({ champs, lignes: lireLignes() }));
}
function lireBrouillon() {
  try { return JSON.parse(localStorage.getItem(CLE_BROUILLON)); } catch { return null; }
}
function appliquerChamps(champs) {
  Object.entries(champs || {}).forEach(([id, val]) => { if ($(id)) $(id).value = val; });
}
function lireClients() {
  try { return JSON.parse(localStorage.getItem(CLE_CLIENTS)) || []; } catch { return []; }
}
function ecrireClients(liste) { localStorage.setItem(CLE_CLIENTS, JSON.stringify(liste)); }
function clientCourant() {
  return {
    nom: $("client-nom").value.trim(),
    contact: $("client-contact").value.trim(),
    tel: $("client-tel").value.trim(),
    email: $("client-email").value.trim(),
    ville: $("client-ville").value.trim(),
  };
}
function afficherClients(selection = "") {
  $("client-memoire").innerHTML = `<option value="">— Choisir un client mémorisé —</option>` +
    lireClients().map((c, i) => `<option value="${i}">${esc(c.nom)}${c.ville ? " (" + esc(c.ville) + ")" : ""}</option>`).join("");
  $("client-memoire").value = selection;
}
function notifier(texte, erreur = true) {
  const msg = $("message");
  msg.innerHTML = esc(texte);
  msg.style.background = erreur ? "" : "#ecfdf3";
  msg.style.color = erreur ? "" : "#067647";
  msg.style.borderColor = erreur ? "" : "#abefc6";
  msg.classList.add("visible");
}

/* ==================== ÉTAT INITIAL ==================== */
function remplirDefauts() {
  $("numero").value = numeroSuivant();
  $("date").value = dateLocaleISO(new Date());
  const brouillon = lireBrouillon();
  if (brouillon) {
    appliquerChamps(brouillon.champs);
  } else {
    $("validite").value = 30;
    $("acompte").value = 50;
    $("delai").value = DELAI_PAR_DEFAUT;
    $("modes").value = MODES_PAR_DEFAUT;
  }
  $("lignes").innerHTML = "";
  (brouillon ? brouillon.lignes : PRESTATIONS_PAR_DEFAUT).forEach((p) => creerLigne(p));
  afficherClients();
  rendreDevis();
}

/* ==================== VALIDATION ET IMPRESSION ==================== */
function verifier() {
  const d = lireDonnees();
  const erreurs = [];
  if (!d.numero) erreurs.push("Le numéro de devis est obligatoire.");
  if (!d.client.nom) erreurs.push("Le nom du client est obligatoire.");
  if (!d.client.ville) erreurs.push("La ville du client est obligatoire.");
  if (!d.lignes.length) erreurs.push("Ajoutez au moins une prestation avec un titre.");
  if (d.lignes.some((l) => l.prix <= 0)) erreurs.push("Chaque prestation doit avoir un prix supérieur à 0.");
  const msg = $("message");
  msg.innerHTML = erreurs.map((e) => "• " + esc(e)).join("<br>");
  msg.classList.toggle("visible", erreurs.length > 0);
  return erreurs.length === 0;
}

const TITRE_ORIGINE = document.title;
$("telecharger").addEventListener("click", () => {
  if (!verifier()) { $("formulaire").scrollIntoView({ behavior: "smooth" }); return; }
  rendreDevis();
  const d = lireDonnees();
  // Le navigateur propose le titre du document comme nom de fichier PDF
  const nomFichier = `Devis_${d.numero}_${d.client.nom}`.replace(/[\\/:*?"<>|]+/g, "-").replace(/\s+/g, "_");
  document.title = nomFichier;
  memoriserNumero(d.numero);
  window.print();
});
window.addEventListener("afterprint", () => { document.title = TITRE_ORIGINE; });

/* ==================== ÉVÉNEMENTS ==================== */
$("formulaire").addEventListener("input", rendreDevis);
$("formulaire").addEventListener("change", rendreDevis);
$("ajouter-ligne").addEventListener("click", () => { creerLigne({ qte: 1, prix: "" }); rendreDevis(); });
$("lignes").addEventListener("click", (e) => {
  if (e.target.classList.contains("suppr")) { e.target.closest(".ligne-prest").remove(); rendreDevis(); }
});
$("nouveau").addEventListener("click", () => {
  if (!confirm("Commencer un nouveau devis ? Les informations du client et du projet seront effacées.")) return;
  ["client-nom", "client-contact", "client-tel", "client-email", "client-ville", "projet", "objet", "remarques"]
    .forEach((id) => { $(id).value = ""; });
  $("client-memoire").value = "";
  $("numero").value = numeroSuivant();
  $("date").value = dateLocaleISO(new Date());
  $("lignes").innerHTML = "";
  PRESTATIONS_PAR_DEFAUT.forEach((p) => creerLigne(p));
  $("message").classList.remove("visible");
  rendreDevis();
});

/* Clients mémorisés */
$("client-memoire").addEventListener("change", (e) => {
  if (e.target.value === "") return;
  const c = lireClients()[Number(e.target.value)];
  if (!c) return;
  $("client-nom").value = c.nom || "";
  $("client-contact").value = c.contact || "";
  $("client-tel").value = c.tel || "";
  $("client-email").value = c.email || "";
  $("client-ville").value = c.ville || "";
  rendreDevis();
});
$("enregistrer-client").addEventListener("click", () => {
  const c = clientCourant();
  if (!c.nom) { notifier("Renseignez au moins le nom du client pour le mémoriser."); return; }
  const liste = lireClients().filter((x) => x.nom.toLowerCase() !== c.nom.toLowerCase());
  liste.unshift(c);
  ecrireClients(liste);
  afficherClients("0");
  notifier(`« ${c.nom} » est mémorisé.`, false);
});
$("oublier-client").addEventListener("click", () => {
  const i = $("client-memoire").value;
  if (i === "") { notifier("Choisissez d'abord un client dans la liste."); return; }
  const liste = lireClients();
  const retire = liste.splice(Number(i), 1)[0];
  ecrireClients(liste);
  afficherClients();
  notifier(`« ${retire.nom} » a été oublié.`, false);
});

afficherCatalogue();
remplirDefauts();
