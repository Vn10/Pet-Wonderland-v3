# 🐾 Pet Wonderland v2

A browser-based virtual pet game — no server, no install. Everything runs locally using `localStorage`.

---

## How to Play

1. Open `index.html` in a browser.
2. Pick a pet (Dog, Cat, or Dragon) and give it a name.
3. Take care of it using the **Actions** or **My Pet** pages.
4. Earn money via **mini-games** on the Earn tab.
5. Buy items in the **Shop** to boost your pet.
6. Collect all 12 **Badges** and reach **Max Evolution**.
7. Track every dollar you spend and earn on the **Finance** tab.

---

## Pages & Features

### `index.html` — Start Screen
- Choose from **Dog**, **Cat**, or **Dragon** (each has a unique 3-stage evolution chain).
- Name your pet (up to 20 characters).
- Starting balance: **$150**.
- "Continue" link appears automatically if a save is detected.

### `pet.html` — My Pet
- Live animated pet emoji that changes with each evolution stage.
- **4 stat bars**: Hunger (rises over time), Happiness, Energy, Health.
- **XP progress bar** toward next evolution.
- Mood indicator (Thriving → Sick), contextual warning banners.
- Quick-action buttons: Feed, Play, Rest, Clean, Vet, Evolve shortcut.
- Stats passively decay in real time (offline too — calculated on next load).

### `actions.html` — Actions
- Same core actions as My Pet, with richer animations.
- **Burst emoji** overlay, **ripple ring**, **floating +XP** text, and **card glow** effects per action.
- Per-action details: cost, effects (stat changes), XP earned.

| Action | Cost  | Key Effects               | XP |
|--------|-------|---------------------------|----|
| Feed   | $3    | Hunger −20, Happy +5      | +10 |
| Play   | free  | Happy +15, Energy −10     | +8  |
| Rest   | free  | Energy +25                | +3  |
| Clean  | $2    | Health +10, Happy +5      | +5  |
| Vet    | $15   | Health → 100              | +15 |

### `earn.html` — Earn Money
Four mini-games to fill your wallet:

| Game          | Mechanic                        | Max Payout |
|---------------|---------------------------------|------------|
| Whack-a-Mole  | Click moles before time runs out | $1 per hit |
| Reaction Test | Tap on GO!, not before          | $10/round   |
| Math Blitz    | Solve arithmetic in 15 seconds  | $1/correct  |
| Memory Match  | Flip card pairs in fewest moves | $12/round   |

### `shop.html` — Shop
25+ items across 5 categories. Toys can be equipped; consumables apply instantly; passives modify game rules permanently.

**Categories:**
- 🎾 **Toys** — equippable items that boost happiness per play session.
- 🍖 **Food & Treats** — instant stat boosts or bulk-feed packs.
- 🛁 **Health & Care** — healing items, immunity potions, regen effects.
- ✨ **XP Boosts** — scrolls, tomes, crystals for accelerating evolution.
- 🏠 **Home Items** — passive upgrades (better rest, slower hunger drain, etc.).

**Tiers:** Basic → Premium → Elite → Legendary (affects power & price).

### `evolution.html` — Evolution
- 3-stage evolution chain, unique per pet type.
- Stage 1 → 2 at **200 XP**, Stage 2 → 3 at **600 XP**.
- Glowing "Evolve Now!" button when threshold is reached.
- XP sources table and animated evolution confetti.

| Pet    | Stage 1 | Stage 2 | Stage 3       |
|--------|---------|---------|---------------|
| Dog    | 🐶 Puppy | 🐕 Adult Dog | 🦮 Alpha Wolf |
| Cat    | 🐱 Kitten | 🐈 Cat | 🦁 Jungle King |
| Dragon | 🐲 Hatchling | 🐉 Dragon | 🔥🐉 Elder Dragon |

### `badges.html` — Badges
12 collectible badges. Sorted: earned first, locked below. Animated confetti on first-time badge earn.

| Badge            | Condition                         |
|------------------|-----------------------------------|
| 🏅 Care Champion  | Happiness & Health both ≥ 90      |
| 💚 Healthy Pet    | Health = 100                      |
| 😊 Happy Pet      | Happiness = 100                   |
| 💰 Rich Owner     | Balance > $200                    |
| 🛍️ Big Spender    | Total spent > $100                |
| ⚒️ Hard Worker    | Total earned ≥ $50 from games     |
| 🧸 First Toy      | Buy any toy                       |
| ⭐ Perfect Balance | All stats in ideal range          |
| ✨ First Evolution | Reach Stage 2                     |
| 👑 Max Evolution  | Reach Stage 3                     |
| 🏪 Shopaholic     | Own 5+ shop items                 |
| 🍖 Well Fed       | Feed your pet 20 times            |

### `finance.html` — Finance *(new in v2)*
A full financial dashboard for your in-game economy.

**Summary bar:** Earned / Spent / Balance at a glance.

**Financial Health Score (0–100):**  
Three animated ring charts assess your finances across three dimensions:

| Category   | What it measures                             |
|------------|----------------------------------------------|
| Earning    | How much you've made from mini-games         |
| Savings    | How much of your cash-flow you've kept       |
| Efficiency | How lean your spending is relative to income |

An overall score (weighted average) produces a letter grade (S / A / B / C / D) and a personalized optimization blurb with actionable tips.

**Spending Breakdown:** Bar chart showing spend by category (Feeding, Cleaning, Vet, Shop, Other).

**Transaction History:** Scrollable ledger of every earn and spend event, filterable by All / Earned / Spent.

### `instructions.html` — How to Play
Step-by-step guide and pro tips for new players.

---

## Technical Architecture

| File         | Role                                                        |
|--------------|-------------------------------------------------------------|
| `shared.css` | Global dark-mode design system (CSS variables, nav, cards)  |
| `shared.js`  | State management, XP/evo logic, badge checker, passive tick |
| `nav.js`     | Injects sticky top nav dynamically on every game page       |
| `*.html`     | Individual page — inline `<script>` handles page logic      |

**State** is one JSON object stored in `localStorage` under the key `pwState`. Key fields:

```
petName, petType, hunger, happiness, energy, health,
money, totalEarned, totalExpenses, evoStage, xp,
badges{}, inventory{}, ledger[], lastTick
```

**Passive decay** runs on every page load via `applyPassiveDecay()` — calculates elapsed seconds since `lastTick` and adjusts all stats proportionally. A `setInterval` live-tick also runs every 30 seconds while the app is open.

---

## Data & Privacy
All data is stored **locally** in your browser (`localStorage`). Nothing is sent to any server.

To reset: open browser DevTools → Application → Local Storage → delete `pwState` and `petName`.
