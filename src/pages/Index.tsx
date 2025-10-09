import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

const revenueData = [
  { date: "05.10", amount: 45200 },
  { date: "06.10", amount: 38900 },
  { date: "07.10", amount: 52420 },
  { date: "08.10", amount: 52420 },
  { date: "09.10", amount: 73500 }
];

const usersData = [
  { date: "05.10", users: 54 },
  { date: "06.10", users: 62 },
  { date: "07.10", users: 73 },
  { date: "08.10", users: 73 },
  { date: "09.10", users: 93 }
];

const investorShare = 0.2;
const totalRevenue = 169450;
const availableForWithdrawal = Math.floor(totalRevenue * investorShare);

const Index = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState<'card' | 'crypto' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">LOOTBOX</h1>
                <p className="text-xs text-slate-500">Инвесторский портал</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-slate-900">Дашборд</a>
              <Link to="/history" className="text-sm text-slate-600 hover:text-slate-900">История</Link>
              <Link to="/reports" className="text-sm text-slate-600 hover:text-slate-900">Отчёты</Link>
              <Button variant="ghost" size="sm" className="gap-2">
                <Icon name="User" size={16} />
                Профиль
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Обзор инвестиций</h2>
              <p className="text-slate-600">Ваша доля: 20% от выручки проекта</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Icon name="Download" size={20} />
                  Вывести средства
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Вывод средств</DialogTitle>
                  <DialogDescription>
                    Доступно к выводу: {availableForWithdrawal.toLocaleString()} ₽
                  </DialogDescription>
                </DialogHeader>
                
                {!withdrawalMethod ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">Выберите способ вывода:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setWithdrawalMethod('card')}
                        className="p-6 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Icon name="CreditCard" size={32} className="mx-auto mb-3 text-slate-700" />
                        <p className="font-medium text-slate-900">На карту</p>
                        <p className="text-xs text-slate-500 mt-1">1-3 рабочих дня</p>
                      </button>
                      <button
                        onClick={() => setWithdrawalMethod('crypto')}
                        className="p-6 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Icon name="Bitcoin" size={32} className="mx-auto mb-3 text-slate-700" />
                        <p className="font-medium text-slate-900">Криптовалюта</p>
                        <p className="text-xs text-slate-500 mt-1">Моментально</p>
                      </button>
                    </div>
                  </div>
                ) : withdrawalMethod === 'card' ? (
                  <div className="space-y-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setWithdrawalMethod(null)}
                      className="mb-2"
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Назад
                    </Button>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Номер карты</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Сумма вывода</Label>
                      <Input 
                        id="amount" 
                        type="number" 
                        placeholder={availableForWithdrawal.toString()} 
                        max={availableForWithdrawal}
                      />
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить вывод
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setWithdrawalMethod(null)}
                      className="mb-2"
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Назад
                    </Button>
                    <div className="space-y-2">
                      <Label htmlFor="cryptoAddress">Адрес кошелька (USDT TRC-20)</Label>
                      <Input id="cryptoAddress" placeholder="Введите адрес..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cryptoAmount">Сумма вывода (₽)</Label>
                      <Input 
                        id="cryptoAmount" 
                        type="number" 
                        placeholder={availableForWithdrawal.toString()} 
                        max={availableForWithdrawal}
                      />
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить вывод
                    </Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Выручка проекта</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Выручка всего</CardDescription>
              <CardTitle className="text-3xl">169 450 ₽</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-green-600">
                  <Icon name="TrendingUp" size={16} className="mr-1" />
                  <span>+15.3%</span>
                </div>
                <div className="text-sm text-slate-500">Ваша доля: {availableForWithdrawal.toLocaleString()} ₽</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Выручка за сегодня</CardDescription>
              <CardTitle className="text-3xl">73 500 ₽</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                <span>+40.2% к вчера</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Выручка за вчера</CardDescription>
              <CardTitle className="text-3xl">52 420 ₽</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600">
                <Icon name="Minus" size={16} className="mr-1" />
                <span>Стабильно</span>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Пользователи</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Пользователей всего</CardDescription>
              <CardTitle className="text-3xl">213</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                <span>+27.5% рост</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Пользователей за сегодня</CardDescription>
              <CardTitle className="text-3xl">93</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-green-600">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                <span>+27.4% к вчера</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Пользователей за вчера</CardDescription>
              <CardTitle className="text-3xl">73</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600">
                <Icon name="Users" size={16} className="mr-1" />
                <span>Активный прирост</span>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>График выручки</CardTitle>
              <CardDescription>Динамика дохода за последние 5 дней</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()} ₽`, 'Выручка']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>График пользователей</CardTitle>
              <CardDescription>Динамика новых пользователей за последние 5 дней</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usersData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: number) => [`${value}`, 'Пользователей']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Wallet" size={24} />
              Вывод средств
            </CardTitle>
            <CardDescription>Управление выводом прибыли</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
              <div>
                <p className="text-sm text-slate-600">Доступно к выводу (20%)</p>
                <p className="text-2xl font-bold text-slate-900">{availableForWithdrawal.toLocaleString()} ₽</p>
                <p className="text-xs text-slate-500 mt-1">из {totalRevenue.toLocaleString()} ₽ общей выручки</p>
              </div>
              <Button size="lg" className="gap-2">
                <Icon name="ArrowUpRight" size={20} />
                Вывести
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CreditCard" size={20} className="text-slate-600" />
                  <p className="text-sm font-medium">На карту</p>
                </div>
                <p className="text-xs text-slate-500">Перевод 1-3 рабочих дня</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Building" size={20} className="text-slate-600" />
                  <p className="text-sm font-medium">На счёт</p>
                </div>
                <p className="text-xs text-slate-500">Перевод 1-2 рабочих дня</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Smartphone" size={20} className="text-slate-600" />
                  <p className="text-sm font-medium">СБП</p>
                </div>
                <p className="text-xs text-slate-500">Моментальный перевод</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="Box" size={16} className="text-white" />
                </div>
                <span className="font-bold text-slate-900">LOOTBOX</span>
              </div>
              <p className="text-sm text-slate-600">Инвесторская платформа для управления вашими активами</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Навигация</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Дашборд</a></li>
                <li><Link to="/history" className="hover:text-slate-900">История транзакций</Link></li>
                <li><Link to="/reports" className="hover:text-slate-900">Отчёты</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Поддержка</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Помощь</a></li>
                <li><a href="#" className="hover:text-slate-900">Контакты</a></li>
                <li><a href="#" className="hover:text-slate-900">Документация</a></li>
              </ul>
            </div>

          </div>
          <div className="border-t border-slate-200 mt-8 pt-6 flex items-center justify-between text-sm text-slate-600">
            <p>© 2025 LOOTBOX. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-900">Политика конфиденциальности</a>
              <a href="#" className="hover:text-slate-900">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;