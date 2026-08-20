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
const aliases: Record<string,string> = {
  土豆丝:'酸辣土豆丝', 肉菜:'红烧肉', 粥:'小米粥', 饮料:'可乐', 鱼:'清蒸鱼', 鸡丁:'宫保鸡丁',
  'kung pao chicken':'宫保鸡丁', 'kung pao':'宫保鸡丁',
  'kung pow chicken':'宫保鸡丁', 'kong pao chicken':'宫保鸡丁',
  'steamed fish':'清蒸鱼', 'steamed white fish':'清蒸鱼', fish:'清蒸鱼',
  'braised pork':'红烧肉', 'braised pork belly':'红烧肉', 'red cooked pork':'红烧肉', 'braised port':'红烧肉',
  'hot and sour shredded potatoes':'酸辣土豆丝', 'hot-and-sour shredded potatoes':'酸辣土豆丝', 'shredded potatoes':'酸辣土豆丝',
  'potato strips':'酸辣土豆丝', 'hot sour potatoes':'酸辣土豆丝',
  'tomato and egg':'番茄炒蛋', 'tomato with egg':'番茄炒蛋', 'scrambled eggs with tomato':'番茄炒蛋', 'tomato scrambled eggs':'番茄炒蛋',
  'broccoli with shrimp':'西兰花炒虾仁', 'shrimp with broccoli':'西兰花炒虾仁', 'broccoli shrimp':'西兰花炒虾仁',
  'millet congee':'小米粥', 'millet porridge':'小米粥', congee:'小米粥', porridge:'小米粥', 'con jee':'小米粥',
  cola:'可乐', coke:'可乐', 'coca cola':'可乐'
};
const aliasConfidence: Record<string, number> = {
  'kung pao chicken':.95, 'steamed fish':.94, 'braised pork':.95, 'hot and sour shredded potatoes':.95,
  'hot-and-sour shredded potatoes':.95, 'tomato and egg':.94, 'scrambled eggs with tomato':.94,
  'broccoli with shrimp':.94, 'millet congee':.95, cola:.95,
  fish:.62, porridge:.72, 'shredded potatoes':.78, 'potato strips':.76,
  'kung pow chicken':.78, 'kong pao chicken':.78, 'braised port':.7, 'con jee':.7
};
const chineseNumbers: Record<string, number> = { 一:1, 壹:1, 两:2, 二:2, 贰:2, 三:3, 四:4, 五:5, 六:6, 七:7, 八:8, 九:9, 十:10 };
const englishNumbers: Record<string, number> = { one:1, a:1, an:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9, ten:10 };

export function normalizeTranscript(text: string) {
  return text.trim().toLowerCase().replace(/[’']/g, '').replace(/\s+/g, ' ').replace(/[，。！？、]/g, '，').replace(/幺/g, '一').replace(/俩/g, '两').replace(/不要辣椒|不放辣椒|别放辣椒/g, '不辣').replace(/清淡一点|淡一点/g, '少盐');
}

function aliasOccurrences(query: string, alias: string) {
  if (!/[a-z]/i.test(alias)) {
    const positions: Array<{ index:number; end:number }> = [];
    let from = 0;
    while (from < query.length) { const index=query.indexOf(alias,from);if(index<0)break;positions.push({index,end:index+alias.length});from=index+alias.length; }
    return positions;
  }
  const phrase=alias.split(/[\s-]+/).map(part=>part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('[\\s-]+');
  return [...query.matchAll(new RegExp(`\\b${phrase}\\b`,'gi'))].map(match=>({index:match.index!,end:match.index!+match[0].length}));
}

export function matchDishes(query: string, menu = defaultDishes): MenuCandidate[] {
  const exact = menu.filter(name => query.includes(name)).map(name => ({ name, confidence: 0.98 }));
  if (exact.length) return exact;
  const found = Object.entries(aliases).filter(([key]) => aliasOccurrences(query,key).length).map(([key,name]) => ({name,confidence:aliasConfidence[key]??.72})).filter(candidate => menu.includes(candidate.name));
  if (found.length) return [...new Map(found.sort((a,b)=>b.confidence-a.confidence).map(candidate=>[candidate.name,candidate])).values()];
  const compact = query.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '').toLowerCase();
  return menu.map(name => {
    const overlap = [...name].filter(char => compact.includes(char)).length / name.length;
    return { name, confidence: overlap >= 0.5 ? Math.min(0.68, 0.35 + overlap * 0.3) : 0 };
  }).filter(candidate => candidate.confidence > 0).sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}

type DishMention = MenuCandidate & { index: number; end: number };
function findDishMentions(query: string, menu: string[]): DishMention[] {
  const mentions: DishMention[] = [];
  for (const name of menu) {
    let from = 0;
    while (from < query.length) {
      const index = query.indexOf(name, from);
      if (index < 0) break;
      mentions.push({ name, confidence: .98, index, end: index + name.length });
      from = index + name.length;
    }
  }
  for (const [alias, name] of Object.entries(aliases).sort(([a],[b])=>b.length-a.length)) {
    if (!menu.includes(name)) continue;
    for (const {index,end} of aliasOccurrences(query,alias)) {
      if (!mentions.some(mention => index < mention.end && end > mention.index)) mentions.push({ name, confidence: aliasConfidence[alias]??.72, index, end });
    }
  }
  return mentions.sort((a, b) => a.index - b.index || b.confidence - a.confidence);
}

function quantityOf(segment: string) {
  const quantityText = segment.replace(/(?:table\s*)?[a-z]\s*\d{1,2}\s*(?:桌|table)?/ig, '');
  if (/\b(?:a\s+)?(?:couple|pair)\s+of\b/i.test(quantityText)) return 2;
  const digit = quantityText.match(/\d+/)?.[0];
  if (digit) return Math.max(1, Number(digit));
  const word = Object.keys(chineseNumbers).find(key => quantityText.includes(key));
  if (word) return chineseNumbers[word];
  const englishWord = Object.keys(englishNumbers).find(key => new RegExp(`\\b${key}\\b`, 'i').test(quantityText));
  return englishWord ? englishNumbers[englishWord] : 1;
}

function itemStart(segment:string,index:number,lowerBound:number) {
  const prefix=segment.slice(lowerBound,index);
  const matches=[...prefix.matchAll(/\b(?:one|two|three|four|five|six|seven|eight|nine|ten|an?|\d+)\b|[一壹两二贰三四五六七八九十]\s*(?:份|碗|个)?/gi)];
  const last=matches[matches.length-1];
  return last?.index===undefined?lowerBound:lowerBound+last.index;
}

function modifierNames(text: string) {
  const names: string[] = [];
  if (/少盐|清淡/.test(text)) names.push('少盐');
  if (/少油/.test(text)) names.push('少油');
  if (/不辣|不要辣|不放辣/.test(text)) names.push('不辣');
  if (/不加葱|不放葱|不要葱/.test(text)) names.push('不加葱');
  if (/不加姜|不放姜|不要姜/.test(text)) names.push('不加姜');
  if (/易咀嚼|好咬|软一点|软烂/.test(text)) names.push('易咀嚼');
  if (/\b(?:less|low)\s*salt\b|\blight(?:ly)?\s+salted\b/i.test(text)) names.push('少盐');
  if (/\b(?:less|low)\s*(?:oil|oily)\b/i.test(text)) names.push('少油');
  if (/\b(?:not|non)[ -]?spicy\b|\bno\s+(?:spice|chili|chilli)\b/i.test(text)) names.push('不辣');
  if (/\bno\s+(?:scallion|green onion|spring onion)s?\b/i.test(text)) names.push('不加葱');
  if (/\bno\s+ginger\b/i.test(text)) names.push('不加姜');
  if (/\b(?:soft(?:er)?|easy to chew)\b/i.test(text)) names.push('易咀嚼');
  return [...new Set(names)];
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
    const lang = language === 'zh-HK' ? 'zh-HK' : language === 'en-US' ? 'en-US' : 'zh-CN';
    const menu = options.menu?.length ? options.menu : defaultDishes;
    const transcripts = [...new Set([text,...(options.alternatives||[])].map(normalizeTranscript).filter(Boolean))];
    const transcriptScore = (candidate:string) => findDishMentions(candidate,menu).reduce((sum,mention)=>sum+mention.confidence,0)+(candidate.match(/(?:table\s*)?[ab]\s*\d{1,2}/i)?.[0]?.length?0.05:0);
    const normalizedText = lang==='en-US' ? transcripts.reduce((best,candidate)=>transcriptScore(candidate)>transcriptScore(best)?candidate:best,transcripts[0]||'') : transcripts[0]||'';
    const asrConfidence = options.asrConfidence ?? (normalizedText ? 0.96 : 0);
    const base = { language: lang, rawText, normalizedText, asrConfidence };
    if (!normalizedText) return IntentSchema.parse({ ...base, intent: 'UNKNOWN', confidence: 0, needsConfirmation: true });
    if (/工作人员|人工|帮助|不清楚|听不懂|\bhelp\b|staff|assistant/i.test(normalizedText)) return IntentSchema.parse({ ...base, intent: 'ASK_FOR_STAFF', confidence: .99, needsConfirmation: true });
    if (/确认|可以|好的|yes|confirm/i.test(normalizedText)) return IntentSchema.parse({ ...base, intent: 'CONFIRM_ORDER', confidence: .96, needsConfirmation: false });
    if (/取消|不要了|cancel/i.test(normalizedText)) return IntentSchema.parse({ ...base, intent: 'CANCEL_ORDER', confidence: .96, needsConfirmation: true });
    const tableQuery = normalizedText.match(/(?:table\s*)?([AB]\s*\d{1,2})\s*(?:桌|table)?/i)?.[1]?.replace(/\s/g, '').toUpperCase() || null;
    const segments = normalizedText.split(/[，,；;和]|再来|再加|\band\s+(?=(?:one|two|three|four|five|six|seven|eight|nine|ten|\d)\b)|\bplus\b|\balso\b/i).map(segment => segment.trim()).filter(Boolean);
    const items: OrderIntent['items'] = [];
    const allCandidates: MenuCandidate[] = [];
    for (const segment of segments) {
      const mentions = findDishMentions(segment, menu);
      const rawMatches = mentions.length ? mentions : matchDishes(segment, menu).slice(0, 3).map(candidate => ({ ...candidate, index: 0, end: segment.length }));
      const supportedMatches = rawMatches.filter(candidate => candidate.confidence >= .65);
      const matches = mentions.length ? supportedMatches : supportedMatches.slice(0,1);
      allCandidates.push(...rawMatches.map(({ name, confidence }) => ({ name, confidence })));
      if (!matches.length) {
        const names=modifierNames(segment);const previous=items[items.length-1];
        if(names.length&&previous){previous.modifiers=[...new Set([...previous.modifiers,...names])];previous.modifierProfile=modifiersToProfile(previous.modifiers)}
        continue;
      }
      const starts=matches.map((match,index)=>itemStart(segment,match.index,index?matches[index-1].end:0));
      for (const [index,match] of matches.entries()) {
        const context = mentions.length ? segment.slice(starts[index],starts[index+1]??segment.length) : segment;
        const names = modifierNames(context);
        const previous = [...items].reverse().find(item => item.dishQuery === match.name);
        const hasQuantity=/份|碗|个|来|要一|要两|再|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|an?|\d+|couple|pair)\b/i.test(context);
        const isFollowUpModifier = names.length > 0 && !hasQuantity && Boolean(previous);
        if (isFollowUpModifier) {
          previous!.modifiers = [...new Set([...previous!.modifiers, ...names])];
          previous!.modifierProfile = modifiersToProfile(previous!.modifiers);
          continue;
        }
        items.push({ dishQuery: match.name, dishName: match.name, quantity: quantityOf(context), modifiers: names, modifierProfile: modifiersToProfile(names) });
      }
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
