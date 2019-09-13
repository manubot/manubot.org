const slideshows = document.querySelectorAll('.slideshow');
for (const slideshow of slideshows) {
    cycleSlideshow(slideshow);
    slideshow.addEventListener('click', () => {
        window.clearInterval(slideshow.timer);
        cycleSlideshow(slideshow);
    });
    slideshow.timer = window.setInterval(() => cycleSlideshow(slideshow), 3000);
}

function cycleSlideshow(slideshow) {
    const first = slideshow.firstElementChild;
    const current = slideshow.querySelector('[data-active]');
    const next = current ? current.nextElementSibling : undefined;

    for (const child of slideshow.children)
        hideSlide(child);

    showSlide(next || first);
}

function showSlide(element) {
    if (!element)
        return;

    element.setAttribute('data-active', '');
    if (!element.src && element.dataset.src) {
        element.src = element.dataset.src;
    }
}

function hideSlide(element) {
    if (!element)
        return;

    element.removeAttribute('data-active');
}