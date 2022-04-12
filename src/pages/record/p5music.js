const s = (sketch) => {
  const BINS = 64;
  const CELL_SIZE = BINS * 2;
  const CELL_PADDING = 15;
  const CELL_BORDER = CELL_SIZE + CELL_PADDING * 2;
  let fft, amplitude;
  let rowIndex = 1,
    columnIndex = 1;
  let rowNum = 5,
    columnNum = 3;
  let drawCount = 0;

  sketch.setup = () => {
    sketch.createCanvas(800, 600);
    sketch.audioContext_ = sketch.getAudioContext();
    let audioDom = document.querySelector("#audioRecord");
    const source = sketch.audioContext_.createMediaElementSource(audioDom);
    source.connect(p5.soundOut);
    fft = new p5.FFT(0.8, BINS);
    amplitude = new p5.Amplitude();
    fft.setInput(source);
    sketch.angleMode(sketch.DEGREES);
    sketch.colorMode(sketch.HSB, 360, 100, 100, 1);
    sketch.rectMode(sketch.CENTER);
  };
  sketch.testPosition = () => {
    if (drawCount > 360) {
      drawCount = 0;
      rowIndex++;

      if (rowIndex > rowNum) {
        rowIndex = 1;
        columnIndex++;
      }

      if (columnIndex > columnNum) {
        columnIndex = 1;
      }
    }
  };
  sketch.draw = () => {
    const spectrum = fft.analyze();
    if (spectrum.every((i) => i == 0)) {
      return;
    }
    const zeroIndex = spectrum.indexOf(0);
    const arr = spectrum.slice(0, zeroIndex);

    const level = amplitude.getLevel();
    const h = sketch.map(level, 0, 1, 190, 360);
    const s = sketch.map(level, 0, 1, 10, 100);

    drawCount++;
    sketch.testPosition();
    sketch.background(0, 0, 100, 0.008);
    sketch.strokeWeight(1);
    sketch.translate(
      (rowIndex - 1) * CELL_BORDER + CELL_BORDER / 2,
      (columnIndex - 1) * CELL_BORDER + CELL_BORDER / 2
    );
    sketch.push();
    const n = arr.length;
    for (let i = 1; i <= n; i++) {
      const weight = sketch.map(arr[i], 0, 255, 100, 0);
      const radius = n - i;
      const x = radius * sketch.cos(drawCount);
      const y = radius * sketch.sin(drawCount);
      sketch.stroke(h, s, weight, 0.4);
      sketch.point(x, y);
    }
    sketch.pop();
  };
  sketch.resumeContext = () => {
    sketch.audioContext_.resume();
  };
};

export const p5music = () => {
  return new p5(s, "sketchRecord");
};
