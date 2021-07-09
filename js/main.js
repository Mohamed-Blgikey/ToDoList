let work = document.getElementById("work")
let btnAdd = document.getElementById("btnAdd")
let contant = document.getElementById("contant")

let currentIndex = 0;
work.addEventListener("keyup", InValid)

btnAdd.addEventListener("click", add)
let arr;

if (localStorage.getItem("list") != null) {
    arr = JSON.parse(localStorage.getItem("list"));
    display();
}
else {
    arr = [];
}

function add() {
    if (InValid()) {
        if (btnAdd.innerHTML == 'Add') {
            work.classList.remove(`is-invalid`)
            work.classList.remove(`is-valid`)

            let todo = {
                val: work.value,
                com: false
            }
            arr.push(todo);
            localStorage.setItem("list", JSON.stringify(arr))
            display();
            work.value = '';
            console.log(arr);
        }
        else {
            work.classList.remove(`is-invalid`)
            work.classList.remove(`is-valid`)
            arr[currentIndex].val = work.value;
            localStorage.setItem("list", JSON.stringify(arr));
            display();
            work.value = '';
            btnAdd.innerHTML = 'Add';
        }
    }

}

function display() {
    let contain = ``;
    for (let index = 0; index < arr.length; index++) {

        if (arr[index].com == true) {
            contain += `
        <div class="row table w-100 pt-2 mx-auto mb-2 rounded-pill com" >
                <div class="col-8">
                    <div  class="text-left pl-5 text-white">
                        <p class="h1">${arr[index].val}</p>
                    </div>
                </div>
                <div class="col-2">
                <div>
                    <button onclick='com(${index})' class="btn btn-outline-success">Complete</button>
                </div>
            </div>
                <div class="col-1">
                    <div>
                        <button onclick='del(${index})' class="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
                <div class="col-1">
                    <div>
                        <button onclick='edit(${index})' class="btn btn-outline-warning">Edit</button>
                    </div>
                </div>
            </div>
        `
        }
        else {
            contain += `
        <div class="row table w-100 pt-2 mx-auto mb-2 rounded-pill" >
                <div class="col-8">
                    <div  class="text-left pl-5 text-white">
                        <p class="h1">${arr[index].val}</p>
                    </div>
                </div>
                <div class="col-2">
                <div>
                    <button onclick='com(${index})' class="btn btn-outline-success">Complete</button>
                </div>
            </div>
                <div class="col-1">
                    <div>
                        <button onclick='del(${index})' class="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
                <div class="col-1">
                    <div>
                        <button onclick='edit(${index})' class="btn btn-outline-warning">Edit</button>
                    </div>
                </div>
            </div>
        `
        }
    }
    contant.innerHTML = contain;

}

function InValid() {
    var regex = /^[a-zA-Z0-9 ]{3,}$/;
    if (regex.test(work.value) == true) {
        work.classList.add(`is-valid`)
        work.classList.remove(`is-invalid`)

        return true;
    }
    work.classList.add(`is-invalid`)
    work.classList.remove(`is-valid`)
    return false;
}

function del(index) {
    arr.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(arr));
    display();
}


function edit(index) {
    btnAdd.innerHTML = 'Edit'
    work.value = arr[index].val;
    arr[index].com = false;
    currentIndex = index;
}

function com(i) {
    arr[i].com = true;
    localStorage.setItem("list", JSON.stringify(arr));
    display()
}