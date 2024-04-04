export default function ScrollToTop() {
    return new Promise((reslove, reject) => {
        if (document.getElementById("newScrollToTop")) {
            document.getElementById("root").removeChild(document.getElementById("newScrollToTop"));
        }
        const newScrollToTop = document.createElement("div")
        newScrollToTop.id = "newScrollToTop"
        newScrollToTop.addEventListener("click", (e) => scrollToTopClickHandler(e))
        

        document.getElementById("root").appendChild(newScrollToTop)
        reslove()
    })
}

const scrollToTopClickHandler = (e) => {
    e.preventDefault()
    const context = document.getElementById("cardComponent")
    if (context.scrollTop > 300) {
        context.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    } else {
        const maxHeight = context.scrollHeight - context.clientHeight;
        context.scrollTo({
            top: maxHeight,
            behavior: "smooth"
        });
    }
}