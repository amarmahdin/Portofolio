<template>
  <section class="github-contrib mt-8 sm:mt-10 w-full max-w-5xl">
    <p class="text-base sm:text-sm font-bold text-gray-900 dark:text-white mb-3">{{ t.title }}</p>

    <div
      v-if="loading"
      class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0d1117] p-8 text-center text-sm text-gray-400"
    >
      {{ t.loading }}
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0d1117] p-8 flex flex-col items-center gap-3 text-sm text-gray-500"
    >
      <p>{{ t.error }}</p>
      <button
        type="button"
        class="px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white text-xs font-medium cursor-pointer"
        @click="loadAll"
      >
        {{ t.retry }}
      </button>
    </div>

    <div
      v-else
      class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0d1117] p-3.5 sm:p-5 transition-colors duration-500"
    >
      <div class="flex gap-3 items-start">
        <div class="flex-1 min-w-0">
          <p class="text-[15px] sm:text-sm text-gray-700 dark:text-gray-300 mb-3 leading-snug">
            <strong class="font-semibold text-gray-900 dark:text-white">{{ displayedTotal }}</strong>
            {{ t.contributions }}
            {{ isCurrentYearView ? t.lastYear : t.inYear(selectedYear) }}
          </p>

          <div ref="calendarHost" class="w-full calendar-scroll overflow-x-auto">
            <div
              class="calendar-inner relative"
              :style="calendarInnerStyle"
            >
              <div class="relative h-5 mb-1.5" :style="{ marginLeft: `${dayLabelW}px` }">
                <span
                  v-for="(m, i) in monthSpans"
                  :key="i"
                  class="absolute top-0 text-[11px] sm:text-[10px] leading-none text-gray-500 dark:text-gray-400"
                  :style="{ left: `${(m.offset / Math.max(weeks.length, 1)) * 100}%` }"
                >
                  {{ m.label }}
                </span>
              </div>

              <div class="flex w-full">
                <div
                  class="relative shrink-0 text-[10px] leading-none text-gray-500 dark:text-gray-400 select-none"
                  :style="{ width: `${dayLabelW}px`, height: `${gridHeight}px` }"
                >
                  <span class="absolute left-0" :style="{ top: `${1 * cellSize + cellInner / 2 - 5}px` }">{{ t.mon }}</span>
                  <span class="absolute left-0" :style="{ top: `${3 * cellSize + cellInner / 2 - 5}px` }">{{ t.wed }}</span>
                  <span class="absolute left-0" :style="{ top: `${5 * cellSize + cellInner / 2 - 5}px` }">{{ t.fri }}</span>
                </div>

                <div
                  class="grid flex-1 min-w-0"
                  :style="{
                    gridTemplateColumns: isCompact
                      ? `repeat(${weeks.length}, ${cellInner}px)`
                      : `repeat(${weeks.length}, minmax(0, 1fr))`,
                    gap: `${GAP}px`,
                  }"
                >
                  <div
                    v-for="(week, wi) in weeks"
                    :key="wi"
                    class="grid"
                    :style="{
                      gridTemplateRows: `repeat(7, ${cellInner}px)`,
                      gap: `${GAP}px`,
                    }"
                  >
                    <button
                      v-for="(day, di) in week"
                      :key="di"
                      type="button"
                      class="contrib-cell rounded-[2px] p-0 border-0 w-full focus:outline-none focus-visible:ring-1 focus-visible:ring-green-500"
                      :class="cellClass(day)"
                      :tabindex="day && !day.empty ? 0 : -1"
                      :aria-label="day && !day.empty ? tooltipText(day) : undefined"
                      :disabled="!day || day.empty"
                      @mouseenter="day && !day.empty && showTooltip(day, $event)"
                      @mouseleave="hideTooltip"
                      @focus="day && !day.empty && showTooltip(day, $event)"
                      @blur="hideTooltip"
                      @click="day && openDay(day)"
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="hoveredDay"
                class="gh-tooltip pointer-events-none absolute z-30 px-2.5 py-1.5 rounded-md text-xs font-medium text-white bg-gray-900 shadow-lg whitespace-nowrap"
                :style="tooltipStyle"
              >
                {{ tooltipText(hoveredDay) }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between gap-2 mt-3">
            <a
              href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[11px] text-gray-500 dark:text-gray-400 hover:text-[#0969da] dark:hover:text-[#4493f8] leading-tight"
            >
              <span class="hidden sm:inline">{{ t.learnMore }}</span>
              <span class="sm:hidden">{{ t.learnMoreShort }}</span>
            </a>
            <div class="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 shrink-0">
              <span>{{ t.less }}</span>
              <span
                v-for="lvl in [0, 1, 2, 3, 4]"
                :key="lvl"
                class="rounded-[2px] w-2.5 h-2.5"
                :class="levelClass(lvl)"
              />
              <span>{{ t.more }}</span>
            </div>
          </div>
        </div>

        <div class="hidden md:flex flex-col gap-1.5 shrink-0 pt-8">
          <button
            v-for="year in yearOptions"
            :key="year"
            type="button"
            class="w-[68px] py-2 rounded-md text-sm font-medium transition-colors cursor-pointer text-center"
            :class="selectedYear === year
              ? 'bg-[#1f6feb] text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#21262d]'"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-1.5 mt-4 md:hidden">
        <button
          v-for="year in yearOptions"
          :key="`m-${year}`"
          type="button"
          class="py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          :class="selectedYear === year
            ? 'bg-[#1f6feb] text-white shadow-sm'
            : 'bg-gray-100 dark:bg-[#21262d] text-gray-700 dark:text-gray-300'"
          @click="selectedYear = year"
        >
          {{ year }}
        </button>
      </div>

      <div class="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
        <div class="lg:pr-8 min-w-0">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2.5">{{ t.activityOverview }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ t.contributedTo }}
            <template v-for="(repo, i) in topRepos" :key="repo.full_name">
              <a
                :href="repo.html_url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#0969da] dark:text-[#4493f8] hover:underline break-words"
              >{{ repo.full_name }}</a><span v-if="i < topRepos.length - 1">, </span>
            </template>
            <template v-if="otherRepoCount > 0">{{ t.andOthers(otherRepoCount) }}</template>
            <template v-else-if="!topRepos.length">{{ t.noRepos }}</template>
          </p>
        </div>

        <div class="lg:pl-8 lg:border-l border-gray-200 dark:border-gray-700 flex items-center justify-center py-2">
          <div class="activity-wrap">
            <div class="activity-label activity-label-top">{{ t.codeReview }}</div>
            <div class="activity-label activity-label-left">{{ leftAxisLabel }}</div>

            <svg class="activity-svg" viewBox="0 0 200 200" aria-hidden="true">
              <line x1="100" y1="24" x2="100" y2="176" class="axis-full" />
              <line x1="24" y1="100" x2="176" y2="100" class="axis-full" />
              <line
                :x1="100"
                :y1="100"
                :x2="dominantArm.x"
                :y2="dominantArm.y"
                class="axis-strong"
              />
              <circle
                :cx="dominantArm.x"
                :cy="dominantArm.y"
                r="6"
                fill="#ffffff"
                stroke="#3fb950"
                stroke-width="2.5"
              />
              <circle cx="100" cy="100" r="3" fill="#3fb950" />
            </svg>

            <div class="activity-label activity-label-right">{{ t.issues }}</div>
            <div class="activity-label activity-label-bottom">{{ t.pullRequests }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch, nextTick } from 'vue'

const USERNAME = 'amarmahdin'
const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`
const REPOS_API = `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100`
const EVENTS_API = `https://api.github.com/users/${USERNAME}/events/public?per_page=100`

const GAP = 3
const MIN_CELL_MOBILE = 12
const MIN_CELL_DESKTOP = 10

const lang = inject('lang')
const theme = inject('theme')

const loading = ref(true)
const error = ref(false)
const contributions = ref([])
const totalsByYear = ref({})
const repos = ref([])
const activityStats = ref({ commits: 0, pullRequests: 0, issues: 0, codeReview: 0 })
const selectedYear = ref(new Date().getFullYear())
const hoveredDay = ref(null)
const tooltipPos = ref({ x: 0, y: 0 })
const calendarHost = ref(null)
const cellSize = ref(13)
const dayLabelW = ref(30)
const isCompact = ref(false)

let resizeObserver = null

const translations = {
  id: {
    title: 'Kontribusi GitHub',
    contributions: 'kontribusi',
    lastYear: 'dalam setahun terakhir',
    inYear: (y) => `di ${y}`,
    loading: 'Memuat data kontribusi...',
    error: 'Gagal memuat data GitHub.',
    retry: 'Coba lagi',
    less: 'Sedikit',
    more: 'Banyak',
    mon: 'Sen',
    wed: 'Rab',
    fri: 'Jum',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    learnMore: 'Pelajari cara kami menghitung kontribusi',
    learnMoreShort: 'Cara hitung kontribusi',
    activityOverview: 'Ringkasan aktivitas',
    contributedTo: 'Berkontribusi ke ',
    andOthers: (n) => ` dan ${n} repositori lainnya.`,
    noRepos: 'belum ada repositori publik.',
    codeReview: 'Code review',
    issues: 'Issues',
    pullRequests: 'Pull requests',
    commits: 'Commits',
    tooltip: (count, date) => {
      const n = count === 1 ? '1 kontribusi' : `${count} kontribusi`
      return `${n} pada ${date}`
    },
  },
  en: {
    title: 'GitHub Contributions',
    contributions: 'contributions',
    lastYear: 'in the last year',
    inYear: (y) => `in ${y}`,
    loading: 'Loading contribution data...',
    error: 'Failed to load GitHub data.',
    retry: 'Retry',
    less: 'Less',
    more: 'More',
    mon: 'Mon',
    wed: 'Wed',
    fri: 'Fri',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    learnMore: 'Learn how we count contributions',
    learnMoreShort: 'How we count',
    activityOverview: 'Activity overview',
    contributedTo: 'Contributed to ',
    andOthers: (n) => ` and ${n} other repositories.`,
    noRepos: 'no public repositories yet.',
    codeReview: 'Code review',
    issues: 'Issues',
    pullRequests: 'Pull requests',
    commits: 'Commits',
    tooltip: (count, date) => {
      const n = count === 1 ? '1 contribution' : `${count} contributions`
      return `${n} on ${date}`
    },
  },
}

const t = computed(() => translations[lang.value] || translations.en)
const currentCalendarYear = new Date().getFullYear()

const yearOptions = computed(() => {
  const years = Object.keys(totalsByYear.value)
    .map(Number)
    .filter((y) => !Number.isNaN(y))
    .sort((a, b) => b - a)
  if (!years.includes(currentCalendarYear)) years.unshift(currentCalendarYear)
  return years.slice(0, 5)
})

const isCurrentYearView = computed(() => selectedYear.value === currentCalendarYear)

const calendarDays = computed(() => {
  if (!contributions.value.length) return []
  const byDate = new Map(contributions.value.map((c) => [c.date, c]))

  let start
  let end

  if (isCurrentYearView.value) {
    end = new Date()
    end.setHours(0, 0, 0, 0)
    start = new Date(end)
    start.setDate(start.getDate() - 364)
  } else {
    const y = Number(selectedYear.value)
    start = new Date(y, 0, 1)
    end = new Date(y, 11, 31)
  }

  const rangeStart = new Date(start)
  const rangeEnd = new Date(end)
  start.setDate(start.getDate() - start.getDay())

  const days = []
  const cursor = new Date(start)
  while (cursor <= rangeEnd || days.length % 7 !== 0) {
    const key = formatDate(cursor)
    const found = byDate.get(key)
    const inRange = cursor >= rangeStart && cursor <= rangeEnd
    days.push(
      inRange
        ? found || { date: key, count: 0, level: 0 }
        : { date: key, count: 0, level: 0, empty: true }
    )
    cursor.setDate(cursor.getDate() + 1)
    if (days.length > 400) break
  }
  return days
})

const weeks = computed(() => {
  const result = []
  for (let i = 0; i < calendarDays.value.length; i += 7) {
    result.push(calendarDays.value.slice(i, i + 7))
  }
  return result
})

const cellInner = computed(() => Math.max(cellSize.value - GAP, 7))
const gridHeight = computed(() => 7 * cellSize.value - GAP)
const calendarPixelWidth = computed(
  () => dayLabelW.value + weeks.value.length * cellSize.value
)

const calendarInnerStyle = computed(() => {
  if (isCompact.value) {
    return {
      width: `${calendarPixelWidth.value}px`,
      minWidth: `${calendarPixelWidth.value}px`,
    }
  }
  return { width: '100%' }
})

const displayedTotal = computed(() => {
  if (isCurrentYearView.value) {
    return calendarDays.value.reduce((sum, d) => sum + (d.empty ? 0 : d.count || 0), 0)
  }
  return totalsByYear.value[selectedYear.value] ?? 0
})

const monthSpans = computed(() => {
  const spans = []
  let lastMonth = -1
  weeks.value.forEach((week, wi) => {
    const day = week.find((d) => !d.empty) || week[0]
    if (!day) return
    const month = new Date(day.date + 'T00:00:00').getMonth()
    if (month !== lastMonth) {
      spans.push({ label: t.value.months[month], offset: wi })
      lastMonth = month
    }
  })
  return spans
})

const topRepos = computed(() => repos.value.slice(0, 3))
const otherRepoCount = computed(() => Math.max(0, repos.value.length - 3))

const activityTotal = computed(() => {
  const s = activityStats.value
  const sum = s.commits + s.pullRequests + s.issues + s.codeReview
  return sum || 1
})

const activityRatios = computed(() => {
  const s = activityStats.value
  const total = activityTotal.value
  return {
    commits: s.commits / total,
    pullRequests: s.pullRequests / total,
    issues: s.issues / total,
    codeReview: s.codeReview / total,
  }
})

const activityArms = computed(() => {
  const r = activityRatios.value
  const max = 76
  const cx = 100
  const cy = 100

  return [
    { key: 'codeReview', x: cx, y: cy - max, value: r.codeReview },
    { key: 'issues', x: cx + max, y: cy, value: r.issues },
    { key: 'pullRequests', x: cx, y: cy + max, value: r.pullRequests },
    { key: 'commits', x: cx - max, y: cy, value: r.commits },
  ]
})

const dominantArm = computed(() => {
  const arms = activityArms.value
  return [...arms].sort((a, b) => b.value - a.value)[0] || arms[3]
})

const leftAxisLabel = computed(() => {
  const commits = activityArms.value.find((a) => a.key === 'commits')
  const pct = Math.round((commits?.value || 0) * 100)
  const dominant = dominantArm.value?.key === 'commits'
  if (dominant && pct >= 40) return `${pct}% ${t.value.commits}`
  return t.value.commits
})

const tooltipStyle = computed(() => ({
  left: `${tooltipPos.value.x}px`,
  top: `${tooltipPos.value.y}px`,
  transform: 'translate(-50%, calc(-100% - 8px))',
}))

function updateCellSize() {
  if (!calendarHost.value || !weeks.value.length) return
  const hostW = calendarHost.value.clientWidth
  const mobile = window.innerWidth < 768
  dayLabelW.value = mobile ? 28 : 30

  const available = hostW - dayLabelW.value
  if (available <= 0) return

  const fitted = Math.floor(available / weeks.value.length)
  const minCell = mobile ? MIN_CELL_MOBILE : MIN_CELL_DESKTOP

  if (fitted < minCell) {
    // Keep readable cells; allow horizontal scroll
    isCompact.value = true
    cellSize.value = minCell
  } else {
    isCompact.value = false
    cellSize.value = Math.min(mobile ? 14 : 18, fitted)
  }
}

function formatDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function levelClass(level) {
  const isDark = theme?.value === 'dark'
  const map = isDark
    ? ['bg-[#161b22]', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]']
    : ['bg-[#ebedf0]', 'bg-[#9be9a8]', 'bg-[#40c463]', 'bg-[#30a14e]', 'bg-[#216e39]']
  return map[level] || map[0]
}

function cellClass(day) {
  if (!day || day.empty) return 'opacity-0 pointer-events-none'
  const active = hoveredDay.value?.date === day.date
  return [
    levelClass(day.level),
    'cursor-pointer',
    active ? 'outline outline-1 outline-gray-500 dark:outline-gray-300 z-10' : '',
  ]
}

function tooltipText(day) {
  return t.value.tooltip(day.count, day.date)
}

function showTooltip(day, event) {
  hoveredDay.value = day
  const wrap = event.currentTarget.closest('.calendar-inner')
  if (!wrap) return
  const cell = event.currentTarget.getBoundingClientRect()
  const box = wrap.getBoundingClientRect()
  tooltipPos.value = {
    x: cell.left - box.left + cell.width / 2,
    y: cell.top - box.top,
  }
}

function hideTooltip() {
  hoveredDay.value = null
}

function openDay(day) {
  if (!day || day.empty) return
  window.open(
    `https://github.com/${USERNAME}?tab=overview&from=${day.date}&to=${day.date}`,
    '_blank',
    'noopener,noreferrer'
  )
}

async function loadAll() {
  loading.value = true
  error.value = false
  try {
    const [contribRes, reposRes, eventsRes] = await Promise.all([
      fetch(CONTRIB_API),
      fetch(REPOS_API, { headers: { Accept: 'application/vnd.github+json' } }),
      fetch(EVENTS_API, { headers: { Accept: 'application/vnd.github+json' } }),
    ])

    if (!contribRes.ok) throw new Error('contrib failed')

    const contribData = await contribRes.json()
    contributions.value = Array.isArray(contribData.contributions) ? contribData.contributions : []
    totalsByYear.value = contribData.total || {}
    if (!yearOptions.value.includes(selectedYear.value)) {
      selectedYear.value = yearOptions.value[0] || currentCalendarYear
    }

    if (reposRes.ok) {
      const repoData = await reposRes.json()
      repos.value = (Array.isArray(repoData) ? repoData : [])
        .filter((r) => !r.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    }

    if (eventsRes.ok) {
      const events = await eventsRes.json()
      const stats = { commits: 0, pullRequests: 0, issues: 0, codeReview: 0 }
      if (Array.isArray(events)) {
        for (const ev of events) {
          if (ev.type === 'PushEvent') stats.commits += ev.payload?.size || 1
          else if (ev.type === 'PullRequestEvent') stats.pullRequests += 1
          else if (ev.type === 'IssuesEvent' || ev.type === 'IssueCommentEvent') stats.issues += 1
          else if (ev.type === 'PullRequestReviewEvent' || ev.type === 'PullRequestReviewCommentEvent') stats.codeReview += 1
          else if (ev.type === 'CreateEvent' || ev.type === 'DeleteEvent') stats.commits += 1
        }
      }
      if (stats.commits + stats.pullRequests + stats.issues + stats.codeReview === 0) {
        stats.commits = 1
      }
      activityStats.value = stats
    } else {
      activityStats.value = { commits: 1, pullRequests: 0, issues: 0, codeReview: 0 }
    }
  } catch {
    error.value = true
    contributions.value = []
  } finally {
    loading.value = false
    await nextTick()
    updateCellSize()
    await nextTick()
    // On mobile, show recent months first
    if (isCompact.value && calendarHost.value) {
      calendarHost.value.scrollLeft = calendarHost.value.scrollWidth
    }
  }
}

watch(weeks, async () => {
  await nextTick()
  updateCellSize()
})

onMounted(() => {
  loadAll()
  resizeObserver = new ResizeObserver(() => updateCellSize())
  watch(
    calendarHost,
    (el, _, onCleanup) => {
      if (el) {
        resizeObserver.observe(el)
        updateCellSize()
        onCleanup(() => resizeObserver?.unobserve(el))
      }
    },
    { immediate: true }
  )
  window.addEventListener('resize', updateCellSize)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateCellSize)
})
</script>

<style scoped>
.calendar-scroll {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #484f58 transparent;
}
.calendar-scroll::-webkit-scrollbar {
  height: 5px;
}
.calendar-scroll::-webkit-scrollbar-thumb {
  background: #484f58;
  border-radius: 3px;
}

.contrib-cell {
  transition: outline 0.1s ease, background-color 0.15s ease;
  min-height: 0;
  min-width: 0;
}
.contrib-cell:hover:not(:disabled):not(.opacity-0) {
  outline: 1px solid rgba(140, 140, 140, 0.7);
}
.gh-tooltip {
  animation: tip-in 0.1s ease;
}
@keyframes tip-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.activity-wrap {
  display: grid;
  grid-template-columns: minmax(76px, auto) minmax(160px, 1fr) minmax(48px, auto);
  grid-template-rows: auto auto auto;
  align-items: center;
  justify-items: center;
  column-gap: 0.35rem;
  row-gap: 0.25rem;
  width: 100%;
  max-width: 420px;
  padding: 0.25rem 0;
}
.activity-svg {
  grid-column: 2;
  grid-row: 2;
  width: 100%;
  max-width: 220px;
  height: auto;
  aspect-ratio: 1;
  overflow: visible;
}
.axis-full {
  stroke: #3fb950;
  stroke-width: 2.5;
  stroke-linecap: round;
  opacity: 0.85;
}
.axis-strong {
  stroke: #56d364;
  stroke-width: 4;
  stroke-linecap: round;
  filter: drop-shadow(0 0 6px rgba(63, 185, 80, 0.7));
}
.activity-label {
  font-size: 12px;
  font-weight: 500;
  color: #8b949e;
  line-height: 1.25;
}
.activity-label-top {
  grid-column: 2;
  grid-row: 1;
  text-align: center;
  justify-self: center;
}
.activity-label-bottom {
  grid-column: 2;
  grid-row: 3;
  text-align: center;
  justify-self: center;
}
.activity-label-left {
  grid-column: 1;
  grid-row: 2;
  text-align: right;
  justify-self: end;
  color: #3fb950;
  font-weight: 700;
  font-size: 12px;
  max-width: 96px;
}
.activity-label-right {
  grid-column: 3;
  grid-row: 2;
  text-align: left;
  justify-self: start;
}

@media (min-width: 640px) {
  .activity-wrap {
    grid-template-columns: minmax(88px, auto) minmax(180px, 240px) minmax(52px, auto);
    column-gap: 0.5rem;
    row-gap: 0.35rem;
  }
  .activity-svg {
    max-width: 240px;
  }
  .activity-label {
    font-size: 13px;
  }
  .activity-label-left {
    font-size: 13px;
    max-width: 100px;
  }
}
</style>
