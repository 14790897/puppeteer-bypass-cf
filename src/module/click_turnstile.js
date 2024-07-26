(function () {
  return new Promise((resolve) => {
    var st = setTimeout(() => {
      resolve(false);
    }, 4000); // timeout after 4s

    try {
      // 使用 querySelectorAll 获取所有 .cf-turnstile-wrapper 元素
      const elements = document.querySelectorAll(".cf-turnstile-wrapper");

      if (elements.length <= 0) {
        clearTimeout(st);
        return resolve(false);
      }

      for (const element of elements) {
        try {
            const rect = element.getBoundingClientRect();
            console.log(
              `BoundingBox: x=${rect.x}, y=${rect.y}, width=${rect.width}, height=${rect.height}`
            );

          const points = [
            { x: rect.left + rect.width / 3, y: rect.top + rect.height / 2 },
            {
              x: rect.left + (rect.width * 2) / 3,
              y: rect.top + rect.height / 2,
            },
            {
              x: rect.left + rect.width / 3,
              y: rect.top + (rect.height * 3) / 4,
            },
            {
              x: rect.left + (rect.width * 2) / 3,
              y: rect.top + (rect.height * 3) / 4,
            },
            {
              x: rect.left + rect.width / 4,
              y: rect.top + rect.height / 2,
            },
            {
              x: 271,
              y: 1033,
            },
          ];

          points.forEach((point) => {
            const clickEvent = new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: true,
              clientX: point.x,
              clientY: point.y,
            });
            element.dispatchEvent(clickEvent);
            console.log(`Clicked point (${point.x}, ${point.y}) `);
          });
        } catch (err) {
          console.error(err);
        }
      }

      clearTimeout(st);
      resolve(true);
    } catch (err) {
      console.error(err);
      clearTimeout(st);
      resolve(false);
    }
  });
})();
