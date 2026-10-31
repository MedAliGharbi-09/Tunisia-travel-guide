// script.js: JavaScript for the whole Tunisia travel guide

// Function 1: runs when the button is clicked (onclick) - home page
function showMessage() {
  document.getElementById("message").innerHTML =
    "Tip: visit in spring or autumn. The weather is warm, the beaches are quieter and the prices are lower.";
}

// Function 2: runs when the mouse moves over a card (onmouseover)
function highlight(card) {
  card.classList.add("highlight");
}

// Function 3: runs when the mouse moves off a card (onmouseout)
function unhighlight(card) {
  card.classList.remove("highlight");
}

// Function 4: places page filter (onclick on the filter buttons)
// type is "all", "beach", "history" or "desert"
function filterPlaces(type) {
  let cards = document.querySelectorAll("#placeList .card");
  for (let i = 0; i < cards.length; i++) {
    if (type == "all" || cards[i].getAttribute("data-type") == type) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Function 5: trip cost calculator (onclick) - plan page
// All prices are rough estimates in Tunisian dinar (TND)
function calculateCost() {
  let days = Number(document.getElementById("days").value);
  let perDay = Number(document.getElementById("budget").value);
  let result = document.getElementById("costResult");

  if (days < 1 || days > 30 || isNaN(days)) {
    result.innerHTML = "Enter a number of days between 1 and 30.";
    return;
  }

  // each ticked activity adds a fixed cost
  let activities = document.querySelectorAll("input[name='activity']:checked");
  let activityCost = 0;
  for (let i = 0; i < activities.length; i++) {
    activityCost = activityCost + Number(activities[i].value);
  }

  let total = days * perDay + activityCost;
  result.innerHTML = "Estimated cost: about " + total + " TND";
}

// Form validation: presence check, length check and range check
function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let days = document.getElementById("days").value;
  let msg = document.getElementById("msg").value.trim();
  let error = document.getElementById("formError");

  // presence check
  if (name == "") {
    error.innerHTML = "Please enter your name.";
    return false;
  }

  // length check
  if (name.length < 2 || name.length > 40) {
    error.innerHTML = "Name must be between 2 and 40 characters.";
    return false;
  }

  // presence check
  if (email == "") {
    error.innerHTML = "Please enter your email.";
    return false;
  }

  // range check
  if (days == "" || days < 1 || days > 30) {
    error.innerHTML = "Days must be between 1 and 30.";
    return false;
  }

  // length check
  if (msg.length > 0 && msg.length < 10) {
    error.innerHTML = "If you write a message, make it at least 10 characters.";
    return false;
  }

  error.innerHTML = "Thank you " + name + ". Your trip request has been sent.";
  return false; // stops the page reloading (we have no server)
}
