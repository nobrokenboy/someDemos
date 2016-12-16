/**
 * Created by Vinse on 2016/9/22.
 */
/**
 * Created by Vinse on 2016/9/20.
 */
Array.prototype.remove=function(obj){
    for(var i =0;i <this.length;i++){
        var temp = this[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <this.length;j++){
                this[j]=this[j+1];
            }
            this.length = this.length-1;
        }
    }
}
function gameStart(args){
    var _isType = function(type, obj) {
        var _class = Object.prototype.toString.call(obj).slice(8, -1);
        return obj !== undefined && obj !== null && _class === type;
    };
    var _deepExtend = function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj)
                continue;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (_isType('Object', obj[key]) && obj[key] !== null)
                        _deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    };
    var height = document.body.scrollHeight,width = document.body.scrollWidth;
    var config = {
        root:"img/",
        fps:30,
        gameTime:10,
        waitTime:3,
        fontFamily:"Impact",
        bg:"bg.jpg",
        menu:"menu.png",
        menuBtn:"menu-btn.png",
        hero:["orange.png","red.png","green.png","boom.png"],
        bang:"bang.png",
        readyFrame:"frame.png",
        overWrap:"over-wrapper.png",
        overBtn:"gameover.png",
        reStartBtn:"gamestart.png",
        onOver:function() {}
    };
    _deepExtend(config, args);
    config.bg = config.root+config.bg;
    config.menu = config.root+config.menu;
    config.menuBtn = config.root+config.menuBtn;
    config.hero= [config.root+"orange.png",config.root+"red.png",config.root+"green.png",config.root+"boom.png"];
    config.bang = config.root+config.bang;
    config.readyFrame = config.root+config.readyFrame;
    config.overWrap = config.root+config.overWrap;
    config.overBtn = config.root+config.overBtn;
    config.reStartBtn = config.root+config.reStartBtn;
//英雄的种族
    var isStop = false;
    var HeroRace =[
        {
            name:"普通橙子",
            image: config.hero[0],
            width:120,
            score:10,
            speed:10,
            rate:30,
            textFill:"#ff8000"
        },
        {
            name:"红色橙子",
            image: config.hero[1],
            width:100,
            score:20,
            speed:15,
            rate:20,
            textFill:"#cd00da"
        },
        {
            name:"绿色橙子",
            image: config.hero[2],
            width:110,
            score:30,
            speed:25,
            rate:10,
            textFill:"#00dc05"
        },
        {
            name:"炸弹",
            image: config.hero[3],
            width:120,
            score:-15,
            speed:13,
            rate:20,
            textFill:"#da0000"
        }
    ]
    var canvas = oCanvas.create({
        canvas: "#canvas",
        fps: config.fps,
        disableScrolling:true
    });
    canvas.height = height;
    canvas.width = width;



//介绍页
startup();
function startup(){
  var menu = canvas.display.image({
    x:canvas.width/2,
    y:canvas.height/2-25,
  	origin: { x: "center", y: "center" },
  	image: config.menu
  });
  var btn = canvas.display.image({
    x:canvas.width/2,
    y:canvas.height/2+130,
  	origin: { x: "center", y: "center" },
  	image: config.menuBtn
  });
  btn.bind("click tap", function () {
      ready();
  });
  canvas.addChild(menu);
  canvas.addChild(btn);
  canvas.canvas.canvas.style.backgroundImage = 'url('+config.bg+')';
}



//准备开始
    function ready(){
        canvas.reset();
        var bg = canvas.display.rectangle({
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
            fill: "rgba(0,0,0,0.8)"
        });
        var frame = canvas.display.image({
            x:canvas.width/2-100,
            y:canvas.height/2-100,
            width:200,
            height:200,
            image:config.readyFrame
        });
        var readyText = canvas.display.text({
            x:canvas.width/2,
            y:canvas.height/2-45,
            origin: { x: "center", y: "top" },
            font: "100px "+config.fontFamily+"",
            text: config.waitTime,
            fill: "#ff8000",
        });
        var interval = setInterval(function(){
            var count = parseInt(readyText.text);
            if(count == 1){
                readyText.text = "GO";
                canvas.draw.redraw();
                clearInterval(interval)
                start()
                return;
            };
            readyText.text = count-1;
            canvas.draw.redraw();
        },1000);
        canvas.addChild(bg);
        canvas.addChild(frame);
        canvas.addChild(readyText);
    }
//随机按几率获取一个英雄
    function isShow(odds){
        var num = parseInt(Math.random()*100);
        if(num < odds){
            return true;
        }else {
            return false;
        };
    }
    function GetHero(){
        var hero = HeroRace[Math.floor((Math.random()*HeroRace.length))];
        hero.x = Math.round(Math.random()*canvas.width);
        hero.y = Math.round(Math.random()*80);
        hero.origin = { x: "center", y: "center" };
        hero.drag = false;
        return hero;
    }
//开始游戏
    function start (){
        isStop = false;
        canvas = oCanvas.create({
            canvas: "#canvas",
            fps: config.fps,
            disableScrolling:true
        });
        var score = 0;
        var scoreTitle= canvas.display.text({
            x: 100,
            y: 50,
            origin: { x: "center", y: "top" },
            font: "bold 32px "+config.fontFamily+"",
            text: "SCORE :",
            fill: "#0aa",
            zIndex:100,
        });
        var scoreText= canvas.display.text({
            x: 175,
            y: 38,
            origin: { x: "left", y: "top" },
            font: "bold 48px "+config.fontFamily+"",
            text: score,
            fill: "#0aa",
            zIndex:100,
        });
        var timer = canvas.display.text({
            x: canvas.width - 90,
            y: 38,
            origin: { x: "left", y: "top" },
            font: "bold 48px "+config.fontFamily+"",
            text: config.gameTime,
            fill: "#0aa",
            zIndex:100,
        });
        var CountDown = setInterval(function(){
            timer.text = parseInt(timer.text)-1;
            if (timer.text ==1){
                isStop = true;
            }
            if(!timer.text){
                window.clearInterval(CountDown);
                over(score);
            }
        },1000);
        canvas.addChild(scoreTitle);
        canvas.addChild(scoreText);
        canvas.addChild(timer);

        var heros = [];
        canvas.setLoop(function () {
            var heroAttr = GetHero();
            if(isShow(heroAttr.rate)&&!isStop){
                var hero =canvas.display.image(heroAttr);
                hero.dragAndDrop({
                    start:function(){
                        this.drag = true;
                    },
                    end: function () {
                        score += this.score;
                        if(score<0){score = 0;}
                        //设置加多少分
                        scoreText.text = score;
                        //爆炸
                        if(this.score<0){
                            var boom = this;
                            var bang = canvas.display.image({
                                x:boom.x-50,
                                y:boom.y-50,
                                width:50,
                                image:config.bang
                            })
                            var point = canvas.display.text({
                                x:boom.x,
                                y:boom.y,
                                origin: { x: "center", y: "center" },
                                font: "bold 66px "+config.fontFamily+"",
                                text:boom.score,
                                fill: boom.textFill,
                            })
                            canvas.addChild(bang);
                            canvas.addChild(point);
                            canvas.removeChild(boom);
                            //爆炸动画
                            bang.animate({
                                width:220,
                                height:225,
                                opacity:0,
                            },{
                                duration: 500,
                                easing: "linear",
                                callback: function () {
                                    canvas.removeChild(bang);
                                }
                            });
                            //字的动画
                            point.animate({
                                x:this.x+20,
                                y: this.y-20,
                                opacity:0,
                            },{
                                duration: 500,
                                easing: "linear",
                                callback: function () {
                                    canvas.removeChild(bang);
                                }
                            });
                        }
                        //加分
                        else {
                            var orange = this;
                            var point = canvas.display.text({
                                x:orange.x,
                                y:orange.y,
                                origin: { x: "center", y: "center" },
                                font: "bold 66px "+config.fontFamily+"",
                                text:"+"+orange.score+"",
                                fill: orange.textFill,
                            })
                            canvas.addChild(point);
                            //加分那行字
                            point.animate({
                                x:this.x+20,
                                y: this.y-20,
                                opacity:0,
                            },{
                                duration: 500,
                                easing: "linear",
                                callback: function () {
                                    canvas.removeChild(point);
                                }
                            });
                            //自身变小
                            this.animate({
                                width: this.width/1.8,
                                height:this.height/1.8,
                                opacity:0,
                            }, {
                                duration: 200,
                                easing: "linear",
                                callback: function () {
                                    canvas.removeChild(this);
                                }
                            });
                        }

                    }
                })
                canvas.addChild(hero);
                heros.push(hero);
            }
            //下落的动画,记住数组那些要删掉
            for(var i=0;i<heros.length;i++){
                if(!heros[i].drag){
                    heros[i].rotation += 10;
                    heros[i].y += heros[i].speed;
                    //到底了
                    if(heros[i].y > canvas.height - parseInt(heros[i].width/2)){
                        canvas.removeChild(heros[i]);
                        heros[i] = '';
                    }
                }
            }
            //删除数组那些逝去的英雄们
            for(var i = 0;i<heros.length;i++){
                if (heros[i] == ''){
                    heros.remove(i);
                }
            }

        }).start();
    }
//游戏结束
    function over(score){
        var overlay = canvas.display.rectangle({
            x: 0,
            y: 0,
            opacity: 0,
            width: canvas.width,
            height: canvas.height,
            fill: "rgba(0, 0, 0, 0.5)",
            stroke: "inside 10px rgba(0, 0, 0, 0.5)"
        });
        var wrapper = canvas.display.image({
            x:canvas.width/2,
            y:-200,
            width:680,
            height:450,
            origin: { x: "center", y: "center" },
            image: config.overWrap
        });
        var btnOver = canvas.display.image({
            x:20,
            y:105,
            origin: { x: "left", y: "center" },
            image:config.overBtn,
        });
        var btnRestart = canvas.display.image({
            x:-20,
            y:105,
            origin: { x: "right", y: "center" },
            image:config.reStartBtn,
        });
        btnOver.bind("click tap", function () {
            config.onClose(score);
        });
        btnRestart.bind("click tap", function () {
            ready();
        });
        canvas.addChild(overlay);
        canvas.addChild(wrapper);
        wrapper.addChild(btnOver);
        wrapper.addChild(btnRestart);
        overlay.fadeIn(500,"linear",function () {
            canvas.timeline.stop();
        })
        wrapper.animate({
            y: canvas.height/2.2,
        },{
            duration: 500,
            easing: "linear"
        });

    }
}
