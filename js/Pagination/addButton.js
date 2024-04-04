export function createButton (props) {
    if (document.getElementById(props.id)) {
        props?.parent.removeChild(document.getElementById(props.id));
    }

    const paginationLI = document.createElement("li")
    const paginationButton = document.createElement("div")

    props?.class ? paginationButton.classList.add(props?.class) : null
    props?.active ? paginationButton.classList.add("active") : null
    props?.id ? paginationButton.id = props.id : null
    props?.textContent ? paginationButton.textContent = props.textContent : null
    props.onClick ? paginationButton.addEventListener("click", props.callBack) : null
    props?.disabled ? paginationButton.classList.add("disabled") : null

    paginationLI.appendChild(paginationButton)
    props?.parent.appendChild(paginationLI)
}