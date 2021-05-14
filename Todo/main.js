const modal = document.getElementById('myModal');
const groupModal = document.getElementById('myModal2');

const openModalBtn = document.getElementById("myBtn");
const openGroupModalBtn = document.getElementById("myBtn2");

const closeModalBtn = document.getElementById("Close1");

const closeGroupModalBtn = document.getElementById("Close2");

const spanenetr = document.getElementById('Enter1');
const spanenetr2 = document.getElementById('Enter2');

console.log({ modal, groupModal, openModalBtn, openGroupModalBtn, closeModalBtn, spanenetr });

openModalBtn.onclick = function() {
    modal.style.display = "block";
}
openGroupModalBtn.onclick = function() {
    groupModal.style.display = "block";
}

closeModalBtn.onclick = function() {
    console.log('hui');
    modal.style.display = "none";
   // modal2.style.display = "none";
}

closeGroupModalBtn.onclick = function() {
    groupModal.style.display = "none";
}

spanenetr.onclick = function() {
    modal.style.display = "none";
    //modal2.style.display = "none";

}
spanenetr2.onclick = function() {
    groupModal.style.display = "none";

}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    else if (event.target == groupModal) {
        groupModal.style.display = "none";
    }
}
