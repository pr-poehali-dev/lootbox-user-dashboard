import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
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
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Профиль инвестора</h2>
            <p className="text-slate-600">Управление личными данными и настройками</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>Основные данные вашего аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-2xl">
                    ИВ
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Загрузить фото
                  </Button>
                  <p className="text-xs text-slate-500 mt-2">JPG, PNG или GIF. Макс. 5MB</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" placeholder="Иван" defaultValue="Иван" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" placeholder="Иванов" defaultValue="Иванов" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="investor@example.com" defaultValue="investor@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (999) 123-45-67" defaultValue="+7 (999) 123-45-67" />
              </div>

              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Данные инвестора</CardTitle>
              <CardDescription>Информация о вашей инвестиционной доле</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Ваша доля</p>
                  <p className="text-2xl font-bold text-slate-900">20%</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Дата начала инвестиций</p>
                  <p className="text-2xl font-bold text-slate-900">01.01.2025</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Сумма инвестиций</p>
                  <p className="text-2xl font-bold text-slate-900">500 000 ₽</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Статус</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-lg font-semibold text-green-600">Активный инвестор</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Настройки безопасности аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">Двухфакторная аутентификация</p>
                  <p className="text-sm text-slate-500">Защитите аккаунт с помощью 2FA</p>
                </div>
                <Button variant="outline" size="sm">
                  Включить
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Изменить пароль</Label>
                <div className="space-y-3">
                  <Input type="password" placeholder="Текущий пароль" />
                  <Input type="password" placeholder="Новый пароль" />
                  <Input type="password" placeholder="Подтвердите новый пароль" />
                  <Button variant="secondary">Обновить пароль</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Платёжные реквизиты</CardTitle>
              <CardDescription>Сохранённые методы вывода средств</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="CreditCard" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Карта •••• 4242</p>
                    <p className="text-sm text-slate-500">Действует до 12/2027</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={16} className="text-red-500" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Bitcoin" size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">USDT кошелёк</p>
                    <p className="text-sm text-slate-500 font-mono">TSv2Y...kL9p</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={16} className="text-red-500" />
                </Button>
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Icon name="Plus" size={16} />
                Добавить метод вывода
              </Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900">Опасная зона</CardTitle>
              <CardDescription className="text-red-700">Необратимые действия с аккаунтом</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="gap-2">
                <Icon name="Trash2" size={16} />
                Удалить аккаунт
              </Button>
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

export default Profile;
