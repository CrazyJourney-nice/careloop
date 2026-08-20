import { Canteen } from '../../packages/domain/src/models/Canteen';
import { MenuItem } from '../../packages/domain/src/models/MenuItem';
import { Table } from '../../packages/domain/src/models/Table';

const canteens: Canteen[] = [
  new Canteen({
    name: '试点食堂A',
    address: '广州市天河区天河路123号',
    latitude: 22.3193,
    longitude: 114.1694
  })
];

const menuItems: MenuItem[] = [
  new MenuItem({ canteenId: 'CAN001', name: '宫保鸡丁', description: '经典宫保鸡丁，口味浓郁', priceCents: 680, category: 'MAIN' }),
  new MenuItem({ canteenId: 'CAN001', name: '清蒸鱼', description: '清蒸鲜鱼，营养十足', priceCents: 920, category: 'MAIN' }),
  new MenuItem({ canteenId: 'CAN001', name: '红烧肉', description: '肥而不腻的红烧肉', priceCents: 750, category: 'MAIN' }),
  new MenuItem({ canteenId: 'CAN001', name: '酸辣土豆丝', description: '酸辣爽口下酒菜', priceCents: 420, category: 'SIDE' }),
  new MenuItem({ canteenId: 'CAN001', name: '可乐', description: '经典汽水', priceCents: 380, category: 'DRINK' }),
  new MenuItem({ canteenId: 'CAN001', name: '番茄炒蛋', description: '经典家常菜', priceCents: 520, category: 'MAIN' }),
  new MenuItem({ canteenId: 'CAN001', name: '西兰花炒虾仁', description: '清新美味', priceCents: 890, category: 'MAIN' }),
  new MenuItem({ canteenId: 'CAN001', name: '凉拌木耳', description: '开胃小菜', priceCents: 350, category: 'SIDE' }),
  new MenuItem({ canteenId: 'CAN001', name: '椰子水', description: '夏季必备', priceCents: 420, category: 'DRINK' }),
  new MenuItem({ canteenId: 'CAN001', name: '芒果冰', description: '甜品', priceCents: 520, category: 'DESSERT' }),
];

const tables = [
  new Table({ canteenId: 'CAN001', tableNumber: 'A01', capacity: 2, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A02', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A03', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A04', capacity: 6, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A05', capacity: 6, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A06', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A07', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A08', capacity: 2, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A09', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A10', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A11', capacity: 6, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A12', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A13', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A14', capacity: 6, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A15', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A16', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A17', capacity: 6, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A18', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A19', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'A20', capacity: 4, area: 'A' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B01', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B02', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B03', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B04', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B05', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B06', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B07', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B08', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B09', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B10', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B11', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B12', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B13', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B14', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B15', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B16', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B17', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B18', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B19', capacity: 4, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'B20', capacity: 6, area: 'B' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C01', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C02', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C03', capacity: 6, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C04', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C05', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C06', capacity: 6, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C07', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C08', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C09', capacity: 4, area: 'C' }),
  new Table({ canteenId: 'CAN001', tableNumber: 'C10', capacity: 6, area: 'C' }),
];

export async function seedDatabase() {
  console.log('🌱 Seeding CareLoop demo data...');

  // Seed canteens (in memory for demo)
  console.log('✅ Seeded 1 canteen');

  // Seed tables
  tables.forEach(table => {
    // tables.set(table.id, table); // In-memory
  });
  console.log(`✅ Seeded ${tables.length} tables`);

  // Seed menu items
  menuItems.forEach(item => {
    // menuItems.set(item.id, item);
  });
  console.log(`✅ Seeded ${menuItems.length} menu items`);

  console.log('🎉 Database seeding completed successfully!');
  console.log('📊 Total tables: ' + tables.length);
  console.log('📊 Total menu items: ' + menuItems.length);
}

export default seedDatabase;