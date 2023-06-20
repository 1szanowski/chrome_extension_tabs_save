//buttons section
const saveBtn = document.getElementById("save_btn");
const saveTabBtn = document.getElementById("save_tab_btn");
const deleteBtn = document.getElementById("delete_btn");
//inputs and outputs section
const input = document.getElementById("input");
const ul = document.getElementById("ul");
// init starting array 
let savedLinks = [];
const linksFromLocalStorage = JSON.parse( localStorage.getItem("savedLinks"))
//checking saved links in local storage assign to array value
if (linksFromLocalStorage) {
  savedLinks = linksFromLocalStorage
  render(savedLinks)
}
//adding links from browser
saveTabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    savedLinks.push(tabs[0].url)
      localStorage.setItem("savedLinks", JSON.stringify(savedLinks) )
      render(savedLinks)
  })
})
//main render function 
function render(links) {
  let listItems = ""
  for (let i = 0; i < links.length; i++) {
      listItems += `
          <li>
              <a target='_blank' href='${links[i]}'>
                  ${links[i]}
              </a>
          </li>
      `
  }
  ul.innerHTML = listItems
}
//delete button
deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  savedLinks = []
  render(savedLinks)
})

saveBtn.addEventListener("click", function() {
  savedLinks.push(input.value)
  input.value = ""
  localStorage.setItem("savedLinks", JSON.stringify(savedLinks) )
  render(savedLinks)
})


