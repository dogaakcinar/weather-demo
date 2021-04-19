console.log("client side js has loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const successMessage = document.querySelector('#success')
const failMessage = document.querySelector('#error')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          failMessage.textContent = data.error
        } else {
            failMessage.textContent = data.location
            successMessage.textContent = data.forecast
            console.log(data)
        }
      });
    }
  );
});
