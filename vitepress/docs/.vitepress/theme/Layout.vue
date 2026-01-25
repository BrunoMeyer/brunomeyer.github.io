<template>
  <DefaultTheme.Layout />
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { nextTick, onMounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const ICONS: Record<string, string> = {
  home: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 10v10a1 1 0 0 0 1 1h4v-7h4v7h4a1 1 0 0 0 1-1V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  about: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 21a8 8 0 1 0-16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  experience: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1h3a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V6Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 15v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  skills: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 18 3 12l6-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 4 10 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,
  education: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 10v6c0 2 4 4 6 4s6-2 6-4v-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  projects: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13 3 4 14h7l-1 7 10-12h-7l0-6Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  publications: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 19a3 3 0 0 1 3-3h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11.5 4.44" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.1a5 5 0 1 0 7.07 7.07l.62-.62" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
}

function isHomePage(): boolean {
  const fm = frontmatter.value as Record<string, unknown> | undefined
  return fm?.layout === 'home' || route.path === '/'
}

function getIconForHref(href: string | null): string {
  if (!href) return ICONS.link
  if (href === '/' || href.startsWith('/#')) return ICONS.home
  if (href.startsWith('/about')) return ICONS.about
  if (href.startsWith('/experience')) return ICONS.experience
  if (href.startsWith('/skills')) return ICONS.skills
  if (href.startsWith('/education')) return ICONS.education
  if (href.startsWith('/projects')) return ICONS.projects
  if (href.startsWith('/publications')) return ICONS.publications
  return ICONS.link
}

function shouldIconizeHref(href: string | null): boolean {
  if (!href) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return true
  if (href.startsWith('http://') || href.startsWith('https://')) return true
  return href.startsWith('/')
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
}

function ensureHeroDecorations(homeHero: HTMLElement) {
  if (homeHero.dataset.bmDecorated === 'true') return

  homeHero.classList.add('bm-home-hero')

  const spotlight = document.createElement('div')
  spotlight.className = 'bm-spotlight'
  spotlight.setAttribute('aria-hidden', 'true')
  homeHero.insertBefore(spotlight, homeHero.firstChild)

  const nameEl = homeHero.querySelector<HTMLElement>('.name')
  if (nameEl) {
    const underline = document.createElement('span')
    underline.className = 'bm-underline'
    underline.setAttribute('aria-hidden', 'true')
    nameEl.appendChild(underline)
  }

  homeHero.dataset.bmDecorated = 'true'
}

async function injectIconsIntoButtons() {
  const buttons = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a.VPButton, .VPHomeHero .actions a')
  )

  for (const button of buttons) {
    if (button.dataset.bmIconized === 'true') continue

    const iconSvg = getIconForHref(button.getAttribute('href'))
    const wrapper = document.createElement('span')
    wrapper.className = 'bm-btn-icon'
    wrapper.innerHTML = iconSvg

    button.insertBefore(wrapper, button.firstChild)
    button.dataset.bmIconized = 'true'
  }
}

async function injectIconsIntoNavbar() {
  const navLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>(
      [
        '.VPNavBarMenu a',
        '.VPNavBarMenuLink',
        '.VPNavScreenMenu a',
        '.VPNavScreenMenuLink'
      ].join(',')
    )
  )

  for (const link of navLinks) {
    if (link.dataset.bmNavIconized === 'true') continue

    const href = link.getAttribute('href')
    if (!shouldIconizeHref(href)) {
      link.dataset.bmNavIconized = 'true'
      continue
    }

    // Avoid iconizing the brand title/logo link if present
    if (link.closest('.VPNavBarTitle')) {
      link.dataset.bmNavIconized = 'true'
      continue
    }

    const iconSvg = getIconForHref(href)
    const wrapper = document.createElement('span')
    wrapper.className = 'bm-nav-icon'
    wrapper.innerHTML = iconSvg

    link.insertBefore(wrapper, link.firstChild)
    link.dataset.bmNavIconized = 'true'
  }
}

async function animateHome() {
  const homeHero = document.querySelector<HTMLElement>('.VPHomeHero')
  if (!homeHero) return

  ensureHeroDecorations(homeHero)

  if (prefersReducedMotion()) return

  const [{ animate, stagger, spring }] = await Promise.all([import('motion')])

  const spotlight = homeHero.querySelector<HTMLElement>('.bm-spotlight')
  const underline = homeHero.querySelector<HTMLElement>('.bm-underline')

  const heroTextTargets: Element[] = Array.from(
    homeHero.querySelectorAll('.name, .text, .tagline')
  )

  const heroButtons: Element[] = Array.from(
    homeHero.querySelectorAll('.actions a')
  )

  const featureCards: Element[] = Array.from(
    document.querySelectorAll('.VPFeatures .item')
  )

  if (spotlight) {
    animate(
      spotlight,
      {
        opacity: [0, 1, 0],
        transform: ['translate3d(-18%, -18%, 0) rotate(-12deg)', 'translate3d(22%, 0%, 0) rotate(-10deg)', 'translate3d(28%, 6%, 0) rotate(-10deg)']
      },
      { duration: 1.2, easing: 'ease-out' }
    )
  }

  if (underline) {
    animate(
      underline,
      { transform: ['scaleX(0)', 'scaleX(1)'], opacity: [0.2, 1] },
      { duration: 0.85, delay: 0.18, easing: spring({ stiffness: 220, damping: 20 }) }
    )
  }

  animate(
    heroTextTargets,
    { opacity: [0, 1], y: [14, 0], filter: ['blur(8px)', 'blur(0px)'] },
    { duration: 0.75, delay: stagger(0.085), easing: spring({ stiffness: 220, damping: 22 }) }
  )

  animate(
    heroButtons,
    { opacity: [0, 1], y: [10, 0] },
    { duration: 0.6, delay: stagger(0.06, { start: 0.32 }), easing: spring({ stiffness: 240, damping: 22 }) }
  )

  animate(
    featureCards,
    { opacity: [0, 1], y: [10, 0] },
    { duration: 0.62, delay: stagger(0.05, { start: 0.42 }), easing: spring({ stiffness: 240, damping: 24 }) }
  )
}

async function runEnhancements() {
  await nextTick()
  await injectIconsIntoNavbar()

  if (!isHomePage()) return
  await injectIconsIntoButtons()
  await animateHome()
}

onMounted(() => {
  void runEnhancements()
})

watch(
  () => route.path,
  () => {
    void runEnhancements()
  }
)
</script>
