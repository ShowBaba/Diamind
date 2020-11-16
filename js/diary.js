const viewEntriesBtn = document.querySelector("#view-diary-btn");
const placeholder = document.querySelector(".diary-data");
const container = document.querySelector(".entry-container");

const getEntries = async () => {
  const headers = new Headers();
  let url = "http://localhost:3000/api/v1/entries";
  let token = JSON.parse(localStorage.getItem("token"));
  headers.append("Authorization", `bearer ${token}`);
  headers.append("Content-Type", "application/json");
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    let json = await response.json();
    let entries = json.entries;
    entries.forEach((entry) => {
      let element = document.createElement("div");
      element.className = "card diary-data";
      element.innerHTML = JSON.stringify(entry.content);
      container.appendChild(element);
    });
  } catch (error) {
    console.log(error);
  }
};

viewEntriesBtn.addEventListener("click", getEntries);
