(function () {
    const sliderContainers = document.querySelectorAll(".image-slider-container");
    const sliderTimeouts = [...Array(sliderContainers.length)];

    for (let w = 0; w < sliderContainers.length; w++)
    {
        const container = sliderContainers[w];
        const sliderImages = container.querySelectorAll(".image-placeholder");
        const circleButtonsContainer = container.querySelector(".image-slider-circles");
        const leftButton = container.querySelector("#left-button");
        const rightButton = container.querySelector("#right-button");

        let circleButtons = [];
        for (let i = 0; i < sliderImages.length; i++)
        {
            const circleButton = createCircleButton();
            circleButtons.push(circleButton);
            circleButtonsContainer.appendChild(circleButton);
        }

        leftButton.onclick = () => loadNext(sliderImages, 1, sliderImages.length, circleButtons, w);
        rightButton.onclick = () => loadNext(sliderImages, -1, sliderImages.length, circleButtons, w);

        for (let i = 0; i < circleButtons.length; i++)
        {
            circleButtons[i].onclick = () => loadImage(sliderImages, i, circleButtons);
        }

        sliderTimeouts[w] = setTimeout(() => loadNext(sliderImages, -1, sliderImages.length, circleButtons, w), 5000);
    }

    function loadImage(images, number, circles) {
        const width = parseInt(getComputedStyle(images[0]).width.slice(0, -2));
        const calculatedTranslate = -number * width;

        circles.forEach(circle => {
            circle.style.backgroundColor = "grey";
        });
        circles[number].style.backgroundColor = "black";

        for (let i = 0; i < images.length; i++)
        {
            images[i].style.translate = calculatedTranslate + "px";
        }
    }

    function loadNext(images, direction, max, circles, w) {
        if (sliderTimeouts[w])
        {
            clearTimeout(sliderTimeouts[w]);
            sliderTimeouts[w] = setTimeout(() => loadNext(images, -1, max, circles, w), 5000);
        }
        const width = parseInt(getComputedStyle(images[0]).width.slice(0, -2));
        const translate = parseInt(getComputedStyle(images[0]).translate.slice(0, -2)) || 0;

        const minTranslate = -((max - 1) * width);
        const maxTranslate = 0;

        let calculatedTranslate = (translate + width * direction) + "px";

        if (translate === maxTranslate && direction > 0)
        {
            calculatedTranslate = minTranslate + "px";
        }
        else if (translate === minTranslate && direction < 0)
        {
            calculatedTranslate = maxTranslate + "px";
        }

        const nextIndex = -parseInt(calculatedTranslate.slice(0, -2)) / width;
        circles.forEach(circle => {
            circle.style.backgroundColor = "grey";
        });
        circles[nextIndex].style.backgroundColor = "black";

        for (let i = 0; i < images.length; i++)
        {
            images[i].style.translate = calculatedTranslate;
        }
    }

    function createCircleButton()
    {
        const div = document.createElement("div");
        div.className = "image-circle-button";
        return div;
    }
})();