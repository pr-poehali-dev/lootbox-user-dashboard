import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const dailyData = [
  { date: "05.10", revenue: 45200, users: 54 },
  { date: "06.10", revenue: 38900, users: 62 },
  { date: "07.10", revenue: 52420, users: 73 },
  { date: "08.10", revenue: 52420, users: 73 },
  { date: "09.10", revenue: 73500, users: 93 },
];

const reports = [
  { id: 1, name: "Финансовый отчёт 05.10-09.10", date: "09.10.2025", type: "PDF", size: "1.2 MB" },
  { id: 2, name: "Отчёт по пользователям за период", date: "09.10.2025", type: "Excel", size: "0.9 MB" },
  { id: 3, name: "Статистика выручки 05.10-09.10", date: "09.10.2025", type: "PDF", size: "1.1 MB" },
];

const Reports = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">LOOTBOX</h1>
                <p className="text-xs text-slate-500">Инвесторский портал</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">Дашборд</Link>
              <Link to="/history" className="text-sm text-slate-600 hover:text-slate-900">История</Link>
              <a href="#" className="text-sm font-medium text-slate-900">Отчёты</a>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="User" size={16} />
                  Профиль
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Отчёты и аналитика</h2>
              <p className="text-slate-600">Детальная статистика по проекту</p>
            </div>
            <Button className="gap-2">
              <Icon name="FileText" size={16} />
              Сформировать отчёт
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Средняя выручка/день</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">52 488 ₽</p>
                <p className="text-xs text-slate-500 mt-1">05.10-09.10.2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Ваша доля</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">10 498 ₽</p>
                <p className="text-xs text-slate-500 mt-1">Среднее в день (20%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Прирост пользователей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">+72%</p>
                <p className="text-xs text-green-600 mt-1">05.10-09.10.2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Всего начислено</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">52 488 ₽</p>
                <p className="text-xs text-green-600 mt-1">За период</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Динамика выручки по дням</CardTitle>
                <CardDescription>Статистика 05.10-09.10.2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
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
                    <Bar 
                      dataKey="revenue" 
                      fill="#3b82f6" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Прирост пользователей по дням</CardTitle>
                <CardDescription>Статистика 05.10-09.10.2025</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
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
                    <Bar 
                      dataKey="users" 
                      fill="#10b981" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Архив отчётов</CardTitle>
              <CardDescription>Сгенерированные документы за последние месяцы</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div 
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon 
                          name={report.type === "PDF" ? "FileText" : "FileSpreadsheet"} 
                          size={20} 
                          className="text-blue-600"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{report.name}</p>
                        <p className="text-sm text-slate-500">{report.date} • {report.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Icon name="Download" size={16} />
                      Скачать
                    </Button>
                  </div>
                ))}
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
                <li><Link to="/" className="hover:text-slate-900">Дашборд</Link></li>
                <li><Link to="/history" className="hover:text-slate-900">История транзакций</Link></li>
                <li><a href="#" className="hover:text-slate-900">Отчёты</a></li>
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

export default Reports;