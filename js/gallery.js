function splitTo(arr, n) {
  var plen = Math.ceil(arr.length / n);

  return arr.reduce((p, c, i, a) => {
    if (i % plen === 0) p.push({});
    p[p.length - 1][i] = c;
    return p;
  }, []);
}

const gallery = document.querySelector("div.gallery");

var client = contentful.createClient({
  space: "agzwd6p3l7p4",
  accessToken: "NdSvEJS5MJGdy1zUf_XqFk-RlMSml65_FMIUGBFdIXM",
});

let galleryCategoryList = [];

client
  .getEntries()
  .then((entries) => {
    console.log({ entries });
    entries.items.forEach((entry) => {
      let galleryCategory = document.createElement("div"),
        columnList = document.createElement("div"),
        h1 = document.createElement("h1");
      h1.innerHTML = `${entry.fields.name}`;
      galleryCategory.classList.add("gallery-category");
      columnList.classList.add("column-list");
      galleryCategory.appendChild(h1);
      galleryCategory.appendChild(columnList);

      var itemsSplittedToColumn = splitTo(entry.fields.images, 4);

      itemsSplittedToColumn.map((columnItems) => {
        let column = document.createElement("div");
        column.classList.add("column");
        for (var key in columnItems) {
          let image = columnItems[key];
          if (image.fields) {
            let galleryItem = document.createElement("div"),
              img = document.createElement("img");
            galleryItem.classList.add("gallery-item");
            // img.src = `https:${image.fields.file.url}`;
            img.dataset.src = `https:${image.fields.file.url}?w=250&h=250`;
            // img.style.display = "none";
            // img.alt = image.fields.file.fileName;
            img.className += "lazy";
            galleryItem.appendChild(img);
            column.appendChild(galleryItem);
            columnList.appendChild(column);
            gallery.appendChild(galleryCategory);
          }
        }
      });
    });
  })
  .then(() => {
    galleryCategoryList = [...document.querySelectorAll(".gallery-category")];
    lazyLoad();
  });

const removeMinAndMaxHeightAndWidth = (node) => {
  node.style.minHeight = "auto";
  node.style.minWidth = "auto";
};

let inAdvance = 10;

const loadCategory = (categoryImageList) => {
  categoryImageList.forEach((image) => {
    image.src = image.dataset.src;
    image.onload = () => {
      removeMinAndMaxHeightAndWidth(image.parentNode);
      image.classList.add("loaded");
    };
  });
};

function lazyLoad() {
  galleryCategoryList.forEach((category) => {
    if (
      !category.classList.contains("loaded") &&
      category.offsetTop < window.innerHeight + window.pageYOffset + inAdvance
    ) {
      loadCategory(category.querySelectorAll(".lazy"));
      category.classList.add("loaded");
    }
  });

  // if all loaded removeEventListener
}

window.addEventListener("scroll", _.throttle(lazyLoad, 16));
window.addEventListener("resize", _.throttle(lazyLoad, 16));
