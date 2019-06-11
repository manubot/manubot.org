const slideshows = document.querySelectorAll('.slideshow');
for (const slideshow of slideshows)
    cycleSlideshow(slideshow);

function cycleSlideshow(slideshow) {
    const first = slideshow.firstElementChild;
    const current = slideshow.querySelector('[data-active]');
    const next = current ? current.nextElementSibling : undefined;

    for (const child of slideshow.children)
        child.removeAttribute('data-active');

    if (next || first)
        (next || first).setAttribute('data-active', '');

    window.setTimeout(
        () => cycleSlideshow(slideshow),
        slideshow.dataset.time || 3000
    );
}
