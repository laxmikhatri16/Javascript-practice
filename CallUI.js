//code variable add DOC selection
let mainContainer = document.querySelector(".container")
let addnote = document.querySelector("#pluss-note");
let formContainer = document.querySelector(".form-card");
const stack =document.querySelector(".card-stack");

const upbtn =document.querySelector("#upbtn");
const downbtn=document.querySelector("#down-btn");

const form = document.querySelector("form");
const imageUrlInput = document.querySelector("#image-url");
const fullNameInput = document.querySelector("#full-name");
const homeTownInput = document.querySelector("#home-town");
const purposeInput = document.querySelector("#purpose");

const categoryRadios = document.querySelectorAll('input[name="category"]');


// Buttons)
const createNoteBtn = document.querySelector(".btn-black");
const closeFormBtn = document.querySelector(".closeForm");

//CODE start here
function saveToLocalStorage(obj) {
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        JSON.stringify(oldTasks);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    } else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        JSON.stringify(oldTasks);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }

}

addnote.addEventListener("click", function () {
    formContainer.style.display = "block";
    mainContainer.style.display = "none"

    //intial garepoxi css ma hidden vako yesma dekhinx
})

closeFormBtn.addEventListener("click", function () {
    formContainer.style.display = "none";
    mainContainer.style.display = "flex";

})
form.addEventListener("submit", function (evet) {
    evet.preventDefault();
    const imageUrl = imageUrlInput.value.trim();
    const fullname = fullNameInput.value.trim();
    const hometown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();
    let selected = false
    categoryRadios.forEach(function (cate) {
        if (cate.checked) {
            selected = cate.value;
        }
    });

    if (imageUrlInput.value.trim() === "" || fullNameInput.value.trim() === "" || homeTownInput.value.trim() === "") {
        alert("please enter all field");
        return;//khali x vane code yehi rokinx
    }
    if (!selected) {
        alert("please select a category");
        return;
    }
    saveToLocalStorage({
        imageUrl,
        fullname,
        hometown,
        purpose,
        selected,
    });
    form.reset();
    formContainer.style.display = "none";
    mainContainer.style.display = "flex"
    showCards();
})

function showCards() {
    stack.innerHTML=""
    let allTasks = JSON.parse(localStorage.getItem("tasks"));
    allTasks.forEach(function (task) {
        // Card
        const card = document.createElement("div");
        card.className = "card";

        // Card Header
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";

        const avatar = document.createElement("div");
        avatar.className = "avatar";

        const avatarImg = document.createElement("img");
        avatarImg.className = "avatar-img";
        avatarImg.src=task.imageUrl;

        avatar.appendChild(avatarImg);
        cardHeader.appendChild(avatar);

        // User Name
        const userName = document.createElement("h2");
        userName.className = "user-name";
        userName.textContent = task.fullname;

        // Details Grid
        const detailsGrid = document.createElement("div");
        detailsGrid.className = "details-grid";

        const label1 = document.createElement("span");
        label1.className = "label";
        label1.textContent = task.hometown;

        const value1 = document.createElement("span");
        value1.className = "value";
        value1.textContent = "Singapore";

        const label2 = document.createElement("span");
        label2.className = "label";
        label2.textContent = "purpose";

        const value2 = document.createElement("span");
        value2.className = "value";
        value2.textContent = task.purpose;

        detailsGrid.append(
            label1,
            value1,
            label2,
            value2
        );

        // Card Actions
        const cardActions = document.createElement("div");
        cardActions.className = "card-actions";

        // Call Button
        const callBtn = document.createElement("button");
        callBtn.className = "btn btn-dark";

        const phoneIcon = document.createElement("span");
        phoneIcon.className = "phone-icon";
        phoneIcon.textContent = "📞";

        callBtn.append(phoneIcon, " Call");

        // Message Button
        const messageBtn = document.createElement("button");
        messageBtn.className = "btn btn-light";
        messageBtn.textContent = "Message";

        cardActions.append(callBtn, messageBtn);

        // Assemble Card
        card.append(
            cardHeader,
            userName,
            detailsGrid,
            cardActions
        );

        // Add to body (or any container)
        document.querySelector(".card-stack").appendChild(card);
    });

}
showCards();
 
function updateStack(){
    const cards = document.querySelectorAll(".card-stack .card");
    for(i = 0;i < 3;i++){
            card.style.zIndex = 3 - i;
        card.style.transform =`translateY(${i *10}px) scale(${1-i *0.02})`;
       card.style.opacity`${1 - i * 0.02}`
    }
}

upbtn.addEventListener("click",function(){
   let lastChild =stack.lastElementChild;
   if(lastChild){
    stack.insertBefore(lastChild, stack.firstElementChild);
    //  insert beforele tyooo banda mathi layaux ani firstElementchild vaneko agadi r lastElementChild vaneko last ko 
    updateStack();
   }
})
downbtn.addEventListener("click",function(){
    const firstChild =stack.firstElementChild;
    if(firstChild){
        stack.appendChild(firstChild);//first ko lai last ma lagera rekhinx
    }
    updateStack();
})