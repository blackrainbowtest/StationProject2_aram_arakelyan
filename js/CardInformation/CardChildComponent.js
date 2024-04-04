import { Card } from "../Card/Card.js"
import { NavBar, screenLoad } from "../NavBar/NavBar.js"
import { Pagination } from "../Pagination/Pagination.js"
import { getPageObjects, isCollection, userData } from "../index.js"
import { current_page, current_page_Change, getPaginationObjects, page_object_count } from "../util/action.js"
import { CardInformation } from "./CardInformation.js"

export function CardChildComponent(data, clickHandler, isCollection) {
    const props = data.data
    const newCard = document.createElement("div")
    newCard.classList.add("cardInformationBox")
    newCard.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
    })
    const cardLeftDiv = document.createElement("div")
    cardLeftDiv.classList.add("cardInfoLeft")

    const newCardImg = document.createElement("img")
    newCardImg.classList.add("cardImage")
    newCardImg.src = props?.thumbnail?.lqip || ""
    newCardImg.alt = props?.thumbnail?.alt_text || "Image not found on server"
    newCardImg.width = 250
    newCardImg.height = 250

    const cardDescId = document.createElement("p")
    cardDescId.innerText = props?.id ? `Art id: ${props?.id}` : "id not found"
    const cardDescClassification = document.createElement("p")
    cardDescClassification.innerText = props?.classification_id ? `Classification: ${props?.classification_id}` : "classification not found"

    const cardRightDiv = document.createElement("div")
    cardRightDiv.classList.add("cardInfoRight")
    const cardTitle = document.createElement("h3")
    cardTitle.innerText = props?.title || "title not found"
    const cardInscriptions = document.createElement("h4")
    cardInscriptions.innerText = props?.inscriptions || "inscriptions not found"
    const cardInscrdimensions = document.createElement("p")
    cardInscrdimensions.innerText = props?.dimensions ? `Art demisions: ${props?.dimensions}` : "dimensions not found"
    const cardcredit_line = document.createElement("p")
    cardcredit_line.innerText = props?.credit_line ? `Art credit line: ${props?.credit_line}` : "credit line not found"

    // buttons
    if (isCollection) {
        const deleteBtn = document.createElement("div")
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.addEventListener("click", (e) => {
            isCollection(e, props)
            console.log(current_page, Math.ceil(userData.length / page_object_count))
            NavBar()
            Card(getPageObjects(current_page, userData), cardClickHandler)
            Pagination(getPaginationObjects(userData), changePageClickHandler);
            clickHandler(e)
        })
        newCard.appendChild(deleteBtn)
    }

    const addBtn = document.createElement("div")
    if (userData.some(obj => obj.id === props?.id)) {
        addBtn.classList.add("addBtnDisabled")
    } else {
        addBtn.classList.add("addBtn")
        addBtn.addEventListener("click", (e) => {
            userData.push(props)
            NavBar()
            clickHandler(e)
        })
    }

    cardLeftDiv.appendChild(newCardImg)
    cardLeftDiv.appendChild(cardDescId)
    cardLeftDiv.appendChild(cardDescClassification)
    cardRightDiv.appendChild(cardTitle)
    cardRightDiv.appendChild(cardInscriptions)
    cardRightDiv.appendChild(cardInscrdimensions)
    cardRightDiv.appendChild(cardcredit_line)
    newCard.appendChild(cardLeftDiv)
    newCard.appendChild(cardRightDiv)
    newCard.appendChild(addBtn)

    return newCard
}

const cardClickHandler = (e, url) => {
    e.preventDefault()
    CardInformation(url, isCollection)
}

const changePageClickHandler = async (e, action) => {
    e.preventDefault()
    e.stopPropagation()
    current_page_Change(action)
    screenLoad()
}