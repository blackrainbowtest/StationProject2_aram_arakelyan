export function scrollChecker() {
    return new Promise((resolve, reject) => {
        const cardComponent = document.getElementById("cardComponent")
        cardComponent.addEventListener('scroll', () => {
            let scrollPosition = cardComponent.scrollTop;
            if (scrollPosition > 300) {
                document.getElementById('newScrollToTop').classList.add('active');
            } else {
                document.getElementById('newScrollToTop').classList.remove('active');
            }
        });

        resolve()
    })
}