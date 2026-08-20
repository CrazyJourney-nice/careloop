(function () {
  'use strict';

  const STORAGE_KEY = 'careloop:pages-demo:v2';
  const CHANNEL_NAME = 'careloop:pages-demo';
  const sockets = new Set();
  const channel = 'BroadcastChannel' in window ? new BroadcastChannel(CHANNEL_NAME) : null;
  const now = () => new Date().toISOString();
  const uid = prefix => `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const menuSeed = [
    ['DISH-001', '宫保鸡丁', 'Kung Pao chicken', 680, 'MAIN'],
    ['DISH-002', '清蒸鱼', 'Steamed fish', 920, 'MAIN'],
    ['DISH-003', '红烧肉', 'Braised pork', 750, 'MAIN'],
    ['DISH-004', '酸辣土豆丝', 'Hot-and-sour shredded potatoes', 420, 'SIDE'],
    ['DISH-005', '番茄炒蛋', 'Tomato and egg', 520, 'MAIN'],
    ['DISH-006', '西兰花炒虾仁', 'Broccoli with shrimp', 890, 'MAIN'],
    ['DISH-007', '小米粥', 'Millet congee', 300, 'DRINK'],
    ['DISH-008', '可乐', 'Cola', 380, 'DRINK']
  ].map(([id, name, nameEn, priceCents, category]) => ({
    id, canteenId: 'CAN001', name, nameEn,
    description: `${name} · CareLoop 演示菜品`,
    descriptionEn: `${nameEn} · CareLoop demo dish`,
    priceCents, category, available: true,
    allergens: [],
    supportedModifiers: ['少盐', '少油', '不辣', '不加葱', '不加姜', '易咀嚼'],
    imageUrl: null, createdAt: now(), updatedAt: now()
  }));

  const tableSeed = [
    ['TBL-A01', 'A01'], ['TBL-A02', 'A02'], ['TBL-A12', 'A12'],
    ['TBL-B01', 'B01'], ['TBL-B05', 'B05']
  ].map(([id, tableNumber], index) => ({
    id, canteenId: 'CAN001', tableNumber, area: tableNumber[0],
    capacity: index % 2 ? 4 : 6, status: 'AVAILABLE', createdAt: now(), updatedAt: now()
  }));

  function seed() {
    return { menu: menuSeed, tables: tableSeed, orders: [], voiceSessions: [], staffSessions: [], kitchenTasks: [], conveyorTasks: [], updatedAt: now() };
  }

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return value?.menu && value?.orders ? value : seed();
    } catch {
      return seed();
    }
  }

  let state = read();
  if (new URLSearchParams(location.search).get('reset') === '1') {
    localStorage.removeItem(STORAGE_KEY);
    state = seed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const cleanUrl = new URL(location.href);
    cleanUrl.searchParams.delete('reset');
    location.replace(cleanUrl);
  }

  function emitLocal(type, payload) {
    const event = { type, payload, at: now() };
    sockets.forEach(socket => socket._emit(event));
    channel?.postMessage(event);
  }

  function save(type, payload) {
    state.updatedAt = now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (type) emitLocal(type, payload);
  }

  channel?.addEventListener('message', event => {
    state = read();
    sockets.forEach(socket => socket._emit(event.data));
  });
  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) state = read();
  });

  class DemoWebSocket {
    static CONNECTING = 0;
    static OPEN = 1;
    static CLOSING = 2;
    static CLOSED = 3;
    constructor() {
      this.readyState = DemoWebSocket.CONNECTING;
      sockets.add(this);
      setTimeout(() => {
        this.readyState = DemoWebSocket.OPEN;
        this.onopen?.(new Event('open'));
        this._emit({ type: 'connected', payload: { version: 'pages-demo' }, at: now() });
      }, 20);
    }
    _emit(message) {
      if (this.readyState !== DemoWebSocket.OPEN) return;
      this.onmessage?.(new MessageEvent('message', { data: JSON.stringify(message) }));
    }
    send() {}
    close() {
      this.readyState = DemoWebSocket.CLOSED;
      sockets.delete(this);
      this.onclose?.(new CloseEvent('close'));
    }
    addEventListener(type, listener) { this[`on${type}`] = listener; }
    removeEventListener(type, listener) { if (this[`on${type}`] === listener) this[`on${type}`] = null; }
  }
  window.WebSocket = DemoWebSocket;

  const json = (value, status = 200) => new Response(status === 204 ? null : JSON.stringify(value), {
    status,
    headers: status === 204 ? {} : { 'Content-Type': 'application/json' }
  });
  const bodyOf = options => {
    try { return options?.body ? JSON.parse(options.body) : {}; }
    catch { return {}; }
  };
  const tableOf = input => state.tables.find(table => table.id === input.tableId || table.tableNumber === input.tableNumber);
  const totalOf = items => items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
  const orderForAdmin = order => ({ ...order, tableNumber: state.tables.find(table => table.id === order.tableId)?.tableNumber || order.tableId, customerName: order.source === 'FOR_OTHERS' ? '李阿姨' : '张三', totalCents: totalOf(order.items) });

  function preview(input) {
    const table = tableOf(input);
    if (!table) throw new Error('请选择有效桌号');
    const items = (input.items || []).map(raw => {
      const menuItem = state.menu.find(item => item.id === raw.dishId || item.name === raw.dishName);
      if (!menuItem?.available) throw new Error('菜品当前不可用');
      return {
        id: uid('ITEM'), dishId: menuItem.id, dishNameSnapshot: menuItem.name,
        unitPriceCents: menuItem.priceCents, quantity: Math.max(1, Number(raw.quantity || 1)),
        modifiers: raw.modifiers || [], allergenWarnings: {}, specialInstructions: raw.specialInstructions || ''
      };
    });
    if (!items.length) throw new Error('请至少选择一道菜');
    return { tableId: table.id, tableNumber: table.tableNumber, items, totalCents: totalOf(items), paymentMethods: ['WECHAT', 'ALIPAY', 'CASH'] };
  }

  const aliases = {
    '土豆丝': '酸辣土豆丝', '鱼': '清蒸鱼', '鸡丁': '宫保鸡丁',
    'kung pao chicken': '宫保鸡丁', 'steamed fish': '清蒸鱼', 'braised pork': '红烧肉',
    'hot and sour shredded potatoes': '酸辣土豆丝', 'tomato and egg': '番茄炒蛋',
    'broccoli with shrimp': '西兰花炒虾仁', 'millet congee': '小米粥', 'cola': '可乐'
  };
  const numbers = { 一: 1, 两: 2, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, one: 1, two: 2, three: 3, four: 4, five: 5 };
  const modifierNames = text => ['少盐', '少油', '不辣', '不加葱', '不加姜', '易咀嚼'].filter(value => text.includes(value));

  function parseIntent(rawText, language = 'zh-CN') {
    const normalizedText = String(rawText || '').trim().toLowerCase();
    const mentions = [];
    for (const menuItem of state.menu.filter(item => item.available)) {
      const names = [menuItem.name, menuItem.nameEn.toLowerCase(), ...Object.entries(aliases).filter(([, target]) => target === menuItem.name).map(([alias]) => alias)];
      const matched = names.map(name => ({ name, index: normalizedText.indexOf(name.toLowerCase()) })).filter(item => item.index >= 0).sort((a, b) => a.index - b.index)[0];
      if (matched) mentions.push({ menuItem, index: matched.index, matchedName: matched.name });
    }
    mentions.sort((a, b) => a.index - b.index);
    const items = mentions.map((mention, index) => {
      const previousEnd = index ? mentions[index - 1].index + mentions[index - 1].matchedName.length : 0;
      const prefix = normalizedText.slice(previousEnd, mention.index);
      const digit = prefix.match(/\d+/)?.[0];
      const word = Object.keys(numbers).find(value => prefix.includes(value));
      return { dishQuery: mention.matchedName, dishName: mention.menuItem.name, dishId: mention.menuItem.id, quantity: digit ? Number(digit) : numbers[word] || 1, modifiers: modifierNames(normalizedText) };
    });
    const tableQuery = normalizedText.match(/[abc]\s*\d{1,2}/i)?.[0]?.replace(/\s/g, '').toUpperCase() || null;
    const confidence = items.length ? 0.96 : 0.2;
    return {
      intent: items.length ? 'ADD_ITEM' : 'UNKNOWN', language: language === 'en-US' ? 'en-US' : 'zh-CN',
      rawText, normalizedText, asrConfidence: 0.96, confidence, items, tableQuery,
      candidates: items.map(item => ({ name: item.dishName, confidence: 0.96 })), needsConfirmation: true
    };
  }

  function advance(order, status, notes) {
    order.status = status;
    order.updatedAt = now();
    order.statusHistory.push({ status, timestamp: now(), notes });
    save('order.status_changed', order);
  }

  function filteredMenu(url) {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const category = url.searchParams.get('category') || '';
    const available = url.searchParams.get('available') || '';
    return state.menu.filter(item => (!q || `${item.name} ${item.nameEn} ${item.description}`.toLowerCase().includes(q)) && (!category || item.category === category) && (!available || String(item.available) === available));
  }

  function filteredOrders(url) {
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const status = url.searchParams.get('status') || '';
    const source = url.searchParams.get('source') || '';
    return state.orders.map(orderForAdmin).filter(order => (!q || `${order.id} ${order.orderNumber} ${order.customerName} ${order.tableNumber} ${order.items.map(item => item.dishNameSnapshot).join(' ')}`.toLowerCase().includes(q)) && (!status || order.status === status) && (!source || order.source === source)).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  }

  async function route(input, options = {}) {
    const url = new URL(typeof input === 'string' ? input : input.url, location.origin);
    if (!url.pathname.startsWith('/api')) return window.__careloopNativeFetch(input, options);
    state = read();
    const method = String(options.method || 'GET').toUpperCase();
    const body = bodyOf(options);
    const path = url.pathname;
    try {
      if (method === 'GET' && path === '/api/canteens/CAN001/menu') return json(state.menu.filter(item => item.available));
      if (method === 'GET' && path === '/api/canteens/CAN001/tables') return json(state.tables);
      if (method === 'GET' && path === '/api/orders') return json(state.orders);
      if (method === 'POST' && path === '/api/orders/preview') return json(preview(body));
      if (method === 'POST' && path === '/api/orders') {
        const value = preview(body);
        const createdAt = now();
        const order = {
          id: uid('ORD'), orderNumber: `CL${String(state.orders.length + 1).padStart(5, '0')}`,
          canteenId: 'CAN001', createdByUserId: 'USR-001', customerUserId: 'USR-002',
          tableId: value.tableId, source: body.forOthers ? 'FOR_OTHERS' : (body.source || 'SELF'),
          status: body.forOthers ? 'PENDING_CONFIRMATION' : 'DRAFT', paymentMethod: body.paymentMethod,
          language: body.language || 'zh-CN', items: value.items, createdAt, updatedAt: createdAt,
          statusHistory: [{ status: body.forOthers ? 'PENDING_CONFIRMATION' : 'DRAFT', timestamp: createdAt, notes: '订单已创建' }]
        };
        state.orders.push(order); save('order.created', order); return json(order, 201);
      }
      let match = path.match(/^\/api\/orders\/([^/]+)\/confirm$/);
      if (method === 'POST' && match) {
        const order = state.orders.find(item => item.id === match[1]);
        if (!order) return json({ error: '订单不存在' }, 404);
        advance(order, 'CONFIRMED', '顾客确认'); advance(order, body.paymentMethod === 'CASH' ? 'PAY_AT_COUNTER' : 'PAID', '演示支付完成'); advance(order, 'SENT_TO_KITCHEN', '已发送后厨');
        const task = { id: uid('KIT'), orderId: order.id, status: 'QUEUED', createdAt: now(), updatedAt: now() };
        state.kitchenTasks.push(task); save('kitchen.task_created', task); return json({ ...order, kitchenTask: task });
      }
      if (method === 'POST' && path === '/api/voice/sessions') {
        const session = { id: uid('VS'), language: body.language || 'zh-CN', status: 'ACTIVE', rawTranscript: '', createdAt: now(), updatedAt: now() };
        state.voiceSessions.push(session); save(); return json(session, 201);
      }
      match = path.match(/^\/api\/voice\/sessions\/([^/]+)\/preview$/);
      if (method === 'POST' && match) {
        const session = state.voiceSessions.find(item => item.id === match[1]);
        if (!session) return json({ error: '语音会话不存在' }, 404);
        const intent = parseIntent(body.rawText || body.text, session.language);
        Object.assign(session, { rawTranscript: body.rawText || body.text || '', normalizedText: intent.normalizedText, intentSnapshot: intent, status: 'PREVIEW_READY', updatedAt: now() });
        save('voice.preview_ready', { sessionId: session.id, intent }); return json({ session, intent, confirmed: false });
      }
      match = path.match(/^\/api\/voice\/sessions\/([^/]+)\/request-staff$/);
      if (method === 'POST' && match) {
        const session = state.voiceSessions.find(item => item.id === match[1]);
        if (!session) return json({ error: '语音会话不存在' }, 404);
        const staffSession = { id: uid('STAFF'), status: 'NEEDS_STAFF', transcript: session.rawTranscript || '', claimedBy: null, updatedAt: now(), voiceSessionId: session.id };
        state.staffSessions.push(staffSession); session.status = 'STAFF_ASSIST'; session.staffSessionId = staffSession.id;
        save('voice.staff_requested', { sessionId: session.id, staffSession }); emitLocal('staff.session_updated', staffSession); return json({ session, staffSession }, 201);
      }
      if (method === 'GET' && path === '/api/staff/sessions') return json(state.staffSessions);
      match = path.match(/^\/api\/staff\/sessions\/([^/]+)\/claim$/);
      if (method === 'POST' && match) {
        const session = state.staffSessions.find(item => item.id === match[1]);
        if (!session) return json({ error: '会话不存在' }, 404);
        Object.assign(session, { status: 'CLAIMED', claimedBy: 'USR-003', updatedAt: now() }); save('staff.session_updated', session); return json(session);
      }
      match = path.match(/^\/api\/staff\/sessions\/([^/]+)$/);
      if (method === 'PATCH' && match) {
        const staffSession = state.staffSessions.find(item => item.id === match[1]);
        if (!staffSession) return json({ error: '会话不存在' }, 404);
        Object.assign(staffSession, { transcript: body.transcript ?? staffSession.transcript, status: body.status ?? staffSession.status, updatedAt: now() });
        save('staff.session_updated', staffSession);
        if (staffSession.status === 'SUBMITTED' && staffSession.voiceSessionId) {
          const voiceSession = state.voiceSessions.find(item => item.id === staffSession.voiceSessionId);
          const intent = parseIntent(staffSession.transcript, voiceSession?.language);
          if (voiceSession) Object.assign(voiceSession, { rawTranscript: staffSession.transcript, normalizedText: intent.normalizedText, intentSnapshot: intent, status: 'PREVIEW_READY', updatedAt: now() });
          const payload = { sessionId: staffSession.voiceSessionId, staffSessionId: staffSession.id, transcript: staffSession.transcript, intent };
          emitLocal('staff.correction_submitted', payload); return json({ staffSession, voiceSession, intent });
        }
        return json({ staffSession });
      }
      if (method === 'GET' && path === '/api/kitchen/tasks') return json(state.kitchenTasks);
      match = path.match(/^\/api\/kitchen\/tasks\/([^/]+)\/(start|complete)$/);
      if (method === 'POST' && match) {
        const task = state.kitchenTasks.find(item => item.id === match[1]);
        if (!task) return json({ error: '后厨任务不存在' }, 404);
        const order = state.orders.find(item => item.id === task.orderId);
        if (match[2] === 'start') { task.status = 'COOKING'; advance(order, 'COOKING', '开始制作'); }
        else {
          task.status = 'READY'; advance(order, 'READY_FOR_DELIVERY', '制作完成');
          const tableNumber = state.tables.find(table => table.id === order.tableId)?.tableNumber || order.tableId;
          const conveyorTask = { id: uid('CV'), orderId: order.id, tableNumber, trayCode: `TRAY-${String(state.conveyorTasks.length + 1).padStart(2, '0')}`, status: 'READY', createdAt: now(), updatedAt: now() };
          state.conveyorTasks.push(conveyorTask); save('conveyor.task_created', conveyorTask); return json({ kitchenTask: task, conveyorTask });
        }
        save(); return json(task);
      }
      if (method === 'GET' && path === '/api/conveyor/tasks') return json(state.conveyorTasks);
      match = path.match(/^\/api\/conveyor\/tasks\/([^/]+)\/(dispatch|deliver)$/);
      if (method === 'POST' && match) {
        const task = state.conveyorTasks.find(item => item.id === match[1]);
        if (!task) return json({ error: '配送任务不存在' }, 404);
        const order = state.orders.find(item => item.id === task.orderId);
        if (match[2] === 'dispatch') { task.status = 'IN_PROGRESS'; advance(order, 'DELIVERING', '开始配送'); }
        else { task.status = 'DELIVERED'; advance(order, 'DELIVERED', '已送达'); advance(order, 'COMPLETED', '订单完成'); }
        save(); return json(match[2] === 'deliver' ? { conveyorTask: task, order } : task);
      }
      if (method === 'GET' && path === '/api/admin/summary') {
        const orders = state.orders.map(orderForAdmin);
        const revenueCents = orders.filter(order => !['DRAFT', 'CANCELLED', 'REJECTED'].includes(order.status)).reduce((sum, order) => sum + order.totalCents, 0);
        const sales = new Map();
        orders.forEach(order => order.items.forEach(item => { const value = sales.get(item.dishId) || { dishId: item.dishId, name: item.dishNameSnapshot, quantity: 0, revenueCents: 0 }; value.quantity += item.quantity; value.revenueCents += item.unitPriceCents * item.quantity; sales.set(item.dishId, value); }));
        return json({ menuCount: state.menu.length, availableMenuCount: state.menu.filter(item => item.available).length, orderCount: orders.length, todayOrderCount: orders.length, revenueCents, averageOrderCents: orders.length ? Math.round(revenueCents / orders.length) : 0, topDishes: [...sales.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 5) });
      }
      if (method === 'GET' && path === '/api/admin/menu') return json(filteredMenu(url));
      if (method === 'POST' && path === '/api/admin/menu') {
        const item = { id: uid('DISH'), canteenId: 'CAN001', ...body, createdAt: now(), updatedAt: now() };
        state.menu.push(item); save('menu.updated', { action: 'CREATED', item }); return json(item, 201);
      }
      match = path.match(/^\/api\/admin\/menu\/([^/]+)$/);
      if (match && method === 'PATCH') {
        const item = state.menu.find(value => value.id === match[1]); if (!item) return json({ error: '菜品不存在' }, 404);
        Object.assign(item, body, { updatedAt: now() }); save('menu.updated', { action: 'UPDATED', item }); return json(item);
      }
      if (match && method === 'DELETE') {
        if (state.orders.some(order => order.items.some(item => item.dishId === match[1]))) return json({ error: '该菜品已有订单记录，请改为下架以保留历史数据' }, 409);
        state.menu = state.menu.filter(item => item.id !== match[1]); save('menu.updated', { action: 'DELETED', itemId: match[1] }); return json(null, 204);
      }
      if (method === 'GET' && path === '/api/admin/orders') {
        const result = filteredOrders(url); const page = Math.max(1, Number(url.searchParams.get('page') || 1)); const pageSize = Math.max(1, Number(url.searchParams.get('pageSize') || 20));
        return json({ items: result.slice((page - 1) * pageSize, page * pageSize), meta: { page, pageSize, total: result.length, totalPages: Math.max(1, Math.ceil(result.length / pageSize)) } });
      }
      match = path.match(/^\/api\/admin\/orders\/([^/]+)$/);
      if (method === 'GET' && match) {
        const order = state.orders.find(item => item.id === match[1]); return order ? json(orderForAdmin(order)) : json({ error: '订单不存在' }, 404);
      }
      return json({ error: `Demo API 未实现：${method} ${path}` }, 404);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : '演示操作失败' }, 400);
    }
  }

  window.__careloopNativeFetch = window.fetch.bind(window);
  window.fetch = route;

  function exportCsv() {
    state = read();
    const rows = state.orders.map(orderForAdmin).map(order => [order.orderNumber, order.createdAt, order.customerName, order.tableNumber, order.source, order.status, order.items.map(item => `${item.dishNameSnapshot}×${item.quantity}`).join('；'), (order.totalCents / 100).toFixed(2)]);
    const escape = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
    const csv = '\uFEFF订单号,下单时间,顾客,桌号,来源,状态,菜品,金额（元）\n' + rows.map(row => row.map(escape).join(',')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    link.download = `careloop-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click(); URL.revokeObjectURL(link.href);
  }

  document.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('#exportOrders')) {
      event.preventDefault(); event.stopImmediatePropagation(); exportCsv();
    }
  }, true);

  window.CareLoopPagesDemo = {
    reset() { localStorage.removeItem(STORAGE_KEY); state = seed(); save('demo.reset', {}); location.reload(); },
    inspect() { return structuredClone(read()); }
  };
})();
