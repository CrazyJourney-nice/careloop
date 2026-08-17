import { z } from 'zod';

export const IntentSchema = z.object({
  intent: z.enum(['ADD_ITEM','REMOVE_ITEM','CHANGE_QUANTITY','SET_MODIFIER','SET_TABLE','QUERY_MENU','CONFIRM_ORDER','CANCEL_ORDER','ASK_FOR_STAFF','UNKNOWN']),
  language: z.enum(['zh-CN','zh-HK','en-US']),
  confidence: z.number().min(0).max(1),
  items: z.array(z.object({ dishQuery: z.string(), quantity: z.number().int().positive(), modifiers: z.array(z.string()) })).default([]),
  tableQuery: z.string().nullable().default(null),
  needsConfirmation: z.boolean()
});
export type OrderIntent = z.infer<typeof IntentSchema>;

export interface TranscriptionResult { text: string; language: string; confidence: number; }
export interface SpeechAdapter { transcribe(input: string, language?: string): Promise<TranscriptionResult>; }

export class MockSpeechAdapter implements SpeechAdapter {
  async transcribe(input: string, language = 'zh-CN'): Promise<TranscriptionResult> {
    return { text: input, language, confidence: input.trim() ? 0.96 : 0 };
  }
}

const dishes = ['宫保鸡丁','清蒸鱼','红烧肉','酸辣土豆丝','番茄炒蛋','西兰花炒虾仁','小米粥','可乐'];
const modifiers = ['少盐','少油','不辣','不加葱','不加姜','易咀嚼'];

export function matchDishes(query: string) {
  const exact = dishes.filter(d => query.includes(d));
  if (exact.length) return exact.map(name => ({ name, confidence: 0.98 }));
  const aliases: Record<string,string> = { 土豆丝:'酸辣土豆丝', 肉菜:'红烧肉', 粥:'小米粥', 饮料:'可乐' };
  const alias = Object.entries(aliases).find(([key]) => query.includes(key));
  return alias ? [{ name: alias[1], confidence: 0.72 }] : [];
}

export class IntentParser {
  parse(text: string, language = 'zh-CN'): OrderIntent {
    const normalized = text.trim();
    const lang = language === 'zh-HK' ? 'zh-HK' : language === 'en-US' ? 'en-US' : 'zh-CN';
    if (!normalized) return IntentSchema.parse({ intent:'UNKNOWN', language:lang, confidence:0, needsConfirmation:true });
    if (/工作人员|帮助|不清楚|听不懂|help/i.test(normalized)) return IntentSchema.parse({ intent:'ASK_FOR_STAFF', language:lang, confidence:.99, needsConfirmation:true });
    if (/确认|可以|yes|confirm/i.test(normalized)) return IntentSchema.parse({ intent:'CONFIRM_ORDER', language:lang, confidence:.96, needsConfirmation:false });
    if (/取消|不要了|cancel/i.test(normalized)) return IntentSchema.parse({ intent:'CANCEL_ORDER', language:lang, confidence:.96, needsConfirmation:true });
    const table = normalized.match(/([AB]\d{2})\s*(?:桌|table)?/i)?.[1]?.toUpperCase() || null;
    const found = matchDishes(normalized);
    const itemMatches = found.map(d => ({ dishQuery:d.name, quantity:Number(normalized.match(new RegExp(`(\\d+)\\s*(?:份|碗|个)?[^，。]*${d.name}`))?.[1] || 1), modifiers:modifiers.filter(m => normalized.includes(m)) }));
    if (itemMatches.length) return IntentSchema.parse({ intent:'ADD_ITEM', language:lang, confidence:Math.min(...found.map(x=>x.confidence)), items:itemMatches, tableQuery:table, needsConfirmation:true });
    if (table) return IntentSchema.parse({ intent:'SET_TABLE', language:lang, confidence:.9, tableQuery:table, needsConfirmation:true });
    return IntentSchema.parse({ intent:'UNKNOWN', language:lang, confidence:.25, tableQuery:null, needsConfirmation:true });
  }
}

export type VoiceButtonState = 'idle'|'listening'|'transcribing'|'needs_confirmation'|'failed';
