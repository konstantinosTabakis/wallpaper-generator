let palettes;

 document.getElementById('download').addEventListener('click',()=>{
    saveImage()
})
document.getElementById('refresh').addEventListener('click',()=>{
    randomize()

})

document.querySelector('.right').addEventListener('click',()=>{
    document.querySelector('.utils').classList.add('open')
})
document.querySelector('.left').addEventListener('click',()=>{
    document.querySelector('.utils').classList.remove('open')
})



fetch('./data/colors3.json')
.then(res=> res.json())
.then(data=>{
    palettes=data
    randomize()
})


function generateRandom(min, max) {
    const difference = max - min;
    return  Math.floor( Math.random() * difference) +min;    
}
function getColors(numberOfColors){
    let colors=[]
    for(let i=0; i< Math.ceil(numberOfColors/4);i++){
        colors= [...colors,...palettes[generateRandom(0,palettes.length)].color]
    }
    return colors
}
 

function randomize(){
    document.querySelector('.shapes-container').innerHTML=''
    document.querySelector('.container').style.background= backgroundColors[generateRandom(0,backgroundColors.length)]
    const numOfShapes= generateRandom(2,15)
    const colors= getColors(numOfShapes)
    for(let i=0; i<numOfShapes;i++){
        let new_el=document.createElement('div')
        let size= generateRandom(50,500)
        new_el.style.width= `${size}px`
        new_el.style.height= `${size}px`
        new_el.style.background= colors[i]
        new_el.style.top= generateRandom(0,100)+'vh'
        new_el.style.left= generateRandom(0,100)+'vw'
        new_el.classList.add('shape')
        shape=shapes[generateRandom(0,shapes.length)]
        for (let key in shape.attributes){
            new_el.style[key]= shape.attributes[key]
        }
        document.querySelector('.shapes-container').appendChild(new_el)

    }
    document.getElementById('path').style.transform= 'skewY('+ generateRandom(0,360)+'deg)'
    document.getElementById('path').style.fill= colors.at(-1) 
}

function saveImage(){
    htmlToImage.toPng(document.querySelector('.container'))
  .then(function (dataUrl) {
    download(dataUrl, 'my_walpaper.png');
  }); 
}

 





