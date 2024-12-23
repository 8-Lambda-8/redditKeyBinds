const exports = [];

let focusedElement: Element = document.querySelector("article")!;

const pressed: string[] = [];

document.addEventListener(
  "keydown",
  (event) => {
    var keyName = event.key;

    if (pressed.indexOf(keyName) > 0) return;
    pressed.push(keyName);
    setTimeout(() => {
      const index = pressed.indexOf(keyName);
      if (index > 0) pressed.splice(index, 1);
    }, 100);

    console.log("pressed ", keyName);

    if (!focusedElement) focusedElement = document.querySelector("article")!;

    if (keyName == "s") {
      focusedElement = focusedElement!.nextElementSibling!.nextElementSibling!;
      focusedElement.scrollIntoView({ block: "center" });
      focusedElement.scroll(0, 10);
    }
    if (keyName == "w") {
      focusedElement =
        focusedElement!.previousElementSibling!.previousElementSibling!;
      focusedElement.scrollIntoView({ block: "center" });
    }
    if (keyName == "a") {
      const prevButton = focusedElement
        .querySelector("gallery-carousel")
        ?.shadowRoot?.querySelector('[slot="prevButton"]')
        ?.children[0] as HTMLButtonElement;
      if (prevButton) prevButton.click();
    }
    if (keyName == "d") {
      const nextButton = focusedElement
        .querySelector("gallery-carousel")
        ?.shadowRoot?.querySelector('[slot="nextButton"]')
        ?.children[0] as HTMLButtonElement;
      if (nextButton) nextButton.click();
    }
    if (keyName == "c") {
      const likeButton = focusedElement.children[0].shadowRoot?.querySelector(
        "[upvote]"
      ) as HTMLButtonElement;
      likeButton.click();
    }
    if (keyName == "x") {
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
