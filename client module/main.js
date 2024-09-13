const url = "http://localhost:3000";
import { getData, createData } from "./service.js";


const content = document.querySelector(".content");
const form = document.querySelector(".form");
const input = document.querySelector(".input");

const render = async () => {
    const data = await getData();
    console.log(data);
    content.innerHTML = data.map((item) => `
    <h1>${item.name}</h1>
    <button data-id="${item.id}">Edit</button>
    <button data-delete="${item.id}">Delete</button>
    `
    ).join("");
}
render();


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await createData({ name: input.value });
    input.value = "";
    render();
});


const editData = async (newTitle, id) => {
    try {
        const response = fetch(`${url}/posts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ name: newTitle })
        });
        const data = await response.json();
        console.log(data);
        render()
    } catch (error) {
        console.log(error);
    }
}


content.addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (id) {
        try {
            const response = await fetch(`${url}/posts/${id}`);
            const data = await response.json();
            console.log(data);
            const newTitle = prompt("EDIT", data.name);
            editData(newTitle, id);
        } catch (error) {
            console.log(error)
        }
    }
});




content.addEventListener("click", async (e) => {
    const deleteId = e.target.dataset.delete;
    if (deleteId) {
        try {
            const response = await fetch(`${url}/posts/${deleteId}`, {
                method: "DELETE",
            });
            const data = response.json();
            console.log(data)
            render();
        } catch (error) {
            console.log(error)
        }
    }
});






