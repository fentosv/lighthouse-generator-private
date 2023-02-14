import { makeBadge } from 'badge-maker'
import { writeFile } from 'node:fs/promises'

const writeLocalFile = (name, data) => {
  return writeFile(`./assets/${name}.svg`, data, 'utf-8')
}

const makeBadgeSvg = ({ label, message, color }) => {
  const svg = makeBadge({
    label: label,
    message: `${message * 100}%`,
    color: color,
    style: 'plastic', //'plastic', 'flat', 'flat-square', 'for-the-badge' or 'social'
  })

  writeLocalFile(label, svg)
  return svg
}

export default makeBadgeSvg
