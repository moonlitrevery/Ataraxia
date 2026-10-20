export default `(() => {
  const config = {
    debounce: 150,
    post: 'article',
    navReels: { on: true, selector: 'a[href="/reels/"]' },
    feedReels: { on: true, link: 'a[href*="/reel/"]' },
    suggested: { on: true, texts: ['Sugerido para você', 'Sugestões para você', 'Suggested for you'] },
    redirect: { on: true, path: '/reels/', to: '/?variant=following' },
  }

  const mark = 'data-ataraxia'
  const texts = new Set(config.suggested.texts.map((t) => t.toLowerCase()))

  const style = document.createElement('style')
  style.textContent = '[' + mark + ']{display:none!important}'
  document.head.appendChild(style)

  // o carrossel de perfis sugeridos não é um article, então sobe até o bloco que fica lado a lado com os posts
  function container(el) {
    for (; el && el !== document.body; el = el.parentElement) {
      if (el.matches(config.post)) return el
      if (el.parentElement && el.parentElement.querySelector(config.post)) return el
    }
  }

  function apply() {
    // a barra extra evita pegar perfil tipo /reelsfan/ e cobre /reels sem barra final
    if (config.redirect.on && (location.pathname + '/').startsWith(config.redirect.path)) {
      location.replace(config.redirect.to)
      return
    }

    const hide = new Set()

    if (config.navReels.on) {
      document.querySelectorAll(config.navReels.selector).forEach((el) => hide.add(el))
    }

    if (config.feedReels.on) {
      document.querySelectorAll(config.post).forEach((post) => {
        if (post.querySelector(config.feedReels.link)) hide.add(post)
      })
    }

    if (config.suggested.on) {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        if (!texts.has(walker.currentNode.nodeValue.trim().toLowerCase())) continue
        const el = container(walker.currentNode.parentElement)
        if (el) hide.add(el)
      }
    }

    // recalcula a marca do zero porque o react reaproveita nó e um post normal herdaria o display:none
    document.querySelectorAll('[' + mark + ']').forEach((el) => {
      if (!hide.has(el)) el.removeAttribute(mark)
    })
    hide.forEach((el) => el.setAttribute(mark, ''))
  }

  let timer
  new MutationObserver(() => {
    clearTimeout(timer)
    timer = setTimeout(apply, config.debounce)
  }).observe(document.body, { childList: true, subtree: true })

  apply()
})()

// sem isso o webview do ios às vezes falha calado
true;`
