import { createButton } from "./addButton.js"

export async function Pagination(data, changePageClickHandler) {
    return new Promise((resolve, reject) => {
        if (document.getElementById("pagination")) {
            document.getElementById("root").removeChild(document.getElementById("pagination"));
        }
        const paginationUL = document.createElement("ul")
        paginationUL.classList.add("pagination")
        let pagesToMove = []

        if (data.pagination.current_page === 1) {
            pagesToMove = Array.from({ length: data.pagination.total_pages <= 5 ? data.pagination.total_pages : 5 }, (_, i) => i )
        } else if (data.pagination.current_page === 2) {
            pagesToMove = Array.from({ length: data.pagination.total_pages <= 5 ? data.pagination.total_pages : 5 }, (_, i) => i - 1 )
        } else if (data.pagination.current_page === data.pagination.total_pages - 1) {
            pagesToMove = Array.from({ length: data.pagination.total_pages <= 5 ? data.pagination.total_pages : 5 }, (_, i) => i - 3 )
        } else if (data.pagination.current_page === data.pagination.total_pages) {
            pagesToMove = Array.from({ length: data.pagination.total_pages <= 5 ? data.pagination.total_pages : 5 }, (_, i) => i - 4 )
        } else {
            pagesToMove = Array.from({ length: data.pagination.total_pages <= 5 ? data.pagination.total_pages : 5 }, (_, i) => i - 2 )
        }

        createButton({
            class: "buttonClass",
            id: "buttonPaginationStart",
            textContent: "|<",
            onClick: data?.pagination?.prev_url,
            callBack: (e) => changePageClickHandler(e, 1),
            disabled: !data?.pagination?.prev_url,
            parent: paginationUL
        })

        createButton({
            class: "buttonClass",
            id: "buttonPaginationPrev",
            textContent: "←",
            onClick: data?.pagination?.prev_url,
            callBack: (e) => changePageClickHandler(e, data.pagination.current_page - 1),
            disabled: !data?.pagination?.prev_url,
            parent: paginationUL
        })

        pagesToMove.forEach((page, index) => {
            const pageToMove = data.pagination.current_page + page
            createButton({
                class: `buttonClass`,
                id: `buttonPaginationNext${index}`,
                textContent: `${pageToMove}`,
                onClick: true,
                active: pageToMove === data.pagination.current_page,
                callBack: (e) => changePageClickHandler(e, pageToMove),
                disabled: false,
                parent: paginationUL
            })
        })

        createButton({
            class: "buttonClass",
            id: "buttonPaginationNext",
            textContent: "→",
            onClick: data?.pagination?.next_url,
            callBack: (e) => changePageClickHandler(e, data.pagination.current_page + 1),
            disabled: !data?.pagination?.next_url,
            parent: paginationUL
        })

        createButton({
            class: "buttonClass",
            id: "buttonPaginationEnd",
            textContent: ">|",
            onClick: data?.pagination?.next_url,
            callBack: (e) => changePageClickHandler(e, data.pagination.total_pages),
            disabled: !data?.pagination?.next_url,
            parent: paginationUL
        })

        const newPagination = document.createElement("div")
        newPagination.id = "pagination"
        newPagination.appendChild(paginationUL)
        document.getElementById("root").appendChild(newPagination)
        resolve()
    })

}