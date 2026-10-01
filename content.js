(() => {
  // Don't inject twice
  if (document.getElementById('gls-save-btn')) return;

  function extractLyrics() {
    const lyricsRoot = document.getElementById('lyrics-root');
    if (!lyricsRoot) return null;

    const containers = lyricsRoot.querySelectorAll('div[data-lyrics-container="true"]');
    if (!containers.length) return null;

    const parts = [];

    containers.forEach(container => {
      // Clone so we don't mutate the page
      const clone = container.cloneNode(true);

      // Remove header sections (contributor badges etc.)
      clone.querySelectorAll('[data-exclude-from-selection="true"]').forEach(el => el.remove());

      // Remove invisible placeholder spans
      clone.querySelectorAll('span[style*="opacity:0"]').forEach(el => el.remove());
      clone.querySelectorAll('span[style*="pointer-events:none"]').forEach(el => el.remove());

      // Convert <br> to newlines before getting text
      clone.querySelectorAll('br').forEach(br => br.replaceWith('\n'));

      const text = clone.textContent.trim();
      if (text) parts.push(text);
    });

    return parts.join('\n\n').replace(/\n{3,}/g, '\n\n');
  }

  function extractMetadata() {
    const title = document.querySelector('h1 span[class*="HiddenMask"]')?.textContent?.trim()
      || document.querySelector('h1')?.textContent?.trim()
      || '';

    const artist = document.querySelector('[class*="SongHeader"] [class*="CreditList"] a')?.textContent?.trim()
      || '';

    return { title, artist };
  }

  function buildFilename(artist, title) {
    const clean = str => str.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_').substring(0, 80);
    if (artist && title) return `${clean(artist)}-${clean(title)}.txt`;
    if (title) return `${clean(title)}.txt`;
    return 'genius_lyrics.txt';
  }

  function saveAsFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleClick() {
    const lyrics = extractLyrics();
    if (!lyrics) {
      showToast('❌ Lyrics not found on this page');
      return;
    }

    const { title, artist } = extractMetadata();
    const filename = buildFilename(artist, title);

    saveAsFile(lyrics, filename);
    showToast(`✅ Saved: ${filename}`);
  }

  function showToast(message) {
    let toast = document.getElementById('gls-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gls-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('gls-toast-visible');
    setTimeout(() => toast.classList.remove('gls-toast-visible'), 2500);
  }

  // Create the button
  const btn = document.createElement('button');
  btn.id = 'gls-save-btn';
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span>Save Lyrics</span>
  `;
  btn.addEventListener('click', handleClick);
  document.body.appendChild(btn);
})();
