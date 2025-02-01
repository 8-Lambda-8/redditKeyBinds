const exports = [];

let focusedElement: Element = document.querySelector("article")!;

let nextElement: Element;
const maxSearchLoop = 6;

document.addEventListener(
  "keydown",
  (event) => {
    var keyName = event.key;

    console.log("pressed ", keyName);

    if (!focusedElement) focusedElement = document.querySelector("article")!;

    if (keyName == "s") {
      nextElement = focusedElement!.nextElementSibling!.nextElementSibling!;

      if (nextElement == null) nextElement = focusedElement.parentElement!;
      let i = 0;
      while (nextElement.nodeName != "ARTICLE" && i < maxSearchLoop) {
        i++;
        nextElement = nextElement!.nextElementSibling!;

        if (nextElement.nodeName == "FACEPLATE-BATCH") {
          nextElement = nextElement.querySelector("article")!;
        }
      }

      if (nextElement.nodeName == "ARTICLE") focusedElement = nextElement;

      focusedElement.scrollIntoView({ block: "center" });
      focusedElement.scroll(0, 10);
    }
    if (keyName == "w") {
      nextElement =
        focusedElement!.previousElementSibling!.previousElementSibling!;
      let i = 0;
      while (nextElement.nodeName != "ARTICLE" && i < maxSearchLoop) {
        i++;
        nextElement = nextElement!.previousElementSibling!;
      }

      if (nextElement.nodeName == "ARTICLE") focusedElement = nextElement;
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
