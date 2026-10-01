# Genius Lyrics Scraper

Chrome / Edge extension (Manifest V3) that extracts clean, properly formatted lyrics
from a [Genius.com](https://genius.com) song page and saves them as a `.txt` file.
No ads, no annotations, no contributor badges, just the lyrics.

## Usage

Open any `https://genius.com/<artist>-<song>-lyrics` page and click the yellow
**Save Lyrics** button in the bottom-right corner. The file is saved as
`Artist-Song_Title.txt`, with stanzas separated by a blank line.

## Installation

1. Open `chrome://extensions` (Edge: `edge://extensions`).
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.
4. After editing the files, click the reload icon on the extension card.

## Files

- `manifest.json` – extension definition
- `content.js` – lyrics extraction and the save button
- `style.css` – button and toast styling
- `icon48.png`, `icon128.png` – icons

Sister extension for KaraokeTexty.cz: [karaoketexty-lyrics-scraper](https://github.com/davehornik/karaoketexty-lyrics-scraper).
