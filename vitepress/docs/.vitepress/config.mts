import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Bruno Meyer',
  description: 'DevOps • Full-stack • AI & Federated Learning',
  // base: '/bhmeyer/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Experience', link: '/experience' },
      { text: 'Skills', link: '/skills' },
      { text: 'Education', link: '/education' },
      { text: 'Projects', link: '/projects' },
      { text: 'Publications', link: '/publications' }
    ],

    sidebar: [
      {
        text: 'Profile',
        items: [
          { text: 'About', link: '/about' },
          { text: 'Experience', link: '/experience' },
          { text: 'Skills', link: '/skills' },
          { text: 'Education', link: '/education' },
          { text: 'Projects', link: '/projects' },
          { text: 'Publications', link: '/publications' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BrunoMeyer' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.42v1.6h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.25ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"/></svg>'
        },
        link: 'https://www.linkedin.com/in/bruno-henrique-meyer/',
        ariaLabel: 'LinkedIn'
      }
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© ' + new Date().getFullYear() + ' Bruno Meyer'
    }
  }
})
