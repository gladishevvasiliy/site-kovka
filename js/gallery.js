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

client.getEntries().then((entries) => {
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
        let galleryItem = document.createElement("div"),
          img = document.createElement("img");
        galleryItem.classList.add("gallery-item");
        img.src = `https:${image.fields.file.url}`;
        img.alt = image.fields.file.fileName;
        galleryItem.appendChild(img);
        column.appendChild(galleryItem);
        columnList.appendChild(column);
        gallery.appendChild(galleryCategory);
      }
    });
  });
});
