const s = sketch => {
    //要取得多少个不同频率的音量数据
    const BINS = 512
    //要显示多少个不同频率的音量数据
    const NUM = 90
    //线的最长和最短
    const MIN_LENGTH_LINE = 100
    const MAX_LENGTH_LINE = 200
    //波的最长和最短
    const MIN_LENGTH_WAVE = 100
    const MAX_LENGTH_WAVE = 160
    //块的最长和最短
    const MIN_LENGTH_BLOCK = 100
    const MAX_LENGTH_BLOCK = 140
    const WIDTH_BLOCK = 8
    //浅色程度
    const WHITE = 10
    //图案里，线的颜色默认值rgba
    let COLOR_LINE = [255, 255, 255, 120]
    //图案里，波的颜色默认值rgba
    let COLOR_WAVE = [255, 255, 255, 180]
    //图案里，块的颜色默认值rgba
    let COLOR_BLOCK = [255, 255, 255, 210]
    //存储fft对象
    let fft
    sketch.setup = () => {
        //取得图片dom并载入
        let imgDom = document.getElementsByClassName('cover')[0]
        sketch.loadImage(imgDom.src, onImgLoaded)
        //要把canvas放到哪个div里面，这个div的宽高要在css里设定好
        let canvasDom = document.querySelector('#sketch')
        //创建画布
        sketch.createCanvas(canvasDom.offsetWidth, canvasDom.offsetHeight)
        //取得AudioContext
        sketch.audioContext_ = sketch.getAudioContext()
        //取得声音dom，注意vue项目里只能有一个audio tag，切换歌曲时只变src
        let audioDom = document.querySelector('audio')
        //根据声音dom创建web audio API source node, 并且连接主输出
        const source = sketch.audioContext_.createMediaElementSource(audioDom)
        source.connect(p5.soundOut)
        //0.8是变化程度，越小图案越抖
        fft = new p5.FFT(0.8, BINS)
        fft.setInput(source)
        sketch.angleMode(sketch.DEGREES)
        sketch.colorMode(sketch.RGB)
        sketch.rectMode(sketch.CENTER)
    }
    //重新载入img
    sketch.reloadImg_ = () => {
        let imgDom = document.getElementsByClassName('cover')[0]
        sketch.loadImage(imgDom.src, onImgLoaded)
    }
    sketch.palindromeArray = (array)=>{
        return array.concat(array.slice().reverse())
    }

    sketch.draw = () => {
        sketch.clear()
        sketch.translate(sketch.width / 2, sketch.height / 2)
        //取得不同频率下的音量
        let spectrum = fft.analyze()
        //绘制块：低频
        sketch.push()
        let blockColor = sketch.color(COLOR_BLOCK)
        sketch.noFill()
        sketch.stroke(blockColor)
        sketch.strokeWeight(2)
        let blockArr = sketch.palindromeArray(spectrum.slice(0,18))
        for (let i = 0; i < blockArr.length; i++) {
            let LENGTH = sketch.map(blockArr[i], 0, 255, MIN_LENGTH_BLOCK, MAX_LENGTH_BLOCK)
            sketch.rect(0, LENGTH/2, WIDTH_BLOCK,LENGTH)
            sketch.rotate(10)
        }
        sketch.pop()
        //绘制面：中频
        sketch.push()
        sketch.noFill()
        let waveColor = sketch.color(COLOR_WAVE)
        sketch.stroke(waveColor)
        let waveArr1 = sketch.palindromeArray(spectrum.slice(16,72))
        let waveArr2 = sketch.palindromeArray(spectrum.slice(72,128))
        sketch.beginShape()
        for (let i = 0; i < waveArr1.length; i++) {
            let RADIUS = sketch.map(waveArr1[i], 0, 255, MIN_LENGTH_WAVE, MAX_LENGTH_WAVE)
            let angle = sketch.map(i, 0, waveArr1.length, 0, 360)
            let x = RADIUS * sketch.cos(angle)
            let y = RADIUS * sketch.sin(angle)
            sketch.curveVertex(x, y)
        }
        sketch.endShape(sketch.CLOSE)
        sketch.beginShape()
        for (let i = 0; i < waveArr2.length; i++) {
            let RADIUS = sketch.map(waveArr2[i], 0, 255, MIN_LENGTH_WAVE, MAX_LENGTH_WAVE)
            let angle = sketch.map(i, 0, waveArr2.length, 0, 360)
            let x = RADIUS * sketch.cos(angle)
            let y = RADIUS * sketch.sin(angle)
            sketch.curveVertex(x, y)
        }
        sketch.endShape(sketch.CLOSE)
        sketch.pop()
        //绘制线：高频
        sketch.push()
        let lineColor = sketch.color(COLOR_LINE)
        sketch.stroke(lineColor)
        sketch.strokeWeight(1)
        let lineArr = sketch.palindromeArray(spectrum.slice(128,256))
        for (let i = 0; i < lineArr.length; i++) {
            let LINE = sketch.map(lineArr[i], 0, 255, MIN_LENGTH_LINE, MAX_LENGTH_LINE)
            sketch.line(0,0,0,LINE)
            sketch.rotate(11)
        }
        sketch.pop()
    }
    //这个方法是用来处理谷歌浏览器不让自动播放的政策的，用户没给手势AudioContext用不了
    sketch.resumeContext = () => {
        sketch.audioContext_.resume()
    }
    function onImgLoaded(img) {
        img.loadPixels()
        let [waveColor,blockColor,lineColor] = getMainColors(img)
        COLOR_BLOCK = [blockColor.r,blockColor.g,blockColor.b,60]
        COLOR_WAVE = [waveColor.r,waveColor.g,waveColor.b,120]
        COLOR_LINE = [lineColor.r,lineColor.g,lineColor.b,30]
        console.log(COLOR_BLOCK)
        console.log(COLOR_WAVE)
        console.log(COLOR_LINE)
    }

    function getMainColors(img) {
        img.resize(10, 10)
        let classifiedPix = {
            color0: [],
            color1: [],
            color2: [],
            color3: [],
            color4: [],
            color5: [],
            color6: []
        }
        for (let i = 0; i < 400; i += 4) {
            let r = img.pixels[i]
            let g = img.pixels[i + 1]
            let b = img.pixels[i + 2]
            let hue = getHue(r, g, b)
            classifiedPix['color' + sketch.round(hue / 60)].push(r, g, b)
        }
        let [color1sts, color2nds, color3rds] = Object.values(classifiedPix).sort((a, b) => { return b.length - a.length }).slice(0, 3)

        function getAverageColor(rgbList) {
            let tmp = { r: 0, g: 0, b: 0 }
            for (let i = 0; i < rgbList.length; i += 3) {
                let r = rgbList[i]
                let g = rgbList[i + 1]
                let b = rgbList[i + 2]
                tmp.r += r
                tmp.g += g
                tmp.b += b
            }
            tmp.r = Math.round(tmp.r / (rgbList.length/3))
            tmp.g = Math.round(tmp.g / (rgbList.length/3))
            tmp.b = Math.round(tmp.b / (rgbList.length/3))
            return tmp
        }
        return [getAverageColor(color1sts), getAverageColor(color2nds), getAverageColor(color3rds)]
    }
    //根据rgb的数值取得色调，也就是hsv里的h
    function getHue(red, green, blue) {
        let min = Math.min(Math.min(red, green), blue)
        let max = Math.max(Math.max(red, green), blue)

        if (min == max) {
            return 0
        }
        let hue
        if (max == red) {
            hue = (green - blue) / (max - min)
        } else if (max == green) {
            hue = 2 + (blue - red) / (max - min)
        } else {
            hue = 4 + (red - green) / (max - min)
        }
        hue = hue * 60
        if (hue < 0) hue += 360
        return Math.round(hue)
    }
}

export const p5music = () => {
    //sketch是要把canvas放在那个div里的id
    return new p5(s, 'sketch')
}