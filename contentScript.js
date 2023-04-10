// This function removes posts with the specified text from the Facebook feed
function removePosts(text) {
  const posts = document.querySelectorAll("span");
  posts.forEach((post) => {
    if (post.innerText === text) {
      console.log("THIS");
      let parentElement = post;
      for (let i = 0; i < 50; i++) {
        parentElement = parentElement.parentElement;
        if (parentElement === null) {
          break;
        }
        if (parentElement.classList.contains("x1lliihq")) {
          parentElement.remove();
          break;
        }
      }
    }
  });
}

// Wait for the Facebook feed to load and then remove the specified posts
window.onload = () => {
  browser.storage.local.get(["reelsEnabled", "suggestedPostsEnabled"]).then((data) => {
    if (data.reelsEnabled !== false) {
      removePosts("Reels and short videos");
    }
    if (data.suggestedPostsEnabled !== false) {
      removePosts("Suggested for you");
    }
  });
};

// Listen for changes to the Facebook feed and remove specified posts as they appear
const observer = new MutationObserver(() => {
  browser.storage.local.get(["reelsEnabled", "suggestedPostsEnabled"]).then((data) => {
    if (data.reelsEnabled !== false) {
      removePosts("Reels and short videos");
    }
    if (data.suggestedPostsEnabled !== false) {
      removePosts("Suggested for you");
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
