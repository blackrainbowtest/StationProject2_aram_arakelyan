export function Popap(child, clickHandler) {
    return new Promise((reslove, reject) => {
        if (document.getElementById("popap")) {
            document.getElementById("root").removeChild(document.getElementById("popap"));
        }
        const newPopap = document.createElement("div")
        newPopap.id = "popap"
        child ? newPopap.appendChild(child) : null
        clickHandler ? newPopap.addEventListener("click", clickHandler) : null
        document.getElementById("root").appendChild(newPopap)

        reslove()
    })
}