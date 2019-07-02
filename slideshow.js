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
        child.removeAttribute('data-active');

    if (next || first)
        (next || first).setAttribute('data-active', '');
}
