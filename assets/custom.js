$(document).ready(function () {

$('#colorGrid').on('click', '.color-box .color-image', function () {
  const altText = $(this).attr('alt');
  const container = $('.tab1 .image-wrapper .default-image-sides');

  // 1. Store which image types were previously active
  const wasFrontActive = container.find('img.front-only.active').length > 0;
  const wasSideActive = container.find('img.side-only.active').length > 0;

  // 2. Find all images in source with the same alt
  const matchedImgs = $('.all-other-images img').filter(function () {
    return $(this).attr('alt') === altText;
  });

  if (matchedImgs.length === 0) {
    console.warn('No matching images found for alt:', altText);
    return;
  }

  // 3. Get the group class: front, pocket, etc.
  const groupClass = matchedImgs.first().attr('class').split(/\s+/).find(cls =>
    ['front', 'pocket', 'side-panel', 'zip-panel'].includes(cls)
  );

  if (!groupClass) {
    console.warn('No valid group class found in matched image.');
    return;
  }

  // 4. Remove existing front-only and side-only images for this group
  container.find(`img.${groupClass}.front-only`).remove();
  container.find(`img.${groupClass}.side-only`).remove();

  // 5. Find and clone the front and side images for the selected color
  const frontImg = matchedImgs.filter(`.front-only.${groupClass}`).first();
  const sideImg = matchedImgs.filter(`.side-only.${groupClass}`).first();

  // 6. Append with conditional 'active' class based on previous state
  if (frontImg.length) {
    const clonedFront = frontImg.clone();
    if (wasFrontActive) clonedFront.addClass('active');
    container.append(clonedFront);
  }

  if (sideImg.length) {
    const clonedSide = sideImg.clone();
    if (wasSideActive) clonedSide.addClass('active');
    container.append(clonedSide);
  }
});



    $('.tab1 .style-tab .sidebar .tab[data-tab="FRONT"]').click(function () {
        $(".tab1 .image-wrapper .default-image-sides .side-images").removeClass('active');
        $(".tab1 .image-wrapper .default-image-sides .side-images.front-only").addClass('active');
        $(".tab1 .image-wrapper .default-image-sides.front-only").show();
        $('.tab1 .image-wrapper .default-image-sides .front-only').show();
        $('.tab1 .image-wrapper .default-image-sides .side-only').hide();
    });

    $('.tab1 .style-tab .sidebar .tab[data-tab="POCKET"]').click(function () {
        $(".tab1 .image-wrapper .default-image-sides .side-images").removeClass('active');
        $(".tab1 .image-wrapper .default-image-sides .side-images.front-only").addClass('active');
        $(".tab1 .image-wrapper .default-image-sides .side-images").removeClass('active');
        $(".tab1 .image-wrapper .default-image-sides").show();
        $('.tab1 .image-wrapper .default-image-sides .front-only').show();
        $(".tab1 .image-wrapper .default-image-sides.side-only").hide();
    });
    // $('.tab1 .style-tab .sidebar .tab[data-tab="LATERAL"]').click(function () {
    //     $(".tab1 .image-wrapper .default-image-sides .side-images").removeClass('active');
    //     $(".tab1 .image-wrapper .default-image-sides .side-images.side-only").addClass('active');
    //      $(".tab1 .image-wrapper .default-image-sides").show();
    //     $('.tab1 .image-wrapper .default-image-sides .front-only').hide();
    //     $(".tab1 .image-wrapper .default-image-sides.side-only").show();

    // });
    // $('.tab1 .style-tab .sidebar .tab[data-tab="ZIPPER"]').click(function () {
    //     $(".tab1 .image-wrapper .default-image-sides .side-images").removeClass('active');
    //     $(".tab1 .image-wrapper .default-image-sides .side-images.side-only").addClass('active');
    //     $(".tab1 .image-wrapper .default-image-sides").show();
    //     $('.tab1 .image-wrapper .default-image-sides .front-only').hide();
    //     $(".tab1 .image-wrapper .default-image-sides.side-only").show();

    // });
    const colorOptions = {
        FRONT: [
            { url: "https://cdn.shopify.com/s/files/1/0597/8855/8523/files/grey-color_1.png?v=1754316425", alt: "silver-color" },
            { url: "https://cdn.shopify.com/s/files/1/0597/8855/8523/files/grey-color_2.png?v=1754316425", alt: "black-color" },

        ],
        POCKET: [
            { url: "https://cdn.shopify.com/s/files/1/0597/8855/8523/files/grey-color_1.png?v=1754316425", alt: "silver-shaft" },
            { url: "https://cdn.shopify.com/s/files/1/0597/8855/8523/files/grey-color_2.png?v=1754316425", alt: "black-shaft" },
        ],
        LATERAL: [
            { url: "https://jacquesilbert.com/cdn/shop/files/dark-black-color-leather.jpg?v=13681076603137543187", alt: "side-dark-black-leather" },
            { url: "https://jacquesilbert.com/cdn/shop/files/green-color-leather.jpg?v=4670676481131966540", alt: "side-green-leather" },
        ],
        ZIPPER: [
            { url: "https://jacquesilbert.com/cdn/shop/files/brown_bronze.jpg?v=4695313922377251534", alt: "zipper-brown-bronze" },
            { url: "https://jacquesilbert.com/cdn/shop/files/black_bronze.jpg?v=11471615872739753150", alt: "zipper-black-bronze" },
        ],
        // Add more for other sections as needed...
    };

    const tabs = document.querySelectorAll(".tab");
    const sectionTitle = document.getElementById("sectionTitle");
    const colorGrid = document.getElementById("colorGrid");

    function loadColors(tabName) {
        sectionTitle.textContent = `${tabName}`;
        colorGrid.innerHTML = "";
        const colors = colorOptions[tabName] || [];

        colors.forEach((color) => {
            const box = document.createElement("div");
            box.className = "color-box";

            const img = document.createElement("img");
            img.src = color.url;
            // img.setAttribute("data-src", color.url);
            img.alt = color.alt;
            img.className = "color-image";

            const info = document.createElement("div");
            info.className = "info-button";
            info.textContent = "+ info";

            box.appendChild(img);
            box.appendChild(info);
            colorGrid.appendChild(box);
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            document.querySelector(".tab.active")?.classList.remove("active");
            tab.classList.add("active");
            const selectedTab = tab.getAttribute("data-tab");
            loadColors(selectedTab);
        });
    });

    // Initial load
    loadColors("FRONT");
});
