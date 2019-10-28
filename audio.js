// 获取歌曲名字标签 h1  querySelectorAll("h1") 获取所有的h1标签 获取数组
var h1 = document.querySelectorAll("h1")[0]

// 获取h2标签   
var  h2 = document.querySelectorAll("h2")[0]

// 获取audio标签
var audio = document.querySelector("audio")

// 获取main 标签
var main = document.querySelector("main")

// 获取音乐播放进度 progress标签
var musicProgress = document.querySelectorAll('progress')[0]

// 获取音量progress标签
var volumeProgress = document.querySelectorAll('progress')[1]

// 获取时间标签
var time = document.querySelector('time')

// 当前播放的歌曲
var current = 0

// 初始化音量大小
audio.volume = 0.5

// 更新时间的方法
function upDatatime(){
    //    时间进度条值 = 当前已经播放的时间/总时间
    // musicProgress.value  当前进度条的进度 0-1
    // audio.currentTime  从开始到目前已经播放的时间
    // audio.duration  audio总时间
    musicProgress.value = audio.currentTime / audio.duration;

    // audio.currentTime  123s 00:00   02:03    获取秒 向上求整
    var seconds = Math.ceil(audio.currentTime) % 60;

    // 获取分钟：floor 向下求证
    var mins = Math.floor(audio.currentTime / 60);

    // 三元运算符  如果seconds 小于10 在秒前面加一个0，
    // if(seconds<10)
    // {
    //     seconds = "0"+seconds
    // }
    seconds = seconds<10?('0'+seconds):seconds

    // 给标签添加一个文本内容
    time.textContent = mins + ":"+ seconds;
}

// 更新音量进度条的进度
function upDataVolume(){
    // volumeProgress.value 进度条进度
    // audio.volume  声音的大小0-1
    volumeProgress.value = audio.volume;
}

// 暂停 或继续的功能
 function  pauseOrContinue(){
    //  如果音频暂停了
     if(audio.paused){
        //  播放音频
        audio.play();

        // 暂停按钮图标变成
        // document.getElementsByClassName('glyphicon-play')[0] 找到暂停span标签
        document.getElementsByClassName('glyphicon-play')[0]. className = "glyphicon glyphicon-pause";

     }else{
        //  暂停方法
        audio.pause();
        document.getElementsByClassName('glyphicon-pause')[0].className = "glyphicon glyphicon-play";
     }
 }

//  上一首
function pre(){
    current--;
    // 播放
    start()
}

// 下一首
function next(){
    current++;
    // 播放
    start()
}

// 声音升高
function volumeUp(){
    // 如果音量小于1的时候 每点击一次 音量加0.1
     if(audio.volume<1){
         audio.volume += 0.1
     }
}

// 声音降低
function volumeDown(){
    if (audio.volume>0){
        audio.volume -= 0.1
    }
}
// item 代表一首歌 playList[0]  playList[1]
function play(item){
    //  播放音频
    // audio.src  设置音频的资源路径
    audio.src = item.src;

    // 给h1 h2 赋值
    h1.innerHTML = item.name;
    h2.innerHTML = item.singer;

    // 修改背景图片
    main.style.backgroundImage ="url("+ item.pic+")";

    // 添加动画名字
    main.style.animationName = 'slideBg';

    // 延迟一段时间播放下一首歌曲
    setTimeout(function(){
        main.style.animationName = '';

    }, 500);

    // 播放
    audio.play();

    // 把继续图标  改成暂停的图标
    //document.getElementsByClassName('glyphicon-play')[0]. className = "glyphicon  glyphicon-pause";

}

// 开始播放
function start(){
    if(current>= playList.length) current = 0
    if(current<0) current = playList.length-1;
    var item = playList[current]
    if(item){
        play(item)
    }
}
   
// ended 如果一首歌播放结束 调用next方法``````````
  audio.addEventListener("ended",next)
//   timeupdate 当我们时间变化时候 调用upDatatime方法
  audio.addEventListener("timeupdate",upDatatime)

//   volumechange 音量发生变化的时候 调用upDataVolume
  audio.addEventListener("volumechange",upDataVolume)


start();