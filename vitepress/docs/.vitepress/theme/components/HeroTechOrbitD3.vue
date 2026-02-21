<template>
  <div
    class="bm-tech-orbit"
    :class="{ 'bm-tech-orbit--active': isActive, 'bm-tech-orbit--expanded': isExpanded }"
    aria-label="Technology focus animation"
    role="img"
  >
    <div class="bm-tech-orbit__frame" aria-hidden="true">
      <div class="bm-tech-orbit__glow" />
      <div class="bm-tech-orbit__ring bm-tech-orbit__ring--outer" />
      <div class="bm-tech-orbit__ring bm-tech-orbit__ring--inner" />

      <!-- D3 renders SVG into this container -->
      <div
        ref="d3Container"
        class="bm-tech-orbit__sigma"
        aria-hidden="true"
        @pointerenter="handlePointerEnter"
        @pointerleave="handlePointerLeave"
      />

      <!-- Text badge stays HTML; icons are rendered by D3 nodes -->
      <!-- <div class="bm-tech-orbit__core" aria-hidden="true">
        <div class="bm-tech-orbit__coreText bm-tech-orbit__coreText--sigma">
          <div class="bm-tech-orbit__coreTitle">Advanced</div>
          <div class="bm-tech-orbit__coreSubtitle">Engineering</div>
        </div>
      </div> -->

      <div class="bm-tech-orbit__scan" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'


type BaseNodeKey = 'core' | 'cloud' | 'fullstack' | 'ai' | 'datasci'

const UNLOCKED_KEYS = [
  'vue',
  'react',
  'django',
  'rails',
  'flaskFastapi',
  'angular',
  'cypress',
  'playwright',
  'node',
  'aspnet',
  'nginx',
  'apache',
  'firebase',
  'githubActions',
  'gitlabPipelines',
  'ansible',
  'aws',
  'gcp',
  'linux',
  'docker',
  'kubernetes',
  'terraform',
  'flux',
  'tensorflow',
  'pytorch',
  'scikitLearn',
  'parallelComputing',
  'highPerformanceComputing',
  'bioinformatics',
  'ollama',
  'largeLanguageModels',
  'huggingFace',
  'cybersecurity',
  'intrusionDetectionSystems',
  'dataVisualization',
  'highDimensionalDataManagement',
  'federatedLearning',
  'bioinspiredAlgorithms',
  'evolutiveComputation',
  'largeScaleSimilaritySearch',
  'pandasPolars',
  'numpy',
  'scipy',
  'statisticalAnalysis',
  'dimensionalityReduction',
  'matplotlib',
  'seaborn',
  'plotly',
  'd3'
] as const

type UnlockedNodeKey = (typeof UNLOCKED_KEYS)[number]
type NodeKey = BaseNodeKey | UnlockedNodeKey
type OuterBaseKey = Exclude<BaseNodeKey, 'core'>

type OrbitNode = {
  key: NodeKey
  label?: string
  iconHref: string
  iconCssFilter?: string
  box: number
  iconSize: number
  radius: number
  bgFill: string
  bgStroke: string
  bgStrokeWidth: number
  x: number
  y: number
  scale: number
}

const d3Container = ref<HTMLDivElement | null>(null)
const isActive = ref(false)
const isExpanded = ref(false)

let collapseTimer: number | null = null

function clearCollapseTimer() {
  if (collapseTimer !== null) window.clearTimeout(collapseTimer)
  collapseTimer = null
}

function handlePointerEnter() {
  clearCollapseTimer()
  isExpanded.value = true
}

function handlePointerLeave() {
  clearCollapseTimer()
  collapseTimer = window.setTimeout(() => {
    isExpanded.value = false
  }, 80)
}

// While expanded, add a global class so CSS can ensure the orbit stays on top
// and the hero text doesn't steal pointer events.
watch(
  isExpanded,
  (value) => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('bm-tech-orbit-expanded', value)
  },
  { immediate: true }
)

let destroy: (() => void) | undefined

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
}

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const COMMON_SVG_ATTRS = `xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"`

const CORE_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M12 2.5c5.25 0 9.5 4.25 9.5 9.5S17.25 21.5 12 21.5 2.5 17.25 2.5 12 6.75 2.5 12 2.5Z" stroke="#FFFFFF" stroke-width="1.7"/>
  <path d="M7.2 12a4.8 4.8 0 1 0 9.6 0 4.8 4.8 0 0 0-9.6 0Z" stroke="#FFFFFF" stroke-width="1.7"/>
  <path d="M12 7.2v9.6" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round"/>
  <path d="M7.2 12h9.6" stroke="#FFFFFF" stroke-width="1.7" stroke-linecap="round"/>
</svg>`

const CLOUD_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M7.5 18.5H17a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 6.2 9.35 3.6 3.6 0 0 0 7.5 18.5Z" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.2 14.2h3.6" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M12.1 12.9 13.6 14.2l-1.5 1.3" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.8 16.8h-3.6" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M11.9 18.1 10.4 16.8l1.5-1.3" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const FULLSTACK_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M12 3 3.2 8 12 13l8.8-5L12 3Z" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M3.2 12 12 17l8.8-5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.2 16 12 21l8.8-5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const AI_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M9.5 21V18.8a2.7 2.7 0 0 0-2.7-2.7 2.6 2.6 0 0 1 0-5.2" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M14.5 21V18.8a2.7 2.7 0 0 1 2.7-2.7 2.6 2.6 0 0 0 0-5.2" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8 10.9a3.8 3.8 0 0 1 7.9-1.4" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M16 10.9a3.8 3.8 0 0 1-7.9 1.4" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M9.4 12h5.2" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M7.2 9.6h0.01M16.8 9.6h0.01M12 7.1h0.01" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>
</svg>`

const DATASCI_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M4.8 19.2V5.2" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M4.8 19.2h14.4" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M7.3 16.6V12.7" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M10.6 16.6V9.9" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M13.9 16.6V11.3" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M17.2 16.6V8" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
</svg>`

const SHIELD_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M12 2.5 19 6v6.2c0 4.8-3.1 8.2-7 9.3-3.9-1.1-7-4.5-7-9.3V6l7-3.5Z" stroke="#FFFFFF" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M9.2 12.2 11 14l3.8-4" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const NETWORK_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M8 7.2a1.8 1.8 0 1 0 0 .01V7.2Zm8 0a1.8 1.8 0 1 0 0 .01V7.2ZM12 16.8a1.8 1.8 0 1 0 0 .01v-.01Z" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M9.4 8.2 11 15m3.6-6.8L13 15M9.7 7.3h4.6" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const CHART_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M5 19.2V5.2" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M5 19.2h14" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M7.6 15.6 10.2 12.4l2.6 2.2 4-5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.8 7.8h0.01" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>
</svg>`

const DNA_SVG = `<svg ${COMMON_SVG_ATTRS}>
  <path d="M8 3.5c4.4 2.2 8.6 2.2 8 7.5-.5 4.6-3.6 6.3-8 9.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 3.5c-4.4 2.2-8.6 2.2-8 7.5.5 4.6 3.6 6.3 8 9.5" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.2 8h5.6M9.2 12h5.6M9.2 16h5.6" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round"/>
</svg>`

onMounted(async () => {
  const container = d3Container.value
  if (!container) return

  const reduced = prefersReducedMotion()

  // Lazy-load to avoid SSR issues & keep initial bundle smaller
  const d3 = await import('d3')

  // Clean container in case of hot reload
  container.replaceChildren()

  const svg = d3
    .select(container)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', '0 0 1 1')
    .style('display', 'block')
    .style('pointer-events', 'auto')

  const g = svg.append('g')

  // Simple camera pan applied to the root group. Used to re-center a selected node
  // while the animation is frozen, so unlocked nodes don't escape the view.
  let panX = 0
  let panY = 0

  const iconSources = {
    core: svgToDataUrl(CORE_SVG),
    cloud: svgToDataUrl(CLOUD_SVG),
    fullstack: svgToDataUrl(FULLSTACK_SVG),
    ai: svgToDataUrl(AI_SVG),
    datasci: svgToDataUrl(DATASCI_SVG)
  }

  const simpleIcon = (slug: string) => {
    if (slug == 'playwright') return 'https://icon.icepanel.io/Technology/svg/Playwrite.svg';
    if (slug == 'amazonaws') return 'https://icon.icepanel.io/Technology/png-shadow-512/AWS.png';
    if (slug == 'd3dotjs') return 'https://cdn.simpleicons.org/D3/ffffff';
    if (slug == 'matplotlib') return 'https://img.icons8.com/?size=100&id=TkX1totjFmAD&format=png&color=000000';
    if (slug == 'seaborn') return 'https://github.com/mwaskom/seaborn/blob/master/doc/_static/logo-mark-darkbg.png?raw=true';
    return `https://cdn.simpleicons.org/${slug}/ffffff`;
  }

  const fullstackUnlocked: OrbitNode[] = [
    {
      key: 'vue',
      label: 'Vue.js',
      iconHref: 'https://img.icons8.com/?size=100&id=rY6agKizO9eb&format=png&color=000000',
      iconCssFilter: 'invert(0) brightness(1.05)',
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'react',
      label: 'React',
      iconHref: 'https://img.icons8.com/?size=100&id=Vra58PN2KmI5&format=png&color=000000',
      iconCssFilter: 'invert(0) brightness(1.05)',
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'django',
      label: 'Django',
      iconHref: 'https://img.icons8.com/?size=100&id=FnTmHRua3mU3&format=png&color=000000',
      iconCssFilter: 'invert(0) brightness(1.05)',
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'rails',
      label: 'Ruby on Rails',
      iconHref: simpleIcon('rubyonrails'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'flaskFastapi',
      label: 'Flask / FastAPI',
      iconHref: simpleIcon('fastapi'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'angular',
      label: 'Angular',
      iconHref: simpleIcon('angular'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'cypress',
      label: 'Cypress',
      iconHref: simpleIcon('cypress'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'playwright',
      label: 'Playwright',
      iconHref: simpleIcon('playwright'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'node',
      label: 'Node.js',
      iconHref: simpleIcon('nodedotjs'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'aspnet',
      label: 'ASP.NET',
      iconHref: simpleIcon('dotnet'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'nginx',
      label: 'NGINX',
      iconHref: simpleIcon('nginx'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'apache',
      label: 'Apache',
      iconHref: simpleIcon('apache'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'firebase',
      label: 'Firebase',
      iconHref: simpleIcon('firebase'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
  ]

  const gitOpsCloudUnlocked: OrbitNode[] = [
    {
      key: 'githubActions',
      label: 'GitHub Actions',
      iconHref: simpleIcon('githubactions'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'gitlabPipelines',
      label: 'GitLab Pipelines',
      iconHref: simpleIcon('gitlab'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'ansible',
      label: 'Ansible',
      iconHref: simpleIcon('ansible'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'aws',
      label: 'AWS',
      iconHref: simpleIcon('amazonaws'),
      iconCssFilter: 'invert(1) brightness(1.05)',
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'gcp',
      label: 'GCP',
      iconHref: simpleIcon('googlecloud'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'linux',
      label: 'Linux',
      iconHref: simpleIcon('linux'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'docker',
      label: 'Docker',
      iconHref: simpleIcon('docker'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'kubernetes',
      label: 'Kubernetes',
      iconHref: simpleIcon('kubernetes'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'terraform',
      label: 'Terraform',
      iconHref: simpleIcon('terraform'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'flux',
      label: 'Flux',
      iconHref: simpleIcon('flux'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    }
  ]

  const aiUnlocked: OrbitNode[] = [
    {
      key: 'tensorflow',
      label: 'TensorFlow',
      iconHref: simpleIcon('tensorflow'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'pytorch',
      label: 'PyTorch',
      iconHref: simpleIcon('pytorch'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'scikitLearn',
      label: 'scikit‑learn',
      iconHref: simpleIcon('scikitlearn'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'largeLanguageModels',
      label: 'Large Language Models',
      iconHref: svgToDataUrl(NETWORK_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'huggingFace',
      label: 'Hugging Face',
      iconHref: simpleIcon('huggingface'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'ollama',
      label: 'Ollama',
      iconHref: simpleIcon('ollama'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'parallelComputing',
      label: 'Parallel computing',
      iconHref: svgToDataUrl(NETWORK_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'highPerformanceComputing',
      label: 'High Performance Computing',
      iconHref: svgToDataUrl(NETWORK_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'bioinformatics',
      label: 'Bioinformatics',
      iconHref: svgToDataUrl(DNA_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'cybersecurity',
      label: 'Cybersecurity',
      iconHref: svgToDataUrl(SHIELD_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'intrusionDetectionSystems',
      label: 'Intrusion Detection Systems',
      iconHref: svgToDataUrl(SHIELD_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'dataVisualization',
      label: 'Data visualization',
      iconHref: svgToDataUrl(CHART_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'highDimensionalDataManagement',
      label: 'High‑dimensional data management',
      iconHref: svgToDataUrl(CHART_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'federatedLearning',
      label: 'Federated Learning',
      iconHref: svgToDataUrl(NETWORK_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'bioinspiredAlgorithms',
      label: 'Bioinspired algorithms',
      iconHref: svgToDataUrl(AI_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'evolutiveComputation',
      label: 'Evolutive computation',
      iconHref: svgToDataUrl(AI_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'largeScaleSimilaritySearch',
      label: 'Large‑scale Similarity search',
      iconHref: svgToDataUrl(NETWORK_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    }
  ]

  const dataUnlocked: OrbitNode[] = [
    {
      key: 'pandasPolars',
      label: 'Pandas / Polars',
      iconHref: simpleIcon('pandas'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'numpy',
      label: 'NumPy',
      iconHref: simpleIcon('numpy'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'scipy',
      label: 'SciPy',
      iconHref: simpleIcon('scipy'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'statisticalAnalysis',
      label: 'Statistical analysis',
      iconHref: svgToDataUrl(CHART_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'dimensionalityReduction',
      label: 'Dimensionality reduction',
      iconHref: svgToDataUrl(NETWORK_SVG),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'matplotlib',
      label: 'Matplotlib',
      iconHref: simpleIcon('matplotlib'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'seaborn',
      label: 'Seaborn',
      iconHref: simpleIcon('seaborn'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'plotly',
      label: 'Plotly',
      iconHref: simpleIcon('plotly'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'd3',
      label: 'D3',
      iconHref: simpleIcon('d3dotjs'),
      box: 40,
      iconSize: 24,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    }
  ]

  const nodes: OrbitNode[] = [
    {
      key: 'core',
      label: 'Advanced Engineering',
      iconHref: iconSources.core,
      box: 62,
      iconSize: 36,
      radius: 16,
      bgFill: 'rgba(255,255,255,0.06)',
      bgStroke: 'rgba(255,255,255,0.14)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    {
      key: 'cloud',
      label: 'GitOps • Cloud',
      iconHref: iconSources.cloud,
      box: 58,
      iconSize: 34,
      radius: 18,
      bgFill: 'rgba(255,255,255,0.04)',
      bgStroke: 'rgba(255,255,255,0.12)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'fullstack',
      label: 'Full‑stack',
      iconHref: iconSources.fullstack,
      box: 58,
      iconSize: 34,
      radius: 18,
      bgFill: 'rgba(255,255,255,0.04)',
      bgStroke: 'rgba(255,255,255,0.12)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'ai',
      label: 'AI • Research',
      iconHref: iconSources.ai,
      box: 58,
      iconSize: 34,
      radius: 18,
      bgFill: 'rgba(255,255,255,0.04)',
      bgStroke: 'rgba(255,255,255,0.12)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    {
      key: 'datasci',
      label: 'Data Science • Visualization',
      iconHref: iconSources.datasci,
      box: 58,
      iconSize: 34,
      radius: 18,
      bgFill: 'rgba(255,255,255,0.04)',
      bgStroke: 'rgba(255,255,255,0.12)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    }
  ]

  const edges: Array<{ from: NodeKey; to: NodeKey; stroke: string; strokeWidth: number }> = [
    { from: 'core', to: 'cloud', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'core', to: 'fullstack', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'core', to: 'ai', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'core', to: 'datasci', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'cloud', to: 'fullstack', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 },
    { from: 'fullstack', to: 'ai', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 },
    { from: 'ai', to: 'datasci', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 },
    { from: 'datasci', to: 'cloud', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 }
  ]

  const nodesByKey = new Map(nodes.map((n) => [n.key, n]))

  const extraLinksG = g.append('g').attr('data-layer', 'unlocked-links')
  const extraNodesG = g.append('g').attr('data-layer', 'unlocked-nodes')

  type Edge = { from: NodeKey; to: NodeKey; stroke: string; strokeWidth: number }

  let activeUnlockedNodes: OrbitNode[] = []
  let activeUnlockedEdges: Edge[] = []
  let extraLinkSel = extraLinksG.selectAll<SVGLineElement, Edge>('line')
  let extraNodeSel = extraNodesG.selectAll<SVGGElement, OrbitNode>('g')

  const linkSel = g
    .append('g')
    .selectAll('line')
    .data(edges)
    .enter()
    .append('line')
    .attr('stroke', (d) => d.stroke)
    .attr('stroke-width', (d) => d.strokeWidth)
    .attr('stroke-linecap', 'round')
    .style('pointer-events', 'none')

  const nodeSel = g
    .append('g')
    .selectAll('g')
    .data(nodes, (d: any) => d.key)
    .enter()
    .append('g')
    .attr('data-key', (d: any) => d.key)
    .style('cursor', (d) => (d.key === 'core' ? 'default' : 'pointer'))
    .style('pointer-events', (d) => (d.key === 'core' ? 'none' : 'all'))

  nodeSel
    .append('rect')
    .attr('x', (d) => -d.box / 2)
    .attr('y', (d) => -d.box / 2)
    .attr('width', (d) => d.box)
    .attr('height', (d) => d.box)
    .attr('rx', (d) => d.radius)
    .attr('ry', (d) => d.radius)
    .attr('fill', (d) => d.bgFill)
    .attr('stroke', (d) => d.bgStroke)
    .attr('stroke-width', (d) => d.bgStrokeWidth)

  nodeSel
    .append('image')
    .attr('href', (d) => d.iconHref)
    .attr('x', (d) => -d.iconSize / 2)
    .attr('y', (d) => -d.iconSize / 2)
    .attr('width', (d) => d.iconSize)
    .attr('height', (d) => d.iconSize)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('filter', (d) => d.iconCssFilter ?? null)

  // Labels under the 3 outer nodes
  nodeSel
    .append('text')
    .text((d) => d.label || '')
    .attr('x', 0)
    .attr('y', (d) => d.box / 2 + 18)
    .attr('text-anchor', 'middle')
    .attr('font-size', 11)
    .attr('font-weight', 600)
    .attr('fill', 'rgba(255,255,255,0.78)')
    .attr('paint-order', 'stroke')
    .attr('stroke', 'rgba(0,0,0,0.35)')
    .attr('stroke-width', 4)
    .attr('stroke-linejoin', 'round')

  const rectSel = nodeSel.select<SVGRectElement>('rect')
  const labelSel = nodeSel.selectAll<SVGTextElement, OrbitNode>('text')

  let hoveredKey: OuterBaseKey | null = null
  let selectedKey: NodeKey | null = null
  let hoverInsideUnlockedCluster = false
  let closeClusterTimer: number | null = null
  let unlockedParentKey: OuterBaseKey | null = null

  function clearCloseTimer() {
    if (closeClusterTimer) window.clearTimeout(closeClusterTimer)
    closeClusterTimer = null
  }

  function syncUnlockedData() {
    const activeParent: OuterBaseKey | null =
      hoveredKey === 'cloud' || hoveredKey === 'fullstack' || hoveredKey === 'ai' || hoveredKey === 'datasci' ? hoveredKey : null
    const shouldShow = activeParent !== null
    unlockedParentKey = activeParent
    activeUnlockedNodes =
      activeParent === 'fullstack'
        ? fullstackUnlocked
        : activeParent === 'cloud'
          ? gitOpsCloudUnlocked
          : activeParent === 'ai'
            ? aiUnlocked
            : activeParent === 'datasci'
              ? dataUnlocked
              : []
    activeUnlockedEdges = shouldShow
      ? activeUnlockedNodes.map((n) => ({
          from: activeParent as NodeKey,
          to: n.key,
          stroke: 'rgba(255,255,255,0.16)',
          strokeWidth: 1
        }))
      : []

    // Seed unlocked nodes at the parent position so they never flash at (0,0).
    if (shouldShow && unlockedParentKey) {
      const parent = nodesByKey.get(unlockedParentKey)
      if (parent) {
        activeUnlockedNodes.forEach((n) => {
          n.x = parent.x
          n.y = parent.y
          n.scale = 1
        })
      }
    }

    // Keep map in sync for positioning lookups *before* we compute link endpoints.
    // (Links reference `d.to`, so those nodes must exist in `nodesByKey` already.)
    if (shouldShow) {
      activeUnlockedNodes.forEach((n) => nodesByKey.set(n.key, n))
    } else {
      UNLOCKED_KEYS.forEach((k) => nodesByKey.delete(k))
    }

    // Links
    extraLinkSel = extraLinksG
      .selectAll<SVGLineElement, Edge>('line')
      .data(activeUnlockedEdges, (d: any) => d.to)

    extraLinkSel
      .exit()
      .transition()
      .duration(140)
      .style('opacity', 0)
      .remove()

    const extraLinkEnter = extraLinkSel
      .enter()
      .append('line')
      .attr('stroke-linecap', 'round')
      .style('pointer-events', 'none')
      .style('opacity', 0)

    extraLinkSel = extraLinkEnter.merge(extraLinkSel)
    extraLinkSel
      .attr('stroke', (d) => d.stroke)
      .attr('stroke-width', (d) => d.strokeWidth)
      .transition()
      .duration(180)
      .style('opacity', 1)

    // Nodes
    extraNodeSel = extraNodesG
      .selectAll<SVGGElement, OrbitNode>('g')
      .data(activeUnlockedNodes, (d: any) => d.key)

    extraNodeSel
      .exit()
      .transition()
      .duration(140)
      .style('opacity', 0)
      .remove()

    const extraEnter = extraNodeSel
      .enter()
      .append('g')
      .attr('data-key', (d: any) => d.key)
      .style('opacity', 0)
      .style('cursor', 'pointer')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        if (selectedKey !== null) return
        hoverInsideUnlockedCluster = true
        clearCloseTimer()
        isActive.value = true
      })
      .on('mouseleave', () => {
        if (selectedKey !== null) return
        hoverInsideUnlockedCluster = false
        scheduleCloseUnlockedCluster()
      })
      .on('click', (_event, d) => {
        if (selectedKey === d.key) {
          selectedKey = null
          resetPan()
          hoverInsideUnlockedCluster = false
          hoveredKey = null
          isActive.value = false
          syncUnlockedData()
          applyHoverStyles()
          startAnimation()
          renderFrame(animT)
          return
        }

        const parentForSelection: OuterBaseKey =
          unlockedParentKey ??
            (hoveredKey === 'cloud' || hoveredKey === 'fullstack' || hoveredKey === 'ai' || hoveredKey === 'datasci'
              ? hoveredKey
              : 'fullstack')
        selectedKey = d.key
        hoveredKey = parentForSelection
        hoverInsideUnlockedCluster = true
        isActive.value = true
        stopAnimation()
        renderFrame(animT)
        syncUnlockedData()
        applyHoverStyles()
        centerOnKey(d.key)
        renderFrame(animT)
      })

    extraEnter
      .append('rect')
      .attr('x', (d) => -d.box / 2)
      .attr('y', (d) => -d.box / 2)
      .attr('width', (d) => d.box)
      .attr('height', (d) => d.box)
      .attr('rx', (d) => d.radius)
      .attr('ry', (d) => d.radius)
      .attr('fill', (d) => d.bgFill)
      .attr('stroke', (d) => d.bgStroke)
      .attr('stroke-width', (d) => d.bgStrokeWidth)

    extraEnter
      .append('image')
      .attr('href', (d) => d.iconHref)
      .attr('x', (d) => -d.iconSize / 2)
      .attr('y', (d) => -d.iconSize / 2)
      .attr('width', (d) => d.iconSize)
      .attr('height', (d) => d.iconSize)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('filter', (d) => d.iconCssFilter ?? null)

    extraEnter
      .append('text')
      .text((d) => d.label || '')
      .attr('x', 0)
      .attr('y', (d) => d.box / 2 + 16)
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('font-weight', 600)
      .attr('fill', 'rgba(255,255,255,0.82)')
      .attr('paint-order', 'stroke')
      .attr('stroke', 'rgba(0,0,0,0.35)')
      .attr('stroke-width', 4)
      .attr('stroke-linejoin', 'round')

    extraNodeSel = extraEnter.merge(extraNodeSel)
    extraNodeSel.transition().duration(180).style('opacity', 1)

    // Apply transforms/links right away (helps avoid a 1-frame origin flash)
    if (shouldShow && unlockedParentKey) {
      const parent = nodesByKey.get(unlockedParentKey)
      if (parent) {
        extraLinkSel
          .attr('x1', parent.x)
          .attr('y1', parent.y)
          .attr('x2', (d) => nodesByKey.get(d.to)!.x)
          .attr('y2', (d) => nodesByKey.get(d.to)!.y)
        extraNodeSel.attr('transform', (d) => `translate(${d.x},${d.y}) scale(${d.scale})`)
      }
    }
  }

  function scheduleCloseUnlockedCluster() {
    if (hoveredKey !== 'fullstack' && hoveredKey !== 'cloud' && hoveredKey !== 'ai' && hoveredKey !== 'datasci') return
    if (selectedKey !== null) return
    clearCloseTimer()
    closeClusterTimer = window.setTimeout(() => {
      if (hoveredKey !== 'fullstack' && hoveredKey !== 'cloud' && hoveredKey !== 'ai' && hoveredKey !== 'datasci') return
      if (hoverInsideUnlockedCluster) return
      if (selectedKey !== null) return
      resetPan()
      hoveredKey = null
      isActive.value = false
      syncUnlockedData()
      applyHoverStyles()
      startAnimation()
      renderFrame(animT)
    }, 140)
  }

  function applyHoverStyles() {
    const hasHover = hoveredKey !== null
    const selected = selectedKey
    const strokeSelected = 'rgba(85, 170, 255, 0.95)'
    const fillSelected = 'rgba(85, 170, 255, 0.08)'

    nodeSel
      .attr('opacity', (d) => {
        if (!hasHover) return 1
        if (d.key === 'core') return 0.55
        return d.key === hoveredKey ? 1 : 0.18
      })
      .style('filter', (d) =>
        d.key === hoveredKey ? 'drop-shadow(0 0 14px rgba(255,255,255,0.25))' : 'none'
      )

    rectSel
      .attr('fill', (d) => {
        if (selected && d.key === selected) return fillSelected
        return d.key === hoveredKey ? 'rgba(255,255,255,0.08)' : d.bgFill
      })
      .attr('stroke', (d) => {
        if (selected && d.key === selected) return strokeSelected
        return d.key === hoveredKey ? 'rgba(255,255,255,0.32)' : d.bgStroke
      })
      .attr('stroke-width', (d) => {
        if (selected && d.key === selected) return Math.max(2.2, d.bgStrokeWidth)
        return d.key === hoveredKey ? Math.max(1.4, d.bgStrokeWidth) : d.bgStrokeWidth
      })

    labelSel.attr('fill', (d) => (d.key === hoveredKey ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.78)'))

    linkSel
      .attr('stroke', (d) => {
        if (!hasHover) return d.stroke
        const connected = d.from === hoveredKey || d.to === hoveredKey
        return connected ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.05)'
      })
      .attr('stroke-width', (d) => {
        if (!hasHover) return d.strokeWidth
        const connected = d.from === hoveredKey || d.to === hoveredKey
        return connected ? Math.max(1.25, d.strokeWidth) : d.strokeWidth
      })

    const unlockedActive = hoveredKey === 'fullstack' || hoveredKey === 'cloud' || hoveredKey === 'ai' || hoveredKey === 'datasci'
    extraLinkSel
      .attr('stroke', () => (unlockedActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)'))
      .attr('stroke-width', () => (unlockedActive ? 1.15 : 1))

    // Selected styling for unlocked nodes.
    extraNodeSel
      .style('filter', (d) =>
        selected && d.key === selected ? 'drop-shadow(0 0 16px rgba(85, 170, 255, 0.25))' : 'none'
      )

    extraNodeSel
      .select<SVGRectElement>('rect')
      .attr('fill', (d) => (selected && d.key === selected ? fillSelected : d.bgFill))
      .attr('stroke', (d) => (selected && d.key === selected ? strokeSelected : d.bgStroke))
      .attr('stroke-width', (d) => (selected && d.key === selected ? Math.max(2.0, d.bgStrokeWidth) : d.bgStrokeWidth))
  }

  let raf = 0
  let animT = 0
  let lastNow = 0

  // 4 outer nodes placed evenly, rotated so none sit exactly on the bottom.
  const baseAngles: Record<OuterBaseKey, number> = {
    cloud: -Math.PI / 4,
    fullstack: Math.PI / 4,
    ai: (Math.PI * 3) / 4,
    datasci: (-Math.PI * 3) / 4
  }

  function getSize() {
    const rect = container.getBoundingClientRect()
    // Avoid 0x0 during first layout
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)
    return { width, height }
  }

  function resetPan() {
    panX = 0
    panY = 0
  }

  function centerOnKey(key: NodeKey) {
    const target = nodesByKey.get(key)
    if (!target) return
    const { width, height } = getSize()
    const cx = width / 2
    const cy = height / 2
    panX = cx - target.x
    panY = cy - target.y
  }

  function renderFrame(t: number) {
    const { width, height } = getSize()
    const cx = width / 2
    const cy = height / 2

    // Keep consistent with prior look (~128px at 420px frame)
    const orbitRadius = Math.min(width, height) * 0.305

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const rot = t * 0.18
    const breathing = 1 + Math.sin(t * 1.25) * 0.03
    const r = orbitRadius * breathing

    // Make the orbit slightly elliptical: smaller vertical range than horizontal.
    // Tuned to keep the overall “reach” similar while compressing Y.
    const orbitRx = r * 1.05
    const orbitRy = r * 0.72

    // Core stays centered
    const core = nodesByKey.get('core')
    if (core) {
      core.x = cx
      core.y = cy
      core.scale = 1 + Math.sin(t * 1.1) * 0.02
    }

    ;(['cloud', 'fullstack', 'ai', 'datasci'] as const).forEach((key) => {
      const node = nodesByKey.get(key)
      if (!node) return
      const a = baseAngles[key] + rot
      node.x = cx + Math.cos(a) * orbitRx
      node.y = cy + Math.sin(a) * orbitRy
      node.scale = hoveredKey === key ? 1.07 : 1
    })

    // Position unlocked nodes around the active parent node (if active)
    if (activeUnlockedNodes.length) {
      const parentKey: OuterBaseKey =
        unlockedParentKey ??
          (hoveredKey === 'cloud' || hoveredKey === 'fullstack' || hoveredKey === 'ai' || hoveredKey === 'datasci'
            ? hoveredKey
            : 'fullstack')
      const parent = nodesByKey.get(parentKey)
      if (parent) {
        const outAngle = Math.atan2(parent.y - cy, parent.x - cx)
        const baseDist = Math.min(width, height) * 0.165
        const ringSize = 6

        // Enforce a minimum center-to-center distance to avoid overlaps.
        const maxBox = activeUnlockedNodes.reduce((m, n) => Math.max(m, n.box), 0)
        const gap = 32
        const minCenterDist = Math.max(44, maxBox + gap)

        let prevRingRadius = 0

        activeUnlockedNodes.forEach((n, i) => {
          const ring = Math.floor(i / ringSize)
          const idx = i % ringSize
          const countInRing = Math.min(ringSize, activeUnlockedNodes.length - ring * ringSize)

          // Wider arc for denser rings; slightly narrower for outer rings.
          const baseArc = ring === 0 ? 2.05 : 1.55
          const arcSpan = baseArc + Math.max(0, countInRing - 4) * 0.18

          const step = countInRing > 1 ? arcSpan / (countInRing - 1) : 0
          const a = outAngle - arcSpan / 2 + step * idx

          // Compute a radius that guarantees horizontal spacing (chord length) >= minCenterDist.
          const sinHalf = Math.sin(step / 2)
          const chordRadiusReq = sinHalf > 0.001 ? minCenterDist / (2 * sinHalf) : baseDist

          let dist = baseDist * (1 + ring * 0.75)
          dist = Math.max(dist, chordRadiusReq)

          // Keep rings separated radially.
          if (ring > 0) dist = Math.max(dist, prevRingRadius + minCenterDist * 0.92)
          if (idx === countInRing - 1) prevRingRadius = dist

          n.x = parent.x + Math.cos(a) * dist
          n.y = parent.y + Math.sin(a) * dist
          n.scale = 1
        })

        extraLinkSel
          .attr('x1', parent.x)
          .attr('y1', parent.y)
          .attr('x2', (d) => nodesByKey.get(d.to)!.x)
          .attr('y2', (d) => nodesByKey.get(d.to)!.y)

        extraNodeSel.attr('transform', (d) => `translate(${d.x},${d.y}) scale(${d.scale})`)
      }
    }

    // Apply camera pan after positions are computed.
    g.attr('transform', `translate(${panX},${panY})`)

    linkSel
      .attr('x1', (d) => nodesByKey.get(d.from)!.x)
      .attr('y1', (d) => nodesByKey.get(d.from)!.y)
      .attr('x2', (d) => nodesByKey.get(d.to)!.x)
      .attr('y2', (d) => nodesByKey.get(d.to)!.y)

    nodeSel.attr('transform', (d) => `translate(${d.x},${d.y}) scale(${d.scale})`)
  }

  function tick(now: number) {
    if (!lastNow) lastNow = now
    const dt = Math.min(0.05, (now - lastNow) / 1000)
    lastNow = now
    animT += dt
    renderFrame(animT)
    raf = requestAnimationFrame(tick)
  }

  // Initial draw
  renderFrame(0)
  syncUnlockedData()
  applyHoverStyles()

  function stopAnimation() {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    lastNow = 0
  }

  function startAnimation() {
    if (reduced) return
    if (raf) return
    raf = requestAnimationFrame(tick)
  }

  startAnimation()

  // Pause + highlight on hover for non-core nodes
  nodeSel
    .filter((d) => d.key !== 'core')
    .on('mouseenter', (_event, d) => {
      if (selectedKey !== null) return
      clearCloseTimer()
      hoveredKey = d.key as OuterBaseKey
      isActive.value = true
      stopAnimation()
      // Ensure base node positions/viewBox are up-to-date before seeding unlocked nodes.
      renderFrame(animT)
      syncUnlockedData()
      renderFrame(animT)
      applyHoverStyles()
    })
    .on('mouseleave', (_event, d) => {
      if (selectedKey !== null) return
      if (
        (d.key as OuterBaseKey) === 'fullstack' ||
        (d.key as OuterBaseKey) === 'cloud' ||
        (d.key as OuterBaseKey) === 'ai' ||
        (d.key as OuterBaseKey) === 'datasci'
      ) {
        hoverInsideUnlockedCluster = false
        scheduleCloseUnlockedCluster()
        return
      }
      resetPan()
      hoveredKey = null
      isActive.value = false
      syncUnlockedData()
      applyHoverStyles()
      startAnimation()
      renderFrame(animT)
    })
    .on('click', (_event, d) => {
      const key = d.key as NodeKey

      // Clicking toggles a persistent selection lock.
      if (selectedKey === key) {
        selectedKey = null
        resetPan()
        hoverInsideUnlockedCluster = false
        hoveredKey = null
        isActive.value = false
        syncUnlockedData()
        applyHoverStyles()
        startAnimation()
        renderFrame(animT)
        return
      }

      selectedKey = key
      if (key === 'cloud' || key === 'fullstack' || key === 'ai' || key === 'datasci') hoveredKey = key
      isActive.value = true
      stopAnimation()
      renderFrame(animT)
      syncUnlockedData()
      applyHoverStyles()
      centerOnKey(key)
      renderFrame(animT)
    })

  const ro = new ResizeObserver(() => {
    // Re-render on resize (even if reduced motion)
    renderFrame(animT)
  })
  ro.observe(container)

  destroy = () => {
    if (raf) cancelAnimationFrame(raf)
    ro.disconnect()
    clearCloseTimer()
    isActive.value = false
    container.replaceChildren()
  }
})

onBeforeUnmount(() => {
  destroy?.()
  isActive.value = false
  isExpanded.value = false
  clearCollapseTimer()
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('bm-tech-orbit-expanded')
  }
})
</script>
