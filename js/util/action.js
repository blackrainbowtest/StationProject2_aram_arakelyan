export let current_page = 1
export const page_object_count = 2

export const current_page_Change = (page) => {
    return current_page = page || 1
}

export const getPaginationObjects = (array) => {

    const total_pages = Math.ceil(array.length / page_object_count)
    const prev_url = current_page > 1 ? (
        current_page - 1
    ) : null
    const next_url = current_page < total_pages ? (
        current_page + 1
    ) : null

    return {
        pagination: {
            current_page,
            total_pages,
            prev_url,
            next_url,
        }
    }
}

export const getPageObjects = (page, array) => {
    const startIndex = (page - 1) * page_object_count
    const endIndex = startIndex + page_object_count
    return array.slice(startIndex, endIndex)
}