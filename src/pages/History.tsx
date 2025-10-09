import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGrowthData, getOnlineUsers } from "@/utils/growthSimulator";

const History = () => {
  const [transactions, setTransactions] = useState<Array<{
    id: number;
    date: string;
    type: string;
    method: string;
    amount: number;
    status: string;
  }>>([]);
  const [totalAccrued, setTotalAccrued] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(getOnlineUsers());

  useEffect(() => {
    const updateTransactions = () => {
      const data = getGrowthData();
      const newTransactions = data.map((day, index) => ({
        id: data.length - index,
        date: `${day.date}.2025`,
        type: "Начисление",
        method: "Доля 20%",
        amount: Math.round(day.revenue * 0.20),
        status: "Выполнено"
      })).reverse();
      
      setTransactions(newTransactions);
      setTotalAccrued(newTransactions.reduce((sum, t) => sum + t.amount, 0));
      setOnlineUsers(getOnlineUsers());
    };

    updateTransactions();
    const interval = setInterval(updateTransactions, 60000);

    return () => clearInterval(interval);
  }, []);
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
              <a href="#" className="text-sm font-medium text-slate-900">История</a>
              <Link to="/reports" className="text-sm text-slate-600 hover:text-slate-900">Отчёты</Link>
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
              <h2 className="text-2xl font-bold text-slate-900">История транзакций</h2>
              <p className="text-slate-600">Все операции по вашему счёту</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="Download" size={16} />
              Экспорт в Excel
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Онлайн</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                  {onlineUsers}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Всего начислено</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">+{totalAccrued.toLocaleString()} ₽</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Средняя выручка/день</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{Math.floor(totalAccrued / transactions.length).toLocaleString()} ₽</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-600">Транзакций всего</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">{transactions.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Все транзакции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        "bg-green-100"
                      }`}>
                        <Icon 
                          name="ArrowDownLeft" 
                          size={20} 
                          className="text-green-600"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{transaction.type}</p>
                        <p className="text-sm text-slate-500">{transaction.method}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-slate-500">{transaction.date}</p>
                        <p className={`text-sm font-medium ${
                          transaction.status === "Выполнено" 
                            ? "text-green-600" 
                            : "text-orange-600"
                        }`}>
                          {transaction.status}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        +{transaction.amount.toLocaleString()} ₽
                      </p>
                    </div>
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
                <li><a href="#" className="hover:text-slate-900">История транзакций</a></li>
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

export default History;