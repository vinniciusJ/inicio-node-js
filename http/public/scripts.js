const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')
var init = 0;

async function load() {
    init++;

    const res = await fetch("http://localhost:3000/").then((data) => data.json())

    res.urls.map(({name, url}) => loadElement({name, url}))
}
async function create({name, url}){
    const archiveCreate = `name=${name}&url=${url}`;
    const res = await fetch(`http://localhost:3000/?${archiveCreate}`).then((message) => message.json());

}
async function deleteLink({name, url, del}){
    const archiveCreate = `name=${name}&url=${url}&del=${del}`;
    const res = await fetch(`http://localhost:3000/?${archiveCreate}`).then((message) => message.json());
}
async function check(urlReq){
    const res = await fetch("http://localhost:3000/").then((data) => data.json());
    var cond = true;
    await res.urls.map(({url}) => {
        if(url == urlReq){
            cond = fase;
        }
    })
    return cond;
}
async function loadElement({name, url}){
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");
    const obj = {
        "name" : name,
        "url" : url,
        "del" : 1,
    };
    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(trash, obj);
    
    li.append(a);
    li.append(trash);
    ul.append(li);
}
async function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement("a");
    const trash = document.createElement("span");
    const obj = {
        "name" : name,
        "url" : url,
        "del" : 1,
    };

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(trash, obj);

    if(await check(obj['url'])){
        li.append(a);
        li.append(trash);
        ul.append(li);
        create({ name, url });
    }
    else {
        alert('Esse link já existe');
        return;
    }
    
}

function removeElement(el, obj) {
    if (confirm('Tem certeza que deseja deletar?')){
        el.parentNode.remove();
        deleteLink(obj);
    }    
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) {
        return alert('Preencha o campo')
    }

    const [name, url] = value.split(",");

    if (!url) {
        return alert('formate o texto da maneira correta')
    }
    if (!/^http/.test(url)) {
        return alert("Digite a url da maneira correta")
    }
    addElement({ name, url });

    input.value = "";


})
load();