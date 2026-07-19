/* ============================================
   TRUE CRIME INVESTIGAÇÕES - JavaScript Principal
   Sistema de Jogo, Progresso, Senhas e Pontuação
   ============================================ */

// ===== CONFIGURAÇÃO DOS CASOS =====
const CASES_CONFIG = {
  'metalurgia': {
    title: 'Operação Metalurgia',
    code: 'METAL-441',
    password: 'METAL-441',
    difficulty: 'Difícil',
    evidenceCount: 8,
    maxScore: 1000,
    hints: [
      { level: 1, text: 'A vítima foi sequestrada e mantida em cativeiro. O corpo foi destruído no forno de indução. Foque nos registros térmicos e digitais.', penalty: 50 },
      { level: 2, text: 'O executor deixou digitais nos frascos de cetamina e no galão de diesel. O sistema AFIS confirmou a identidade de Marcos Aurélio da Silva.', penalty: 100 },
      { level: 3, text: 'O mandante adquiriu o gerador e diesel em dinheiro vivo. A triangulação de ERB e o vazamento de DNS do roteador móvel o ligam ao local.', penalty: 150 }
    ],
    suspects: [
      { name: 'Marcos Aurélio da Silva ("Alemão")', role: 'Executor de Campo', motive: 'Dinheiro', alibi: 'Falso', evidence: 'Digitais nos frascos de cetamina, galão e painel do gerador' },
      { name: 'Mandante (Nome Omitido)', role: 'Mentor Intelectual', motive: 'Extorsão', alibi: 'Falso', evidence: 'ERB, compra do gerador, mensagens deletadas' }
    ]
  },
  'genesis': {
    title: 'Gênesis Pharma',
    code: 'GENESIS-112',
    password: 'GENESIS-112',
    difficulty: 'Médio',
    evidenceCount: 6,
    maxScore: 1000,
    hints: [
      { level: 1, text: 'A vítima foi envenenada com Azida de Sódio no café. O veneno bloqueia a respiração celular. Quem tinha acesso ao almoxarifado de reagentes?', penalty: 50 },
      { level: 2, text: 'O pesquisador adjunto contestava a autoria da patente. O sniffer USB clonou os dados da patente 2 minutos antes da morte da Dra. Helena.', penalty: 100 },
      { level: 3, text: 'O micro-SD oculto no porta-canetas continha logs de acesso a servidores na Suíça. O depósito em criptoativos veio de um conglomerado concorrente.', penalty: 150 }
    ],
    suspects: [
      { name: 'Dr. Caio Rodrigues Martins', role: 'Pesquisador Adjunto', motive: 'Patente/Royalties', alibi: 'Falso', evidence: 'DNA na caneca, sniffer USB, micro-SD com logs' },
      { name: 'Dr. Victor Lacher', role: 'CEO Lacher Pharma', motive: 'Espionagem Industrial', alibi: 'Falso', evidence: 'Depósito em criptoativos, contato com executores' }
    ]
  },
  'tanino': {
    title: 'Operação Tanino',
    code: 'TANINO-203',
    password: 'TANINO-203',
    difficulty: 'Médio',
    evidenceCount: 6,
    maxScore: 1000,
    hints: [
      { level: 1, text: 'A vítima foi envenenada com aconitina no vinho do Porto. A planta crescia no jardim da propriedade. Quem conhecia o hábito do decantador pessoal?', penalty: 50 },
      { level: 2, text: 'O sobrinho deixou digitais na rolha do decantador, no frasco conta-gotas e na tesoura de poda. O AFIS confirmou: Rogério Villar Castanheira.', penalty: 100 },
      { level: 3, text: 'O celular do sobrinho continha buscas por "aconitina dose letal sem sabor". A auditoria encontrou desvio de R$ 2,3 milhões em contas dele.', penalty: 150 }
    ],
    suspects: [
      { name: 'Rogério Villar Castanheira', role: 'Sobrinho / Administrador Financeiro', motive: 'Ocultar desvio de R$ 2,3 milhões', alibi: 'Falso', evidence: 'Digitais na rolha, frasco e tesoura. Buscas no celular. Auditoria.' }
    ]
  },
  'camelias': {
    title: 'Vila das Camélias',
    code: 'CAMELIAS-391',
    password: 'CAMELIAS-391',
    difficulty: 'Fácil',
    evidenceCount: 8,
    maxScore: 1000,
    hints: [
      { level: 1, text: 'A vítima morreu de overdose de insulina exógena. A caneta inteligente registrou a dose. Quem tinha o aplicativo pareado?', penalty: 50 },
      { level: 2, text: 'A impressão digital de Renata foi encontrada no botão da caneta. O log mostrou acesso pelo aplicativo dela às 21h50min por 54 segundos.', penalty: 100 },
      { level: 3, text: 'A auditoria confirmou desvio de R$ 9,3 milhões. A vítima ia destituir Renata do cargo no dia seguinte. Motivo + Oportunidade + Meio = Autoria.', penalty: 150 }
    ],
    suspects: [
      { name: 'Renata Bittencourt Salgueiro', role: 'Filha / Diretora Financeira', motive: 'Evitar destituição e prisão', alibi: 'Falso', evidence: 'Digital na caneta, log do app, auditoria de R$ 9,3mi' },
      { name: 'Rodrigo Bittencourt Castro', role: 'Filho do Meio', motive: 'Dívidas', alibi: 'Corroborado', evidence: 'Ao telefone com corretor de apostas' },
      { name: 'Camila Bittencourt Vasques', role: 'Filha Caçula', motive: 'Nenhum', alibi: 'Corroborado', evidence: 'Na varanda com o marido (câmera ativa)' },
      { name: 'Fábio Duarte Peixoto', role: 'Genro', motive: 'Nenhum', alibi: 'Corroborado', evidence: 'Na varanda com a esposa (câmera ativa)' }
    ]
  },
  'ipes': {
    title: 'Solar dos Ipês',
    code: 'IPES-275',
    password: 'IPES-275',
    difficulty: 'Fácil',
    evidenceCount: 8,
    maxScore: 1000,
    hints: [
      { level: 1, text: 'A vítima morreu de overdose de digoxina 4x acima do terapêutico. O chá de camomila foi o veículo. Quem preparou a bandeja?', penalty: 50 },
      { level: 2, text: 'A impressão de Cecília foi encontrada no dosador eletrônico. O log registrou acesso com sua senha às 20h19min por 41 segundos.', penalty: 100 },
      { level: 3, text: 'A auditoria confirmou desvio de R$ 14,7 milhões. O novo testamento reduziria Cecília de 25% para 4%. Motivo + Oportunidade + Meio = Autoria.', penalty: 150 }
    ],
    suspects: [
      { name: 'Cecília Ramalho Duprat', role: 'Filha / Diretora Financeira', motive: 'Evitar exclusão da herança', alibi: 'Falso', evidence: 'Digital no dosador, log de acesso, auditoria de R$ 14,7mi' },
      { name: 'Marcelo Ramalho', role: 'Filho do Meio', motive: 'Dívidas', alibi: 'Corroborado', evidence: 'Ao telefone com corretor de apostas' },
      { name: 'Beatriz Ramalho Sant'Anna', role: 'Filha Caçula', motive: 'Nenhum', alibi: 'Corroborado', evidence: 'Na varanda com o marido (câmera ativa)' },
      { name: 'Ivo Salgado Nogueira', role: 'Genro', motive: 'Nenhum', alibi: 'Corroborado', evidence: 'Na varanda com a esposa (câmera ativa)' }
    ]
  },
  'capao': {
    title: 'Protocolo Capão Alto',
    code: 'CAPAO-589',
    password: 'CAPAO-589',
    difficulty: 'Difícil',
    evidenceCount: 6,
    maxScore: 1000,
    hints: [
      { level: 1, text: 'A vítima foi dissolvida em hidróxido de potássio no tanque de uma usina de biodiesel. A falha estequiométrica preservou fragmentos ósseos.', penalty: 50 },
      { level: 2, text: 'Uma luva de nitrila com perfuração revelou a digital de Diana Ferraz Kowalski ("Enfermeira"). Ela tinha conhecimento técnico de enfermagem.', penalty: 100 },
      { level: 3, text: 'O roteador mesh offline continha mensagens não sincronizadas. O smartphone descartado no bueiro tinha sondas Wi-Fi que traçaram o trajeto até o galpão.', penalty: 150 }
    ],
    suspects: [
      { name: 'Diana Ferraz Kowalski ("Enfermeira")', role: 'Executora / Coordenadora', motive: 'Dinheiro', alibi: 'Falso', evidence: 'Digital na luva, conhecimento técnico, mensagens no roteador' },
      { name: 'Lucas Henrique Vidal ("Logístico")', role: 'Executor / Transporte', motive: 'Dinheiro', alibi: 'Falso', evidence: 'Digital na bomba de infusão, movimentação do veículo' },
      { name: 'Murilo Sanches Prado ("Bit")', role: 'Especialista Digital', motive: 'Dinheiro', alibi: 'Falso', evidence: 'Roteador mesh, carteira de criptoativos, sondas Wi-Fi' },
      { name: 'Ricardo Montenegro ("Mestre")', role: 'Mentor / Financiador', motive: 'Obtenção de criptoativos', alibi: 'Falso', evidence: 'Compra do equipamento, pagamento em Monero' }
    ]
  }
};

// ===== ESTADO DO JOGO =====
const GameState = {
  // Carregar estado do localStorage
  load() {
    const saved = localStorage.getItem('trueCrimeState');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      unlockedCases: [],
      caseProgress: {},
      totalScore: 0,
      casesSolved: 0,
      hintsUsed: {},
      accusations: {}
    };
  },

  // Salvar estado
  save(state) {
    localStorage.setItem('trueCrimeState', JSON.stringify(state));
  },

  // Desbloquear caso
  unlockCase(caseId) {
    const state = this.load();
    if (!state.unlockedCases.includes(caseId)) {
      state.unlockedCases.push(caseId);
      state.caseProgress[caseId] = {
        currentTab: 0,
        hintsRevealed: [],
        score: 1000,
        solved: false,
        accusationMade: false
      };
      this.save(state);
      return true;
    }
    return false;
  },

  // Verificar se caso está desbloqueado
  isUnlocked(caseId) {
    const state = this.load();
    return state.unlockedCases.includes(caseId);
  },

  // Revelar pista
  revealHint(caseId, level) {
    const state = this.load();
    if (!state.caseProgress[caseId]) {
      state.caseProgress[caseId] = { currentTab: 0, hintsRevealed: [], score: 1000, solved: false, accusationMade: false };
    }
    if (!state.caseProgress[caseId].hintsRevealed.includes(level)) {
      state.caseProgress[caseId].hintsRevealed.push(level);
      const penalty = CASES_CONFIG[caseId].hints[level - 1].penalty;
      state.caseProgress[caseId].score -= penalty;
      this.save(state);
      return { revealed: true, penalty };
    }
    return { revealed: false, penalty: 0 };
  },

  // Verificar pista revelada
  isHintRevealed(caseId, level) {
    const state = this.load();
    return state.caseProgress[caseId]?.hintsRevealed?.includes(level) || false;
  },

  // Avançar aba
  advanceTab(caseId) {
    const state = this.load();
    if (state.caseProgress[caseId]) {
      state.caseProgress[caseId].currentTab++;
      this.save(state);
    }
  },

  // Obter aba atual
  getCurrentTab(caseId) {
    const state = this.load();
    return state.caseProgress[caseId]?.currentTab || 0;
  },

  // Fazer acusação
  makeAccusation(caseId, suspect, motive, evidence) {
    const state = this.load();
    if (!state.caseProgress[caseId]) return false;

    state.caseProgress[caseId].accusationMade = true;
    state.accusations[caseId] = { suspect, motive, evidence, date: new Date().toISOString() };
    this.save(state);
    return true;
  },

  // Resolver caso
  solveCase(caseId) {
    const state = this.load();
    if (state.caseProgress[caseId]) {
      state.caseProgress[caseId].solved = true;
      state.casesSolved++;
      state.totalScore += state.caseProgress[caseId].score;
      this.save(state);
    }
  },

  // Verificar se resolvido
  isSolved(caseId) {
    const state = this.load();
    return state.caseProgress[caseId]?.solved || false;
  },

  // Obter pontuação
  getScore(caseId) {
    const state = this.load();
    return state.caseProgress[caseId]?.score || 1000;
  },

  // Resetar tudo
  resetAll() {
    localStorage.removeItem('trueCrimeState');
  },

  // Obter estatísticas
  getStats() {
    const state = this.load();
    return {
      unlocked: state.unlockedCases.length,
      solved: state.casesSolved,
      totalScore: state.totalScore,
      totalCases: Object.keys(CASES_CONFIG).length
    };
  }
};

// ===== MODAL DE SENHA =====
const PasswordModal = {
  currentCase: null,
  onSuccess: null,

  open(caseId, onSuccess) {
    this.currentCase = caseId;
    this.onSuccess = onSuccess;
    const modal = document.getElementById('passwordModal');
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');

    if (modal) {
      modal.classList.add('active');
      input.value = '';
      input.focus();
      error.textContent = '';
    }
  },

  close() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
      modal.classList.remove('active');
    }
    this.currentCase = null;
    this.onSuccess = null;
  },

  verify() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    const password = input.value.trim().toUpperCase();

    if (!this.currentCase) return;

    const config = CASES_CONFIG[this.currentCase];
    if (!config) return;

    if (password === config.password) {
      GameState.unlockCase(this.currentCase);
      this.close();
      if (this.onSuccess) {
        this.onSuccess();
      }
      showToast('Caso desbloqueado! Boa investigação, detetive.', 'success');
    } else {
      error.textContent = 'Código de acesso incorreto. Verifique seu cartão do caso.';
      input.style.animation = 'shake 0.5s';
      setTimeout(() => { input.style.animation = ''; }, 500);
    }
  }
};

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : '!';
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icon}</span>
    <span style="font-size: 0.85rem; color: var(--text);">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// ===== TABS SYSTEM =====
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('locked')) return;

      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(tabId)?.classList.add('active');
    });
  });
}

// ===== HINT SYSTEM =====
function revealHint(caseId, level) {
  const result = GameState.revealHint(caseId, level);

  if (result.revealed) {
    const content = document.getElementById(`hint-${caseId}-${level}`);
    if (content) {
      content.classList.add('revealed');
    }

    const btn = document.getElementById(`hint-btn-${caseId}-${level}`);
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'REVELADA';
    }

    showToast(`Pista Nível ${level} revelada! -${result.penalty} pontos`, 'warning');
    updateScoreDisplay(caseId);
  }
}

function updateScoreDisplay(caseId) {
  const scoreEl = document.getElementById(`score-${caseId}`);
  if (scoreEl) {
    scoreEl.textContent = GameState.getScore(caseId);
  }
}

// ===== ACCUSATION SYSTEM =====
function submitAccusation(caseId) {
  const suspect = document.getElementById(`accusation-suspect-${caseId}`)?.value;
  const motive = document.getElementById(`accusation-motive-${caseId}`)?.value;
  const evidence = document.getElementById(`accusation-evidence-${caseId}`)?.value;

  if (!suspect || !motive || !evidence) {
    showToast('Preencha todos os campos da acusação.', 'error');
    return;
  }

  GameState.makeAccusation(caseId, suspect, motive, evidence);

  // Verificar se acertou
  const config = CASES_CONFIG[caseId];
  const mainSuspect = config.suspects[0].name;

  if (suspect === mainSuspect) {
    GameState.solveCase(caseId);
    showToast('Acusação correta! Caso resolvido!', 'success');

    // Atualizar UI
    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    showToast('Acusação incorreta. Reavalie as evidências.', 'error');
  }
}

// ===== SOLUTION REVEAL =====
function revealSolution(caseId) {
  const confirmed = confirm('ATENÇÃO: Revelar a solução zerará sua pontuação neste caso. Deseja continuar?');
  if (confirmed) {
    const state = GameState.load();
    if (state.caseProgress[caseId]) {
      state.caseProgress[caseId].score = 0;
      GameState.save(state);
    }

    const solutionPanel = document.getElementById(`solution-${caseId}`);
    if (solutionPanel) {
      solutionPanel.classList.remove('locked');
      solutionPanel.innerHTML = `
        <div class="solution-reveal-title">✓ SOLUÇÃO REVELADA</div>
        <div class="solution-reveal-text" style="text-align: left; margin-top: 1.5rem;">
          ${getSolutionText(caseId)}
        </div>
      `;
    }

    showToast('Solução revelada. Pontuação zerada.', 'warning');
  }
}

function getSolutionText(caseId) {
  const solutions = {
    'metalurgia': `
      <p><strong>CULPADO:</strong> Marcos Aurélio da Silva ("Alemão") — Executor de Campo</p>
      <p><strong>MOTIVO:</strong> Dinheiro — executou o sequestro e assassinato por extorsão</p>
      <p><strong>EVIDÊNCIAS CHAVE:</strong></p>
      <ul style="margin-left: 1.5rem; color: var(--text-muted);">
        <li>Digitais nos frascos de cetamina (13 pontos AFIS)</li>
        <li>Digitais no galão de diesel e painel do gerador</li>
        <li>Mensagem deletada: "Apaga o garoto logo e liga o forno"</li>
        <li>Trauma craniano antes da queima no forno de 1.100°C</li>
      </ul>
    `,
    'genesis': `
      <p><strong>CULPADO:</strong> Dr. Caio Rodrigues Martins — Pesquisador Adjunto</p>
      <p><strong>MOTIVO:</strong> Roubo da patente oncológica e royalties milionários</p>
      <p><strong>EVIDÊNCIAS CHAVE:</strong></p>
      <ul style="margin-left: 1.5rem; color: var(--text-muted);">
        <li>DNA na alça da caneca térmica e no frasco de Azida de Sódio</li>
        <li>Sniffer USB conectado ao sequenciador (cópia às 14h21min)</li>
        <li>Micro-SD com logs de servidor na Suíça e depósito em criptoativos</li>
        <li>Azida de Sódio no sangue: 45 mg/L (dose letal)</li>
      </ul>
    `,
    'tanino': `
      <p><strong>CULPADO:</strong> Rogério Villar Castanheira — Sobrinho / Administrador Financeiro</p>
      <p><strong>MOTIVO:</strong> Ocultar desvio de R$ 2,3 milhões da vinícola</p>
      <p><strong>EVIDÊNCIAS CHAVE:</strong></p>
      <ul style="margin-left: 1.5rem; color: var(--text-muted);">
        <li>Digitais na rolha do decantador (13 pontos AFIS)</li>
        <li>Digitais no frasco conta-gotas e na tesoura de poda</li>
        <li>Buscas no celular: "aconitina dose letal sem sabor"</li>
        <li>Aconitina no sangue com assinatura química do jardim da propriedade</li>
      </ul>
    `,
    'camelias': `
      <p><strong>CULPADO:</strong> Renata Bittencourt Salgueiro — Filha / Diretora Financeira</p>
      <p><strong>MOTIVO:</strong> Evitar destituição do cargo e prisão por desvio de R$ 9,3 milhões</p>
      <p><strong>EVIDÊNCIAS CHAVE:</strong></p>
      <ul style="margin-left: 1.5rem; color: var(--text-muted);">
        <li>Impressão digital no botão da caneta de insulina (13 pontos AFIS)</li>
        <li>Log do aplicativo: dose de 32 UI às 21h50min pelo celular de Renata</li>
        <li>Marca de punção atípica na região abdominal (não na coxa)</li>
        <li>Auditoria confirmou desvio de R$ 9,3 milhões em contratos superfaturados</li>
      </ul>
    `,
    'ipes': `
      <p><strong>CULPADO:</strong> Cecília Ramalho Duprat — Filha / Diretora Financeira</p>
      <p><strong>MOTIVO:</strong> Evitar exclusão da herança (25% → 4%) e prisão por R$ 14,7 milhões</p>
      <p><strong>EVIDÊNCIAS CHAVE:</strong></p>
      <ul style="margin-left: 1.5rem; color: var(--text-muted);">
        <li>Impressão digital no dosador eletrônico (13 pontos AFIS)</li>
        <li>Log de acesso: senha de Cecília às 20h19min por 41 segundos</li>
        <li>Digoxina 4x acima do terapêutico no sangue da vítima</li>
        <li>Auditoria confirmou desvio de R$ 14,7 milhões da holding familiar</li>
      </ul>
    `,
    'capao': `
      <p><strong>CULPADO:</strong> Diana Ferraz Kowalski ("Enfermeira") — Executora / Coordenadora</p>
      <p><strong>MOTIVO:</strong> Obtenção de criptoativos (Monero) mediante sequestro e extorsão</p>
      <p><strong>EVIDÊNCIAS CHAVE:</strong></p>
      <ul style="margin-left: 1.5rem; color: var(--text-muted);">
        <li>Digital na luva de nitrila perfurada (14 pontos AFIS)</li>
        <li>Conhecimento técnico de dosagem de reagentes químicos</li>
        <li>Roteador mesh com mensagens: "Sem Monero não fecha"</li>
        <li>Smartphone com sondas Wi-Fi traçando trajeto até o galpão</li>
      </ul>
    `
  };
  return solutions[caseId] || '';
}

// ===== LIGHTBOX =====
function openLightbox(src) {
  const lightbox = document.getElementById('lightbox') || createLightbox();
  const img = lightbox.querySelector('img');
  img.src = src;
  lightbox.classList.add('active');
}

function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" onclick="closeLightbox()">×</button>
    <img src="" alt="">
  `;
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.body.appendChild(lightbox);
  return lightbox;
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('active');
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
  const loading = document.getElementById('loadingScreen');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
    }, 1500);
  }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  hideLoadingScreen();
  initTabs();
  initScrollToTop();

  // Atualizar estatísticas na homepage
  updateHomeStats();

  // Atualizar cards de casos
  updateCaseCards();
});

function updateHomeStats() {
  const stats = GameState.getStats();
  const unlockedEl = document.getElementById('stat-unlocked');
  const solvedEl = document.getElementById('stat-solved');
  const scoreEl = document.getElementById('stat-score');

  if (unlockedEl) unlockedEl.textContent = `${stats.unlocked}/${stats.totalCases}`;
  if (solvedEl) solvedEl.textContent = `${stats.solved}/${stats.totalCases}`;
  if (scoreEl) scoreEl.textContent = stats.totalScore.toLocaleString();
}

function updateCaseCards() {
  const state = GameState.load();

  Object.keys(CASES_CONFIG).forEach(caseId => {
    const card = document.getElementById(`case-card-${caseId}`);
    if (!card) return;

    const status = card.querySelector('.case-card-status');
    const btn = card.querySelector('.case-action-btn');

    if (state.unlockedCases.includes(caseId)) {
      status?.classList.add('unlocked');
      if (btn) {
        btn.classList.remove('btn-locked');
        btn.classList.add('btn-primary');
        btn.textContent = 'INVESTIGAR';
        btn.href = `cases/${caseId}.html`;
      }
    }
  });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    PasswordModal.close();
    closeLightbox();
  }

  if (e.key === 'Enter') {
    const modal = document.getElementById('passwordModal');
    if (modal?.classList.contains('active')) {
      PasswordModal.verify();
    }
  }
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🔍 TRUE CRIME INVESTIGAÇÕES', 'color: #c9a84c; font-size: 20px; font-weight: bold;');
console.log('%c"A verdade está nos detalhes."', 'color: #6b6b7b; font-style: italic;');
console.log('%cDica: Use o console para debug, mas não para trapacear. ;)', 'color: #4a4a5a; font-size: 11px;');
