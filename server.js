
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Раздача статических файлов из текущей директории
app.use(express.static(__dirname));

// Все остальные запросы направляем на index.html (для поддержки SPA роутинга в будущем)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `--------------------------------------------------`);
  console.log(`\x1b[32m%s\x1b[0m`, `🚀 IT Pulse запущен!`);
  console.log(`\x1b[35m%s\x1b[0m`, `🔗 Адрес: http://localhost:${PORT}`);
  console.log(`\x1b[36m%s\x1b[0m`, `--------------------------------------------------`);
});
