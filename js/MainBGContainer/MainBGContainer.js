export async function MainBGContainer() {
    return new Promise((resolve, reject) => {
        if (document.getElementsByClassName("mainContainer")[0]) {
            document.getElementById("root").removeChild(document.getElementsByClassName("mainContainer")[0])
        }

        const newSection = document.createElement('section')
        newSection.classList.add("mainContainer")
        for (let i = 0; i < 750; i++) {
            const newSpan = document.createElement("span")
            newSection.appendChild(newSpan)
        }

        document.getElementById("root").appendChild(newSection)
        resolve()
    })
}