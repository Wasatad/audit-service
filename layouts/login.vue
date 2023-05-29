<template>
  <Nuxt />
</template>

<script>
export default {};
</script>

<style lang="scss">
html {
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  font-family: "Inter", sans-serif;
}

* {
  box-sizing: border-box;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  background-color: $lightBG;
  color: $black;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

button {
  outline: none;
}
</style>
