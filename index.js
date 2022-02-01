let myLeads = [];

const inputEl = document.querySelector('#input-el');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const ulEl = document.querySelector('#ul-el');

myLeadsStorage = localStorage.getItem('myLeads');
if(myLeadsStorage){
myLeads = JSON.parse(myLeadsStorage);
render(myLeads);
}

inputBtn.addEventListener('click', function() {
  myLeads.push(inputEl.value);
  LeadsStore = JSON.stringify(myLeads);
  localStorage.setItem('myLeads', LeadsStore);
  inputEl.value = '';
  render(myLeads);
})

function render(Leads) {
  if (Leads) {
    let listItems = '';
    for (let i = 0; i < Leads.length; i++)
      listItems += `<li>
<a href='${Leads[i]}' target='_blank'>
${Leads[i]}
</a>
</li>`;
    ulEl.innerHTML = listItems;
  }
}

deleteBtn.addEventListener('dblclick', function() {
  localStorage.clear();
  myLeads=[];
  render(myLeads);
})

tabBtn.addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    LeadsStore = JSON.stringify(myLeads)
    localStorage.setItem('myLeads', LeadsStore)
    inputEl.value = ''
    render(myLeads)
  })
})