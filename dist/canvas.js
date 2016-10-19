"use strict";
import React from "react"
import ReactDom from "react-dom"

class Canvas extends React.Component{
	constructor (props){
		super(props);
		document.body.style = "padding:0";
		document.getElementById("app").style="font-size:0";
	}
	componentDidMount (){
		//主体思路 纯白色文字  为 255 255 255 0 那么只需要画出不是纯白色的点即可
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let img = document.createElement("Img");
		const PI = Math.PI;
		const Pow = Math.pow;
		const Sqrt = Math.sqrt;
		const Abs = Math.abs;
		const Rand = Math.random;
		//高度 
		const Height = canvas.height = window.innerHeight;
		//宽度
		const Width = canvas.width = window.innerWidth;
		//动画帧数
		const animatePage = 500;
		//动画结束 动画将运行 animatePage * 60/1000
		const animateTime = animatePage*1000/60;
		let flagNum = 0;
		//点集合
		let dotArr = [];
		img.src = "../logo.png";
		img.width = img.height = Math.min(Width,Height)//Math.max(900*(900/Width)*0.8,900*(900/Height)*0.8);
		img.onload = function(){
			ctx.drawImage(img,0,0,img.width,img.height);
			let imgData = ctx.getImageData(0,0,img.width,img.height);
			//获取不同颜色的像素点
			let pxArr = [];
			for(let i = 0; i<imgData.width*imgData.height;i++){
				let obj = {color:"fff"};
				//fff 为字 000为背景
				if(imgData.data[i*4+0]>88||imgData.data[i*4+1]>136||imgData.data[i*4+2]>165){
					obj.color = "000";
				}
				pxArr.push(obj);
			}
			//获取所有的圆心(不包含文字的圆)
			let cArr = [];
			let r = 2;
			let spacing = 2;
			for(let i = 0; i<pxArr.length;i++){
				//x y 坐标
				let cx = Width*Rand()+1;
				let cy = Height*Rand()+1;
				let x = i % imgData.width * (2*r+spacing);
				let y = (parseInt(i/imgData.width)%imgData.height)*(2*r+spacing);
				let style = `rgba(${parseInt(255*Rand()+1)},${parseInt(255*Rand()+1)},${parseInt(255*Rand()+1)},255)`;
				//判断值
				let dotTop = pxArr[(y-r)*imgData.width+x];
				let dotBottom = pxArr[(y+r)*imgData.width+x];
				let dotLeft = pxArr[y*imgData.width+x-r];
				let dotRight = pxArr[y*imgData.width+x+r];
				if(((!dotTop)||dotTop.color!="fff") && ((!dotBottom)||dotBottom.color!="fff") && ((!dotLeft)||dotLeft.color!="fff") &&((!dotRight)||dotRight.color!="fff")  ){
					//满足不含文字的圆 的圆心 将被放入数组中绘制
					if(x>=0&&x<=imgData.width&&y<=imgData.height&&y>=0){
						x = x + (Width-img.width)/2;
						y = y + (Height-img.height)/2;
						let xspeed = (x-cx)/animatePage;
						let yspeed = (y-cy)/animatePage;
						cArr.push({x,y,cx,cy,xspeed,yspeed,r,style});
					}
				}
			}
			animateHSR(cArr);
		}
		function draw(item){
			let {x,y,style,cx,cy,xspeed,yspeed,r} = item;
			ctx.save();
			ctx.fillStyle=style;
			cx = cx+xspeed;
			cy = cy+yspeed;
			ctx.beginPath();
			ctx.arc(cx,cy,r,0,2*PI,true);
			ctx.fill();
			ctx.restore();
			return {...item,cx,cy,xspeed,yspeed};
		}
		function animateHSR(cArr){
			if(flagNum.toFixed(2)==animateTime.toFixed(2)){
				console.log("结束了");
			}else{
				flagNum+=1000/60;
				ctx.clearRect(0,0,Width,Height);
				cArr = cArr.map(item=>draw(item));	
				window.requestAnimationFrame(animateHSR.bind(this,cArr));
			}
		}
	}


	render (){
		return (
			<canvas width={900} style={{background:this.props.canStyle}} height={900} id="canvas"></canvas>
			)
	}
}

ReactDom.render(
	<Canvas canStyle={"#ffffff"}/>,
	document.getElementById("app")
)