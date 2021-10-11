const s = (sketch) => {
  //要取得多少个不同频率的音量数据
  const BINS = 256;
  //图案里，高频的颜色默认值rgba
  let COLOR_HIGH = [0, 0, 100, 0.8];
  //图案里，中频的颜色默认值rgba
  let COLOR_MID_1 = [0, 0, 100, 0.9];
  let COLOR_MID_2 = [0, 0, 100, 0.9];
  //图案里，低频的颜色默认值rgba
  let COLOR_LOW = [0, 0, 100, 0.9];
  //图案里，时域波的颜色默认值rgba
  let COLOR_TIME = [0, 0, 100, 0.6];
  //存储fft对象
  let fft;
  sketch.setup = () => {
    //取得图片dom并载入
    let imgDom = document.getElementsByClassName("cover")[0];
    sketch.loadImage(imgDom.src, onImgLoaded);
    //要把canvas放到哪个div里面，这个div的宽高要在css里设定好
    let canvasDom = document.querySelector("#sketch");
    //创建画布
    sketch.createCanvas(canvasDom.offsetWidth, canvasDom.offsetHeight);
    //取得AudioContext
    sketch.audioContext_ = sketch.getAudioContext();
    //取得声音dom，注意vue项目里只能有一个audio tag，切换歌曲时只变src
    let audioDom = document.querySelector("audio");
    //根据声音dom创建web audio API source node, 并且连接主输出
    const source = sketch.audioContext_.createMediaElementSource(audioDom);
    source.connect(p5.soundOut);
    //0.8是变化程度，越小图案越抖
    fft = new p5.FFT(0.8, BINS);
    fft.setInput(source);
    sketch.angleMode(sketch.DEGREES);
    sketch.colorMode(sketch.HSB, 360, 100, 100, 1);
    sketch.rectMode(sketch.CENTER);
  };
  //重新载入img
  sketch.reloadImg_ = () => {
    let imgDom = document.getElementsByClassName("cover")[0];
    console.log("reload");
    sketch.loadImage(imgDom.src, onImgLoaded);
  };
  //hsl转换
  sketch.rgb2hsl = (r, g, b) => {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var l = (min + max) / 2;
    var difference = max - min;
    var h, s, l;
    if (max == min) {
      h = 0;
      s = 0;
    } else {
      s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min);
      switch (max) {
        case r:
          h = (g - b) / difference + (g < b ? 6 : 0);
          break;
        case g:
          h = 2.0 + (b - r) / difference;
          break;
        case b:
          h = 4.0 + (r - g) / difference;
          break;
      }
      h = Math.round(h * 60);
    }
    s = Math.round(s * 100); //转换成百分比的形式
    l = Math.round(l * 100);
    return { h, s, l };
  };
  //获取回文数组
  sketch.palindromeArray = (array) => {
    return array.concat(array.slice().reverse());
  };
  sketch.draw = () => {
    sketch.background(0, 0, 100, 0.9);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    //取得不同频率下的音量
    let spectrum = fft.analyze();
    let waveform = fft.waveform();
    //绘制面：中频
    sketch.push();
    sketch.noFill();
    sketch.stroke(COLOR_MID_1);
    let waveArr1 = sketch.palindromeArray(spectrum.slice(8, 64));
    let waveArr2 = sketch.palindromeArray(spectrum.slice(64, 128));
    sketch.beginShape();
    for (let i = 0; i < waveArr1.length; i++) {
      let RADIUS = sketch.map(waveArr1[i], 0, 255, 80, 130);
      let angle = sketch.map(i, 0, waveArr1.length, 0, 360);
      let x = RADIUS * sketch.cos(angle);
      let y = RADIUS * sketch.sin(angle);
      sketch.curveVertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
    sketch.stroke(COLOR_MID_2);
    sketch.beginShape();
    for (let i = 0; i < waveArr2.length; i++) {
      let RADIUS = sketch.map(waveArr2[i], 0, 255, 80, 210);
      let angle = sketch.map(i, 0, waveArr2.length, 0, 360);
      let x = RADIUS * sketch.cos(angle);
      let y = RADIUS * sketch.sin(angle);
      sketch.curveVertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
    //绘制线：高频
    sketch.push();
    sketch.stroke(COLOR_HIGH);
    sketch.strokeWeight(2);
    let tmp = spectrum.slice(128, 256);
    let zeroIndex = tmp.indexOf(0);
    let lineArr = sketch.palindromeArray(
      tmp.slice(0, zeroIndex > 5 ? zeroIndex - 5 : 0)
    );
    for (let i = 0; i < lineArr.length; i++) {
      let line = sketch.map(lineArr[i], 0, 255, 0, 2);
      let radius = sketch.map(lineArr[i], 0, 255, -10, 10);
      sketch.line(0, 230 + radius - line, 0, 230 + radius + line);
      sketch.rotate(360 / lineArr.length);
    }
    sketch.pop();
    //时域波形
    sketch.stroke(COLOR_TIME);
    sketch.noFill();
    sketch.beginShape();
    for (let i = 0; i < waveform.length; i += 4) {
      let RADIUS =
        sketch.map(
          Math.abs(
            (waveform[i] +
              waveform[i + 1] +
              waveform[i + 2] +
              waveform[i + 3]) /
              4
          ),
          0,
          1,
          0,
          190
        ) + 80;
      let angle = sketch.map(i, 0, waveform.length, 0, 360);
      let x = RADIUS * sketch.cos(angle);
      let y = RADIUS * sketch.sin(angle);
      sketch.curveVertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
    //绘制块：低频
    sketch.push();
    sketch.noStroke();
    sketch.fill(COLOR_LOW);
    let blockArr = sketch.palindromeArray(spectrum.slice(0, 8));
    sketch.beginShape();
    for (let i = 0; i < blockArr.length; i++) {
      let RADIUS = sketch.map(blockArr[i], 0, 255, 80, 86);
      let angle = sketch.map(i, 0, blockArr.length, 0, 360);
      let x = RADIUS * sketch.cos(angle);
      let y = RADIUS * sketch.sin(angle);
      sketch.curveVertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  };
  //这个方法是用来处理谷歌浏览器不让自动播放的政策的，用户没给手势AudioContext用不了
  sketch.resumeContext = () => {
    sketch.audioContext_.resume();
  };
  function onImgLoaded(img) {
    img.loadPixels();
    let [color1, color2, color3] = getMainColors(img);
    COLOR_LOW = [color1.h, color1.s, color1.l, 0.9];
    COLOR_MID_1 = [color2.h, color2.s, color2.l, 0.9];
    COLOR_MID_2 = [color3.h, color3.s, color3.l, 0.9];
    COLOR_HIGH = [color1.h, color1.s, color1.l, 0.8];
    COLOR_TIME = [color1.h, color1.s, color1.l, 0.6];
  }

  function getMainColors(img) {
    img.resize(10, 10);
    let classifiedPix = {
      color0: [],
      color1: [],
      color2: [],
      color3: [],
      color4: [],
      color5: [],
      color6: [],
      color7: [],
      color8: [],
      color9: [],
      color10: [],
      color11: [],
      color12: [],
    };
    for (let i = 0; i < 400; i += 4) {
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let hue = getHue(r, g, b);
      classifiedPix["color" + sketch.round(hue / 30)].push(r, g, b);
    }
    let [color1sts, color2nds, color3rds] = Object.values(classifiedPix)
      .sort((a, b) => {
        return b.length - a.length;
      })
      .slice(0, 3);

    function getAverageColor(rgbList) {
      let tmp = { r: 0, g: 0, b: 0 };
      for (let i = 0; i < rgbList.length; i += 3) {
        let r = rgbList[i];
        let g = rgbList[i + 1];
        let b = rgbList[i + 2];
        tmp.r += r;
        tmp.g += g;
        tmp.b += b;
      }
      tmp.r = Math.round(tmp.r / (rgbList.length / 3));
      tmp.g = Math.round(tmp.g / (rgbList.length / 3));
      tmp.b = Math.round(tmp.b / (rgbList.length / 3));
      let hsl = sketch.rgb2hsl(tmp.r, tmp.g, tmp.b);
      console.log(hsl);
      //灰色
      if (hsl.s <= 20) hsl.s += 30;
      //黑色
      if (hsl.l <= 30) hsl.l += 20;
      //白色降低
      if (hsl.l > 90 && hsl.s <= 20) {
        hsl.s += 10;
        hsl.l -= 10;
      }
      //橙色、绿色提亮
      if (hsl.h > 30 && hsl.h < 90) {
        if (hsl.l < 70) {
          hsl.s += 20;
          hsl.l += 30;
        }
      }
      //黄色
      if (hsl.h > 50 && hsl.h < 70) {
        //黄色倾向不明显
        if (hsl.s <= 70) {
          hsl.s = 10;
        } else {
          if (hsl.l < 92) hsl.l = 92;
        }
      }
      //整体
      hsl.s += 10;
      if (hsl.l < 80) hsl.l += 10;
      return hsl;
    }
    return [
      getAverageColor(color1sts),
      getAverageColor(color2nds),
      getAverageColor(color3rds),
    ];
  }
  //根据rgb的数值取得色调
  function getHue(red, green, blue) {
    let min = Math.min(Math.min(red, green), blue);
    let max = Math.max(Math.max(red, green), blue);

    if (min == max) {
      return 0;
    }
    let hue;
    if (max == red) {
      hue = (green - blue) / (max - min);
    } else if (max == green) {
      hue = 2 + (blue - red) / (max - min);
    } else {
      hue = 4 + (red - green) / (max - min);
    }
    hue = hue * 60;
    if (hue < 0) hue += 360;
    return Math.round(hue);
  }
};

export const p5music = () => {
  //sketch是要把canvas放在那个div里的id
  return new p5(s, "sketch");
};
