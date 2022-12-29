// function save(){
//     console.log("Button clicked from onclick method")
// }

//The code 7-11 will do same work as code 1-3 now the better way is 7-11 and also by using 7-11 code we can remove onclick() attribute from html code

let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("dlt-btn")
const tabBtn = document.getElementById("tab-btn") //tab button is used to save the tab ur in and render in ur extension

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

dltBtn.addEventListener("dblclick" , function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

saveBtn.addEventListener("click" , function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads" , JSON.stringify(myLeads)) //to save our input we use localStorage.setItem and then we'll pass what to storage the first one is key and the second one is string since myLeads is an array to convert that to string we use JSON.stringify
    render(myLeads)
    console.log("hi")
})

function render(leads){
    let listItems = ""
    for(i=0;i<leads.length;i++){
        // listItems += "<li><a href = '" + myLeads[i] + "' target = '_blank'>" + myLeads[i] + "</a></li>"
        // Line 21 can be rewritten as
        listItems += `
            <li>
                <a href = '${leads[i]}' target = '_blank'>
                    ${leads[i]}
                </a>
            </li>
            `
    }
    ulEl.innerHTML = listItems
}

tabBtn.addEventListener("click" , function(){
    //to use chrome.tabs we need to add permissions in json file
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})