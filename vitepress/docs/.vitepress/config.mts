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
      { icon: 'github', link: 'https://github.com/BrunoMeyer' }
    ],

    footer: {
      message: 'Built with VitePress',
      copyright: '© ' + new Date().getFullYear() + ' Bruno Meyer'
    }
  }
})
