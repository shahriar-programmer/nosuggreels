// For the first time install set storage value
browser.storage.local
  .get(["reelsEnabled", "suggestedPostsEnabled", "sponsoredEnabled"])
  .then((data) => {
    if (!data.reelsEnabled) {
      browser.storage.local.set({
        reelsEnabled: true,
      });
    }
    if (!data.suggestedPostsEnabled) {
      browser.storage.local.set({
        suggestedPostsEnabled: true,
      });
    }
    if (!data.sponsoredEnabled) {
      browser.storage.local.set({
        sponsoredEnabled: true,
      });
    }
  });

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
  browser.storage.local
    .get(["reelsEnabled", "suggestedPostsEnabled", "sponsoredEnabled"])
    .then((data) => {
      if (data.reelsEnabled !== false) {
        removePosts("Reels and short videos");
      }
      if (data.suggestedPostsEnabled !== false) {
        removePosts("Suggested for you");
      }
      if (data.sponsoredEnabled !== false) {
        removePosts("Sponsored");
      }
    });
};

// Listen for changes to the Facebook feed and remove specified posts as they appear
const observer = new MutationObserver(() => {
  browser.storage.local
    .get(["reelsEnabled", "suggestedPostsEnabled", "sponsoredEnabled"])
    .then((data) => {
      if (data.reelsEnabled !== false) {
        removePosts("Reels and short videos");
      }
      if (data.suggestedPostsEnabled !== false) {
        removePosts("Suggested for you");
      }
      if (data.sponsoredEnabled !== false) {
        removePosts("Sponsored");
      }
    });
});
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
