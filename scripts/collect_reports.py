"""Discover official reports; never equate a successful HTML response with a PDF."""
import hashlib
import json
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit, unquote
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'lib' / 'reports.json'
SOURCE = 'https://www.aemo.com.au/energy-systems/electricity/national-electricity-market-nem/system-operations/summer-operations'
SEED = 'https://www.aemo.com.au/-/media/files/electricity/nem/system-operations/summer-operations/2026-27-AEMO-Summer-Outlook'


def canonical(url):
    parts = urlsplit(url)
    if parts.scheme != 'https' or parts.hostname not in ('aemo.com.au', 'www.aemo.com.au'):
        raise ValueError('Not an official AEMO HTTPS URL')
    return urlunsplit(('https', 'www.aemo.com.au', parts.path.rstrip('/'), '', ''))


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.href = None
        self.label = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            self.href = dict(attrs).get('href')
            self.label = []

    def handle_data(self, value):
        if self.href:
            self.label.append(value)

    def handle_endtag(self, tag):
        if tag == 'a' and self.href:
            self.links.append((self.href, ' '.join(' '.join(self.label).split())))
            self.href = None


def fetch(url, limit):
    error = None
    for attempt in range(3):
        try:
            request = Request(url, headers={'User-Agent': 'OohEnergy-ReportMonitor/1.0', 'Accept': 'text/html,application/pdf'})
            with urlopen(request, timeout=25) as response:
                canonical(response.url)
                return response.read(limit)
        except Exception as exc:
            error = exc
            if attempt < 2:
                time.sleep(2 ** attempt)
    raise RuntimeError(str(error))


def collect():
    now = datetime.now(timezone.utc).isoformat()
    state = json.loads(DATA.read_text(encoding='utf-8'))
    source = state['source']
    source['lastAttempt'] = now
    candidates = {canonical(item['url']): item['title'] for item in state['items']}
    candidates[canonical(SEED)] = '2026-27 AEMO Summer Outlook'
    try:
        html = fetch(SOURCE, 4_000_000).decode('utf-8', errors='replace')
        if 'Just a moment...' in html or 'challenge-platform' in html:
            raise ValueError('AEMO access verification page returned')
        parser = Links()
        parser.feed(html)
        found = 0
        for href, title in parser.links:
            try:
                url = canonical(urljoin(SOURCE, href))
            except ValueError:
                continue
            path = unquote(urlsplit(url).path).lower()
            if '/-/media/' in path and ('summer' in path or 'summer' in title.lower()):
                candidates[url] = title or unquote(path.rsplit('/', 1)[-1]).replace('-', ' ')
                found += 1
        if not found:
            raise ValueError('No summer report links extracted; source layout may have changed')
        source.update(lastSuccess=now, error=None, extractedLinks=found)
    except Exception as exc:
        source['error'] = str(exc)[:300]
    existing = {canonical(item['url']): item for item in state['items']}
    for url, title in list(candidates.items())[:40]:
        item = existing.get(url, {'id': hashlib.sha256(url.lower().encode()).hexdigest()[:16], 'title': title, 'url': url, 'firstSeen': now, 'lastSuccess': None})
        item['lastAttempt'] = now
        try:
            content = fetch(url, 1024)
            if not content.lstrip().startswith(b'%PDF-'):
                raise ValueError('Response is not a PDF document')
            item.update(lastSuccess=now, error=None)
        except Exception as exc:
            item['error'] = str(exc)[:300]
        existing[url] = item
    state['items'] = sorted(existing.values(), key=lambda item: item['firstSeen'], reverse=True)
    DATA.write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'sourceError': source.get('error'), 'reports': len(state['items']), 'verified': sum(bool(item['lastSuccess']) for item in state['items'])}))


if __name__ == '__main__':
    collect()
