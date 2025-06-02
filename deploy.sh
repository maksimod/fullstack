#!/bin/bash

# Установка зависимостей
echo "Устанавливаем зависимости..."
pnpm install

# Сборка бэкенда
echo "Собираем бэкенд..."
cd backend
pnpm build
cd ..

# Сборка фронтенда
echo "Собираем фронтенд..."
cd webapp
pnpm build
cd ..

# Запуск миграций
echo "Запускаем миграции базы данных..."
cd backend
pnpm prisma migrate deploy
cd ..

# Установка и настройка Nginx
echo "Настраиваем Nginx..."
sudo cp nginx-config.conf /etc/nginx/sites-available/myownworldproject.conf
sudo ln -sf /etc/nginx/sites-available/myownworldproject.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Установка PM2 если не установлен
if ! command -v pm2 &> /dev/null; then
    echo "Устанавливаем PM2..."
    npm install -g pm2
fi

# Запуск приложения через PM2
echo "Запускаем приложение через PM2..."
pm2 delete all || true
pm2 start ecosystem.config.js

# Настройка запуска PM2 при старте системы
echo "Настраиваем автозапуск PM2..."
pm2 save
pm2 startup

echo "Установка завершена! Приложение доступно по адресу: http://myownworldproject.ru" 