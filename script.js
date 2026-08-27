/*
  DAVID'S VILLAGE MANIFESTO
  --------------------------
  ADDING A PAGE:
  Copy this format into the `pages` array below:

  {
    title: "Your page title",
    chapter: "Chapter I",
    body: `
      <p>Your paragraph goes here.</p>
      <p>You can add another paragraph here.</p>
    `
  },

  HTML is allowed inside `body`, which makes headings, lists, italics, etc. easy.
*/

const pages = [
  {
    title: "David's Village",
    chapter: "The Manifesto",
    body: `
      <div class="ornament">✦</div>
      <p style="text-align:center">A collection of ideas, principles, and beliefs.</p>
      <div class="ornament">✦</div>
      <p style="text-align:center">Turn the page to begin.</p>
    `
  },
  {
    title: "Introduction",
    chapter: "Chapter I",
    body: `
      <p>This is where the manifesto begins.</p>
      <p>Replace this text with the opening of your actual manifesto. The website is intentionally structured so you can keep adding pages without rebuilding the entire site.</p>
    `
  },
  {
    title: "First Principle",
    chapter: "Chapter II",
    body: `
      <p>Write your first principle here.</p>
      <p>You can use multiple paragraphs on every page.</p>
    `
  },
  {
    title: "Your Next Page",
    chapter: "Chapter III",
    body: `
      <p>This is a placeholder page. Delete it once you start adding your real manifesto.</p>
    `
  }
];

const leftPage = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');
const turningPage = document.getElementById('turningPage');
const pageNumber = document.getElementById('pageNumber');
const pageCount = document.getElementById('pageCount');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;

function renderPage(target, page) {
  if (!page) {
    target.innerHTML = '';
    return;
  }
  target.innerHTML = `
    <div class="chapter">${page.chapter || ''}</div>
    <h1>${page.title || ''}</h1>
    ${page.body || ''}
  `;
}

function render() {
  renderPage(leftPage, pages[current - 1]);
  renderPage(rightPage, pages[current]);
  pageNumber.textContent = Math.min(current + 1, pages.length);
  pageCount.textContent = pages.length;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= pages.length - 1;

  // On desktop, the left page becomes visible after the first turn.
  leftPage.style.visibility = current === 0 ? 'hidden' : 'visible';
}

function turn(direction) {
  const next = current + direction;
  if (next < 0 || next >= pages.length) return;

  // The page being turned is always the current right-hand page.
  // Keeping its left edge on the spine makes both directions use the
  // same physical hinge, so the reverse animation no longer jumps.
  renderPage(turningPage, pages[current]);
  turningPage.className = 'turning-page';
  void turningPage.offsetWidth;
  turningPage.classList.add(direction > 0 ? 'flip-forward' : 'flip-back');

  turningPage.addEventListener('animationend', function handler() {
    turningPage.removeEventListener('animationend', handler);
    current = next;
    turningPage.className = 'turning-page';
    render();
  }, { once: true });
}

prevBtn.addEventListener('click', () => turn(-1));
nextBtn.addEventListener('click', () => turn(1));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') turn(-1);
  if (event.key === 'ArrowRight') turn(1);
});

render();
