export function Card(data, cardClickHandler) {
    return new Promise((resolve, reject) => {
        if (document.getElementById("cardComponent")) {
            document.getElementById("root").removeChild(document.getElementById("cardComponent"));
        }
        const newCardComponent = document.createElement("div")
        newCardComponent.id = "cardComponent"
        if (data.length) {
            data.forEach((element, index) => {
                addCard({ ...element, parent: newCardComponent, index, cardClickHandler: (e) => cardClickHandler(e, element.api_link) })
            });
        } else {
            const emptyTitle = document.createElement("div")
            emptyTitle.classList.add("emptyTitle")
            emptyTitle.innerText = "No data"
            newCardComponent.appendChild(emptyTitle)
        }
        document.getElementById("root").appendChild(newCardComponent)
        resolve()
    })
}

function addCard(props) {
    if (document.getElementById(`card${props.index}`)) {
        props?.parent.removeChild(document.getElementById(`card${props.index}`));
    }
    const newDiv = document.createElement("div")
    newDiv.id = `card${props.index}`
    newDiv.classList.add("cardBox")
    props?.cardClickHandler ? newDiv.addEventListener("click", props?.cardClickHandler) : null
    const newMainDiv = document.createElement("div")
    newMainDiv.classList.add("main")
    const newCardImg = document.createElement("img")
    newCardImg.classList.add("cardImage")
    newCardImg.src = props?.thumbnail?.lqip || ""
    newCardImg.alt = props?.thumbnail?.alt_text || "Image not found on server"
    newCardImg.width = 250
    newCardImg.height = 250
    const newTitleH1 = document.createElement("h2")
    newTitleH1.innerText = props?.artwork_type_title
    const newCardDescription = document.createElement("p")
    newCardDescription.classList.add("description")
    newCardDescription.innerText = props?.artist_display || "author unknown"
    const newImageInfo = document.createElement("div")
    newImageInfo.classList.add("imageInfo")
    const newDepartment = document.createElement("div")
    newDepartment.classList.add("department")
    const newDepartmentIns = document.createElement("ins")
    newDepartmentIns.innerText = "🏢"
    const newDepartmentID = document.createElement("p")
    newDepartmentID.innerText = props?.department_id || "Dep. unknown"
    const newDuration = document.createElement("div")
    newDuration.classList.add("duration")
    const newDurationIns = document.createElement("ins")
    newDurationIns.innerText = "◷"
    const newDurationTime = document.createElement("p")
    newDurationTime.innerText = "Not yet assigned"
    if (props?.source_updated_at) {
        const date = new Date(props?.source_updated_at)
        date.setDate(date.getDate() + 5)
        const diffTime = date.getTime() - Date.now();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        newDurationTime.innerText = diffDays > 0 ? `${diffDays} days left` : `${-diffDays} days ago`;
    }

    const newHR = document.createElement('hr')
    const newCreatorDiv = document.createElement("div")
    newCreatorDiv.classList.add("creator")
    const newWrapper = document.createElement("div")
    newWrapper.classList.add("wrapper")
    const newCreatorImage = document.createElement("img")
    newCreatorImage.src = props?.thumbnail?.lqip || ""
    newCreatorImage.alt = props?.thumbnail?.alt_text || "Image not found on server"
    newCreatorImage.width = 32
    newCreatorImage.height = 32
    const newCreatorParagraph = document.createElement("p")
    newCreatorParagraph.innerHTML = `<ins>Author ID ${props?.artist_id || "None"}: </ins>${props?.artist_title || "Not found"}`


    newWrapper.appendChild(newCreatorImage)
    newCreatorDiv.appendChild(newWrapper)
    newCreatorDiv.appendChild(newCreatorParagraph)
    newDepartment.appendChild(newDepartmentIns)
    newDepartment.appendChild(newDepartmentID)
    newImageInfo.appendChild(newDepartment)

    newDuration.appendChild(newDurationIns)
    newDuration.appendChild(newDurationTime)
    newImageInfo.appendChild(newDuration)
    newMainDiv.appendChild(newCardImg)
    newMainDiv.appendChild(newTitleH1)
    newMainDiv.appendChild(newCardDescription)
    newMainDiv.appendChild(newImageInfo)
    newMainDiv.appendChild(newHR)
    newMainDiv.appendChild(newCreatorDiv)
    newDiv.appendChild(newMainDiv)
    props?.parent.appendChild(newDiv)
}