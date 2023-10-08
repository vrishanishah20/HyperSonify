const WIDTH = 200;
const HEIGHT = 200;

const layer4Sketch = (p5) => {
  let progress = 0;
  let img;
  let pixelDensity = null;
  let selectedImage = 1;
  let prevSelected = null;
  let images = [null];

  // Get the RGBA values of the pixel at (x, y)
  const getRGBA = (x, y, pixels) => {
    const off = (y * pixelDensity * WIDTH + x) * pixelDensity * 4;
    return [pixels[off], pixels[off + 1], pixels[off + 2], pixels[off + 3]];
  };

  p5.preload = () => {
    for (let i = 1; i <= 6; i++) {
      images[i] = p5.loadImage(`assets/${i}/images/4.png`);
    }
  };

  p5.setup = () => {
    p5.createCanvas(WIDTH, HEIGHT);
    pixelDensity = p5.pixelDensity();
  };

  p5.updateWithProps = (props) => {
    progress = props.progress;
    selectedImage = props.selectedImage;
  };

  p5.draw = () => {
    if (prevSelected !== selectedImage) {
      img = images[selectedImage];
      p5.image(img, 0, 0, WIDTH, HEIGHT, 0, 0, img.width, img.height);
      p5.loadPixels();
      prevSelected = selectedImage;
    }
    p5.image(img, 0, 0, WIDTH, HEIGHT, 0, 0, img.width, img.height);

    p5.stroke(255, 80);
    p5.strokeWeight(2);

    // Iterate over one column of the image, and plot its position vs brightness graph

    p5.fill(200, 100);
    p5.beginShape();
    p5.curveVertex((progress * WIDTH) / 100, 0);
    p5.curveVertex((progress * WIDTH) / 100, 0);

    const curveHeight = 40;
    for (let y = 0; y < HEIGHT; y++) {
      const [val, ..._] = getRGBA(
        Math.floor((progress / 100) * WIDTH),
        y,
        p5.pixels
      );

      p5.curveVertex((progress / 100) * WIDTH + (val / 255) * curveHeight, y);
    }
    p5.curveVertex((progress * WIDTH) / 100, HEIGHT);
    p5.curveVertex((progress * WIDTH) / 100, HEIGHT);
    p5.endShape();

    p5.noStroke();

    p5.fill(61, 133, 198, 60);
    p5.rect(0, 0, WIDTH, HEIGHT);
  };
};

export default layer4Sketch;
