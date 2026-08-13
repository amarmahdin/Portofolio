import {
  siBootstrap,
  siCodeigniter,
  siCss,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGmail,
  siHtml5,
  siInstagram,
  siJavascript,
  siLaravel,
  siMysql,
  siNodedotjs,
  siPhp,
  siPostman,
  siReact,
  siTailwindcss,
  siTiktok,
  siVuedotjs,
} from 'simple-icons'

const linkedinIcon = {
  title: 'LinkedIn',
  slug: 'linkedin',
  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
}

const iconRegistry = {
  siBootstrap,
  siCodeigniter,
  siCss,
  siExpress,
  siFirebase,
  siFlutter,
  siGit,
  siGithub,
  siGmail,
  siHtml5,
  siInstagram,
  siJavascript,
  siLaravel,
  siLinkedin: linkedinIcon,
  siMysql,
  siNodedotjs,
  siPhp,
  siPostman,
  siReact,
  siTailwindcss,
  siTiktok,
  siVuedotjs,
}

const slugToKey = {
  html5: 'siHtml5',
  css: 'siCss',
  bootstrap: 'siBootstrap',
  tailwindcss: 'siTailwindcss',
  react: 'siReact',
  vuedotjs: 'siVuedotjs',
  javascript: 'siJavascript',
  express: 'siExpress',
  nodedotjs: 'siNodedotjs',
  mysql: 'siMysql',
  postman: 'siPostman',
  firebase: 'siFirebase',
  flutter: 'siFlutter',
  git: 'siGit',
  laravel: 'siLaravel',
  php: 'siPhp',
  codeigniter: 'siCodeigniter',
  gmail: 'siGmail',
  instagram: 'siInstagram',
  tiktok: 'siTiktok',
  linkedin: 'siLinkedin',
  github: 'siGithub',
}

export function getSimpleIcon(keyOrSlug) {
  if (iconRegistry[keyOrSlug]) return iconRegistry[keyOrSlug]

  const mappedKey = slugToKey[keyOrSlug]
  if (mappedKey) return iconRegistry[mappedKey]

  const normalizedKey = `si${keyOrSlug.charAt(0).toUpperCase()}${keyOrSlug.slice(1)}`
  return iconRegistry[normalizedKey] ?? null
}

export function iconToSvg(icon, { color, className = '' } = {}) {
  if (!icon) return ''

  const fill = color || (icon.hex ? `#${icon.hex}` : 'currentColor')
  const classAttr = className ? ` class="${className}"` : ''

  if (icon.path) {
    return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${classAttr}><path fill="${fill}" d="${icon.path}"/></svg>`
  }

  if (icon.svg) {
    return icon.svg
      .replace(/<path\s+([^>]*?)d="/, `<path $1fill="${fill}" d="`)
      .replace('<svg ', `<svg${classAttr} `)
  }

  return ''
}

export function getIconSvgByKey(keyOrSlug, { color, className = '' } = {}) {
  const icon = getSimpleIcon(keyOrSlug)
  return iconToSvg(icon, { color, className })
}
