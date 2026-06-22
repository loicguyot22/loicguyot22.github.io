/* Cyber Book – Page Flip logic (vanilla JS) */
(function(){
  const book = document.getElementById('book');
  const sheets = Array.from(book.querySelectorAll('.sheet'));
  const pageLabel = document.getElementById('page');
  const btnNext = document.querySelectorAll('[data-next]');
  const btnPrev = document.querySelectorAll('[data-prev]');
  const navButtons = document.querySelectorAll('[data-goto]');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  // 6 pages -> 3 sheets (2 pages by sheet)
  let currentPage = 1;
  const totalPages = 6;

  // z-index stack
  sheets.forEach((s, i) => s.style.zIndex = String((sheets.length - i) * 10));

  function pageToSheets(pageNumber){
    // number of sheets that need to be turned to reveal pageNumber
    // each sheet holds 2 pages: (1,2), (3,4), (5,6)
    // to show page N, turn floor((N-1)/2) sheets
    return Math.floor((pageNumber - 1) / 2);
  }

  function updateBook(){
    // Turn the required number of sheets
    const k = pageToSheets(currentPage);
    sheets.forEach((sheet, idx) => {
      if(idx < k){ sheet.classList.add('turned'); }
      else { sheet.classList.remove('turned'); }
    });
    pageLabel.textContent = String(currentPage);
  }

  function next(){
    if(currentPage < totalPages){
      currentPage += 1;
      updateBook();
    }
  }
  function prev(){
    if(currentPage > 1){
      currentPage -= 1;
      updateBook();
    }
  }
  function goto(page){
    page = Math.max(1, Math.min(totalPages, page|0));
    currentPage = page;
    updateBook();
  }

  btnNext.forEach(b => b.addEventListener('click', next));
  btnPrev.forEach(b => b.addEventListener('click', prev));
  navButtons.forEach(b => b.addEventListener('click', (e)=>{
    const p = parseInt(b.dataset.goto, 10);
    goto(p);
  }));

  // Keyboard arrows
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight'){ next(); }
    if(e.key === 'ArrowLeft'){ prev(); }
  });

  // Mobile nav toggle
  toggle.addEventListener('click', ()=> nav.classList.toggle('open'));

  // Year
  document.getElementById('y').textContent = new Date().getFullYear();

  // Initialize
  updateBook();
})();