(function () {
    const menus = document.querySelectorAll(".mobile-menu");
    menus.forEach(menu => {
        menu.onmousedown = (e) => {
            menu.setAttribute("data-dragging", 1);
            menu.setAttribute("data-drag-begin", e.clientX);
        };
        const menuGap = +getComputedStyle(menu).gap.slice(0, -2);
        const menuItems = menu.children;
        let totalWidth = -(+getComputedStyle(menu).width.slice(0, -2));
        for (let i = 0; i < menuItems.length; i++)
        {
            if (i != menuItems.length - 1)
            {
                totalWidth += menuGap;
            }
            totalWidth += +getComputedStyle(menuItems[i]).width.slice(0, -2);
        }
        menu.setAttribute("data-total-width", totalWidth);
    });

    window.onmouseup = () => {
        menus.forEach(menu => {
            menu.setAttribute("data-dragging", 0);
            const lastDragDiff = menu.children[0].style.translate.slice(0, -2);
            menu.setAttribute("data-dragged-to", lastDragDiff);
        });
    }

    window.onmousemove = (e) => {
        menus.forEach(menu => {
            if (menu.getAttribute("data-dragging") === "1")
            {
                const dragBegin = menu.getAttribute("data-drag-begin");
                const draggedTo = menu.getAttribute("data-dragged-to");
                const dragDiff = e.clientX - dragBegin;

                let position = +draggedTo + +dragDiff;
                const totalWidth = menu.getAttribute("data-total-width");

                position = Math.max(-totalWidth, position);
                position = Math.min(0, position); // clamp lower to 0

                const menuItems = menu.children;
                for (let i = 0; i < menuItems.length; i++)
                {
                    menuItems[i].style.translate = `${position}px`;
                }
            }
        });
    };
})();