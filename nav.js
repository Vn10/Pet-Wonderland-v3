(function() {
  const pages = [
    { href:'pet.html',       icon:'🐾', label:'My Pet'   },
    { href:'actions.html',   icon:'⚡', label:'Actions'  },
    { href:'evolution.html', icon:'✨', label:'Evolve'   },
    { href:'shop.html',      icon:'🛒', label:'Shop'     },
    { href:'earn.html',      icon:'💰', label:'Earn'     },
    { href:'badges.html',    icon:'🏆', label:'Badges'   },
    { href:'finance.html',   icon:'📊', label:'Finance'  },
  ];
  const cur = location.pathname.split('/').pop() || 'index.html';

  const gamePages = ['pet.html','actions.html','shop.html','earn.html','badges.html',
                     'instructions.html','evolution.html','finance.html'];
  if (gamePages.includes(cur) && !localStorage.getItem('petName')) {
    location.replace('index.html');
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
    .nav-back-btn {
      background: var(--card2); border: 2px solid var(--border); border-radius: 10px;
      color: var(--text-muted); font-family: 'Nunito', sans-serif; font-size: .95rem;
      font-weight: 800; padding: 6px 13px; cursor: pointer;
      transition: border-color .18s, color .18s; line-height: 1; flex-shrink: 0;
    }
    .nav-back-btn:hover { border-color: var(--border-hi); color: var(--text); }
    .nav-left { display: flex; align-items: center; gap: 10px; }
    .nav-link.evo-link { position: relative; }
    .nav-evo-pulse {
      position: absolute; top: -3px; right: -3px; width: 8px; height: 8px;
      border-radius: 50%; background: var(--yellow);
      animation: nav-pulse 1.2s ease-in-out infinite;
    }
    @keyframes nav-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:.6} }
  `;
  document.head.appendChild(style);

  function isEvoReady() {
    try {
      const raw = localStorage.getItem('pwState');
      if (!raw) return false;
      const s = JSON.parse(raw);
      const stage = s.evoStage || 0;
      if (stage >= 2) return false;
      return (s.xp || 0) >= [0,200,600][stage + 1];
    } catch(e) { return false; }
  }

  const showBack = cur !== 'index.html' && cur !== '' && cur !== 'pet.html';
  const nav = document.createElement('nav');
  nav.className = 'top-nav';
  nav.innerHTML = `
    <div class="nav-left">
      ${showBack ? `<button class="nav-back-btn" onclick="history.back()">← Back</button>` : ''}
      <a href="index.html" class="nav-logo">🐾 Pet Wonderland</a>
    </div>
    <div class="nav-links">
      ${pages.map(p => {
        const active = cur === p.href ? ' active' : '';
        const isEvo = p.href === 'evolution.html';
        const pulse = isEvo && isEvoReady() ? '<span class="nav-evo-pulse"></span>' : '';
        return `<a href="${p.href}" class="nav-link${active}${isEvo?' evo-link':''}">${p.icon} ${p.label}${pulse}</a>`;
      }).join('')}
    </div>
  `;
  document.body.prepend(nav);
})();
