(function () {
  if (window.__pmWidgetsLoaded) return;
  window.__pmWidgetsLoaded = true;

  var html = [
    '<button type="button" class="pm-fab-help" id="pmHelpBtn" aria-label="Posso ajudar?">',
    '  <span class="pm-fab-icon" aria-hidden="true">💬</span>',
    '  <span>Posso ajudar?</span>',
    '</button>',

    '<div class="pm-panel pm-panel-help" id="pmHelpPanel" role="dialog" aria-labelledby="pmHelpTitle">',
    '  <div class="pm-panel-head">',
    '    <div>',
    '      <h3 id="pmHelpTitle">Seja Bem Vindo!</h3>',
    '      <p>Como podemos ajudar você hoje?</p>',
    '    </div>',
    '    <button type="button" class="pm-panel-close" data-close="help" aria-label="Fechar">×</button>',
    '  </div>',
    '  <form id="pmHelpForm">',
    '    <div class="pm-field">',
    '      <label for="pmNome">Nome</label>',
    '      <input id="pmNome" name="nome" type="text" required placeholder="Seu nome" autocomplete="name">',
    '    </div>',
    '    <div class="pm-field">',
    '      <label for="pmEmail">E-mail</label>',
    '      <input id="pmEmail" name="email" type="email" required placeholder="seu@email.com" autocomplete="email">',
    '    </div>',
    '    <div class="pm-field">',
    '      <label for="pmMensagem">Mensagem</label>',
    '      <textarea id="pmMensagem" name="mensagem" required placeholder="Escreva sua mensagem"></textarea>',
    '    </div>',
    '    <button type="submit" class="pm-btn-send">Enviar</button>',
    '  </form>',
    '</div>',

    '<div class="pm-cookie-bar" id="pmCookieBar" role="dialog" aria-label="Preferências de cookies">',
    '  <div class="pm-cookie-bar-info">',
    '    <div class="pm-cookie-bar-text">',
    '      <strong>Privacidade e cookies</strong>',
    '      <p>Este site utiliza cookies para garantir o funcionamento adequado, medir audiência e melhorar a experiência. Você pode aceitar todos, recusar os opcionais ou configurar suas preferências.</p>',
    '    </div>',
    '  </div>',
    '  <div class="pm-cookie-bar-actions">',
    '    <button type="button" data-cookie="configurar" id="pmCookieConfigBtn">Configurar</button>',
    '    <button type="button" data-cookie="recusar">Recusar</button>',
    '    <button type="button" class="pm-accept" data-cookie="aceitar">Aceitar</button>',
    '  </div>',
    '  <div class="pm-cookie-config" id="pmCookieConfig">',
    '    <label><input type="checkbox" checked disabled> Cookies essenciais (obrigatórios)</label>',
    '    <label><input type="checkbox" id="pmCookieAnalytics" checked> Cookies de análise</label>',
    '    <label><input type="checkbox" id="pmCookieMarketing"> Cookies de marketing</label>',
    '    <button type="button" data-cookie="configurar-salvar">Salvar configuração</button>',
    '  </div>',
    '</div>',

    '<div class="pm-toast-overlay" id="pmCookieToast" role="status" aria-live="polite">',
    '  <div class="pm-toast">',
    '    <h4>Preferências salvas</h4>',
    '    <p>Suas escolhas de cookies foram registradas.</p>',
    '  </div>',
    '</div>',

    '<div class="pm-promo-overlay" id="pmPromoOverlay" role="dialog" aria-modal="true" aria-labelledby="pmPromoTitle">',
    '  <div class="pm-promo-banner">',
    '    <button type="button" class="pm-promo-close" id="pmPromoClose" aria-label="Fechar">×</button>',
    '    <div class="pm-promo-top">',
    '      <span class="pm-promo-eyebrow">PreceptorMed · Convite institucional</span>',
    '      <h3 id="pmPromoTitle">Eleve a nota MEC com preceptoria de elite</h3>',
    '      <p>Diagnóstico preliminar gratuito para reitorias e mantenedoras. Padrão clínico inspirado em Harvard e Toronto.</p>',
    '    </div>',
    '    <div class="pm-promo-body">',
    '      <ul class="pm-promo-points">',
    '        <li>Dashboard Reitoria 360º</li>',
    '        <li>Rede de preceptores RQE +5 anos</li>',
    '        <li>Dossiês para conformidade MEC</li>',
    '      </ul>',
    '      <a class="pm-promo-cta" href="mailto:contato@preceptormed.com">Falar com consultor</a>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('');

  var wrap = document.createElement('div');
  wrap.id = 'pmWidgets';
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  var helpBtn = document.getElementById('pmHelpBtn');
  var helpPanel = document.getElementById('pmHelpPanel');
  var cookieBar = document.getElementById('pmCookieBar');
  var toast = document.getElementById('pmCookieToast');
  var helpForm = document.getElementById('pmHelpForm');
  var configBtn = document.getElementById('pmCookieConfigBtn');

  function closeHelp() {
    helpPanel.classList.remove('is-open');
  }

  helpBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    helpPanel.classList.toggle('is-open');
  });

  wrap.querySelectorAll('[data-close="help"]').forEach(function (btn) {
    btn.addEventListener('click', closeHelp);
  });

  helpPanel.addEventListener('click', function (e) { e.stopPropagation(); });
  document.addEventListener('click', closeHelp);

  helpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    closeHelp();
    helpForm.reset();
    alert('Mensagem enviada! Em breve entraremos em contato.');
  });

  function hideCookieBar() {
    cookieBar.classList.remove('is-open', 'is-config');
    document.body.classList.remove('pm-cookie-bar-visible');
  }

  function showCookieBar() {
    cookieBar.classList.add('is-open');
    document.body.classList.add('pm-cookie-bar-visible');
  }

  function showCookiesSaved(choice) {
    try {
      localStorage.setItem('pm_cookies_choice', choice);
      localStorage.setItem('pm_cookies_saved_at', new Date().toISOString());
    } catch (err) {}
    hideCookieBar();
    toast.classList.add('is-open');
    clearTimeout(showCookiesSaved._t);
    showCookiesSaved._t = setTimeout(function () {
      toast.classList.remove('is-open');
    }, 2200);
  }

  configBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    cookieBar.classList.toggle('is-config');
  });

  wrap.querySelectorAll('[data-cookie]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var choice = btn.getAttribute('data-cookie');
      if (choice === 'configurar') return;
      e.stopPropagation();
      showCookiesSaved(choice);
    });
  });

  toast.addEventListener('click', function () {
    toast.classList.remove('is-open');
  });

  // Appear on load (unless already saved)
  try {
    if (!localStorage.getItem('pm_cookies_choice')) {
      showCookieBar();
    }
  } catch (err) {
    showCookieBar();
  }

  /* Banner estilizado após 8 segundos */
  var promoOverlay = document.getElementById('pmPromoOverlay');
  var promoClose = document.getElementById('pmPromoClose');

  function closePromo() {
    promoOverlay.classList.remove('is-open');
    try { sessionStorage.setItem('pm_promo_closed', '1'); } catch (err) {}
  }

  function openPromo() {
    try {
      if (sessionStorage.getItem('pm_promo_closed')) return;
    } catch (err) {}
    promoOverlay.classList.add('is-open');
  }

  promoClose.addEventListener('click', closePromo);
  promoOverlay.addEventListener('click', function (e) {
    if (e.target === promoOverlay) closePromo();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && promoOverlay.classList.contains('is-open')) {
      closePromo();
    }
  });

  setTimeout(openPromo, 8000);
})();
