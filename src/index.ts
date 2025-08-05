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

      const x = focusedElement.querySelector(
        "shreddit-async-loader > shreddit-embed"
      ) as Element;
      if (x != null && !x.shadowRoot?.children.length) {
        x.shadowRoot!.innerHTML = x.getAttribute("html") ?? "";
      }
    }
    if (keyName == "w") {
      nextElement = focusedElement!.previousElementSibling!;
      if (nextElement == null) nextElement = focusedElement.parentElement!;
      else nextElement = nextElement.previousElementSibling!;

      let i = 0;
      while (nextElement.nodeName != "ARTICLE" && i < maxSearchLoop) {
        i++;
        nextElement = nextElement!.previousElementSibling!;

        if (nextElement.nodeName == "FACEPLATE-BATCH") {
          nextElement = nextElement.querySelector("article:last-of-type")!;
        }
      }

      if (nextElement.nodeName == "ARTICLE") focusedElement = nextElement;
      focusedElement.scrollIntoView({ block: "center" });
    }
    if (keyName == "a") {
      const prevButton = (
        document.querySelector("#shreddit-media-lightbox") ?? focusedElement
      )
        .querySelector("gallery-carousel")
        ?.shadowRoot?.querySelector('[slot="prevButton"]')
        ?.children[0] as HTMLButtonElement;
      if (prevButton) prevButton.click();
    }
    if (keyName == "d") {
      const nextButton = (
        document.querySelector("#shreddit-media-lightbox") ?? focusedElement
      )
        .querySelector("gallery-carousel")
        ?.shadowRoot?.querySelector('[slot="nextButton"]')
        ?.children[0] as HTMLButtonElement;
      if (nextButton) nextButton.click();
    }
    if (keyName == "q") {
      let img = null as HTMLImageElement | null;
      if (focusedElement.querySelector("gallery-carousel"))
        img = focusedElement.querySelector(
          "gallery-carousel>ul>li[style*='visibility: visible;']"
        )!;
      else
        img = focusedElement.children[0].querySelector(
          "img.preview-img"
        ) as HTMLImageElement;

      if (img) img.click();
      else
        (
          document.querySelector(
            "#shreddit-media-lightbox > div > button"
          ) as HTMLButtonElement
        ).click();
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
