/**
 * SVG credit card designs for each bank / franchise.
 * Every card mimics the standard credit-card proportions (85.6×53.98mm → 400×252 viewBox).
 * Each function returns an inline SVG string ready for [innerHTML].
 */

// ─── shared card shell ────────────────────────────────────────────────────────
// Chip SVG (ISO/IEC 7816 contact pad pattern)
const CHIP = `
  <g transform="translate(28,98)">
    <rect width="38" height="28" rx="4" ry="4" fill="#d4a83a" opacity="0.92"/>
    <rect x="13" width="12" height="28" rx="1" fill="#b8922e" opacity="0.7"/>
    <rect y="10" width="38" height="8" rx="1" fill="#b8922e" opacity="0.7"/>
    <rect x="1" y="1" width="36" height="26" rx="3" fill="none" stroke="#c9952b" stroke-width="0.6" opacity="0.5"/>
  </g>`;

// NFC symbol
const NFC = `
  <g transform="translate(76,103)" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.2" stroke-linecap="round">
    <path d="M0,9 Q3,4 8,9"/>
    <path d="M-3,12 Q4,-1 13,12"/>
    <path d="M-6,15 Q5,-6 18,15"/>
  </g>`;

// Holographic stripe (subtle iridescent line)
const HOLO = `
  <defs>
    <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="30%"  stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="50%"  stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="70%"  stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="70" width="400" height="6" fill="url(#holo)"/>`;

// Card frame with rounded corners, gradient fill, and glass sheen
function cardFrame(gradId: string, children: string): string {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 252" role="img">
    <defs>
      <linearGradient id="sheen" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%"   stop-color="#ffffff" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      ${children.includes('<defs>') ? '' : ''}
    </defs>

    <!-- Card body -->
    <rect width="400" height="252" rx="20" ry="20" fill="url(#${gradId})"/>

    <!-- Glass sheen overlay -->
    <rect width="400" height="252" rx="20" ry="20" fill="url(#sheen)"/>

    <!-- Decorative large circle (translucent) -->
    <circle cx="340" cy="-30" r="140" fill="rgba(255,255,255,0.05)"/>
    <circle cx="60"  cy="280" r="110" fill="rgba(255,255,255,0.04)"/>

    ${HOLO}
    ${CHIP}
    ${NFC}

    ${children}
  </svg>`;
}

// Standard card text elements
function cardTexts(
  bankName: string,
  cardType: string,
  holderName = 'CARDHOLDER NAME',
  validThru = '12/28'
): string {
  return `
    <!-- Bank name top-left -->
    <text x="28" y="60" font-family="'Arial', sans-serif" font-size="20"
      font-weight="800" fill="white" letter-spacing="1" opacity="0.95">${bankName.toUpperCase()}</text>

    <!-- Card type top-right -->
    <text x="372" y="60" font-family="'Arial', sans-serif" font-size="11"
      font-weight="500" fill="rgba(255,255,255,0.75)" text-anchor="end" letter-spacing="1.5"
      >${cardType.toUpperCase()}</text>

    <!-- Card number -->
    <text x="28" y="168" font-family="'Courier New', monospace" font-size="22"
      font-weight="700" fill="white" letter-spacing="3" opacity="0.9"
      >•••• •••• •••• 1234</text>

    <!-- Valid labels -->
    <text x="28"  y="202" font-family="'Arial', sans-serif" font-size="7.5"
      fill="rgba(255,255,255,0.55)" letter-spacing="0.5">VALID THRU</text>
    <text x="28"  y="216" font-family="'Arial', sans-serif" font-size="13"
      font-weight="600" fill="white" opacity="0.85">${validThru}</text>

    <!-- Cardholder name -->
    <text x="28"  y="243" font-family="'Arial', sans-serif" font-size="13"
      font-weight="600" fill="white" letter-spacing="1" opacity="0.85"
      >${holderName}</text>`;
}

// ─── BANCOLOMBIA ─────────────────────────────────────────────────────────────
export function svgBancolombia(): string {
  const g = `
  <defs>
    <linearGradient id="bc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#1D2A57"/>
      <stop offset="60%"  stop-color="#2B3A8F"/>
      <stop offset="100%" stop-color="#3452C9"/>
    </linearGradient>
  </defs>`;

  // Lowercase 'b' logo in gold: vertical bar + attached circle
  const logo = `
  <g transform="translate(310,168)">
    <rect x="0" y="-28" width="11" height="50" rx="5.5" fill="#FDB931"/>
    <circle cx="16" cy="12" r="15" fill="#FDB931"/>
    <circle cx="16" cy="12" r="8.5" fill="#2B3A8F"/>
  </g>`;

  return cardFrame('bc-grad', g + logo + cardTexts('Bancolombia', 'Crédito'));
}

// ─── NUBANK ──────────────────────────────────────────────────────────────────
export function svgNubank(): string {
  const g = `
  <defs>
    <linearGradient id="nu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#3D0070"/>
      <stop offset="50%"  stop-color="#6A00AF"/>
      <stop offset="100%" stop-color="#820AD1"/>
    </linearGradient>
  </defs>`;

  // 'nu' lowercase wordmark
  const logo = `
  <text x="350" y="230" font-family="'Arial Rounded MT Bold', 'Nunito', Arial, sans-serif"
    font-size="32" font-weight="900" fill="white" text-anchor="end" opacity="0.95">nu</text>`;

  return cardFrame('nu-grad', g + logo + cardTexts('Nu Bank', 'Mastercard'));
}

// ─── BANCO FALABELLA ─────────────────────────────────────────────────────────
export function svgBancoFalabella(): string {
  const g = `
  <defs>
    <linearGradient id="fal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#003D25"/>
      <stop offset="60%"  stop-color="#006840"/>
      <stop offset="100%" stop-color="#008751"/>
    </linearGradient>
  </defs>`;

  // CMR Falabella logo: bold "CMR" + "Falabella" below
  const logo = `
  <g transform="translate(240,148)">
    <text x="0" y="0" font-family="'Arial', sans-serif" font-size="34"
      font-weight="900" fill="white" letter-spacing="-1">CMR</text>
    <text x="2" y="16" font-family="'Arial', sans-serif" font-size="11"
      font-weight="500" fill="rgba(255,255,255,0.8)" letter-spacing="3">FALABELLA</text>
  </g>`;

  return cardFrame('fal-grad', g + logo + cardTexts('Banco Falabella', 'Crédito'));
}

// ─── BBVA ─────────────────────────────────────────────────────────────────────
export function svgBBVA(): string {
  const g = `
  <defs>
    <linearGradient id="bbva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#001E42"/>
      <stop offset="55%"  stop-color="#004481"/>
      <stop offset="100%" stop-color="#005BAA"/>
    </linearGradient>
  </defs>`;

  // BBVA wordmark + aqua accent line (post-2019 brand)
  const logo = `
  <g transform="translate(278,160)">
    <rect x="-4" y="-30" width="100" height="42" rx="6" fill="rgba(0,68,129,0.6)"/>
    <text x="0" y="0" font-family="'Arial', sans-serif" font-size="30"
      font-weight="900" fill="white" letter-spacing="2">BBVA</text>
    <!-- Teal accent underline (BBVA aqua brand color) -->
    <rect x="0" y="6" width="82" height="3.5" rx="1.5" fill="#1DB3B8"/>
  </g>`;

  return cardFrame('bbva-grad', g + logo + cardTexts('BBVA', 'Crédito'));
}

// ─── DAVIVIENDA ───────────────────────────────────────────────────────────────
export function svgDavivienda(): string {
  const g = `
  <defs>
    <linearGradient id="dav-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#5C0010"/>
      <stop offset="55%"  stop-color="#9B0020"/>
      <stop offset="100%" stop-color="#C8102E"/>
    </linearGradient>
  </defs>`;

  // Casita Roja — house silhouette
  const logo = `
  <g transform="translate(296,148)">
    <!-- House body -->
    <rect x="8" y="18" width="56" height="44" rx="3" fill="white" opacity="0.92"/>
    <!-- Roof (triangle) -->
    <polygon points="3,22 36,0 69,22" fill="white" opacity="0.92"/>
    <!-- Door (arch) -->
    <rect x="24" y="38" width="24" height="24" rx="12" fill="#C8102E"/>
    <!-- Chimney -->
    <rect x="50" y="4" width="10" height="16" rx="2" fill="white" opacity="0.88"/>
  </g>`;

  return cardFrame('dav-grad', g + logo + cardTexts('Davivienda', 'Crédito'));
}

// ─── BANCO DE OCCIDENTE ───────────────────────────────────────────────────────
export function svgBancoOccidente(): string {
  const g = `
  <defs>
    <linearGradient id="occ-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#001E4A"/>
      <stop offset="60%"  stop-color="#0044AA"/>
      <stop offset="100%" stop-color="#0066CC"/>
    </linearGradient>
  </defs>`;

  // Abstract 4-rhombus cross / pinwheel
  const logo = `
  <g transform="translate(300,150)">
    <!-- Vertical rhombus -->
    <polygon points="28,0 38,28 28,56 18,28" fill="white" opacity="0.85"/>
    <!-- Horizontal rhombus -->
    <polygon points="0,28 28,18 56,28 28,38" fill="white" opacity="0.85"/>
    <!-- Center overlap cover (creates layered look) -->
    <polygon points="28,18 38,28 28,38 18,28" fill="white"/>
  </g>`;

  return cardFrame('occ-grad', g + logo + cardTexts('Bco. Occidente', 'Crédito'));
}

// ─── AV VILLAS ────────────────────────────────────────────────────────────────
export function svgAvVillas(): string {
  const g = `
  <defs>
    <linearGradient id="av-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#001F40"/>
      <stop offset="55%"  stop-color="#003D80"/>
      <stop offset="100%" stop-color="#0057A8"/>
    </linearGradient>
  </defs>`;

  // Two upward-sweeping arcs = wings + AV type
  const logo = `
  <g transform="translate(284,155)">
    <!-- Wing arc left -->
    <path d="M0,38 Q12,6 36,10" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
    <!-- Wing arc right -->
    <path d="M14,42 Q28,10 52,22" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
    <!-- Wordmark -->
    <text x="0" y="68" font-family="'Arial', sans-serif" font-size="17"
      font-weight="800" fill="white" letter-spacing="1" opacity="0.9">AV Villas</text>
  </g>`;

  return cardFrame('av-grad', g + logo + cardTexts('AV Villas', 'Crédito'));
}

// ─── MASTERCARD ───────────────────────────────────────────────────────────────
export function svgMastercard(): string {
  const g = `
  <defs>
    <linearGradient id="mc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#1A1A2E"/>
      <stop offset="50%"  stop-color="#16213E"/>
      <stop offset="100%" stop-color="#0F3460"/>
    </linearGradient>
    <clipPath id="mc-clip">
      <circle cx="308" cy="200" r="32"/>
    </clipPath>
  </defs>`;

  // Two overlapping circles logo (large, bottom-right)
  const logo = `
  <g transform="translate(0,0)">
    <circle cx="300" cy="200" r="32" fill="#EB001B" opacity="0.95"/>
    <circle cx="332" cy="200" r="32" fill="#F79E1B" opacity="0.95"/>
    <!-- Overlap in orange -->
    <circle cx="332" cy="200" r="32" fill="#FF5F00" clip-path="url(#mc-clip)" opacity="0.95"/>
    <!-- Wordmark below circles -->
    <text x="316" y="242" text-anchor="middle" font-family="'Arial', sans-serif"
      font-size="10" font-weight="500" fill="rgba(255,255,255,0.7)" letter-spacing="1">mastercard</text>
  </g>`;

  return cardFrame('mc-grad', g + logo + cardTexts('Mastercard', 'World Elite'));
}

// ─── AMERICAN EXPRESS ─────────────────────────────────────────────────────────
export function svgAmex(): string {
  const g = `
  <defs>
    <linearGradient id="amex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#00175A"/>
      <stop offset="60%"  stop-color="#006FCF"/>
      <stop offset="100%" stop-color="#0099E0"/>
    </linearGradient>
  </defs>`;

  // Centurion watermark (simplified) + AMERICAN EXPRESS wordmark
  const logo = `
  <g opacity="0.12">
    <!-- Simplified centurion head silhouette as large watermark -->
    <!-- Helmet dome -->
    <ellipse cx="280" cy="100" rx="55" ry="50" fill="white"/>
    <!-- Plume -->
    <path d="M330,80 Q370,50 355,110" fill="white"/>
    <!-- Face profile -->
    <path d="M235,100 Q220,130 230,165 Q250,190 280,175 Q310,160 320,130 Q325,100 310,90 Z" fill="white"/>
    <!-- Neck -->
    <rect x="258" y="170" width="44" height="30" rx="8" fill="white"/>
  </g>
  <!-- AMERICAN EXPRESS bold text -->
  <text x="28" y="230" font-family="'Arial', sans-serif" font-size="13"
    font-weight="800" fill="white" letter-spacing="3" opacity="0.9">AMERICAN EXPRESS</text>`;

  return cardFrame('amex-grad', g + logo + cardTexts('AmEx', 'Blue Card'));
}

// ─── OLÍMPICA ─────────────────────────────────────────────────────────────────
export function svgOlimpica(): string {
  const g = `
  <defs>
    <linearGradient id="oli-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#4A0000"/>
      <stop offset="55%"  stop-color="#B01020"/>
      <stop offset="100%" stop-color="#E31837"/>
    </linearGradient>
  </defs>`;

  // Stylized 'O' with equatorial line + wordmark
  const logo = `
  <g transform="translate(287,148)">
    <circle cx="36" cy="30" r="34" fill="none" stroke="white" stroke-width="5" opacity="0.9"/>
    <line x1="2" y1="30" x2="70" y2="30" stroke="white" stroke-width="5" opacity="0.9"/>
    <text x="36" y="82" text-anchor="middle" font-family="'Arial', sans-serif"
      font-size="15" font-weight="700" fill="white" letter-spacing="1" opacity="0.9">Olímpica</text>
  </g>`;

  return cardFrame('oli-grad', g + logo + cardTexts('Olímpica', 'Mastercard'));
}

// ─── TERPEL ───────────────────────────────────────────────────────────────────
export function svgTerpel(): string {
  const g = `
  <defs>
    <linearGradient id="ter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#3D1800"/>
      <stop offset="55%"  stop-color="#A85C00"/>
      <stop offset="100%" stop-color="#F39325"/>
    </linearGradient>
  </defs>`;

  // Red circle + flame inside + TERPEL text
  const logo = `
  <g transform="translate(294,142)">
    <circle cx="34" cy="34" r="34" fill="#C8340A" opacity="0.9"/>
    <!-- Flame shape -->
    <path d="M34,54 Q24,40 27,22 Q30,10 34,6 Q38,10 41,22 Q44,40 34,54 Z"
      fill="#F39325" opacity="0.95"/>
    <!-- Highlight on flame -->
    <path d="M34,46 Q30,36 32,24 Q33,17 34,14 Q35,17 36,24 Q38,36 34,46 Z"
      fill="#FFD080" opacity="0.6"/>
    <text x="34" y="82" text-anchor="middle" font-family="'Arial', sans-serif"
      font-size="14" font-weight="900" fill="white" letter-spacing="2" opacity="0.9">TERPEL</text>
  </g>`;

  return cardFrame('ter-grad', g + logo + cardTexts('Terpel', 'Clásica'));
}

// ─── SCOTIABANK COLPATRIA ─────────────────────────────────────────────────────
export function svgScotiabankColpatria(): string {
  const g = `
  <defs>
    <linearGradient id="sco-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#4A0008"/>
      <stop offset="55%"  stop-color="#B00010"/>
      <stop offset="100%" stop-color="#EC111A"/>
    </linearGradient>
  </defs>`;

  // Rounded rect with stylised S + Scotiabank wordmark
  const logo = `
  <g transform="translate(282,150)">
    <!-- Rounded-square brand mark -->
    <rect x="0" y="0" width="52" height="52" rx="10" fill="rgba(255,255,255,0.15)" stroke="white" stroke-width="1.5"/>
    <!-- Stylised S (two opposing arcs) -->
    <path d="M38,12 Q16,12 16,26 Q16,40 38,40 Q52,40 52,48"
      stroke="white" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- Wordmark -->
    <text x="0" y="72" font-family="'Arial', sans-serif" font-size="12"
      font-weight="700" fill="white" letter-spacing="0.5" opacity="0.9">Scotiabank</text>
    <text x="0" y="87" font-family="'Arial', sans-serif" font-size="9.5"
      font-weight="500" fill="rgba(255,255,255,0.7)" letter-spacing="0.5">Colpatria</text>
  </g>`;

  return cardFrame('sco-grad', g + logo + cardTexts('Scotiabank', 'Crédito'));
}

// ─── CONVENIO POLICÍA NACIONAL ────────────────────────────────────────────────
export function svgPolicia(): string {
  const g = `
  <defs>
    <linearGradient id="pol-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#001A0E"/>
      <stop offset="55%"  stop-color="#004D30"/>
      <stop offset="100%" stop-color="#006341"/>
    </linearGradient>
  </defs>`;

  // Heraldic shield + condor silhouette
  const logo = `
  <g transform="translate(295,148)">
    <!-- Shield body -->
    <path d="M10,0 L70,0 L70,46 L40,68 L10,46 Z"
      fill="rgba(255,255,255,0.12)" stroke="#C8A400" stroke-width="2"/>
    <!-- Condor wings (two arcs) -->
    <path d="M10,22 Q25,10 40,18 Q55,10 70,22"
      fill="none" stroke="#C8A400" stroke-width="3" opacity="0.9"/>
    <!-- Condor body -->
    <ellipse cx="40" cy="26" rx="8" ry="7" fill="#C8A400" opacity="0.9"/>
    <!-- Colombian flag stripe accent (yellow/blue/red) -->
    <rect x="10" y="38" width="60" height="5" rx="1" fill="#FCD116" opacity="0.8"/>
    <rect x="10" y="43" width="60" height="3" rx="1" fill="#003893" opacity="0.8"/>
    <rect x="10" y="46" width="60" height="3" rx="1" fill="#CE1126" opacity="0.8"/>
    <!-- Text -->
    <text x="40" y="82" text-anchor="middle" font-family="'Arial', sans-serif"
      font-size="8" font-weight="700" fill="#C8A400" letter-spacing="0.5" opacity="0.9">POLICÍA NACIONAL</text>
  </g>`;

  return cardFrame('pol-grad', g + logo + cardTexts('Convenio Policía', 'Crédito'));
}

// ─── MASTERCARD PRICELESS ─────────────────────────────────────────────────────
export function svgMastercardPriceless(): string {
  return svgMastercard(); // Same brand, same card visual
}

// ─────────────────────────────────────────────────────────────────────────────
// Public lookup map  source-name → svg-generator
// ─────────────────────────────────────────────────────────────────────────────
const SVG_MAP: Record<string, () => string> = {
  'Bancolombia':             svgBancolombia,
  'Nu Bank':                 svgNubank,
  'Banco Falabella':         svgBancoFalabella,
  'BBVA':                    svgBBVA,
  'Davivienda':              svgDavivienda,
  'Banco de Occidente':      svgBancoOccidente,
  'AV Villas':               svgAvVillas,
  'Mastercard':              svgMastercard,
  'Mastercard Priceless':    svgMastercardPriceless,
  'American Express':        svgAmex,
  'Olímpica':                svgOlimpica,
  'Tarjeta Olímpica':        svgOlimpica,
  'Terpel':                  svgTerpel,
  'Scotiabank Colpatria':    svgScotiabankColpatria,
  'Convenio Policía Nacional': svgPolicia,
  'Convenio Policía':        svgPolicia,
};

export function getSourceCardSvg(source: string): string {
  const fn = SVG_MAP[source];
  return fn ? fn() : svgGeneric(source);
}

function svgGeneric(source: string): string {
  const g = `
  <defs>
    <linearGradient id="gen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
  </defs>`;
  return cardFrame('gen-grad', g + cardTexts(source, 'Crédito'));
}
