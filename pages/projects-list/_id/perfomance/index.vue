<template>
  <div class="project-page perfomance-wrapper">
    <project-info></project-info>
    <project-nav></project-nav>
    <div class="perfomance-container">
      <div class="control-panel">
        <div class="service-logo-container">
          <img src="@/assets/img/pageSpeedLogo.png" alt="" />
          <span>PageSpeed Insights</span>
        </div>
        <div class="controls-container">
          <el-button
            v-if="!pageSpeedReport.desktop.firstContentPaint.value"
            @click="fetchPageSpeedReport"
            :loading="reportIsLoading"
            class="analyze-btn"
            type="default"
            icon="fa-regular fa-play main-btn-icon"
            >Выполнить анализ</el-button
          >
          <el-button
            v-if="
              pageSpeedReport.desktop.firstContentPaint.value &&
              pageSpeedReport.mobile.firstContentPaint.value
            "
            @click="fetchPageSpeedReport"
            :loading="reportIsLoading"
            class="analyze-btn"
            type="default"
            icon="fa-regular fa-arrow-rotate-right main-btn-icon"
            >Обновить</el-button
          >
          <el-tooltip
            v-if="user.admin || user.role == 'designer'"
            :content="
              pageSpeedReport.displayInReport
                ? 'Включено в отчет'
                : 'Не включено в отчет'
            "
            placement="top"
          >
            <el-switch
              @change="setPerfomanceReport(pageSpeedReport)"
              v-model="pageSpeedReport.displayInReport"
              active-color="#6941C7"
              inactive-color="#E4DCF9"
            >
            </el-switch>
          </el-tooltip>
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
          <el-tabs v-model="activeDevice" @tab-click="handleClick">
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
                        pageSpeedReport.desktop.firstContentPaint.status ==
                        'red'
                      "
                      class="fa-solid fa-triangle"
                      style="color: #c22b17; font-size: 12px"
                    ></i>
                  </div>
                  <div class="perfomance-main-info">
                    <div class="perfomance-info-title">First Content Paint</div>
                    <div
                      :class="[
                        pageSpeedReport.desktop.firstContentPaint.status ==
                        'red'
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
                        pageSpeedReport.desktop.timeToInteractive.status ==
                        'red'
                      "
                      class="fa-solid fa-triangle"
                      style="color: #c22b17; font-size: 12px"
                    ></i>
                  </div>
                  <div class="perfomance-main-info">
                    <div class="perfomance-info-title">Time to Interactive</div>
                    <div
                      :class="[
                        pageSpeedReport.desktop.timeToInteractive.status ==
                        'red'
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
                      v-if="
                        pageSpeedReport.desktop.speedIndex.status == 'green'
                      "
                      class="fa-solid fa-circle"
                      style="color: #00c563; font-size: 12px"
                    ></i>
                    <i
                      v-if="
                        pageSpeedReport.desktop.speedIndex.status == 'yellow'
                      "
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
                      Индекс скорости загрузки показывает, как быстро на
                      странице появляется контент.
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
                        pageSpeedReport.desktop.totalBlockingTime.status ==
                        'red'
                      "
                      class="fa-solid fa-triangle"
                      style="color: #c22b17; font-size: 12px"
                    ></i>
                  </div>
                  <div class="perfomance-main-info">
                    <div class="perfomance-info-title">Total Blocking Time</div>
                    <div
                      :class="[
                        pageSpeedReport.desktop.totalBlockingTime.status ==
                        'red'
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
            <a
              class="full-perfomance-report"
              target="blank"
              :href="pageSpeedLink"
              >Полный отчет на сайте<i class="fa-light fa-arrow-right"></i
            ></a>
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
                        pageSpeedReport.mobile.firstContentPaint.status ==
                        'green'
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
                        pageSpeedReport.mobile.firstContentPaint.status ==
                        'green'
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
                        pageSpeedReport.mobile.timeToInteractive.status ==
                        'green'
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
                        pageSpeedReport.mobile.timeToInteractive.status ==
                        'green'
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
                      v-if="
                        pageSpeedReport.mobile.speedIndex.status == 'yellow'
                      "
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
                      Индекс скорости загрузки показывает, как быстро на
                      странице появляется контент.
                    </div>
                  </div>
                </div>
                <div class="perfomance-item">
                  <div class="perfomance-status">
                    <i
                      v-if="
                        pageSpeedReport.mobile.totalBlockingTime.status ==
                        'green'
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
                        pageSpeedReport.mobile.totalBlockingTime.status ==
                        'green'
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
            <a
              class="full-perfomance-report"
              target="blank"
              :href="pageSpeedLink"
              >Полный отчет на сайте<i class="fa-light fa-arrow-right"></i
            ></a>
          </div>
        </div>
      </div>
      <div v-if="user.admin">
        <client-only>
          <quill-editor
            class="quill-textarea"
            ref="editor"
            v-model="currentProject.data.perfomance.summary"
            @blur="handleBlur"
            @focus="handleFocus"
            @change="onEditorChange($event)"
            :options="editorOption"
          />
        </client-only>
      </div>
      <div
        class="metrics-container"
        v-else
        v-html="currentProject.data.metrics"
      ></div>
    </div>
  </div>
</template>

<script>
import ProjectInfo from "@/components/ProjectInfo.vue";
import ProjectNav from "@/components/ProjectNav.vue";
import { mapState, mapActions } from "vuex";
export default {
  middleware: ["auth"],
  components: { ProjectInfo, ProjectNav },
  name: "IndexPage",

  data() {
    return {
      activeDevice: 0,
      reportIsLoading: false,
      pageSpeedReport: {
        displayInReport: false,
        mobile: {
          perfomance: "",
          firstContentPaint: {
            value: "",
            status: "",
          },
          timeToInteractive: {
            value: "",
            status: "",
          },
          speedIndex: {
            value: "",
            status: "",
          },
          totalBlockingTime: {
            value: "",
            status: "",
          },
          largestContenfulPaint: {
            value: "",
            status: "",
          },
          cumulativeLayoutShift: {
            value: "",
            status: "",
          },
        },
        desktop: {
          perfomance: "",
          firstContentPaint: {
            value: "",
            status: "",
          },
          timeToInteractive: {
            value: "",
            status: "",
          },
          speedIndex: {
            value: "",
            status: "",
          },
          totalBlockingTime: {
            value: "",
            status: "",
          },
          largestContenfulPaint: {
            value: "",
            status: "",
          },
          cumulativeLayoutShift: {
            value: "",
            status: "",
          },
        },
      },

      questionImages: [],
      editorOption: {
        // Some Quill options...
        theme: "snow",
        placeholder: "Комментарий...",
        modules: {
          imageResize: true,
          toolbar: [
            [{ font: [] }, { size: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "super" }, { script: "sub" }],
            [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["direction", { align: [] }],
            ["link", "image"],
            ["clean"],
          ],
          imageUploader: {
            upload: (file) => {
              return new Promise(async (resolve, reject) => {
                let url = await this.uploadImageToProject({ file: file });
                this.questionImages.push(url.split("?")[0].slice(-23));
                resolve(url);
              });
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapState(["currentProject", "user"]),

    pageSpeedLink() {
      let link = this.currentProject.website
        .replace(/\//g, "%2F")
        .replace(/:/g, "%3A");
      return `https://pagespeed.web.dev/report?url=${link}&form_factor=desktop`;
    },
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
    handleClick(tab, e) {
      console.log(tab);
      console.log(e);
    },
    ...mapActions([
      "setPerfomanceReport",
      "uploadImageToProject",
      "removeImageFromProject",
      "updateProject",
    ]),
    async fetchPageSpeedReport() {
      // Запрашиваем анализ производительности
      this.reportIsLoading = true;

      // Запрашиваем данные для десктопа
      let desktopPerformanceReport = await this.$axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${this.currentProject.website}&strategy=desktop`
      );

      this.pageSpeedReport.desktop.perfomance = 0;
      setTimeout(() => {
        this.pageSpeedReport.desktop.perfomance =
          desktopPerformanceReport.data.lighthouseResult.categories.performance.score;
      }, 100);

      // Устанавливаем First Content Paint
      this.pageSpeedReport.desktop.firstContentPaint.value =
        desktopPerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].displayValue;

      if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.desktop.firstContentPaint.status = "red";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score >= 0.5 &&
        desktopPerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.desktop.firstContentPaint.status = "yellow";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.desktop.firstContentPaint.status = "green";
      }

      // Устанавливаем Time To Interactive
      this.pageSpeedReport.desktop.timeToInteractive.value =
        desktopPerformanceReport.data.lighthouseResult.audits.interactive.displayValue;

      if (
        desktopPerformanceReport.data.lighthouseResult.audits.interactive
          .score <= 0.49
      ) {
        this.pageSpeedReport.desktop.timeToInteractive.status = "red";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits.interactive
          .score >= 0.5 &&
        desktopPerformanceReport.data.lighthouseResult.audits.interactive
          .score <= 0.89
      ) {
        this.pageSpeedReport.desktop.timeToInteractive.status = "yellow";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits.interactive
          .score >= 0.9
      ) {
        this.pageSpeedReport.desktop.timeToInteractive.status = "green";
      }

      // Устанавливаем Speed Index
      this.pageSpeedReport.desktop.speedIndex.value =
        desktopPerformanceReport.data.lighthouseResult.audits[
          "speed-index"
        ].displayValue;

      if (
        desktopPerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score <= 0.49
      ) {
        this.pageSpeedReport.desktop.speedIndex.status = "red";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score >= 0.5 &&
        desktopPerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score <= 0.89
      ) {
        this.pageSpeedReport.desktop.speedIndex.status = "yellow";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score >= 0.9
      ) {
        this.pageSpeedReport.desktop.speedIndex.status = "green";
      }

      // Устанавливаем Total Blocking Time
      this.pageSpeedReport.desktop.totalBlockingTime.value =
        desktopPerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].displayValue;

      if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.desktop.totalBlockingTime.status = "red";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score >= 0.5 &&
        desktopPerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.desktop.totalBlockingTime.status = "yellow";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.desktop.totalBlockingTime.status = "green";
      }

      // Устанавливаем Largest Contenful Paint
      this.pageSpeedReport.desktop.largestContenfulPaint.value =
        desktopPerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].displayValue;

      if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.desktop.largestContenfulPaint.status = "red";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score >= 0.5 &&
        desktopPerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.desktop.largestContenfulPaint.status = "yellow";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.desktop.largestContenfulPaint.status = "green";
      }

      // Устанавливаем Cumulative Layout Shift
      this.pageSpeedReport.desktop.cumulativeLayoutShift.value =
        desktopPerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].displayValue;

      if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.desktop.cumulativeLayoutShift.status = "red";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score >= 0.5 &&
        desktopPerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.desktop.cumulativeLayoutShift.status = "yellow";
      } else if (
        desktopPerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.desktop.cumulativeLayoutShift.status = "green";
      }

      // Запрашиваем данные для мобильных

      let mobilePerformanceReport = await this.$axios.get(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${this.currentProject.website}&strategy=mobile`
      );

      this.pageSpeedReport.mobile.perfomance = 0;
      setTimeout(() => {
        this.pageSpeedReport.mobile.perfomance =
          mobilePerformanceReport.data.lighthouseResult.categories.performance.score;
      }, 100);

      // Устанавливаем First Content Paint
      this.pageSpeedReport.mobile.firstContentPaint.value =
        mobilePerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].displayValue;

      if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.mobile.firstContentPaint.status = "red";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score >= 0.5 &&
        mobilePerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.mobile.firstContentPaint.status = "yellow";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "first-contentful-paint"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.mobile.firstContentPaint.status = "green";
      }

      // Устанавливаем Time To Interactive
      this.pageSpeedReport.mobile.timeToInteractive.value =
        mobilePerformanceReport.data.lighthouseResult.audits.interactive.displayValue;

      if (
        mobilePerformanceReport.data.lighthouseResult.audits.interactive
          .score <= 0.49
      ) {
        this.pageSpeedReport.mobile.timeToInteractive.status = "red";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits.interactive
          .score >= 0.5 &&
        mobilePerformanceReport.data.lighthouseResult.audits.interactive
          .score <= 0.89
      ) {
        this.pageSpeedReport.mobile.timeToInteractive.status = "yellow";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits.interactive
          .score >= 0.9
      ) {
        this.pageSpeedReport.mobile.timeToInteractive.status = "green";
      }

      // Устанавливаем Speed Index
      this.pageSpeedReport.mobile.speedIndex.value =
        mobilePerformanceReport.data.lighthouseResult.audits[
          "speed-index"
        ].displayValue;

      if (
        mobilePerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score <= 0.49
      ) {
        this.pageSpeedReport.mobile.speedIndex.status = "red";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score >= 0.5 &&
        mobilePerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score <= 0.89
      ) {
        this.pageSpeedReport.mobile.speedIndex.status = "yellow";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits["speed-index"]
          .score >= 0.9
      ) {
        this.pageSpeedReport.mobile.speedIndex.status = "green";
      }

      // Устанавливаем Total Blocking Time
      this.pageSpeedReport.mobile.totalBlockingTime.value =
        mobilePerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].displayValue;

      if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.mobile.totalBlockingTime.status = "red";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score >= 0.5 &&
        mobilePerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.mobile.totalBlockingTime.status = "yellow";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "total-blocking-time"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.mobile.totalBlockingTime.status = "green";
      }

      // Устанавливаем Largest Contenful Paint
      this.pageSpeedReport.mobile.largestContenfulPaint.value =
        mobilePerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].displayValue;

      if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.mobile.largestContenfulPaint.status = "red";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score >= 0.5 &&
        mobilePerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.mobile.largestContenfulPaint.status = "yellow";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "largest-contentful-paint"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.mobile.largestContenfulPaint.status = "green";
      }

      // Устанавливаем Cumulative Layout Shift
      this.pageSpeedReport.mobile.cumulativeLayoutShift.value =
        mobilePerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].displayValue;

      if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score <= 0.49
      ) {
        this.pageSpeedReport.mobile.cumulativeLayoutShift.status = "red";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score >= 0.5 &&
        mobilePerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score <= 0.89
      ) {
        this.pageSpeedReport.mobile.cumulativeLayoutShift.status = "yellow";
      } else if (
        mobilePerformanceReport.data.lighthouseResult.audits[
          "cumulative-layout-shift"
        ].score >= 0.9
      ) {
        this.pageSpeedReport.mobile.cumulativeLayoutShift.status = "green";
      }
      this.reportIsLoading = false;
      this.pageSpeedReport.displayInReport = true;
      this.setPerfomanceReport(this.pageSpeedReport);
    },
    onEditorChange({ quill, html, text, param }) {
      quill.focus();
    },
    async addImageHandler(image, Editor, cursorLocation, resetUploader) {
      console.log("image has added!");
    },
    handleBlur(e) {
      this.updateAudit();

      // Удаляем загруженные фотографии, к которым больше нет доступа (удалены из проекта)
      let existingImages = e.container.querySelectorAll(".ql-editor img");
      let list = Array.from(existingImages);
      let existingImagesNames = [];
      for (let image of list) {
        existingImagesNames.push(image.currentSrc.split("?")[0].slice(-23));
      }

      console.log(existingImagesNames);

      for (let i = 0; i < this.questionImages.length; i++) {
        const r1 = existingImagesNames.find(
          (image) => image === this.questionImages[i]
        );
        if (r1) {
        } else {
          console.log(this.questionImages[i]);
          this.removeImageFromProject({ imageID: this.questionImages[i] });
        }
      }

      // Скрываем панель инструментов
      if (!document.activeElement.classList.contains("ql-picker-label")) {
        let editingPanel = e.container.parentNode.querySelector(".ql-toolbar");
        if (editingPanel.classList.contains("show-editing")) {
          editingPanel.classList.remove("show-editing");
        }
      }
    },
    handleFocus(e) {
      //Переносим все фотки в data
      if (this.questionImages.length == 0) {
        let allImages = e.container.querySelectorAll(".ql-editor img");
        let list = Array.from(allImages);
        for (let image of list) {
          this.questionImages.push(image.currentSrc.split("?")[0].slice(-23));
        }
      }
      console.log(this.questionImages);

      // Показываем панель инструментов
      let editingPanel = e.container.parentNode.querySelector(".ql-toolbar");
      editingPanel.classList.add("show-editing");
    },
    updateAudit() {
      console.log("updated");
      this.updateProject();
    },
  },
  mounted() {
    this.pageSpeedReport = this.currentProject.data.perfomance.pageSpeed;
  },
};
</script>

<style lang="scss">
.perfomance-wrapper {
  min-height: calc(100vh - 90px);

  .control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .service-logo-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 12px;
      font-size: 24px;
      font-weight: 400;
      color: $black;

      img {
        width: 30px;
      }
    }

    .controls-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 42px;
      .analyze-btn {
        color: $black;
        font-size: 14px;
        font-weight: 400;
        height: 45px;
        background: $mainPurple;
        display: flex;
        align-items: center;
        transition: 0.2s ease-in-out;
        color: #fff;
        position: relative;
        border: none;

        .main-btn-icon {
          font-size: 18px !important;
          margin-right: 8px;
        }

        &:hover {
          background-color: $darkPurple !important;
        }
      }
      .el-switch:after {
        content: "";
        height: 100%;
        width: 1px;
        position: absolute;
        left: -20px;
        background-color: rgb(224, 224, 242);
      }
    }
  }

  .quill-textarea {
    background-color: #fff;
    padding: 32px;
    border-radius: 12px;
    min-height: 200px;
    margin-bottom: 32px;
  }
}

.report-wrapper {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 40px 12px;
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

  .perfomance-link-btn {
    width: 100%;
    background-color: #fff;
    border: 1px solid #e0e0f2;
    color: $mainPurple;
    height: 50px;
    &:hover {
      background-color: $mainPurple;
      color: #fff;
      border: 1px solid $mainPurple;
    }
  }

  .full-perfomance-report {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e0e0f2;
    border-radius: 6px;
    color: $mainPurple;
    height: 50px;
    font-size: 14px;
    font-weight: 500;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: $mainPurple;
      color: #fff;
      border: 1px solid $mainPurple;
    }
  }
}
</style>
