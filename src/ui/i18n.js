const messages = {
  'zh-CN': {
    appTitle: 'CareLoop · 开口就能点餐', tagline: '社区食堂智能点餐 · v0.1.0 Demo', openToday: '今天也在，慢慢点', companionNote: '嗨，我是小暖，陪你把这顿饭点好',
    modeCustomer: '顾客点餐', modeProxy: '为他人点餐', modeStaff: '工作人员', modeKitchen: '后厨 / 传送带',
    voiceEyebrow: 'AI 语音点餐', voiceConsoleLabel: '放心说，我在听', greeting: '你好，<br>想吃什么，直接说。', greetingProxy: '为对方点些什么，直接说。', greetingFor: '正在为 {name} 点餐，想吃什么，直接说。',
    voiceSupport: '菜名、数量、口味和桌号，可以一次说完。我们会先生成订单给您确认，不会直接下单。', example1: '“一份少盐红烧肉”', example2: '“两份不辣的鱼，再来碗粥”', example1Value: '我要一份少盐的红烧肉，A12桌', example2Value: '我要两份不辣的鱼，再来一碗粥，A12桌',
    stepSpeak: '说出需求', stepReview: '核对订单', stepConfirm: '确认下单', voiceStart: '开始说话', voiceStartAria: '开始语音点餐', voiceHint: '点击麦克风 · 说完后自动识别', voiceLabel: '识别到的内容', voiceLabelStaff: '识别到的内容 · 工作人员已修正', voicePlaceholder: '语音内容会显示在这里，也可以直接输入文字…', voicePreview: '识别并生成预览', voiceRetry: '重新识别', staffHelp: '需要工作人员帮助', voiceApply: '确认并加入订单',
    browseMenu: '浏览菜单', browseHint: '也可以手动选择菜品和餐桌', chooseTable: '选择固定餐桌', tablePrompt: '下单前请确认并选择您所在的固定餐桌，餐品会按桌号配送。', tableSelected: '已选择 <b>{table} 桌</b>，餐品将配送到这里。', available: '空桌', occupied: '占用',
    orderPreview: '订单预览', pending: '待确认', emptyOrder: '还没有选择菜品', total: '总计', payment: '支付方式', cash: '线下现金', wechat: '微信（模拟）', alipay: '支付宝（模拟）', submit: '预览并确认订单',
    proxyTitle: '为他人点餐', proxyIntro: '这是一份独立的代点订单，请先确认收餐人，再为对方选择菜品与桌号。', proxyBanner: '本次正在为 {name} 点餐', changeRecipient: '更换点餐对象',
    staffTitle: '工作人员协助台', staffIntro: '先认领会话，再核对原始表达并修正菜品、口味和桌号。', currentSession: '当前会话：', waitingClaim: '等待接管', staffPlaceholder: '工作人员可在这里填写修正后的点餐内容', claim: '认领会话', submitCorrection: '提交修正，等待顾客确认', helpTitle: '协助说明', helpText: '提交修正只会把结果交回顾客确认，不会直接下单；顾客确认后才会进入后厨。', backCustomer: '返回顾客端',
    kitchenTasks: '后厨任务', refresh: '刷新任务', conveyor: '传送带模拟器', conveyorHint: '状态由服务端任务推进，配送目标必须是合法桌号。', currentOrder: '当前订单状态', noOrder: '尚未创建订单',
    proxyDialogTitle: '您要为谁点餐？', proxyDialogHelp: '请输入对方的姓名或称呼，我们会在下单前再次提醒您确认。', recipient: '姓名或称呼', recipientPlaceholder: '例如：妈妈、陈先生、小王', cancel: '取消', confirmRecipient: '确认，开始点餐',
    customize: '定制口味', quantity: '数量', special: '其他要求（选填）', specialPlaceholder: '例如：酱汁另放（最多 80 字）', addOrder: '加入订单', save: '保存修改', add: '加入', edit: '改口味', remove: '移除', optionalFlavor: '可选口味', defaultFlavor: '默认口味',
    requestFailed: '请求失败', quantityError: '数量请输入 1–20 的整数。', recipientError: '请输入点餐对象的姓名或称呼。', menuUpdated: '菜单已实时更新。', unavailableRemoved: '菜单已更新，已从订单中移除 {count} 个下架菜品。',
    previewUnknown: '{source}：暂时无法确认修正后的菜品。解析：UNKNOWN · 置信度 {confidence}%。请修改内容后重新识别。{candidates}', previewDone: '{source}完成：{text}。{items}{table}请核对后点击“确认并加入订单”。', orderContent: '订单内容：{items}。', tableContent: ' 餐桌 {table}。', candidates: ' 候选：{items}', voiceSource: '语音识别', staffSource: '工作人员修正',
    ttsUnknown: '没有听清，请重新说一次，或请工作人员帮助。', ttsReview: '请检查结果后再加入订单', voiceGenericError: '语音识别失败，请重试或选择工作人员帮助。', voiceUnsupported: '当前浏览器不支持语音识别，请使用文字输入或工作人员帮助。', micDenied: '麦克风权限被拒绝，请允许权限或使用文字输入。', notClear: '没有听清，请再说一次。', noSpeech: '没有听到有效内容，请再说一次。', enterVoice: '请先输入文字或点击开始说话。', stop: '停止', processing: '正在整理语音…', applied: ' 已应用到订单草稿，请继续检查。',
    staffSubmitted: '已提交 · 等待工作人员认领', staffTransferred: '已转工作人员协助，请稍候核对订单。', noStaffSession: '当前没有待接管会话', claimed: '已认领 · 请核对并修正', correctionRequired: '请填写修正后的点餐内容', correctionSubmitted: '修正已提交 · 已交回顾客确认',
    confirmOrder: '请确认{recipient}的订单：{items}，共 {total}，{table}桌', recipientPart: '为 {name} ', orderConfirmed: '订单已确认并进入后厨制作。', startCooking: '开始制作', finishCooking: '制作完成', noTasks: '暂无任务', dispatch: '开始配送', delivered: '已送达', noConveyor: '暂无传送带任务', sessionExpired: '语音会话已过期，请重新开始。', tableNumber: '桌号：{table}'
  },
  'en': {
    appTitle: 'CareLoop · Order by speaking', tagline: 'Smart community canteen ordering · v0.1.0 Demo', openToday: 'Here today — take your time', companionNote: 'Hi, I’m Sunny. I’ll help you order your meal',
    modeCustomer: 'Order', modeProxy: 'Order for someone', modeStaff: 'Staff', modeKitchen: 'Kitchen / Conveyor',
    voiceEyebrow: 'AI VOICE ORDERING', voiceConsoleLabel: 'Take your time — I’m listening', greeting: 'Hello,<br>just say what you would like.', greetingProxy: 'Tell us what they would like.', greetingFor: 'Ordering for {name}. What would they like?',
    voiceSupport: 'Say the dishes, quantities, preferences, and table number in one go. We will always show a preview before placing the order.', example1: '“One braised pork, less salt”', example2: '“Two steamed fish, no spice, and congee”', example1Value: 'One braised pork with less salt for table A12', example2Value: 'Two steamed fish with no spice and one millet congee for table A12',
    stepSpeak: 'Say your order', stepReview: 'Review', stepConfirm: 'Confirm', voiceStart: 'Start speaking', voiceStartAria: 'Start voice ordering', voiceHint: 'Tap the microphone · recognition stops after silence', voiceLabel: 'Recognized text', voiceLabelStaff: 'Recognized text · corrected by staff', voicePlaceholder: 'Your speech appears here. You can also type…', voicePreview: 'Recognize & preview', voiceRetry: 'Recognize again', staffHelp: 'Ask staff for help', voiceApply: 'Confirm & add to order',
    browseMenu: 'Browse menu', browseHint: 'You can also choose dishes and a table manually', chooseTable: 'Choose your table', tablePrompt: 'Select the fixed table where you are seated. Your meal will be delivered there.', tableSelected: '<b>Table {table}</b> selected. Your meal will be delivered here.', available: 'Available', occupied: 'Occupied',
    orderPreview: 'Order preview', pending: 'Pending', emptyOrder: 'No dishes selected yet', total: 'Total', payment: 'Payment', cash: 'Cash at counter', wechat: 'WeChat (demo)', alipay: 'Alipay (demo)', submit: 'Preview & confirm order',
    proxyTitle: 'Order for someone', proxyIntro: 'This is a separate order. Confirm the recipient first, then choose their dishes and table.', proxyBanner: 'Ordering for {name}', changeRecipient: 'Change recipient',
    staffTitle: 'Staff assistance', staffIntro: 'Claim the session, review the original request, then correct dishes, preferences, and table.', currentSession: 'Current session:', waitingClaim: 'Waiting to be claimed', staffPlaceholder: 'Enter the corrected order here', claim: 'Claim session', submitCorrection: 'Submit correction for customer review', helpTitle: 'How assistance works', helpText: 'Corrections are returned to the customer for confirmation and never place an order directly. Only confirmed orders enter the kitchen.', backCustomer: 'Back to ordering',
    kitchenTasks: 'Kitchen tasks', refresh: 'Refresh tasks', conveyor: 'Conveyor simulator', conveyorHint: 'The server advances task status. Every delivery target must be a valid table.', currentOrder: 'Current order status', noOrder: 'No order has been created',
    proxyDialogTitle: 'Who are you ordering for?', proxyDialogHelp: 'Enter their name or how you refer to them. We will remind you to confirm before ordering.', recipient: 'Name', recipientPlaceholder: 'For example: Mom, Mr. Chen, Alex', cancel: 'Cancel', confirmRecipient: 'Confirm & start ordering',
    customize: 'Customize preferences', quantity: 'Quantity', special: 'Other requests (optional)', specialPlaceholder: 'For example: sauce on the side (max. 80 characters)', addOrder: 'Add to order', save: 'Save changes', add: 'Add', edit: 'Edit', remove: 'Remove', optionalFlavor: 'Preferences available', defaultFlavor: 'Default preferences',
    requestFailed: 'Request failed', quantityError: 'Enter a whole number from 1 to 20.', recipientError: 'Enter the recipient’s name.', menuUpdated: 'The menu has been updated.', unavailableRemoved: '{count} unavailable item(s) were removed from your order.',
    previewUnknown: '{source}: We could not identify a dish yet. Result: UNKNOWN · confidence {confidence}%. Edit the text and try again.{candidates}', previewDone: '{source} complete: {text}. {items}{table}Review it, then select “Confirm & add to order.”', orderContent: 'Order: {items}. ', tableContent: 'Table {table}. ', candidates: ' Suggestions: {items}.', voiceSource: 'Voice recognition', staffSource: 'Staff correction',
    ttsUnknown: 'I did not catch that. Please try again or ask a staff member for help.', ttsReview: 'Please review the result before adding it to your order.', voiceGenericError: 'Voice recognition failed. Try again or ask staff for help.', voiceUnsupported: 'This browser does not support voice recognition. Type your order or ask staff for help.', micDenied: 'Microphone access was denied. Allow access or type your order.', notClear: 'I did not catch that. Please try again.', noSpeech: 'No speech was detected. Please try again.', enterVoice: 'Type an order or start speaking first.', stop: 'Stop', processing: 'Processing speech…', applied: ' Added to your draft order. Please continue reviewing it.',
    staffSubmitted: 'Submitted · waiting for staff', staffTransferred: 'Sent to staff. Please wait while they review the order.', noStaffSession: 'There is no session waiting for staff', claimed: 'Claimed · review and correct it', correctionRequired: 'Enter the corrected order', correctionSubmitted: 'Correction submitted · returned to customer',
    confirmOrder: 'Confirm {recipient}order: {items}. Total {total}, table {table}', recipientPart: 'the order for {name}: ', orderConfirmed: 'Order confirmed and sent to the kitchen.', startCooking: 'Start cooking', finishCooking: 'Finish cooking', noTasks: 'No tasks', dispatch: 'Start delivery', delivered: 'Delivered', noConveyor: 'No conveyor tasks', sessionExpired: 'The voice session expired. Please start again.', tableNumber: 'Table: {table}'
  }
};

const englishDishNames = { '宫保鸡丁':'Kung Pao chicken', '清蒸鱼':'Steamed fish', '红烧肉':'Braised pork', '酸辣土豆丝':'Hot-and-sour shredded potatoes', '番茄炒蛋':'Tomato and egg', '西兰花炒虾仁':'Broccoli with shrimp', '小米粥':'Millet congee', '可乐':'Cola' };
const englishModifiers = { '少盐':'Less salt', '无盐':'No salt', '少辣':'Less spicy', '不辣':'Not spicy', '少油':'Less oil', '无油':'No oil', '不加葱':'No scallion', '不加姜':'No ginger', '软一点':'Softer', '易咀嚼':'Easy to chew' };

export const CareLoopI18n = {
  messages,
  t(locale, key, vars = {}) {
    const value = messages[locale]?.[key] ?? messages['zh-CN'][key] ?? key;
    return Object.entries(vars).reduce((text, [name, replacement]) => text.replaceAll(`{${name}}`, String(replacement)), value);
  },
  dish(locale, name) { return locale === 'en' ? englishDishNames[name] || name : name; },
  modifier(locale, name) { return locale === 'en' ? englishModifiers[name] || name : name; },
  apply(locale) {
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    document.title = this.t(locale, 'appTitle');
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = this.t(locale, node.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(node => { node.innerHTML = this.t(locale, node.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => { node.placeholder = this.t(locale, node.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(node => { node.setAttribute('aria-label', this.t(locale, node.dataset.i18nAriaLabel)); });
    document.querySelectorAll('[data-i18n-content]').forEach(node => { node.dataset.localizedContent = this.t(locale, node.dataset.i18nContent); });
  }
};

window.CareLoopI18n = CareLoopI18n;
