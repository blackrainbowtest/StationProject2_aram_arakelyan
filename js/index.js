import { Card } from './Card/Card.js';
import { CardInformation } from './CardInformation/CardInformation.js';
import { MainBGContainer } from './MainBGContainer/MainBGContainer.js';
import { NavBar } from './NavBar/NavBar.js';
import { Pagination } from './Pagination/Pagination.js';
import ScrollToTop from './ScrollToTop/ScrollToTop.js';
import { connectAPI } from './app.js';
import { current_page, current_page_Change, page_object_count } from './util/action.js';
import { scrollChecker } from './util/scroll.js';

export let userData = []

export const loadData = (url) => {
    connectAPI(url)
        .then(data => updateScreen(data))
        .catch(err => console.log(err))
}

loadData("https://api.artic.edu/api/v1/artworks?page=1")

export const updateScreen = async (data) => {
    await ScrollToTop()
    await NavBar()
    await Card(data.data, cardClickHandler);
    await scrollChecker()
    await Pagination(data, changePageClickHandler);
    await MainBGContainer();
}

const changePageClickHandler = (e, pageToMove) => {
    e.preventDefault()
    loadData(`https://api.artic.edu/api/v1/artworks?page=${pageToMove}`)
}

const cardClickHandler = (e, url) => {
    e.preventDefault()
    CardInformation(url)
}

export const getPageObjects = (page, array) => {
    const startIndex = (page - 1) * page_object_count
    const endIndex = startIndex + page_object_count
    return array.slice(startIndex, endIndex)
}

export const changeUserData = (data) => {
    userData = data
}

export const isCollection = (e, data) => {
    e.preventDefault()
    e.stopPropagation()
    userData.filter((elm) => {
        elm.id !== data.id
    })
    changeUserData(userData.filter((elm) => elm.id !== data.id))

    const total_pages = Math.ceil(userData.length / page_object_count)

    if (total_pages < current_page) {
        current_page_Change(total_pages)
    }
}