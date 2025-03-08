/* ######   UPDATE (Replace yoda's quotes )  ### */
// Gets the Button 'update' from View
const update = document.querySelector("#update-button");

// Add functionallity at Click event
update.addEventListener("click", (_) => {
  console.log("Update clicked");

  //Fetchs to self url (root)
  fetch("/quotes", {
    //enter by http-method put
    method: "put",
    // tell the server we’re sending JSON
    headers: { "Content-Type": "application/json" },
    //data is passed via the body property.
    body: JSON.stringify({
      name: "Darth Vader",
      quote: "I find your lack of faith disturbing.",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
      window.location.reload(true);
    });
});

/* ######   DELETE (Remove Vader's quotes )  ### */
// Gets the Button 'delete' from View
const deleteButton = document.querySelector("#delete-button");

//Gets the div that shows Error Message (no more quotes)
const messageDiv = document.querySelector("#message");

// Add functionallity at Click event
deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vader",
    }),
  })
    .then((res) => {
      console.log(res);
      if (res.ok) return res.json();
    })
    .then((data) => {
      console.log(data);
      //window.location.reload()
      if (data === "No more quote to delete") {
        messageDiv.textContent = "No Darth Vader quote to delete";
      } else {
        window.location.reload(true);
      }
    });
});
