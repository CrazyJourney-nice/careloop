import { describe, expect, it } from 'vitest';
import { Order } from '../../packages/domain/src/models/Order';
import { OrderStatus } from '../../packages/domain/src/models/OrderStatus';
import { IntentParser, matchDishes, modifiersToProfile, normalizeTranscript } from '../../packages/domain/src/voice/index';
import { KitchenSimulator } from '../../src/kitchen/index';
import { ConveyorSimulator } from '../../src/conveyor/index';

const order=()=>new Order({canteenId:'CAN001',createdByUserId:'U1',customerUserId:'U1',tableId:'TBL-A12',items:[{dishId:'D1',dishNameSnapshot:'红烧肉',unitPriceCents:750,quantity:1} as any]});
describe('order state machine',()=>{it('allows the happy path and rejects illegal transitions',()=>{const o=order();expect(()=>o.updateStatus(OrderStatus.COOKING)).toThrow();o.updateStatus(OrderStatus.CONFIRMED);o.updateStatus(OrderStatus.PAID);o.updateStatus(OrderStatus.SENT_TO_KITCHEN);expect(o.status).toBe(OrderStatus.SENT_TO_KITCHEN);});});
describe('voice intent parser',()=>{it('returns a confirmable structured intent',()=>{const i=new IntentParser().parse('我要一份少盐的红烧肉，送到 A12 桌');expect(i.intent).toBe('ADD_ITEM');expect(i.needsConfirmation).toBe(true);expect(i.items[0].modifiers).toContain('少盐');expect(i.tableQuery).toBe('A12');});it('uses aliases as candidates',()=>{expect(matchDishes('来一份土豆丝')[0].confidence).toBeLessThan(1);});});
describe('voice production parsing',()=>{
  it('parses English dishes, quantities, preferences, and table numbers',()=>{
    const i=new IntentParser().parse('Two steamed fish with no spice and one millet congee for table A12','en-US');
    expect(i.language).toBe('en-US');
    expect(i.items).toEqual(expect.arrayContaining([
      expect.objectContaining({dishName:'清蒸鱼',quantity:2,modifiers:expect.arrayContaining(['不辣'])}),
      expect.objectContaining({dishName:'小米粥',quantity:1})
    ]));
    expect(i.tableQuery).toBe('A12');
  });
  it('does not mistake digits in a table number for item quantity',()=>{
    const i=new IntentParser().parse('One braised pork with less salt for table A12','en-US');
    expect(i.items[0]).toMatchObject({dishName:'红烧肉',quantity:1});
    expect(i.items[0].modifiers).toContain('少盐');
  });
  it('uses ASR alternatives when they identify a stronger supported dish',()=>{
    const i=new IntentParser().parse('One braised part for A12','en-US',{alternatives:['One braised pork for A12']});
    expect(i.items[0]).toMatchObject({dishName:'红烧肉',quantity:1});
    expect(i.normalizedText).toContain('braised pork');
  });
  it('keeps post-dish preferences with the correct English item',()=>{
    const i=new IntentParser().parse('Two steamed fish no spice one millet congee','en-US');
    expect(i.items[0]).toMatchObject({dishName:'清蒸鱼',quantity:2});
    expect(i.items[0].modifiers).toContain('不辣');
    expect(i.items[1]).toMatchObject({dishName:'小米粥',quantity:1,modifiers:[]});
  });
  it('does not match English aliases inside unrelated words',()=>{
    const i=new IntentParser().parse('I want something refreshing','en-US');
    expect(i.intent).toBe('UNKNOWN');
    expect(i.items).toHaveLength(0);
  });
  it('parses multiple dishes and their quantities without spoken pauses',()=>{
    const i=new IntentParser().parse('我要三份酸辣土豆丝一份番茄炒蛋两份红烧肉');
    expect(i.items).toEqual(expect.arrayContaining([
      expect.objectContaining({dishName:'酸辣土豆丝',quantity:3}),
      expect.objectContaining({dishName:'番茄炒蛋',quantity:1}),
      expect.objectContaining({dishName:'红烧肉',quantity:2})
    ]));
    expect(i.items).toHaveLength(3);
  });
  it('parses Chinese quantities and keeps modifiers on the matching item',()=>{
    const i=new IntentParser().parse('我要两份不辣的鱼，再来一碗粥，鱼要软一点，A12桌');
    expect(i.items).toHaveLength(2);
    expect(i.items[0].quantity).toBe(2);
    expect(i.items[0].modifiers).toEqual(expect.arrayContaining(['不辣','易咀嚼']));
    expect(i.items[1].quantity).toBe(1);
    expect(i.items[1].modifiers).toEqual([]);
    expect(i.tableQuery).toBe('A12');
  });
  it('returns structured modifier profiles',()=>{
    expect(modifiersToProfile(['少盐','不辣','易咀嚼'])).toMatchObject({salt:'LESS',spicy:'NONE',texture:'EASY_TO_CHEW'});
    expect(normalizeTranscript('清淡一点，不要辣椒')).toContain('少盐');
  });
  it('keeps unknown speech confirmable and exposes candidates',()=>{
    const i=new IntentParser().parse('我想吃一个完全不存在的菜');
    expect(i.intent).toBe('UNKNOWN');
    expect(i.needsConfirmation).toBe(true);
  });
});
describe('device state machines',()=>{it('supports kitchen then conveyor lifecycle',()=>{const k=new KitchenSimulator();const t=k.create('ORD-1');k.update(t.id,'COOKING');k.update(t.id,'READY');expect(()=>k.update(t.id,'QUEUED')).toThrow();const c=new ConveyorSimulator().create('ORD-1','A12');expect(c.trayCode).toMatch(/^TRAY-/);});});
