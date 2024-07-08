const form = document.querySelector("form")
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("lastName")
const emailInput = document.getElementById("email")
const tableBody = document.querySelector("tbody")

document.addEventListener("DOMContentLoaded", renderUsers)

form.addEventListener("submit", function(event){
    event.preventDefault()
    formSubmitHandler()

})


async function formSubmitHandler() {
    await createUser()

    
}

//render users
async function renderUsers() {
    const users= await getUsers()
    tableBody.innerHTML = users.map((user) => (
        `
        <tr>
           <td>${user.firstName}</td>
           <td>${user.lastName}</td>
           <td>${user.email}</td>
       </tr>
   `
    )).join("")

}
//get users from backend
async function getUsers() {
    const response = await fetch("http://localhost:8080/api/users", {
        method: "GET",
    })
    const data = await response.json()
    return data;
}
//create a user
async function createUser() {
    const firstName = firstNameInput.value
    const lastName = lastNameInput.value
    const email = emailInput.value

    const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        body: JSON.stringify(
            {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
            }
        ),
        headers: {
            "Content-Type": "application/json"
        }
    })
    //get all users to verify the post request was successful
    await renderUsers()
}