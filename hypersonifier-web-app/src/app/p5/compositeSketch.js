const WIDTH = 400;
const HEIGHT = 400;

const compositeSketch = (p5) => {
  let progress = 0;
  let img;
  let pixelDensity = null;
  let images = [null];
  let currentLayers = [];
  let selectedImage = null;
  let prevSelected = null;

  // Get the RGBA values of the pixel at (x, y)
  const getRGBA = (x, y, pixels) => {
    const off = (y * pixelDensity * WIDTH + x) * pixelDensity * 4;
    return [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
  };

  p5.preload = () => {
    for (let i = 1; i <= 6; i++) {
      const layers = [];
      for (let j = 1; j <= 4; j++) {
        layers[j] = p5.loadImage(`assets/${i}/images/${j}.png`);
      }
      images[i] = layers;
    }
    console.log(images);
  };

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    // p5.image(img, 0, 0, WIDTH, HEIGHT, 0, 0, img.width, img.height);

    // p5.loadPixels();
    pixelDensity = p5.pixelDensity();
  };

  p5.updateWithProps = (props) => {
    progress = props.progress;
    selectedImage = props.selectedImage;
  };

  p5.draw = () => {
    if (prevSelected !== selectedImage) {
      currentLayers = images[selectedImage];
      for (let i = 4; i >= 1; i--) {
        // p5.tint(255, 60);
        p5.image(
          currentLayers[i],
          0,
          0,
          WIDTH,
          HEIGHT,
          0,
          0,
          currentLayers[i].width,
          currentLayers[i].height
        );
      }

      p5.loadPixels();
      prevSelected = selectedImage;
    }
    currentLayers = images[selectedImage];
    for (let i = 4; i >= 1; i--) {
      p5.tint(255, 128);
      p5.image(
        currentLayers[i],
        0,
        0,
        WIDTH,
        HEIGHT,
        0,
        0,
        currentLayers[i].width,
        currentLayers[i].height
      );
    }
    p5.stroke(255, 80);
    p5.strokeWeight(2);

    // p5.line((progress * WIDTH) / 100, 0, (progress * WIDTH) / 100, HEIGHT);

    // Iterate over one column of the image, and plot its position vs brightness graph

    p5.fill(200, 100);
    p5.beginShape();
    p5.curveVertex((progress * WIDTH) / 100, 0);
    p5.curveVertex((progress * WIDTH) / 100, 0);

    const curveHeight = 50;
    for (let y = 0; y < HEIGHT; y++) {
      const [s, f, val, ..._] = getRGBA(
        Math.floor((progress / 100) * WIDTH),
        y,
        p5.pixels
      );

      p5.curveVertex((progress / 100) * WIDTH + (val / 255) * curveHeight, y);
    }
    p5.curveVertex((progress * WIDTH) / 100, HEIGHT);
    p5.curveVertex((progress * WIDTH) / 100, HEIGHT);
    p5.endShape();
  };
};

export default compositeSketch;
