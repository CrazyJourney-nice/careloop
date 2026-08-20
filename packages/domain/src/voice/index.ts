import { z } from 'zod';

export const ModifierProfileSchema = z.object({
  salt: z.enum(['NORMAL', 'LESS', 'NONE']).default('NORMAL'),
  spicy: z.enum(['NORMAL', 'LESS', 'NONE']).default('NORMAL'),
  oil: z.enum(['NORMAL', 'LESS', 'NONE']).default('NORMAL'),
  onion: z.enum(['NORMAL', 'NONE']).default('NORMAL'),
  ginger: z.enum(['NORMAL', 'NONE']).default('NORMAL'),
  texture: z.enum(['NORMAL', 'SOFT', 'EASY_TO_CHEW']).default('NORMAL')
});
export type ModifierProfile = z.infer<typeof ModifierProfileSchema>;

const IntentNameSchema = z.enum(['ADD_ITEM','REMOVE_ITEM','CHANGE_QUANTITY','SET_MODIFIER','SET_TABLE','QUERY_MENU','CONFIRM_ORDER','CANCEL_ORDER','ASK_FOR_STAFF','UNKNOWN']);
const VoiceItemSchema = z.object({
  dishQuery: z.string(),
  dishName: z.string().optional(),
  dishId: z.string().optional(),
  quantity: z.number().int().positive(),
  modifiers: z.array(z.string()).default([]),
  modifierProfile: ModifierProfileSchema.optional()
});
export const IntentSchema = z.object({
  intent: IntentNameSchema,
  language: z.enum(['zh-CN','zh-HK','en-US']),
  rawText: z.string().default(''),
  normalizedText: z.string().default(''),
  asrConfidence: z.number().min(0).max(1).default(0),
  confidence: z.number().min(0).max(1),
  items: z.array(VoiceItemSchema).default([]),
  tableQuery: z.string().nullable().default(null),
  candidates: z.array(z.object({ name: z.string(), confidence: z.number().min(0).max(1) })).default([]),
  needsConfirmation: z.boolean()
});
export type OrderIntent = z.infer<typeof IntentSchema>;

export interface TranscriptionResult { text: string; language: string; confidence: number; alternatives?: string[]; }
export interface SpeechAdapter { transcribe(input: string, language?: string): Promise<TranscriptionResult>; }
export class MockSpeechAdapter implements SpeechAdapter {
  async transcribe(input: string, language = 'zh-CN'): Promise<TranscriptionResult> { return { text: input, language, confidence: input.trim() ? 0.96 : 0, alternatives: input.trim() ? [input] : [] }; }
}

export type MenuCandidate = { id?: string; name: string; confidence: number; available?: boolean };
const defaultDishes = ['宫保鸡丁','清蒸鱼','红烧肉','酸辣土豆丝','番茄炒蛋','西兰花炒虾仁','小米粥','可乐'];
const aliases: Record<string,string> = { 土豆丝:'酸辣土豆丝', 肉菜:'红烧肉', 粥:'小米粥', 饮料:'可乐', 鱼:'清蒸鱼', 鸡丁:'宫保鸡丁' };
const chineseNumbers: Record<string, number> = { 一:1, 壹:1, 两:2, 二:2, 贰:2, 三:3, 四:4, 五:5, 六:6, 七:7, 八:8, 九:9, 十:10 };

export function normalizeTranscript(text: string) {
  return text.trim().replace(/[，。！？、]/g, '，').replace(/幺/g, '一').replace(/俩/g, '两').replace(/不要辣椒|不放辣椒|别放辣椒/g, '不辣').replace(/清淡一点|淡一点/g, '少盐');
}

export function matchDishes(query: string, menu = defaultDishes): MenuCandidate[] {
  const exact = menu.filter(name => query.includes(name)).map(name => ({ name, confidence: 0.98 }));
  if (exact.length) return exact;
  const found = Object.entries(aliases).filter(([key]) => query.includes(key)).map(([, name]) => name).filter(name => menu.includes(name));
  if (found.length) return [...new Set(found)].map(name => ({ name, confidence: 0.72 }));
  const compact = query.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '').toLowerCase();
  return menu.map(name => {
    const overlap = [...name].filter(char => compact.includes(char)).length / name.length;
    return { name, confidence: overlap >= 0.5 ? Math.min(0.68, 0.35 + overlap * 0.3) : 0 };
  }).filter(candidate => candidate.confidence > 0).sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}

function quantityOf(segment: string) {
  const digit = segment.match(/\d+/)?.[0];
  if (digit) return Math.max(1, Number(digit));
  const word = Object.keys(chineseNumbers).find(key => segment.includes(key));
  return word ? chineseNumbers[word] : 1;
}

function modifierNames(text: string) {
  const names: string[] = [];
  if (/少盐|清淡/.test(text)) names.push('少盐');
  if (/少油/.test(text)) names.push('少油');
  if (/不辣|不要辣|不放辣/.test(text)) names.push('不辣');
  if (/不加葱|不放葱|不要葱/.test(text)) names.push('不加葱');
  if (/不加姜|不放姜|不要姜/.test(text)) names.push('不加姜');
  if (/易咀嚼|好咬|软一点|软烂/.test(text)) names.push('易咀嚼');
  return names;
}

export function modifiersToProfile(names: string[]): ModifierProfile {
  return ModifierProfileSchema.parse({
    salt: names.includes('少盐') ? 'LESS' : 'NORMAL',
    spicy: names.includes('不辣') ? 'NONE' : 'NORMAL',
    oil: names.includes('少油') ? 'LESS' : 'NORMAL',
    onion: names.includes('不加葱') ? 'NONE' : 'NORMAL',
    ginger: names.includes('不加姜') ? 'NONE' : 'NORMAL',
    texture: names.includes('易咀嚼') ? 'EASY_TO_CHEW' : 'NORMAL'
  });
}

export class IntentParser {
  parse(text: string, language = 'zh-CN', options: { asrConfidence?: number; menu?: string[]; alternatives?: string[] } = {}): OrderIntent {
    const rawText = text;
    const normalizedText = normalizeTranscript(text);
    const lang = language === 'zh-HK' ? 'zh-HK' : language === 'en-US' ? 'en-US' : 'zh-CN';
    const asrConfidence = options.asrConfidence ?? (normalizedText ? 0.96 : 0);
    const base = { language: lang, rawText, normalizedText, asrConfidence };
    if (!normalizedText) return IntentSchema.parse({ ...base, intent: 'UNKNOWN', confidence: 0, needsConfirmation: true });
    if (/工作人员|人工|帮助|不清楚|听不懂|help/i.test(normalizedText)) return IntentSchema.parse({ ...base, intent: 'ASK_FOR_STAFF', confidence: .99, needsConfirmation: true });
    if (/确认|可以|好的|yes|confirm/i.test(normalizedText)) return IntentSchema.parse({ ...base, intent: 'CONFIRM_ORDER', confidence: .96, needsConfirmation: false });
    if (/取消|不要了|cancel/i.test(normalizedText)) return IntentSchema.parse({ ...base, intent: 'CANCEL_ORDER', confidence: .96, needsConfirmation: true });
    const tableQuery = normalizedText.match(/([AB]\s*\d{1,2})\s*(?:桌|table)?/i)?.[1]?.replace(/\s/g, '').toUpperCase() || null;
    const menu = options.menu?.length ? options.menu : defaultDishes;
    const segments = normalizedText.split(/[，,；;和]|再来|再加/).map(segment => segment.trim()).filter(Boolean);
    const items: OrderIntent['items'] = [];
    const allCandidates: MenuCandidate[] = [];
    for (const segment of segments) {
      const candidates = matchDishes(segment, menu);
      allCandidates.push(...candidates);
      const best = candidates.find(candidate => candidate.confidence >= .65);
      if (!best) continue;
      const names = modifierNames(segment);
      const previous = [...items].reverse().find(item => item.dishQuery === best.name);
      const isFollowUpModifier = names.length > 0 && !/份|碗|个|来|要一|要两|再/.test(segment) && Boolean(previous);
      if (isFollowUpModifier) {
        previous!.modifiers = [...new Set([...previous!.modifiers, ...names])];
        previous!.modifierProfile = modifiersToProfile(previous!.modifiers);
        continue;
      }
      items.push({ dishQuery: best.name, dishName: best.name, quantity: quantityOf(segment), modifiers: names, modifierProfile: modifiersToProfile(names) });
    }
    const candidates = [...new Map(allCandidates.map(candidate => [candidate.name, candidate])).values()].sort((a, b) => b.confidence - a.confidence).slice(0, 3);
    if (items.length) {
      const confidence = Math.min(asrConfidence, ...items.map(item => candidates.find(candidate => candidate.name === item.dishQuery)?.confidence ?? .5));
      return IntentSchema.parse({ ...base, intent: 'ADD_ITEM', confidence, items, tableQuery, candidates: confidence < .85 ? candidates : [], needsConfirmation: true });
    }
    if (tableQuery) return IntentSchema.parse({ ...base, intent: 'SET_TABLE', confidence: Math.min(.9, asrConfidence), tableQuery, candidates: [], needsConfirmation: true });
    return IntentSchema.parse({ ...base, intent: 'UNKNOWN', confidence: Math.min(.25, asrConfidence), tableQuery: null, candidates, needsConfirmation: true });
  }
}

export type VoiceButtonState = 'idle'|'listening'|'transcribing'|'needs_confirmation'|'failed';
export type VoiceSessionStatus = 'ACTIVE'|'PREVIEW_READY'|'CONFIRMED'|'STAFF_ASSIST'|'EXPIRED';
export interface VoiceSession { id: string; userId: string; deviceType: 'KIOSK'|'TABLET'|'MOBILE'; language: 'zh-CN'|'zh-HK'|'en-US'; status: VoiceSessionStatus; rawTranscript: string; normalizedText: string; asrConfidence: number; intentConfidence: number; intentSnapshot?: OrderIntent; candidateSnapshot: MenuCandidate[]; audioRef?: string; expiresAt: string; createdAt: string; updatedAt: string; staffSessionId?: string; }
