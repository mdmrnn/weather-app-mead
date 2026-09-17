console.log("Client side js file loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  fetch(`/weather?address=${encodeURIComponent(location)}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          document.querySelector(".location").innerText = `${data.error}`;
          document.querySelector(".forecast").innerText = ``;
        } else {
          console.log(data.coordinates);
          document.querySelector(".location").innerText =
            `Location: ${data.location}`;
          document.querySelector(".forecast").innerText =
            `Forecast: ${data.forecast}`;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
