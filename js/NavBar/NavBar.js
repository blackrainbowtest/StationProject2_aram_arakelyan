import { Card } from "../Card/Card.js";
import { CardInformation } from "../CardInformation/CardInformation.js";
import { MainBGContainer } from "../MainBGContainer/MainBGContainer.js";
import { Pagination } from "../Pagination/Pagination.js";
import { isCollection, loadData, userData } from "../index.js"
import { current_page, current_page_Change, getPageObjects, getPaginationObjects } from "../util/action.js";
import { scrollChecker } from "../util/scroll.js";

export function NavBar() {
    return new Promise((resolve, reject) => {
        if (document.getElementById("nav")) {
            document.getElementById("root").removeChild(document.getElementById("nav"));
        }

        const newNavBar = document.createElement("nav")
        newNavBar.id = "nav"
        const navItemSpan = document.createElement("span")
        navItemSpan.classList.add("nav-item")
        navItemSpan.addEventListener("click", navItemClickHandler)
        const navIconSpan = document.createElement("span")
        navIconSpan.classList.add("icon")
        if (userData.length) {
            const navSubIconSpan = document.createElement("span")
            navSubIconSpan.classList.add("subicon")
            navSubIconSpan.innerText = userData.length
            navIconSpan.appendChild(navSubIconSpan)
        }
        const navTitleP = document.createElement("p")
        navTitleP.innerText = "My collection"

        const navItemSpan2 = document.createElement("span")
        navItemSpan2.classList.add("nav-item")
        navItemSpan2.addEventListener("click", navItemHomeClickHandler)
        const navIconSpan2 = document.createElement("span")
        const navTitleP2 = document.createElement("p")
        navTitleP2.innerText = "Home"

        navItemSpan2.appendChild(navIconSpan2)
        navItemSpan2.appendChild(navTitleP2)
        newNavBar.appendChild(navItemSpan2)

        navItemSpan.appendChild(navIconSpan)
        navItemSpan.appendChild(navTitleP)
        newNavBar.appendChild(navItemSpan)


        document.getElementById("root").appendChild(newNavBar)
        resolve()
    })
}

const navItemClickHandler = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    screenLoad()
}

const navItemHomeClickHandler = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    loadData("https://api.artic.edu/api/v1/artworks?page=1")
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

export const screenLoad = async () => {
    await Card(getPageObjects(current_page, userData), cardClickHandler)
    await scrollChecker()
    await Pagination(getPaginationObjects(userData), changePageClickHandler);
    await MainBGContainer();
}