<template>
  <div v-if="isReady" class="result-page">
    <h1 class="report-title">
      Аудит сайта
      <!-- <span style="color: #6941c7">{{ report.name }}</span> -->
      <a :href="currentProject.website" target="blank">{{
        currentProject.name
      }}</a>
    </h1>
    <div class="result-image">
      <div class="result-screenshot">
        <img :src="currentProject.image" alt="" />
      </div>
    </div>

    <!-- Метрика -->
    <div class="section-header metrics-header">
      <div class="section-info">
        <h2 class="section-title">Метрика</h2>
        <div class="section-description">
          Анализ поведения пользователей на сайте
        </div>
      </div>
    </div>
    <metrics-summary :metrics="currentProject.data.metrics"></metrics-summary>

    <!-- Производительность -->
    <div class="section-header metrics-header">
      <div class="section-info">
        <h2 class="section-title">Производительность</h2>
        <div class="section-description">
          Скорость загрузки сайта. Ключевые показатели.
        </div>
      </div>
    </div>
    <div
      v-if="
        pageSpeedReport.desktop.firstContentPaint.value &&
        pageSpeedReport.displayInReport
      "
      class="report-wrapper"
    >
      <div class="report-container">
        <el-tabs v-model="activeDevice">
          <el-tab-pane>
            <span slot="label"
              ><i class="fa-regular fa-display tab-icon"></i>Десктоп</span
            >
          </el-tab-pane>
          <el-tab-pane
            ><span slot="label"
              ><i class="fa-regular fa-mobile tab-icon"></i>Мобильные</span
            ></el-tab-pane
          >
        </el-tabs>

        <!-- Отчет по десктопу -->
        <div v-if="activeDevice == 0" class="desktop-report">
          <div class="charts">
            <div class="perfomance-chart chart">
              <el-progress
                :width="130"
                :strokeWidth="10"
                type="circle"
                :percentage="
                  Math.round(+pageSpeedReport.desktop.perfomance * 100)
                "
                :color="chartStrokeColor(pageSpeedReport.desktop.perfomance)"
              ></el-progress>
              <div class="chart-title">Производительность</div>
              <div
                class="perfomance-info-description"
                style="text-align: center; max-width: 400px"
              >
                Усредненное значение на основании ключевых показателей.
                Подробнее можно прочитать
                <a
                  href="https://developer.chrome.com/ru/docs/lighthouse/performance/performance-scoring/"
                  target="blank"
                  >здесь</a
                >
              </div>
            </div>
          </div>
          <div class="perfomance-check-list">
            <div class="perfmonace-info-row">
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.desktop.firstContentPaint.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.firstContentPaint.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.firstContentPaint.status == 'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">First Content Paint</div>
                  <div
                    :class="[
                      pageSpeedReport.desktop.firstContentPaint.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.desktop.firstContentPaint.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.desktop.firstContentPaint.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.desktop.firstContentPaint.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Первая отрисовка контента – показатель, который определяет
                    интервал времени между началом загрузки страницы и
                    появлением первого изображения или блока текста.
                  </div>
                </div>
              </div>
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.desktop.timeToInteractive.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.timeToInteractive.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.timeToInteractive.status == 'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">Time to Interactive</div>
                  <div
                    :class="[
                      pageSpeedReport.desktop.timeToInteractive.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.desktop.timeToInteractive.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.desktop.timeToInteractive.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.desktop.timeToInteractive.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Время загрузки для взаимодействия – это время, в течение
                    которого страница становится полностью готова к
                    взаимодействию с пользователем.
                  </div>
                </div>
              </div>
            </div>
            <div class="perfmonace-info-row">
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="pageSpeedReport.desktop.speedIndex.status == 'green'"
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="pageSpeedReport.desktop.speedIndex.status == 'yellow'"
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="pageSpeedReport.desktop.speedIndex.status == 'red'"
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">Speed Index</div>
                  <div
                    :class="[
                      pageSpeedReport.desktop.speedIndex.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.desktop.speedIndex.status == 'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.desktop.speedIndex.status == 'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.desktop.speedIndex.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Индекс скорости загрузки показывает, как быстро на странице
                    появляется контент.
                  </div>
                </div>
              </div>
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.desktop.totalBlockingTime.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.totalBlockingTime.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.totalBlockingTime.status == 'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">Total Blocking Time</div>
                  <div
                    :class="[
                      pageSpeedReport.desktop.totalBlockingTime.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.desktop.totalBlockingTime.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.desktop.totalBlockingTime.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.desktop.totalBlockingTime.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Сумма (в миллисекундах) всех периодов от первой отрисовки
                    контента до загрузки для взаимодействия, когда скорость
                    выполнения задач превышала 50 мс.
                  </div>
                </div>
              </div>
            </div>
            <div class="perfmonace-info-row">
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.desktop.largestContenfulPaint.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.largestContenfulPaint.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.largestContenfulPaint.status ==
                      'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">
                    Largest Contenful Paint
                  </div>
                  <div
                    :class="[
                      pageSpeedReport.desktop.largestContenfulPaint.status ==
                      'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.desktop.largestContenfulPaint.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.desktop.largestContenfulPaint.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.desktop.largestContenfulPaint.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Отрисовка самого крупного контента – показатель, который
                    определяет время, требуемое на полную отрисовку самого
                    крупного изображения или текстового блока.
                  </div>
                </div>
              </div>
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.desktop.cumulativeLayoutShift.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.cumulativeLayoutShift.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.desktop.cumulativeLayoutShift.status ==
                      'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">
                    Cumulative Layout Shift
                  </div>
                  <div
                    :class="[
                      pageSpeedReport.desktop.cumulativeLayoutShift.status ==
                      'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.desktop.cumulativeLayoutShift.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.desktop.cumulativeLayoutShift.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.desktop.cumulativeLayoutShift.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Совокупное смещение макета – это процентная величина, на
                    которую смещаются видимые элементы области просмотра при
                    загрузке.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Отчет по мобильным -->
        <div v-if="activeDevice == 1" class="desktop-report">
          <div class="charts">
            <div class="perfomance-chart chart">
              <el-progress
                :width="130"
                :strokeWidth="10"
                type="circle"
                :percentage="
                  Math.round(+pageSpeedReport.mobile.perfomance * 100)
                "
                :color="chartStrokeColor(pageSpeedReport.mobile.perfomance)"
              ></el-progress>
              <div class="chart-title">Производительность</div>
              <div
                class="perfomance-info-description"
                style="text-align: center; max-width: 400px"
              >
                Усредненное значение на основании ключевых показателей.
                Подробнее можно прочитать
                <a
                  href="https://developer.chrome.com/ru/docs/lighthouse/performance/performance-scoring/"
                  target="blank"
                  >здесь</a
                >
              </div>
            </div>
          </div>
          <div class="perfomance-check-list">
            <div class="perfmonace-info-row">
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.mobile.firstContentPaint.status == 'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.firstContentPaint.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.firstContentPaint.status == 'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">First Content Paint</div>
                  <div
                    :class="[
                      pageSpeedReport.mobile.firstContentPaint.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.mobile.firstContentPaint.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.mobile.firstContentPaint.status == 'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.mobile.firstContentPaint.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Первая отрисовка контента – показатель, который определяет
                    интервал времени между началом загрузки страницы и
                    появлением первого изображения или блока текста.
                  </div>
                </div>
              </div>
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.mobile.timeToInteractive.status == 'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.timeToInteractive.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.timeToInteractive.status == 'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">Time to Interactive</div>
                  <div
                    :class="[
                      pageSpeedReport.mobile.timeToInteractive.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.mobile.timeToInteractive.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.mobile.timeToInteractive.status == 'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.mobile.timeToInteractive.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Время загрузки для взаимодействия – это время, в течение
                    которого страница становится полностью готова к
                    взаимодействию с пользователем.
                  </div>
                </div>
              </div>
            </div>
            <div class="perfmonace-info-row">
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="pageSpeedReport.mobile.speedIndex.status == 'green'"
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="pageSpeedReport.mobile.speedIndex.status == 'yellow'"
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="pageSpeedReport.mobile.speedIndex.status == 'red'"
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">Speed Index</div>
                  <div
                    :class="[
                      pageSpeedReport.mobile.speedIndex.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.mobile.speedIndex.status == 'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.mobile.speedIndex.status == 'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.mobile.speedIndex.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Индекс скорости загрузки показывает, как быстро на странице
                    появляется контент.
                  </div>
                </div>
              </div>
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.mobile.totalBlockingTime.status == 'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.totalBlockingTime.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.totalBlockingTime.status == 'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">Total Blocking Time</div>
                  <div
                    :class="[
                      pageSpeedReport.mobile.totalBlockingTime.status == 'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.mobile.totalBlockingTime.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.mobile.totalBlockingTime.status == 'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.mobile.totalBlockingTime.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Сумма (в миллисекундах) всех периодов от первой отрисовки
                    контента до загрузки для взаимодействия, когда скорость
                    выполнения задач превышала 50 мс.
                  </div>
                </div>
              </div>
            </div>
            <div class="perfmonace-info-row">
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.mobile.largestContenfulPaint.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.largestContenfulPaint.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.largestContenfulPaint.status ==
                      'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">
                    Largest Contenful Paint
                  </div>
                  <div
                    :class="[
                      pageSpeedReport.mobile.largestContenfulPaint.status ==
                      'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.mobile.largestContenfulPaint.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.mobile.largestContenfulPaint.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.mobile.largestContenfulPaint.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Отрисовка самого крупного контента – показатель, который
                    определяет время, требуемое на полную отрисовку самого
                    крупного изображения или текстового блока.
                  </div>
                </div>
              </div>
              <div class="perfomance-item">
                <div class="perfomance-status">
                  <i
                    v-if="
                      pageSpeedReport.mobile.cumulativeLayoutShift.status ==
                      'green'
                    "
                    class="fa-solid fa-circle"
                    style="color: #00c563; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.cumulativeLayoutShift.status ==
                      'yellow'
                    "
                    class="fa-solid fa-square"
                    style="color: #ff9f40; font-size: 12px"
                  ></i>
                  <i
                    v-if="
                      pageSpeedReport.mobile.cumulativeLayoutShift.status ==
                      'red'
                    "
                    class="fa-solid fa-triangle"
                    style="color: #c22b17; font-size: 12px"
                  ></i>
                </div>
                <div class="perfomance-main-info">
                  <div class="perfomance-info-title">
                    Cumulative Layout Shift
                  </div>
                  <div
                    :class="[
                      pageSpeedReport.mobile.cumulativeLayoutShift.status ==
                      'red'
                        ? 'perfomance-red'
                        : '',
                      pageSpeedReport.mobile.cumulativeLayoutShift.status ==
                      'yellow'
                        ? 'perfomance-yellow'
                        : '',
                      pageSpeedReport.mobile.cumulativeLayoutShift.status ==
                      'green'
                        ? 'perfomance-green'
                        : '',
                      'perfomance-info-number',
                    ]"
                  >
                    {{ pageSpeedReport.mobile.cumulativeLayoutShift.value }}
                  </div>
                  <div class="perfomance-info-description">
                    Совокупное смещение макета – это процентная величина, на
                    которую смещаются видимые элементы области просмотра при
                    загрузке.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <metrics-summary
      :metrics="currentProject.data.perfomance.summary"
    ></metrics-summary>

    <!-- Content -->
    <div class="section-header">
      <div class="section-info">
        <h2 class="section-title">Лидген и контент</h2>
        <div class="section-description">
          Насколько ключевые страницы сайта отвечают поставленным задачам?
          <br />Что мешает конвертировать трафик в заявки?
        </div>
      </div>
    </div>
    <div
      v-for="(section, id) in content.sections"
      :key="section.name"
      class="section-wrapper"
    >
      <div class="section-name">
        {{ id + 1 }}. {{ section.name }}
        <div class="checklist-chart">
          <el-progress
            type="dashboard"
            class="green"
            stroke-width="2"
            define-back-color="#E1E2FC"
            :width="45"
            :percentage="
              Math.floor(
                (section.questions.filter(
                  (question) => question.status == 'green'
                ).length /
                  section.questions.length) *
                  100
              )
            "
            :color="chartColors.green"
          ></el-progress>
          <el-progress
            type="dashboard"
            class="yellow"
            stroke-width="2"
            define-back-color="#E1E2FC"
            :width="45"
            :percentage="
              Math.floor(
                (section.questions.filter(
                  (question) => question.status == 'yellow'
                ).length /
                  section.questions.length) *
                  100
              )
            "
            :color="chartColors.yellow"
          ></el-progress>
          <el-progress
            type="dashboard"
            class="red"
            stroke-width="2"
            define-back-color="#E1E2FC"
            :width="45"
            :percentage="
              Math.floor(
                (section.questions.filter(
                  (question) => question.status == 'red'
                ).length /
                  section.questions.length) *
                  100
              )
            "
            :color="chartColors.red"
          ></el-progress>
        </div>
      </div>
      <result-section
        class="result-section"
        v-for="question in section.questions"
        :key="question.question"
        v-bind:question="question"
        v-bind:sectionName="section.name"
      ></result-section>
    </div>

    <section-conclusion
      v-if="content.conclusion != 'Введите вывод'"
      v-bind:text="content.conclusion"
      v-bind:author="content.author"
    >
    </section-conclusion>

    <!-- UI -->
    <div class="section-header">
      <div class="section-info">
        <h2 class="section-title">UI</h2>
        <div class="section-description">
          User Interface Design - это “то, что делает сайт красивым”. Оформление
          элементов интерфейса сайта влияет на конверсию. Соблюдение базовых
          принципов веб-дизайна упрощает работу с материалом страницы,
          располагает пользователя, повышает доверие к бренду и быстрее приводит
          посетителей к цели.
        </div>
      </div>
    </div>
    <div
      v-for="(section, id) in ui.sections"
      :key="section.name"
      class="section-wrapper"
    >
      <div class="section-name">{{ id + 1 }}. {{ section.name }}</div>
      <result-section
        class="result-section"
        v-for="question in section.questions"
        :key="question.question"
        v-bind:question="question"
        v-bind:sectionName="section.name"
      ></result-section>
    </div>

    <section-conclusion
      v-if="ui.conclusion != 'Введите вывод'"
      v-bind:text="ui.conclusion"
      v-bind:author="ui.author"
    >
    </section-conclusion>

    <!-- UX -->
    <div class="section-header">
      <div class="section-info">
        <h2 class="section-title">UX-факторы</h2>
        <div class="section-description">
          User Experience - это пользовательский опыт, то, что делает сайт
          удобным. Насколько вашим пользователям на вашем сайте? Получают ли они
          то, за чем пришли?
        </div>
      </div>
    </div>
    <div
      v-for="(section, id) in ux.sections"
      :key="section.name"
      class="section-wrapper"
    >
      <div class="section-name">{{ id + 1 }}. {{ section.name }}</div>
      <result-section
        class="result-section"
        v-for="question in section.questions"
        :key="question.question"
        v-bind:question="question"
        v-bind:sectionName="section.name"
      ></result-section>
    </div>

    <!-- <section-conclusion
      v-if="ux.conclusion != 'Введите вывод'"
      v-bind:text="ux.conclusion"
      v-bind:author="ux.author"
    >
    </section-conclusion> -->

    <!-- Общий ывывод -->
    <div class="section-header summary-header">
      <div class="section-info">
        <h2 class="section-title">Вывод</h2>
        <div class="section-description">
          Основные заключения по итогам аудита
        </div>
      </div>
    </div>
    <result-summary
      class="summary-body"
      :summary="currentProject.data.summary"
    ></result-summary>
  </div>
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import ProjectNav from "@/components/ProjectNav.vue";
import ChecklistSection from "@/components/ChecklistSection.vue";
import ResultSection from "@/components/ResultSection.vue";
import SectionConclusion from "@/components/SectionConclusion.vue";
export default {
  components: {
    ProjectInfo,
    ProjectNav,
    ChecklistSection,
    ResultSection,
    SectionConclusion,
  },
  name: "IndexPage",

  layout: "result",

  data() {
    return {
      // template: {},
      activeDevice: 0,
      currentProject: {},
      content: {},
      ui: {},
      ux: {},
      isReady: false,
      pageSpeedReport: {},
      chartColors: {
        red: "#F84F68",
        yellow: "#F9D05F",
        green: "#70CFAA",
      },
      // report: {},
    };
  },
  methods: {
    chartStrokeColor(perfomance) {
      if (perfomance <= 0.49) {
        return "#F84F68";
      } else if (perfomance <= 0.5 && perfomance <= 0.89) {
        return "#F9D05F";
      } else {
        return "#00C563";
      }
    },
  },
  async beforeCreate() {
    // let projectID = "4643478";
    // console.log(this.$route);
    // await this.$store.dispatch("downLoadCurrentProject", this.$route.params.id);
    // this.report = this.$store.state.currentProject;
    // console.log(this.report);
    // Считываем ID проекта из роута
    // Делаем запрос к базе, загружаем проект в currentProject
    // Импортируем currentProject из стора, загружаем данные в отчет
    // await this.$store.dispatch("downLoadCurrentProject", this.$route.params.id);
    await this.$store.dispatch("downLoadCurrentProject", this.$route.params.id);
    this.currentProject = this.$store.state.currentProject;
    this.content = this.$store.state.currentProject.data.content;
    this.pageSpeedReport = this.currentProject.data.perfomance.pageSpeed;
    this.isReady = true;
    // console.log(this.currentProject);

    for (let i = 0; i < this.content.sections.length; i++) {
      this.content.sections[i].questions = this.content.sections[
        i
      ].questions.filter((question) => {
        return question.answer != "" && question.status != "";
      });
    }
    for (let i = 0; i < this.content.sections.length; i++) {
      this.content.sections = this.content.sections.filter((section) => {
        return section.questions.length > 0;
      });
    }

    this.ui = this.currentProject.data.ui;
    for (let i = 0; i < this.ui.sections.length; i++) {
      this.ui.sections[i].questions = this.ui.sections[i].questions.filter(
        (question) => {
          return question.answer != "" && question.status != "";
        }
      );
    }
    for (let i = 0; i < this.ui.sections.length; i++) {
      this.ui.sections = this.ui.sections.filter((section) => {
        return section.questions.length > 0;
      });
    }

    this.ux = this.currentProject.data.ux;
    for (let i = 0; i < this.ux.sections.length; i++) {
      this.ux.sections[i].questions = this.ux.sections[i].questions.filter(
        (question) => {
          return question.answer != "" && question.status != "";
        }
      );
    }
    for (let i = 0; i < this.ux.sections.length; i++) {
      this.ux.sections = this.ux.sections.filter((section) => {
        return section.questions.length > 0;
      });
    }
  },
  async mounted() {
    // for (let i = 0; i < this.content.sections.length; i++) {
    //   this.content.sections[i].questions = this.content.sections[
    //     i
    //   ].questions.filter((question) => {
    //     return question.answer != "";
    //   });
    // }
    // for (let i = 0; i < this.content.sections.length; i++) {
    //   this.content.sections = this.content.sections.filter((section) => {
    //     return section.questions.length > 0;
    //   });
    // }
    // this.ui = this.currentProject.data.ui;
    // for (let i = 0; i < this.ui.sections.length; i++) {
    //   this.ui.sections[i].questions = this.ui.sections[i].questions.filter(
    //     (question) => {
    //       return question.answer != "";
    //     }
    //   );
    // }
    // for (let i = 0; i < this.ui.sections.length; i++) {
    //   this.ui.sections = this.ui.sections.filter((section) => {
    //     return section.questions.length > 0;
    //   });
    // }
    // this.ux = this.currentProject.data.ux;
    // for (let i = 0; i < this.ux.sections.length; i++) {
    //   this.ux.sections[i].questions = this.ux.sections[i].questions.filter(
    //     (question) => {
    //       return question.answer != "";
    //     }
    //   );
    // }
    // for (let i = 0; i < this.ux.sections.length; i++) {
    //   this.ux.sections = this.ux.sections.filter((section) => {
    //     return section.questions.length > 0;
    //   });
    // }
  },
  // async fetch() {
  //   //Здесь берем уникальный код из адресной строки и по нему ищем нужный аудит в базе, загружаем сюда.
  //   // this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts')
  // },
};
</script>

<style lang="scss">
.result-page {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;

  position: relative;

  img {
    cursor: default !important;
  }
  .report-title {
    margin-bottom: 40px;
    font-size: 48px;
    text-align: center;
    @media (max-width: 800px) {
      font-size: 38px;
    }

    a {
      color: $mainPurple;
      text-decoration: none;
    }
  }
  .result-image {
    position: relative;
    background-image: url("@/assets/img/laptop.png");
    width: 655px;
    height: 382px;
    margin-bottom: 80px;
    background-size: contain;
    filter: drop-shadow(0px 16.9792px 43.8629px rgba(0, 0, 0, 0.18));
    @media (max-width: 800px) {
      width: 436px;
      height: 254px;
    }
    @media (max-width: 600px) {
      width: 288px;
      height: 168px;
    }

    .result-screenshot {
      position: absolute;
      overflow: hidden;
      top: 26px;
      left: 82px;
      background-color: rgb(208, 208, 238);
      width: 490px;
      height: 307px;
      img {
        width: 490px;
        height: 307px;
        object-fit: cover;
        object-position: top;
      }

      @media (max-width: 800px) {
        width: 326px;
        height: 204px;
        top: 16px;
        left: 56px;
        img {
          width: 326px;
          height: 204px;
        }
      }
      @media (max-width: 600px) {
        width: 216px;
        height: 135px;
        top: 11px;
        left: 36px;
        img {
          width: 216px;
          height: 135px;
        }
      }
    }
  }

  .section-wrapper {
    width: 100%;
    background-color: white;
    border-radius: 12px;
    margin-bottom: 32px;

    .section-name {
      background-color: rgba(216, 216, 255, 0.32) !important;
      height: 76px;
      padding: 0 28px 0 40px;
      font-size: 18px;
      color: #5c5374 !important;
      font-weight: 400;
      border-radius: 12px 12px 0 0;
      border: none;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .checklist-chart {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        .el-progress__text {
          font-size: 13px !important;
          font-weight: 500;
        }

        .green .el-progress__text {
          color: #70cfaa !important;
        }
        .yellow .el-progress__text {
          color: #ffbf10 !important;
        }
        .red .el-progress__text {
          color: #f84f68 !important;
        }
      }
    }
  }

  .summary-header {
    margin-top: 64px;
  }
  .summary-body {
    margin-bottom: 64px;
  }

  .metrics-header {
    // border-top: 1px solid #ebebfc;
    margin-top: 56px;
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    .result-info {
      .result-description {
        color: #969fa8;
        font-size: 15px;
        max-width: 1000px;
        text-align: center;
      }
    }
  }

  .result-section:not(:last-of-type) {
    border-bottom: 1px solid #ebebfc;
  }

  .result-section {
    .answer {
      font-size: 16px;
    }
  }
}

.report-wrapper {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 50px 12px 40px 12px;
  margin-bottom: 32px;
  .report-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    .el-tabs {
      margin-bottom: 24px;
      .el-tabs__nav-scroll {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .el-tabs__nav-wrap::after {
        display: none;
      }

      .tab-icon {
        margin-right: 4px;
      }

      .el-tabs__item {
        position: relative;
        color: rgb(150, 159, 168);
        &:hover {
          color: #6941c7;
        }
      }
      .el-tabs__item.is-active {
        color: #6941c7;
      }

      .el-tabs__active-bar {
        background-color: #6941c7;
      }
    }

    .perfomance-info-description {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: $darkGrey;
    }

    .charts {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 100px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgb(224, 224, 242);
      margin-bottom: 40px;

      .chart {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 14px;
        .chart-title {
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
        }
      }
    }

    .perfmonace-info-row {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 36px;

      .perfomance-item {
        width: 50%;
        padding-right: 24px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 12px;

        .perfomance-info-title {
          font-weight: 400;
          font-size: 16px;
          margin-bottom: 6px;
        }

        .perfomance-info-number {
          font-weight: 500;
          font-size: 23px;
          margin-bottom: 10px;
        }

        .perfomance-green {
          color: #007d1c;
        }

        .perfomance-yellow {
          color: #ff9f40;
        }

        .perfomance-red {
          color: #f84f68;
        }
      }
    }
  }
}

.ql-size-large {
  font-size: 1.5em;
}
</style>
