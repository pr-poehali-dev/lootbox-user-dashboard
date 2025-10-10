const STORAGE_KEY = 'lootbox_growth_data_v11';
const UPDATE_INTERVAL = 3600000; // 1 час в миллисекундах

export interface DailyData {
  date: string;
  revenue: number;
  users: number;
  timestamp: number;
}

function getRandomGrowth(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateInitialData(): DailyData[] {
  const today = new Date();
  const currentDateStr = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}`;
  
  const baseData = [
    { date: '05.10', revenue: 45200, users: 54 },
    { date: '06.10', revenue: 38900, users: 62 },
    { date: '07.10', revenue: 52420, users: 73 },
    { date: '08.10', revenue: 52420, users: 73 },
    { date: '09.10', revenue: 92000, users: 105 },
  ];
  
  const data: DailyData[] = baseData.map(d => ({
    ...d,
    timestamp: Date.now()
  }));
  
  // Если последний день в базе не сегодня - добавляем сегодня
  if (baseData[baseData.length - 1].date !== currentDateStr) {
    data.push({
      date: currentDateStr,
      revenue: 35000,
      users: 42,
      timestamp: Date.now()
    });
  } else {
    // Если последний день = сегодня, обновляем его
    data[data.length - 1] = {
      date: currentDateStr,
      revenue: 35000,
      users: 42,
      timestamp: Date.now()
    };
  }
  
  return data;
}

function shouldUpdate(lastTimestamp: number): boolean {
  return Date.now() - lastTimestamp >= UPDATE_INTERVAL;
}

function getCurrentDate(): string {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function updateLastDayData(data: DailyData[]): DailyData[] {
  if (data.length === 0) return generateInitialData();
  
  const lastDay = data[data.length - 1];
  const currentDate = getCurrentDate();
  
  // Если текущая дата не совпадает с последним днём в данных - создаём новый день
  if (lastDay.date !== currentDate) {
    const growth = getRandomGrowth(1.22, 1.30);
    const newDay: DailyData = {
      date: currentDate,
      revenue: Math.round(lastDay.revenue * growth),
      users: Math.round(lastDay.users * growth),
      timestamp: Date.now()
    };
    return [...data, newDay];
  }
  
  // Если это текущий день - обновляем его ежечасно
  if (!shouldUpdate(lastDay.timestamp)) {
    return data;
  }
  
  // Рост с 35000 до 180000 за 24 часа (реклама работает!)
  const targetRevenue = 180000;
  const targetUsers = 210;
  const hourlyRevenueGrowth = Math.round((targetRevenue - 35000) / 24);
  const hourlyUsersGrowth = Math.round((targetUsers - 42) / 24);
  
  return data.map((day, index) => {
    if (index === data.length - 1) {
      return {
        ...day,
        revenue: day.revenue + hourlyRevenueGrowth,
        users: day.users + hourlyUsersGrowth,
        timestamp: Date.now()
      };
    }
    return day;
  });
}

export function getGrowthData(): DailyData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      const initialData = generateInitialData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
      return initialData;
    }
    
    const data: DailyData[] = JSON.parse(stored);
    const updatedData = updateLastDayData(data);
    
    if (JSON.stringify(data) !== JSON.stringify(updatedData)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    }
    
    return updatedData;
  } catch (error) {
    console.error('Error managing growth data:', error);
    return generateInitialData();
  }
}

export function calculateMetrics(data: DailyData[]) {
  const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / data.length);
  const yourShare = Math.round(avgRevenue * 0.20);
  const totalYourShare = Math.round(totalRevenue * 0.20);
  
  const firstUsers = data[0]?.users || 1;
  const lastUsers = data[data.length - 1]?.users || 1;
  const userGrowthPercent = Math.round(((lastUsers - firstUsers) / firstUsers) * 100);
  
  return {
    avgRevenue,
    yourShare,
    totalYourShare,
    userGrowthPercent,
    totalRevenue
  };
}

export function getOnlineUsers(): number {
  return Math.floor(Math.random() * (600 - 30 + 1)) + 30;
}