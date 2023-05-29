# Audit Service

Веб-приложение для проведения UX/UI аудитов сайтов.


## Функциональность

Приложение позволяет:

- Добавлять новые сайты. Обложка (скриншот страницы) генерируется автоматически с помощью библиотеки [Puppeteer](https://pptr.dev/).
- Проводить аудит страницы по предварительно сформированному шаблону/чеклисту в соотвествии с предоставленными пользователю правами
- Дополнять стартовый шаблон дополнительными пунктами, вводить текст в свободной форме
- Форматировать текст
- Добавлять картинки
- Осуществлять замер производитьельности страницы с помощью API [PageSpeedInsights](https://developers.google.com/speed/docs/insights/v5/get-started?hl=ru)
- Формировать страницу финального отчета

## Интерфейс

![image](assets/img/Projects-prev.png)
![image](assets/img/UX-prev.png)
![image](assets/img/PSI-prev.png)

## Использованные инструменты

- [Vue.js](https://vuejs.org/) - JS фреймворк
- [Nuxt.js](https://nuxtjs.org/) - Vue фреймворк
- [Vuex.js](https://vuex.vuejs.org/) - менеджер состояний
- [SCSS](https://sass-lang.com/) - CSS препроцессор
- [Element-ui](https://element.eleme.io/#/en-US) - UI библиотека
- [Firebase](https://firebase.google.com/) - База данных
- [Quill](https://quilljs.com/) - Текстовый редактор
- [Puppeteer](https://pptr.dev/) - Node.js библиотека
