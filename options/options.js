// Get the checkbox elements
const suggestedPostsEnabled = document.getElementById("suggestedPostsEnabled");
const reelsEnabled = document.getElementById("reelsEnabled");
const sponsoredEnabled = document.getElementById("sponsoredEnabled");
const form = document.querySelector("form");

// Update the stored option when the submit button clicked
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Set Localstorage
  browser.storage.local.set({
    suggestedPostsEnabled: suggestedPostsEnabled.checked,
    reelsEnabled: reelsEnabled.checked,
    sponsoredEnabled: sponsoredEnabled.checked
  });

  // Display the toast message
  const toast = document.getElementById("toast");
  toast.innerText = "Options saved";
  toast.classList.add("show");

  // Hide the toast message after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
});

// Load the stored option and set the checkbox state
browser.storage.local
  .get({
    suggestedPostsEnabled: true,
    reelsEnabled: true,
    sponsoredEnabled: true
  })
  .then((data) => {
    suggestedPostsEnabled.checked = data.suggestedPostsEnabled;
    reelsEnabled.checked = data.reelsEnabled;
    sponsoredEnabled.checked = data.sponsoredEnabled
  });
