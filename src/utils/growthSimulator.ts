const STORAGE_KEY = 'lootbox_growth_data';
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
  const baseRevenue = 45200;
  const baseUsers = 54;
  const dates = ['05.10', '06.10', '07.10', '08.10', '09.10'];
  
  const data: DailyData[] = [];
  let currentRevenue = baseRevenue;
  let currentUsers = baseUsers;
  
  for (const date of dates) {
    data.push({
      date,
      revenue: Math.round(currentRevenue),
      users: Math.round(currentUsers),
      timestamp: Date.now()
    });
    
    const growth = getRandomGrowth(1.22, 1.30);
    currentRevenue *= growth;
    currentUsers *= growth;
  }
  
  return data;
}

function shouldUpdate(lastTimestamp: number): boolean {
  return Date.now() - lastTimestamp >= UPDATE_INTERVAL;
}

function updateLastDayData(data: DailyData[]): DailyData[] {
  if (data.length === 0) return generateInitialData();
  
  const lastDay = data[data.length - 1];
  
  if (!shouldUpdate(lastDay.timestamp)) {
    return data;
  }
  
  const growth = getRandomGrowth(1.22, 1.30);
  const hourlyRevenueGrowth = Math.round(lastDay.revenue * (growth - 1) / 24);
  const hourlyUsersGrowth = Math.round(lastDay.users * (growth - 1) / 24);
  
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