import { connectAPI } from "../app.js";
import { CardChildComponent } from "./CardChildComponent.js";
import { Popap } from "./Popap.js"

export async function CardInformation(url, isCollection) {
    let data = []
    await connectAPI(url).then(d => {
        data = d
    }).catch(err => console.log(err))
    const child = CardChildComponent(data, clickHandler, isCollection)
    
    return new Promise((reslove, reject) => {
        Popap(child, clickHandler)
        reslove()
    })
}

function clickHandler(e) {
    e.stopPropagation()
    e.preventDefault()
    if (document.getElementById("popap")) {
        document.getElementById("root").removeChild(document.getElementById("popap"));
    }
}