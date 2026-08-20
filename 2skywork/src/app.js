const STORAGE_KEY = 'careloop:skywork-demo:v1';
const CHANNEL_NAME = 'careloop-skywork-demo';
const modifiers = ['少盐', '少油', '不辣', '不加葱', '不加姜', '易咀嚼'];
const statusLabels = {
  SENT_TO_KITCHEN: '已发送后厨',
  COOKING: '制作中',
  READY_FOR_DELIVERY: '待配送',
  DELIVERING: '配送中',
  COMPLETED: '已完成'
};

const seed = () => ({
  menu: [
    { id: 'DISH-001', name: '宫保鸡丁', nameEn: 'Kung Pao chicken', priceCents: 680, category: '主菜', available: true },
    { id: 'DISH-002', name: '清蒸鱼', nameEn: 'Steamed fish', priceCents: 920, category: '主菜', available: true },
    { id: 'DISH-003', name: '红烧肉', nameEn: 'Braised pork', priceCents: 750, category: '主菜', available: true },
    { id: 'DISH-004', name: '酸辣土豆丝', nameEn: 'Hot-and-sour potatoes', priceCents: 420, category: '配菜', available: true },
    { id: 'DISH-005', name: '番茄炒蛋', nameEn: 'Tomato and egg', priceCents: 520, category: '主菜', available: true },
    { id: 'DISH-006', name: '西兰花炒虾仁', nameEn: 'Broccoli with shrimp', priceCents: 890, category: '主菜', available: true },
    { id: 'DISH-007', name: '小米粥', nameEn: 'Millet congee', priceCents: 300, category: '饮品', available: true },
    { id: 'DISH-008', name: '可乐', nameEn: 'Cola', priceCents: 380, category: '饮品', available: true }
  ],
  tables: ['A01', 'A02', 'A03', 'A05', 'A12', 'B01', 'B05', 'B08', 'C03', 'C06'],
  orders: [],
  sessions: [],
  locale: 'zh-CN',
  updatedAt: new Date().toISOString()
});

function readState() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return value?.menu && value?.orders ? value : seed();
  } catch {
    return seed();
  }
}

let data = readState();
let cart = [];
let selectedTable = 'A12';
let toastTimer;
const channel = 'BroadcastChannel' in window ? new BroadcastChannel(CHANNEL_NAME) : null;

function persist(message = '数据已同步') {
  data.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  channel?.postMessage({ type: 'changed', at: data.updatedAt });
  if (message) toast(message);
}

channel?.addEventListener('message', () => {
  data = readState();
  render();
});
window.addEventListener('storage', event => {
  if (event.key === STORAGE_KEY) {
    data = readState();
    render();
  }
});

const app = document.querySelector('#app');
const money = cents => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(cents / 100);
const uid = prefix => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
const screen = () => new URLSearchParams(location.search).get('screen') || 'customer';
const dish = id => data.menu.find(item => item.id === id);
const escapeHtml = value => String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[char]);

function toast(message) {
  document.querySelector('.toast')?.remove();
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  document.body.append(node);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.remove(), 2600);
}

function go(next) {
  const url = new URL(location.href);
  url.searchParams.set('screen', next);
  history.pushState({}, '', url);
  render();
}

function shell(content) {
  const active = screen();
  return `<div class="shell">
    <header class="topbar">
      <div class="brand"><div class="logo">🍲</div><div><h1>CareLoop</h1><p>让每一餐都更贴心 · Skywork Demo</p></div></div>
      <nav class="nav" aria-label="演示界面">
        <button data-screen="customer" class="${active === 'customer' ? 'active' : ''}">顾客点餐</button>
        <button data-screen="staff" class="${active === 'staff' ? 'active' : ''}">员工协助</button>
        <button data-screen="admin" class="${active === 'admin' ? 'active' : ''}">管理后台</button>
      </nav>
      <div class="utility"><button id="resetDemo">重置演示数据</button></div>
    </header>
    <main>${content}</main>
  </div>`;
}

function customerView() {
  const available = data.menu.filter(item => item.available);
  const cartTotal = cart.reduce((sum, item) => sum + dish(item.dishId).priceCents * item.quantity, 0);
  const last = data.orders.at(-1);
  return shell(`
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">● 智能语音点餐</p>
        <h2>开口就能点，吃得更安心。</h2>
        <p class="lead">为长者和社区居民设计的友好点餐体验。说出菜名、数量和口味，CareLoop 帮你整理好。</p>
        <div class="chips">
          <button class="chip" data-example="我要三份酸辣土豆丝，一份番茄炒蛋，两份红烧肉，少盐少油，A12桌">多人点餐</button>
          <button class="chip" data-example="一份清蒸鱼，不加姜，A12桌">清淡口味</button>
          <button class="chip" data-example="一份小米粥，易咀嚼，A12桌">长者友好</button>
        </div>
      </div>
      <div class="voice-box">
        <label for="voiceText">告诉我你想吃什么</label>
        <textarea id="voiceText" placeholder="例如：我要一份宫保鸡丁，少盐不辣，A12桌"></textarea>
        <div class="actions" style="margin-top:10px">
          <button id="parseVoice" class="btn">✨ 智能识别</button>
          <button id="requestStaff" class="btn secondary">👩‍🍳 请求员工</button>
        </div>
        <div id="voiceResult" class="notice" hidden></div>
      </div>
    </section>
    <div class="grid">
      <section class="card">
        <div class="section-head"><div><h2>今日菜单</h2><p class="muted">选择菜品后可调整口味</p></div><span class="badge">${available.length} 道供应中</span></div>
        <div class="menu">${available.map(item => `
          <article class="dish">
            <div><span class="badge">${item.category}</span><h3>${item.name}</h3><small class="muted">${item.nameEn}</small><div class="price">${money(item.priceCents)}</div></div>
            <button class="btn small" data-add="${item.id}">加入</button>
          </article>`).join('')}</div>
        <h3 style="margin-top:24px">选择桌号</h3>
        <div class="table-grid">${data.tables.map(table => `<button class="table-btn ${selectedTable === table ? 'active' : ''}" data-table="${table}">${table}<br><small>可用</small></button>`).join('')}</div>
      </section>
      <aside class="card sticky">
        <div class="section-head"><h2>我的订单</h2><span class="badge">${selectedTable} 桌</span></div>
        <div id="cart">${cart.length ? cart.map((item, index) => {
          const currentDish = dish(item.dishId);
          return `<div class="cart-row"><div><b>${currentDish.name}</b><br><small class="muted">${item.modifiers.join('、') || '标准口味'}</small></div><div class="qty"><button data-dec="${index}">−</button><b>${item.quantity}</b><button data-inc="${index}">+</button></div></div>`;
        }).join('') : '<div class="empty">还没有选择菜品</div>'}</div>
        ${cart.length ? `<div class="modifier-list">${modifiers.map(value => `<label class="modifier"><input type="checkbox" data-cart-modifier="${value}">${value}</label>`).join('')}</div>` : ''}
        <div class="total"><span>合计</span><span>${money(cartTotal)}</span></div>
        <button id="submitOrder" class="btn coral" style="width:100%" ${cart.length ? '' : 'disabled'}>确认下单</button>
        ${last ? `<div class="notice success"><b>最近订单 ${last.id}</b><br>${last.tableNumber} 桌 · ${statusLabels[last.status] || last.status}</div>` : ''}
      </aside>
    </div>`);
}

function parseVoice(text) {
  const items = [];
  const numberMap = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6 };
  for (const item of data.menu.filter(value => value.available)) {
    const index = text.indexOf(item.name);
    if (index < 0) continue;
    const before = text.slice(Math.max(0, index - 5), index);
    const digit = before.match(/\d+/)?.[0];
    const chinese = [...before].reverse().find(char => numberMap[char]);
    items.push({ dishId: item.id, quantity: digit ? Number(digit) : numberMap[chinese] || 1, modifiers: modifiers.filter(value => text.includes(value)) });
  }
  const table = text.match(/[ABC]\d{2}/i)?.[0]?.toUpperCase();
  return { items, table };
}

function submitOrder() {
  if (!cart.length) return;
  const order = {
    id: `ORD-${String(data.orders.length + 1).padStart(3, '0')}`,
    tableNumber: selectedTable,
    items: cart.map(item => ({ ...item, dishName: dish(item.dishId).name, unitPriceCents: dish(item.dishId).priceCents })),
    totalCents: cart.reduce((sum, item) => sum + dish(item.dishId).priceCents * item.quantity, 0),
    status: 'SENT_TO_KITCHEN',
    source: 'SELF',
    createdAt: new Date().toISOString()
  };
  data.orders.push(order);
  cart = [];
  persist(`订单 ${order.id} 已发送到后厨`);
  render();
}

function staffView() {
  const pending = data.sessions.filter(item => item.status !== 'SUBMITTED');
  const kitchen = data.orders.filter(item => item.status !== 'COMPLETED');
  return shell(`
    <section class="card wide" style="margin-bottom:20px">
      <div class="section-head"><div><p class="eyebrow">STAFF CONSOLE</p><h2>员工协助中心</h2><p class="muted">接收顾客求助、修正点餐内容，并协调后厨与配送。</p></div><div class="status-line"><span class="status-dot"></span>实时演示已连接</div></div>
    </section>
    <div class="split">
      <section class="card">
        <div class="section-head"><h2>待处理语音会话</h2><span class="badge warn">${pending.length} 待处理</span></div>
        ${data.sessions.length ? data.sessions.map(session => `<article class="order-card session"><header><b>${session.id}</b><span class="badge ${session.status === 'SUBMITTED' ? '' : 'warn'}">${session.status === 'SUBMITTED' ? '已提交' : session.status === 'CLAIMED' ? '处理中' : '需要协助'}</span></header><p>${escapeHtml(session.transcript || '顾客尚未输入内容')}</p><p class="muted">桌号：${session.tableNumber || '待确认'}</p><div class="actions">${session.status === 'NEEDS_STAFF' ? `<button class="btn small" data-claim="${session.id}">认领</button>` : ''}</div>${session.status === 'CLAIMED' ? `<label for="correction-${session.id}"><b>修正后的点餐内容</b></label><textarea id="correction-${session.id}" data-session-input="${session.id}" style="margin-top:8px">${escapeHtml(session.transcript)}</textarea><button class="btn small coral" data-submit-session="${session.id}" style="margin-top:8px">提交修正</button>` : ''}</article>`).join('') : '<div class="empty">暂时没有顾客求助</div>'}
      </section>
      <section class="card">
        <div class="section-head"><h2>后厨与配送任务</h2><span class="badge">${kitchen.length} 进行中</span></div>
        ${data.orders.length ? [...data.orders].reverse().map(order => `<article class="order-card"><header><b>${order.id} · ${order.tableNumber}桌</b><span class="badge">${statusLabels[order.status]}</span></header><p>${order.items.map(item => `${item.dishName} × ${item.quantity}`).join('、')}</p><div class="flow"><span class="${order.status === 'SENT_TO_KITCHEN' ? 'badge' : ''}">已接单</span>→<span class="${order.status === 'COOKING' ? 'badge' : ''}">制作中</span>→<span class="${order.status === 'READY_FOR_DELIVERY' ? 'badge' : ''}">待配送</span>→<span class="${order.status === 'DELIVERING' ? 'badge' : ''}">配送中</span>→<span class="${order.status === 'COMPLETED' ? 'badge' : ''}">完成</span></div><div class="actions" style="margin-top:12px">${nextOrderButton(order)}</div></article>`).join('') : '<div class="empty">顾客下单后，任务会显示在这里</div>'}
      </section>
    </div>`);
}

function nextOrderButton(order) {
  const next = {
    SENT_TO_KITCHEN: ['COOKING', '开始制作'],
    COOKING: ['READY_FOR_DELIVERY', '制作完成'],
    READY_FOR_DELIVERY: ['DELIVERING', '开始配送'],
    DELIVERING: ['COMPLETED', '确认送达']
  }[order.status];
  return next ? `<button class="btn small" data-order-status="${order.id}" data-next-status="${next[0]}">${next[1]}</button>` : '<span class="muted">流程已完成</span>';
}

function adminView() {
  const revenue = data.orders.reduce((sum, order) => sum + order.totalCents, 0);
  const active = data.menu.filter(item => item.available).length;
  return shell(`
    <section class="card" style="margin-bottom:20px">
      <div class="section-head"><div><p class="eyebrow">ADMIN DASHBOARD</p><h2>食堂运营总览</h2><p class="muted">所有数据仅保存在当前浏览器，用于比赛交互展示。</p></div><span class="badge">Demo 数据</span></div>
      <div class="stats"><div class="stat">今日订单<strong>${data.orders.length}</strong></div><div class="stat">模拟营业额<strong>${money(revenue)}</strong></div><div class="stat">供应菜品<strong>${active}</strong></div><div class="stat">员工协助<strong>${data.sessions.length}</strong></div></div>
    </section>
    <div class="split">
      <section class="card">
        <div class="section-head"><h2>菜品管理</h2><span class="badge">${data.menu.length} 道菜</span></div>
        ${data.menu.map(item => `<div class="list-row"><div><b>${item.name}</b><br><small class="muted">${item.category} · ${money(item.priceCents)}</small></div><button class="btn small ${item.available ? 'secondary' : 'ghost'}" data-toggle-dish="${item.id}">${item.available ? '供应中' : '已下架'}</button></div>`).join('')}
      </section>
      <section class="card">
        <div class="section-head"><h2>订单记录</h2><button id="exportOrders" class="btn small secondary">导出演示 CSV</button></div>
        ${data.orders.length ? [...data.orders].reverse().map(order => `<article class="order-card"><header><b>${order.id}</b><span class="badge">${statusLabels[order.status]}</span></header><p>${order.tableNumber} 桌 · ${money(order.totalCents)}</p><p class="muted">${order.items.map(item => `${item.dishName} × ${item.quantity}`).join('、')}</p></article>`).join('') : '<div class="empty">尚无订单，请先在顾客端完成下单</div>'}
      </section>
    </div>`);
}

function exportCsv() {
  const lines = ['订单号,桌号,金额,状态,创建时间', ...data.orders.map(order => [order.id, order.tableNumber, (order.totalCents / 100).toFixed(2), statusLabels[order.status], order.createdAt].join(','))];
  const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'careloop-demo-orders.csv' });
  link.click();
  URL.revokeObjectURL(link.href);
}

function bindCommon() {
  document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => go(button.dataset.screen)));
  document.querySelector('#resetDemo')?.addEventListener('click', () => {
    if (!confirm('确定重置所有演示数据吗？')) return;
    data = seed();
    cart = [];
    selectedTable = 'A12';
    persist('演示数据已重置');
    render();
  });
}

function bindCustomer() {
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
    const existing = cart.find(item => item.dishId === button.dataset.add);
    if (existing) existing.quantity += 1;
    else cart.push({ dishId: button.dataset.add, quantity: 1, modifiers: [] });
    render();
  }));
  document.querySelectorAll('[data-inc]').forEach(button => button.addEventListener('click', () => { cart[Number(button.dataset.inc)].quantity += 1; render(); }));
  document.querySelectorAll('[data-dec]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.dec);
    cart[index].quantity -= 1;
    if (cart[index].quantity < 1) cart.splice(index, 1);
    render();
  }));
  document.querySelectorAll('[data-table]').forEach(button => button.addEventListener('click', () => { selectedTable = button.dataset.table; render(); }));
  document.querySelectorAll('[data-cart-modifier]').forEach(input => input.addEventListener('change', () => {
    cart.forEach(item => {
      if (input.checked && !item.modifiers.includes(input.dataset.cartModifier)) item.modifiers.push(input.dataset.cartModifier);
      if (!input.checked) item.modifiers = item.modifiers.filter(value => value !== input.dataset.cartModifier);
    });
    toast(input.checked ? `已为订单添加“${input.dataset.cartModifier}”` : `已取消“${input.dataset.cartModifier}”`);
  }));
  document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => { document.querySelector('#voiceText').value = button.dataset.example; }));
  document.querySelector('#parseVoice')?.addEventListener('click', () => {
    const text = document.querySelector('#voiceText').value.trim();
    const result = document.querySelector('#voiceResult');
    if (!text) { result.hidden = false; result.textContent = '请先输入点餐内容。'; return; }
    const parsed = parseVoice(text);
    if (parsed.table && data.tables.includes(parsed.table)) selectedTable = parsed.table;
    parsed.items.forEach(item => {
      const existing = cart.find(value => value.dishId === item.dishId);
      if (existing) existing.quantity += item.quantity;
      else cart.push(item);
    });
    if (!parsed.items.length) { result.hidden = false; result.textContent = '暂时没有识别到菜单中的菜品，请换一种说法。'; return; }
    toast(`已识别 ${parsed.items.length} 种菜品`);
    render();
  });
  document.querySelector('#requestStaff')?.addEventListener('click', () => {
    const transcript = document.querySelector('#voiceText').value.trim();
    const session = { id: uid('HELP'), transcript, tableNumber: selectedTable, status: 'NEEDS_STAFF', createdAt: new Date().toISOString() };
    data.sessions.push(session);
    persist('已通知工作人员，请稍候');
    const result = document.querySelector('#voiceResult');
    result.hidden = false;
    result.textContent = `求助请求 ${session.id} 已发送。可切换到“员工协助”查看。`;
  });
  document.querySelector('#submitOrder')?.addEventListener('click', submitOrder);
}

function bindStaff() {
  document.querySelectorAll('[data-claim]').forEach(button => button.addEventListener('click', () => {
    const session = data.sessions.find(item => item.id === button.dataset.claim);
    session.status = 'CLAIMED';
    persist(`已认领 ${session.id}`);
    render();
  }));
  document.querySelectorAll('[data-submit-session]').forEach(button => button.addEventListener('click', () => {
    const session = data.sessions.find(item => item.id === button.dataset.submitSession);
    const corrected = document.querySelector(`[data-session-input="${button.dataset.submitSession}"]`).value.trim();
    if (!corrected) { toast('请填写修正后的点餐内容'); return; }
    session.transcript = corrected;
    session.status = 'SUBMITTED';
    persist(`修正结果已提交给顾客`);
    render();
  }));
  document.querySelectorAll('[data-order-status]').forEach(button => button.addEventListener('click', () => {
    const order = data.orders.find(item => item.id === button.dataset.orderStatus);
    order.status = button.dataset.nextStatus;
    persist(`${order.id} 更新为“${statusLabels[order.status]}”`);
    render();
  }));
}

function bindAdmin() {
  document.querySelectorAll('[data-toggle-dish]').forEach(button => button.addEventListener('click', () => {
    const item = dish(button.dataset.toggleDish);
    item.available = !item.available;
    persist(`${item.name} 已${item.available ? '恢复供应' : '下架'}`);
    render();
  }));
  document.querySelector('#exportOrders')?.addEventListener('click', exportCsv);
}

function render() {
  const current = screen();
  app.innerHTML = current === 'staff' ? staffView() : current === 'admin' ? adminView() : customerView();
  bindCommon();
  if (current === 'customer') bindCustomer();
  if (current === 'staff') bindStaff();
  if (current === 'admin') bindAdmin();
}

window.addEventListener('popstate', render);
render();
