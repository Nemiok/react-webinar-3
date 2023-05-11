import React from 'react';
import { createRoot } from 'react-dom/client';
import { generateUniqueId } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: generateUniqueId(), title: 'Название элемента', clicked: 0 },
    { code: generateUniqueId(), title: 'Некий объект', clicked: 0 },
    { code: generateUniqueId(), title: 'Заголовок', clicked: 0 },
    { code: generateUniqueId(), title: 'Очень длинное название элемента из семи слов', clicked: 0 },
    { code: generateUniqueId(), title: 'Запись', clicked: 0 },
    { code: generateUniqueId(), title: 'Шестая запись', clicked: 0 },
    { code: generateUniqueId(), title: 'Седьмая запись', clicked: 0 },
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
