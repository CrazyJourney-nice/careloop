import sys
from pathlib import Path
sys.path.insert(0, str(Path('/Users/cj/careloop/tmp/docx-careloop')))
from build_brief import (
    Document, Inches, Pt, RGBColor, WD_ALIGN_PARAGRAPH, WD_BREAK,
    WD_TABLE_ALIGNMENT, BLUE, BLUE_DARK, TEAL, CORAL, GRAY, LIGHT_BLUE,
    PALE_TEAL, GOLD, RED, BLACK, add_header_footer, setup_styles, add_para,
    add_rich_para, heading, bullet, numbered, callout, table, page_break, source
)

OUT = Path('/Users/cj/careloop/michk/Careloop_Maker_in_China_HK_2026_PPT_Optimization_Guide.docx')

def build():
    doc = Document()
    setup_styles(doc)
    add_header_footer(doc)

    add_para(doc, 'CARELOOP', size=12, color=TEAL, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, after=8)
    add_para(doc, 'Maker in China Hong Kong 2026', size=23, color=BLUE_DARK, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, after=4)
    add_para(doc, 'PPT 优化指导书', size=19, color=TEAL, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, after=14)
    add_para(doc, '以《Group 5-暖桌Careloop》25 页旧版为基线，结合 TeaVita AI 已提交样本、当前 Careloop UI 与香港站公开信息', size=10.5, color=GRAY, align=WD_ALIGN_PARAGRAPH.CENTER, after=20)
    callout(doc, '本指南解决的问题', '旧版适合学校创客展示，但当前需要一套更像比赛路演的 PPT：重点突出新版 UI、真实可证明的工程能力，主动说明目前没有线下试点，并把赛后验证写成路线图。', fill=PALE_TEAL)
    table(doc, ['使用方式', '说明'], [
        ['第一部分', '确定新版 PPT 的叙事、页数、时间和证据规则'],
        ['第二部分', '逐页改稿：旧版页面如何处理、新版页面写什么'],
        ['第三部分', '新版 UI Demo 应如何进入 PPT 和现场演示'],
        ['第四部分', '没有线下试点时，如何填充内容而不造数据'],
        ['第五部分', '排版、素材、讲稿、答辩和提交检查表'],
    ], [2100,7260], font_size=10)
    source(doc, '本文是 PPT 修改指导，不是商业计划书或完整融资报告。所有“已验证”内容必须与当前 project 实际能力一致。')

    page_break(doc)
    heading(doc, '一、先确定新版 PPT 的比赛任务', 1)
    callout(doc, '新版 PPT 的唯一任务', '在有限时间内让评委记住：Careloop 为谁解决什么问题；现在已经跑通了什么；目前还没有什么；为什么值得赛后在香港继续验证。', fill=LIGHT_BLUE, label_color=BLUE_DARK)
    heading(doc, '不再追求的目标', 2)
    bullet(doc, '不再试图用 25 页覆盖完整的自动化餐饮生态。')
    bullet(doc, '不再用未来的复购率、收入、回本期填充当前空白。')
    bullet(doc, '不再把自动烹饪、传送带、精准营养写成当前已部署能力。')
    bullet(doc, '不再把赛后试点计划写成已经发生的线下成果。')
    heading(doc, '新版 PPT 应该证明的四件事', 2)
    table(doc, ['问题', 'PPT 证据'], [
        ['你们做的是什么？', '一句话定位 + 一张产品总览图'],
        ['产品真的能跑吗？', '新版 UI + 90 秒端到端 Demo + 工程测试结果'],
        ['技术含量在哪里？', '语音意图、确认机制、状态机、人工兜底'],
        ['为什么值得继续？', '香港站赛后验证路线 + 清晰合作诉求'],
    ], [3000,6360], font_size=10)
    heading(doc, '建议主版本长度', 2)
    add_para(doc, '主 PPT：12-14 页；7 分钟演讲。附录：技术架构、完整财务、风险、旧版概念硬件、未来路线。现场 PPT 只保留评委必须理解的内容。', size=12, color=BLUE_DARK, bold=True)

    page_break(doc)
    heading(doc, '二、旧版 PPT 的总体改造方向', 1)
    table(doc, ['旧版特征', '问题', '新版处理'], [
        ['25 页、模块很多', '信息完整但主线分散', '压缩成 12-14 页；其余进附录'],
        ['痛点、生态、机器、社交同时展开', '评委不清楚当前产品到底是什么', '先讲软件闭环，再讲硬件 roadmap'],
        ['广州/GBA 10 社区', '与香港站第一落点错位', '改成 Hong Kong first；赛后再做现场验证'],
        ['大量“Validation Metrics”', '没有真实基线，容易被追问', '改成“当前验证/尚未验证/赛后指标”三栏'],
        ['木板模型和概念图', '视觉上像学校作品，技术证据弱', '新版 UI 截图和真实交互成为主视觉'],
        ['团队分工页', '像内部演讲安排', '改成能力、证据、缺口、合作需求'],
    ], [2250,3300,3810], font_size=9.5)
    heading(doc, '新版 PPT 的叙事弧线', 2)
    add_para(doc, '真实问题 → 一个具体用户 → 新版 UI → 语音点餐闭环 → 失败时人工兜底 → 当前工程验证 → 目前没有线下试点 → 赛后香港验证 → 合作诉求。', size=13, color=BLUE_DARK, bold=True)
    heading(doc, '页面标签系统', 2)
    table(doc, ['标签', '放在页脚或右上角', '使用规则'], [
        ['VALIDATED', '已验证', '当前代码、Demo、测试直接支持'],
        ['EXTERNAL SOURCE', '外部资料', '公开网站、政府/行业报告支持'],
        ['DEMO ASSUMPTION', 'Demo 假设', '为了演示流程的模拟内容'],
        ['TO VALIDATE', '待验证', '需要用户、场地或商业试点支持'],
    ], [1800,2600,4960], font_size=9.5)

    page_break(doc)
    heading(doc, '三、逐页改稿：新版主 PPT 结构', 1)
    table(doc, ['新页', '建议标题与作用', '必须放的内容', '素材'], [
        ['1', 'Careloop：让社区餐饮更容易被长者使用', '一句话定位、当前产品状态、赛道', '新版 UI hero 截图'],
        ['2', '问题不是没有饭，而是点餐、等待和照顾不连续', '长者、家属、食堂三方的一个具体问题', '一条用户场景 + 1-2 个有来源数据'],
        ['3', '为什么现有方案仍然有门槛', '传统食堂、复杂 App、家属代点的缺口', '三列对比；不要超过 6 个短点'],
        ['4', '新版 Careloop：四个角色，一条订单闭环', '长者、家属、工作人员、厨房的关系', '简洁流程图 + UI 缩略图'],
        ['5', '真实 UI：老人模式、家属代点、工作人员模式', '当前 project 的三种模式和核心页面', '当前 project 截图'],
        ['6', '90 秒 Demo：从一句话到一份可履约订单', '语音/文字 → 预览 → 确认 → 厨房 → 配送 → 兜底', '视频或连续截图'],
        ['7', '技术闭环：理解、确认、履约、兜底', '意图解析、置信度、订单状态机、人工协助', '四步技术图'],
        ['8', '我们今天已经验证了什么', '功能清单、测试结果、Demo 边界', '工程证据表'],
        ['9', '我们目前还没有验证什么', '没有线下试点、没有收入/复购/真实成本', '诚实的“已知/未知”表'],
        ['10', 'Hong Kong First：赛后验证路线', '赛后 90 日场景、用户、合作方和指标', '路线图，不写成已完成成果'],
        ['11', '商业模式：先验证软件价值，再接入自动化', '食堂/物业、家属、社区机构三方价值', '收费假设，不给无依据的回本数字'],
        ['12', '风险与人工兜底', '语音、隐私、食品、硬件和运营风险', '风险-控制两列'],
        ['13', '团队与缺口', '做产品的人、当前能力、需要的伙伴', '能力矩阵'],
        ['14', '我们希望从香港站获得什么', '远程反馈、导师、投资者、赛后场景与合作方', '明确 Ask + 结尾句'],
    ], [650,2700,3900,2110], font_size=8.7)
    callout(doc, '页数取舍', '旧版问题、方案、生态、护城河、财务和风险不要全部消失；但凡不能直接服务于 7 分钟主线的内容，都移到附录。', fill='FFF4CC', label_color=GOLD)

    page_break(doc)
    heading(doc, '四、旧版 25 页逐页处理表', 1)
    table(doc, ['旧版页', '处理', '新版去向'], [
        ['1 封面', '保留情感，但减掉成员演讲分工', '新版第 1 页；只保留定位、UI hero 和一句话'],
        ['2-3 痛点/机会', '保留问题，删除无来源或泛化数字', '新版第 2 页；补香港资料来源'],
        ['4 Decision Preview', '概念功能太多', '拆成第 4 页角色闭环和第 10 页赛后路线'],
        ['5 Customer Opportunity', '保留三方价值，减少形容词', '新版第 3/11 页'],
        ['6 Expose the Gap', '保留对比，但更聚焦软件服务', '新版第 3 页'],
        ['7 B-B-C Ecosystem', '保留关系，但不要先讲完整生态', '新版第 4 页；加工作人员角色'],
        ['8-10 Value Bridge/Video', '木板模型不作为主证据', '替换为新版 UI Demo；木板放附录'],
        ['11 Three-Layer Operating System', '后端/硬件/社交三层过大', '拆成第 7 页技术闭环 + 第 10 页 roadmap'],
        ['12 Moat', '删除“已形成数据护城河”', '改成长期积累的运营数据资产，放附录或第 11 页'],
        ['13-15 三个场景', '保留老人/家属/连接，但不用虚构用户画像', '第 2、4、5 页；用真实或明确标注的 persona'],
        ['16 空白/视频过渡', '删除', '用一页工程证据替代'],
        ['17-18 Metrics/Decision Gates', '不要冒充成果', '新版第 9-10 页，改成未知项和赛后验证 Gate'],
        ['19 Financial Baseline', '删除 8 个月回本结论', '附录；只保留成本变量和待验证模型'],
        ['20 Risk', '保留并提前', '新版第 12 页，重点突出人工兜底/隐私'],
        ['21 Ask & Fund Allocation', '融资比例和 10 社区不适配当前证据', '新版第 14 页，改成合作/反馈/赛后试点 Ask'],
        ['22-23 Summary/Close', '保留温度，但避免大而空', '新版第 14 页；结尾回到可运行 Demo'],
        ['24-25 Appendix', '保留为答辩材料', '技术、数据模型、状态机、财务、未来硬件'],
    ], [1200,3900,4260], font_size=9.0)

    page_break(doc)
    heading(doc, '五、新版 UI 应如何进入 PPT', 1)
    heading(doc, '第 5 页：产品总览', 2)
    add_para(doc, '不要放一张很小的完整网页截图。建议选三张裁切图，分别展示老人模式、家属代点、工作人员模式；每张图只配一个动作句。', after=8)
    table(doc, ['截图', '旁边只写一句话'], [
        ['老人模式', '大按钮、语音/文字双通道，先预览再确认'],
        ['家属代点', '子女可以远程创建订单，但仍保留收餐人确认'],
        ['工作人员模式', '识别失败时转人工，不把长者卡在错误页面'],
    ], [2600,6760], font_size=10)
    heading(doc, '第 6 页：用一条订单贯穿 Demo', 2)
    add_para(doc, '示例话术： “我要一份少盐红烧肉、一碗软一点的小米粥，送到 A12 桌。”', size=13, color=BLUE_DARK, bold=True)
    table(doc, ['镜头/截图', '屏幕标签', '不要写成'], [
        ['语音输入', '正在识别', 'AI 已经完全理解老人'],
        ['订单预览', '识别结果 + 置信度', '识别准确率 100%'],
        ['用户确认', '确认后才提交', '自动下单'],
        ['后厨任务', '已发送至厨房', '真实厨房已自动烹饪'],
        ['配送状态', 'Demo 配送状态', '真实传送带已部署'],
        ['异常转人工', '需要工作人员帮助', '系统不会出错'],
    ], [2700,3000,3660], font_size=9.2)
    heading(doc, '第 8 页：工程证据截图', 2)
    bullet(doc, '测试结果：2 个测试文件、9 个测试通过。')
    bullet(doc, '构建结果：TypeScript build 通过；lint 通过。')
    bullet(doc, '可展示的模块：语音会话、订单确认、工作人员协助、后厨状态、配送状态。')
    bullet(doc, '可展示的边界：支付、AICAN 和传送带为 Demo adapter，不接真实扣款或物理设备。')

    page_break(doc)
    heading(doc, '六、没有线下试点时，PPT 如何补内容', 1)
    callout(doc, '不要补造 traction', '没有线下操作并不等于 PPT 只能是空的。应把“市场 traction”换成“产品证据 + 可复现 Demo + 明确未知项 + 赛后验证路线”。', fill=PALE_TEAL)
    table(doc, ['旧版空白位置', '当前可替换内容', '证据标签'], [
        ['用户验证', '目标用户场景、问题假设、赛后研究设计', 'TO VALIDATE'],
        ['市场 traction', '当前 Demo 运行路径、工程测试、构建结果', 'VALIDATED'],
        ['战略合作', '需要的香港伙伴画像和合作方式', 'TO VALIDATE'],
        ['财务结果', '单位经济变量和需要获取的报价', 'DEMO ASSUMPTION'],
        ['护城河', '安全确认、人机协作、运营流程和可积累数据', 'ROADMAP'],
        ['香港落地', '赛后 90 日路线图，不写成已落地', 'TO VALIDATE'],
    ], [2300,4500,2560], font_size=9.2)
    heading(doc, '第 9 页建议直接使用的文字', 2)
    add_para(doc, '当前阶段，我们已完成一个可运行的端到端原型，但尚未进行真实社区线下试点。因此，我们不把复购率、订单量和回本期写成成果；本次 Demo 重点证明产品流程和工程闭环，赛后再在香港场景验证用户、运营和单位经济。', size=12, color=BLUE_DARK, bold=True)
    heading(doc, '赛后路线图页应写什么', 2)
    table(doc, ['阶段', 'PPT 表达'], [
        ['现在', '完成软件 Demo、异常路径和可复现演示'],
        ['赛后 0-30 日', '远程访谈/用户测试、确认合作场景、确定菜单与流程'],
        ['赛后 31-60 日', '小规模真实场景测试，观察任务完成和人工介入'],
        ['赛后 61-90 日', '观察再次使用、成本和合作方意愿，决定优化或扩张'],
    ], [2300,7060], font_size=9.6)

    page_break(doc)
    heading(doc, '七、7 分钟路演节奏与讲稿分配', 1)
    table(doc, ['时间', '页', '讲什么', '目标'], [
        ['0:00-0:30', '1', '一句话定位 + 当前 UI', '让评委知道项目是什么'],
        ['0:30-1:10', '2-3', '一个老人、一个家属、一个食堂的具体问题', '建立必要性'],
        ['1:10-2:00', '4-5', '四角色闭环 + 新版 UI', '解释产品'],
        ['2:00-3:30', '6', '完整 90 秒 Demo', '证明产品能跑'],
        ['3:30-4:20', '7-8', '技术闭环、工程测试、Demo 边界', '证明不是静态概念'],
        ['4:20-5:00', '9', '诚实说明目前没有线下试点', '建立可信度'],
        ['5:00-6:10', '10-12', '赛后路线、商业假设、风险控制', '证明可落地'],
        ['6:10-6:45', '13', '团队能力与缺口', '证明执行者可靠'],
        ['6:45-7:00', '14', '明确 Ask + 一句话收束', '让评委知道下一步如何帮助'],
    ], [1800,900,4300,4360], font_size=9.1)
    heading(doc, '结尾建议', 2)
    add_para(doc, 'Careloop 不是今天就宣称已经解决社区养老餐饮，而是已经把最关键的点餐与履约闭环做成了可运行原型。我们希望通过香港站获得反馈和赛后场景，把一个可用的 Demo 变成一个被真实长者持续使用的服务。', size=12.5, color=BLUE_DARK, bold=True)
    heading(doc, '答辩时的统一口径', 2)
    bullet(doc, '没有线下试点：直接承认，不绕。')
    bullet(doc, '没有真实收入：直接承认，不用预测收入替代。')
    bullet(doc, '当前价值：可运行的软件闭环和可控的人工兜底。')
    bullet(doc, '下一步：赛后香港场景验证，而不是当前节点强行扩张。')

    page_break(doc)
    heading(doc, '八、PPT 视觉与排版规范', 1)
    table(doc, ['项目', '建议'], [
        ['颜色', '保留暖桌的珊瑚红/深蓝，但新版以 UI 的青绿色为产品主色；每页最多 2 个强调色'],
        ['标题', '一页一个结论，不写“Core Validation Metrics”这类泛标题，改成“我们今天已经验证了什么”'],
        ['文字', '中文为主，英文只保留赛道、模块和关键术语；避免中英双栏造成密度过高'],
        ['截图', 'UI 截图必须放大到评委能看清按钮、状态和订单结果；不使用整页小图'],
        ['流程图', '最多 4-6 个节点；箭头先表达“用户动作”，再表达“系统状态”'],
        ['数据', '每个数字都带来源或标签；没有来源就不做大字号 KPI'],
        ['页脚', '统一使用 VALIDATED / EXTERNAL SOURCE / TO VALIDATE / DEMO ASSUMPTION'],
        ['附录', '硬件概念、财务细节、完整 API、风险矩阵和旧版长文案全部放附录'],
    ], [1800,7560], font_size=9.5)
    heading(doc, '建议删除的视觉元素', 2)
    bullet(doc, '重复出现的 “Visual Reference / AICAN” 组件。')
    bullet(doc, '与当前产品无关的自动化烹饪示意图。')
    bullet(doc, '过度装饰的大段英文口号和 3D 概念图。')
    bullet(doc, '没有数据支撑的巨大数字，如 70%、15 单/日、8 个月回本。')
    bullet(doc, '成员姓名与演讲分工占据封面主要空间。')

    page_break(doc)
    heading(doc, '九、最终改稿检查表', 1)
    heading(doc, '内容检查', 2)
    for x in [
        '第 1 页是否在 10 秒内说清楚 Careloop 是什么？',
        '第 4-6 页是否使用当前 project 的新版 UI，而不是旧木板模型？',
        '是否有一个完整订单贯穿语音、确认、厨房、配送和人工兜底？',
        '是否明确写出当前没有线下试点？',
        '是否把赛后试点写成 roadmap，而不是已完成成果？',
        '是否删除没有来源的市场数字和没有依据的财务结论？',
        '是否明确区分已实现、Demo 假设和待验证？',
        '是否有明确的香港站 Ask，而不是泛泛地说需要融资？',
    ]:
        bullet(doc, x)
    heading(doc, 'Demo 检查', 2)
    for x in [
        '准备在线 Demo、预录视频、文字输入三套模式。',
        '演示一次正常订单和一次失败转人工。',
        '确认每个按钮、菜品、桌号和状态在演示数据中都能稳定复现。',
        '现场不依赖真实支付、真实机器人或真实传送带。',
        '演讲者知道每一页的“已验证/待验证”边界。',
    ]:
        bullet(doc, x)
    heading(doc, '文件检查', 2)
    table(doc, ['文件', '用途'], [
        ['主 PPT PDF', '比赛提交/演讲版，12-14 页'],
        ['主 PPT 可编辑源文件', '修改、排练和现场切换'],
        ['Demo 视频', '网络或浏览器不可用时的备份'],
        ['一页技术事实表', '答辩时说明当前版本边界'],
        ['一页赛后路线图', '说明没有线下试点时的下一步'],
    ], [2500,6860], font_size=9.5)
    source(doc, '主要参考：makerinchina.hk（2026 香港站官网）；Hong Kong Digital Policy Office 历届赛事总结；/Users/cj/careloop/slides/Group 5-暖桌Careloop.pdf；/Users/cj/careloop/slides/TeaVita AI--Maker in China.pdf；当前 project 的 README、UI、API、voice domain 和测试结果。')
    add_para(doc, '版本：PPT Guide v1.0 | 日期：2026-08-20 | 用途：Careloop 香港站新版 PPT 改稿与排练', size=9, color=GRAY, italic=True, after=0)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT)
    print(OUT)

if __name__ == '__main__':
    build()
