<template>
  <div
    class="bm-tech-orbit"
    :class="{ 'bm-tech-orbit--active': isActive }"
    aria-label="Technology focus animation"
    role="img"
  >
    <div class="bm-tech-orbit__frame" aria-hidden="true">
      <div class="bm-tech-orbit__glow" />
      <div class="bm-tech-orbit__ring bm-tech-orbit__ring--outer" />
      <div class="bm-tech-orbit__ring bm-tech-orbit__ring--inner" />

      <!-- D3 renders SVG into this container -->
      <div ref="d3Container" class="bm-tech-orbit__sigma" aria-hidden="true" />

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
import { onBeforeUnmount, onMounted, ref } from 'vue'

type BaseNodeKey = 'core' | 'cloud' | 'fullstack' | 'ai'
type UnlockedNodeKey = 'vue' | 'react' | 'django' | 'django2' | 'django3'
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

  const iconSources = {
    core: svgToDataUrl(CORE_SVG),
    cloud: svgToDataUrl(CLOUD_SVG),
    fullstack: svgToDataUrl(FULLSTACK_SVG),
    ai: svgToDataUrl(AI_SVG)
  }

  const fullstackUnlocked: OrbitNode[] = [
    {
      key: 'vue',
      label: 'Vue.js',
      iconHref: 'https://img.icons8.com/?size=100&id=rY6agKizO9eb&format=png&color=000000',
      iconCssFilter: 'invert(0) brightness(1.05)',
      box: 44,
      iconSize: 26,
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
      box: 44,
      iconSize: 26,
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
      box: 44,
      iconSize: 26,
      radius: 14,
      bgFill: 'rgba(255,255,255,0.035)',
      bgStroke: 'rgba(255,255,255,0.10)',
      bgStrokeWidth: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    // {
    //   key: 'django2',
    //   label: 'Django2',
    //   iconHref: 'https://img.icons8.com/?size=100&id=FnTmHRua3mU3&format=png&color=000000',
    //   iconCssFilter: 'invert(1) brightness(1.05)',
    //   box: 44,
    //   iconSize: 26,
    //   radius: 14,
    //   bgFill: 'rgba(255,255,255,0.035)',
    //   bgStroke: 'rgba(255,255,255,0.10)',
    //   bgStrokeWidth: 1,
    //   x: 0,
    //   y: 0,
    //   scale: 1
    // },

    // {
    //   key: 'django3',
    //   label: 'Django3',
    //   iconHref: 'https://img.icons8.com/?size=100&id=FnTmHRua3mU3&format=png&color=000000',
    //   iconCssFilter: 'invert(1) brightness(1.05)',
    //   box: 44,
    //   iconSize: 26,
    //   radius: 14,
    //   bgFill: 'rgba(255,255,255,0.035)',
    //   bgStroke: 'rgba(255,255,255,0.10)',
    //   bgStrokeWidth: 1,
    //   x: 0,
    //   y: 0,
    //   scale: 1
    // },
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
    }
  ]

  const edges: Array<{ from: NodeKey; to: NodeKey; stroke: string; strokeWidth: number }> = [
    { from: 'core', to: 'cloud', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'core', to: 'fullstack', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'core', to: 'ai', stroke: 'rgba(255,255,255,0.16)', strokeWidth: 1 },
    { from: 'cloud', to: 'fullstack', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 },
    { from: 'fullstack', to: 'ai', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 },
    { from: 'ai', to: 'cloud', stroke: 'rgba(255,255,255,0.09)', strokeWidth: 1 }
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
  let hoverInsideUnlockedCluster = false
  let closeClusterTimer: number | null = null

  function clearCloseTimer() {
    if (closeClusterTimer) window.clearTimeout(closeClusterTimer)
    closeClusterTimer = null
  }

  function syncUnlockedData() {
    const shouldShow = hoveredKey === 'fullstack'
    activeUnlockedNodes = shouldShow ? fullstackUnlocked : []
    activeUnlockedEdges = shouldShow
      ? activeUnlockedNodes.map((n) => ({
          from: 'fullstack',
          to: n.key,
          stroke: 'rgba(255,255,255,0.16)',
          strokeWidth: 1
        }))
      : []

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
      .style('cursor', 'default')
      .style('pointer-events', 'all')
      .on('mouseenter', () => {
        hoverInsideUnlockedCluster = true
        clearCloseTimer()
        isActive.value = true
      })
      .on('mouseleave', () => {
        hoverInsideUnlockedCluster = false
        scheduleCloseUnlockedCluster()
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

    // Keep map in sync for positioning lookups
    ;(fullstackUnlocked as OrbitNode[]).forEach((n) => nodesByKey.set(n.key, n))
    ;(['vue', 'react', 'django', 'django2', 'django3'] as const).forEach((k) => {
      if (!shouldShow) nodesByKey.delete(k)
    })
  }

  function scheduleCloseUnlockedCluster() {
    if (hoveredKey !== 'fullstack') return
    clearCloseTimer()
    closeClusterTimer = window.setTimeout(() => {
      if (hoveredKey !== 'fullstack') return
      if (hoverInsideUnlockedCluster) return
      hoveredKey = null
      isActive.value = false
      syncUnlockedData()
      applyHoverStyles()
      startAnimation()
    }, 140)
  }

  function applyHoverStyles() {
    const hasHover = hoveredKey !== null

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
      .attr('fill', (d) => (d.key === hoveredKey ? 'rgba(255,255,255,0.08)' : d.bgFill))
      .attr('stroke', (d) => (d.key === hoveredKey ? 'rgba(255,255,255,0.32)' : d.bgStroke))
      .attr('stroke-width', (d) => (d.key === hoveredKey ? Math.max(1.4, d.bgStrokeWidth) : d.bgStrokeWidth))

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

    extraLinkSel
      .attr('stroke', () => (hoveredKey === 'fullstack' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.06)'))
      .attr('stroke-width', () => (hoveredKey === 'fullstack' ? 1.15 : 1))
  }

  let raf = 0
  let animT = 0
  let lastNow = 0

  const baseAngles: Record<OuterBaseKey, number> = {
    cloud: -Math.PI / 2,
    fullstack: Math.PI / 6,
    ai: (Math.PI * 5) / 6
  }

  function getSize() {
    const rect = container.getBoundingClientRect()
    // Avoid 0x0 during first layout
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)
    return { width, height }
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

    // Core stays centered
    const core = nodesByKey.get('core')
    if (core) {
      core.x = cx
      core.y = cy
      core.scale = 1 + Math.sin(t * 1.1) * 0.02
    }

    ;(['cloud', 'fullstack', 'ai'] as const).forEach((key) => {
      const node = nodesByKey.get(key)
      if (!node) return
      const a = baseAngles[key] + rot
      node.x = cx + Math.cos(a) * r
      node.y = cy + Math.sin(a) * r
      node.scale = hoveredKey === key ? 1.07 : 1
    })

    // Position unlocked nodes around the fullstack node (if active)
    if (activeUnlockedNodes.length) {
      const fs = nodesByKey.get('fullstack')
      if (fs) {
        const outAngle = Math.atan2(fs.y - cy, fs.x - cx)
        const spread = 0.78
        const dist = Math.min(width, height) * 0.165
        const angles = [outAngle - spread, outAngle, outAngle + spread]

        activeUnlockedNodes.forEach((n, i) => {
          const a = angles[i] ?? outAngle
          n.x = fs.x + Math.cos(a) * dist
          n.y = fs.y + Math.sin(a) * dist
          n.scale = 1
        })

        extraLinkSel
          .attr('x1', fs.x)
          .attr('y1', fs.y)
          .attr('x2', (d) => nodesByKey.get(d.to)!.x)
          .attr('y2', (d) => nodesByKey.get(d.to)!.y)

        extraNodeSel.attr('transform', (d) => `translate(${d.x},${d.y}) scale(${d.scale})`)
      }
    }

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
      clearCloseTimer()
      hoveredKey = d.key as OuterBaseKey
      isActive.value = true
      stopAnimation()
      syncUnlockedData()
      renderFrame(animT)
      applyHoverStyles()
    })
    .on('mouseleave', (_event, d) => {
      if ((d.key as OuterBaseKey) === 'fullstack') {
        hoverInsideUnlockedCluster = false
        scheduleCloseUnlockedCluster()
        return
      }
      hoveredKey = null
      isActive.value = false
      syncUnlockedData()
      applyHoverStyles()
      startAnimation()
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
})
</script>
