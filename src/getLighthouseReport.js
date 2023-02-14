import lighthouse from 'lighthouse'
import chromeLauncher from 'chrome-launcher'
import makeBadgeSvg from './makeBadge.js'
import updateReadme from './updateReadme.js'

const flags = ['--headless', '--quiet']
const chrome = await chromeLauncher.launch({ chromeFlags: flags })

const options = {
  logLevel: 'silent', // 'info'
  port: chrome.port,
}
const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
    emulatedUserAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
  },
}

const runnerResult = await lighthouse('https://doscuadrados.es', options, config)
// const runnerResult = await lighthouse('https://octagon-api.com', options, config)

export const percentageToColor = (percentage) => {
  if (percentage >= 95) return 'brightgreen'
  if (percentage >= 90) return 'green'
  if (percentage >= 75) return 'yellowgreen'
  if (percentage >= 60) return 'yellow'
  if (percentage >= 40) return 'orange'
  return 'red'
}

// `.lhr` is the Lighthouse Result as a JS object
const {
  performance: { score: performance },
  accessibility: { score: accessibility },
  seo: { score: seo },
  'best-practices': { score: bestPractices },
} = runnerResult.lhr.categories

const lighthouseReport = {
  performance,
  accessibility,
  seo,
  'best-practices': bestPractices,
}

const badges = Object.entries(lighthouseReport).map(([key, value]) => {
  console.log(key, value)
  return makeBadgeSvg({ label: key, message: value, color: 'green' })
})

updateReadme({ mdName: 'TEMPLATE.md', badgesMdText: badges.join('\n') })

await chrome.kill()
