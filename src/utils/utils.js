export function rem (px) {
  const ration = 375 / 10
  return px / ration
}

export function realPx (px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}
