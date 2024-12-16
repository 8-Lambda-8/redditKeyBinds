const exports = [];

const feed = document.querySelector("shreddit-feed");
let focusedElement: Element = document.querySelector("article")!;

document.addEventListener(
  "keydown",
  (event) => {
    var keyName = event.key;
    //var keyCode = event.code;

    console.log("pressed ", keyName);

    if (keyName == "s") {
      focusedElement = focusedElement!.nextElementSibling!.nextElementSibling!;
      focusedElement.scrollIntoView({block:"center"});
      focusedElement.scroll(0,10)
    }
    if (keyName == "w") {
      focusedElement =
        focusedElement!.previousElementSibling!.previousElementSibling!;
      focusedElement.scrollIntoView({block:"center"});
    }
    if (keyName == "a") {
      const prevButton = focusedElement
        .querySelector("gallery-carousel")
        ?.shadowRoot?.querySelector('[slot="prevButton"]')
        ?.children[0] as HTMLButtonElement;
      if(prevButton)prevButton.click();
    }
    if (keyName == "d") {
      const nextButton = focusedElement
        .querySelector("gallery-carousel")
        ?.shadowRoot?.querySelector('[slot="nextButton"]')
        ?.children[0] as HTMLButtonElement;
      if(nextButton) nextButton.click();
    }
    if (keyName == "x") {
      const likeButton = focusedElement.children[0].shadowRoot?.querySelector(
        "[upvote]"
      ) as HTMLButtonElement;
      likeButton.click();
    }
    if (keyName == "y") {
      const likeButton = focusedElement.children[0].shadowRoot?.querySelector(
        "[downvote]"
      ) as HTMLButtonElement;
      likeButton.click();
    }
    if (keyName == "e") {
      window
        .open(
          (
            focusedElement.querySelector(
              '[slot="full-post-link"]'
            ) as HTMLAnchorElement
          ).href,
          "_blank"
        )
        ?.focus();
    }
  },
  false
);
