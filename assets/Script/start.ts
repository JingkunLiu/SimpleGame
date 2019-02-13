// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import { loadJsonConfig } from "./utils";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Start extends cc.Component {

  // LIFE-CYCLE CALLBACKS:
  @property(cc.Sprite)
  display: cc.Sprite = null;

  //closeBtn
  @property(cc.Button)
  closeBtn: cc.Button = null;

  //closeBtn
  @property(cc.Button)
  startBtn: cc.Button = null;

  //qunBtn
  @property(cc.Button)
  qunBtn: cc.Button = null;

  //scoreLabel
  @property(cc.Label)
  scoreLabel: cc.Label = null;

  //子域
  tex = null;

  //是否在看排行榜
  isRank = false;

  @property(cc.Sprite)
  steering: cc.Sprite = null;

  //小汽车
  @property(cc.Sprite)
  car: cc.Sprite = null;

  //小汽车动画
  @property(cc.Animation)
  anmiat: cc.Animation = null;

  actionB: cc.Action = null;

  @property(cc.Sprite)
  bgcolor: cc.Sprite = null;

  @property(cc.Prefab)
  road1: cc.Prefab = null;

  @property(cc.Prefab)
  road2: cc.Prefab = null;

  @property(cc.Sprite)
  tips: cc.Sprite = null;

  @property(cc.Prefab)
  road3_1: cc.Prefab = null;

  @property(cc.Prefab)
  road3_2: cc.Prefab = null;

  @property(cc.Prefab)
  road3_3: cc.Prefab = null;

  @property(cc.Prefab)
  road4_1: cc.Prefab = null;

  @property(cc.Prefab)
  road4_2: cc.Prefab = null;

  @property(cc.Prefab)
  road4_3: cc.Prefab = null;

  @property(cc.Prefab)
  road5_1: cc.Prefab = null;

  @property(cc.Prefab)
  road5_3: cc.Prefab = null;

  @property(cc.Prefab)
  road5_2: cc.Prefab = null;

  @property(cc.Prefab)
  road6_1: cc.Prefab = null;

  @property(cc.Prefab)
  road6_2: cc.Prefab = null;

  @property(cc.Prefab)
  road6_3: cc.Prefab = null;

  @property(cc.Node)
  road: cc.Node = null;

  // 设置声音
  @property(cc.Sprite)
  voice: cc.Sprite = null;

  // 同意拒绝
  @property(cc.Button)
  agreeBtn: cc.Button = null;

  // 打开排行榜
  @property(cc.Button)
  btnRank: cc.Button = null;

  //分数
  score: number = 0;

  //记录是否可以加分 分数0.5秒加1
  isAddScore = null;

  //是否同意
  isAgree = null;

  //小车的速度，也就是道路的速度
  speed: number = 0;

  //上一条路的记录，通过roadArr来判断下一条路是那几条
  preRoad = null;

  //记录道路已经创建到什么位置了，下一条从这里开始
  roadx: number = 0;
  roady: number = 0;

  //用来存储 road之间衔接关系的
  roadArr = null;

  //所有配色方案
  allColor = null;

  //当前使用的配色方案
  thisColor = null;

  //清除道路的tag
  deleteTag = null;

  //创建道路的tag
  createTag = null;

  //道路挪动定时器
  moveRoad = null;

  //当前道路的高度
  RoadHeight = 0;

  //道路对象池
  pool_r1 = null;
  pool_r2 = null;
  pool_r3_1 = null;
  pool_r3_2 = null;
  pool_r3_3 = null;
  pool_r4_1 = null;
  pool_r4_2 = null;
  pool_r4_3 = null;
  pool_r5_1 = null;
  pool_r5_2 = null;
  pool_r5_3 = null;
  pool_r6_1 = null;
  pool_r6_2 = null;
  pool_r6_3 = null;

  //道路和速度的放大倍速
  roadScale = null;

  isOver = true;

  hangData = null;
  //分享数据
  shareData = null;

  runTimeOnShow(options) {
    if (!Partner.isWeChat()) {
      return;
    }

    var self = this;
    const mess = options.query;
    if (mess.typpe == 2 || mess.typpe == '2') {
      console.log(cc.sys.localStorage.getItem('scene'));
      if (cc.sys.localStorage.getItem('scene') == 'start') {
        const message: any = {};
        message.message = 'showRank3';
        message.shareTicket = options.shareTicket;
        Partner.postMessage(message);
        self.changeRank(true);
        self.closeBtn.node.active = true;
        self.qunBtn.node.active = true;
        self.startBtn.node.active = false;
      }
    }
  };
  async onLoad() {
    var self = this;
    this.tex = new cc.Texture2D();
    await self.initLoad();
    cc.sys.localStorage.setItem('scene', 'start');
    //如果是微信平台
    if (Partner.isWeChat()) {
      Partner.onShow(
        function (options) {
          self.runTimeOnShow(options);
        }
      )
       
      // const windowHeight = Partner.getSysInfo().windowHeight;
      // self.voice.node.setPositionY(cc.view.getVisibleSize().height/2-50);
      Partner.showShareMenu({ withShareTicket: true });
      Partner.onShareAppMessage(function () {
        var random = Math.round(Math.random() * (self.shareData.length - 1));
        return {
          title: self.shareData[random].text,
          imageUrl: self.shareData[random].pic,
          query: 'typpe=1'
        }
      });
    }
    self.isVoice();
    self.isAgree = true;
    this.hangData = [];
    this.closeBtn.node.on('click', this.hiddenAll, this);
    this.startBtn.node.on('click', this.startGame, this);
    this.voice.node.on('touchstart', this.voiceTouch, this);
    this.agreeBtn.node.on('click', this.agreeEvent, this);
    this.btnRank.node.on('click', this.showRank, this);
    this.qunBtn.node.on('click', this.shareEvent, this);
   
    this.thisColor = Math.round(Math.random() * (this.allColor.length - 1));
    this.roadx = 0;
    this.roady = -600 * this.roadScale;

    for (var i = 0; i < 10; i++) {
      this.createRoadTong(0,this.pool_r1,this.road1,0,50,0,50,100,0,0);
    }
    this.preRoad = {
      road: 1,
      type: 0
    }
    for (var i = 0; i < 30; i++) {
      self.createRoadAll();
    }
    this.isOver = false;
  }
  async initLoad() {
    this.roadScale = 1.3;
    this.speed = 3.5 * this.roadScale;
    this.roadArr = await loadJsonConfig("road");
    this.allColor = await loadJsonConfig("color");
    this.shareData = await loadJsonConfig("share");
    this.RoadHeight = 0;
    this.isAddScore = 0;
    this.pool_r1 = new cc.NodePool();
    this.pool_r2 = new cc.NodePool();
    this.pool_r3_1 = new cc.NodePool();
    this.pool_r3_2 = new cc.NodePool();
    this.pool_r3_3 = new cc.NodePool();
    this.pool_r4_1 = new cc.NodePool();
    this.pool_r4_2 = new cc.NodePool();
    this.pool_r4_3 = new cc.NodePool();
    this.pool_r5_1 = new cc.NodePool();
    this.pool_r5_2 = new cc.NodePool();
    this.pool_r5_3 = new cc.NodePool();
    this.pool_r6_1 = new cc.NodePool();
    this.pool_r6_2 = new cc.NodePool();
    this.pool_r6_3 = new cc.NodePool();
    for (var i = 0; i <= 15; i++) {
      if (i <= 5) {
        var road2 = cc.instantiate(this.road2);
        this.pool_r2.put(road2);
        var road3_1 = cc.instantiate(this.road3_1);
        this.pool_r3_1.put(road3_1);
        var road3_2 = cc.instantiate(this.road3_2);
        this.pool_r3_2.put(road3_2);
        var road3_3 = cc.instantiate(this.road3_3);
        this.pool_r3_3.put(road3_3);
        var road4_1 = cc.instantiate(this.road4_1);
        this.pool_r4_1.put(road4_1);
        var road4_2 = cc.instantiate(this.road4_2);
        this.pool_r4_2.put(road4_2);
        var road4_3 = cc.instantiate(this.road4_3);
        this.pool_r4_3.put(road4_3);
        var road5_1 = cc.instantiate(this.road5_1);
        this.pool_r5_1.put(road5_1);
        var road5_2 = cc.instantiate(this.road5_2);
        this.pool_r5_2.put(road5_2);
        var road5_3 = cc.instantiate(this.road5_3);
        this.pool_r5_3.put(road5_3);
        var road6_1 = cc.instantiate(this.road6_1);
        this.pool_r6_1.put(road6_1);
        var road6_2 = cc.instantiate(this.road6_2);
        this.pool_r6_2.put(road6_2);
        var road6_3 = cc.instantiate(this.road6_3);
        this.pool_r6_3.put(road6_3);
      }
      var road1 = cc.instantiate(this.road1);
      this.pool_r1.put(road1);
    }
  }
  //展示排行榜
  showRank(){
    const self = this;
    const message: any = {};
    message.message = 'showRank2';
    Partner.postMessage(message);
    self.changeRank(true);
    self.closeBtn.node.active = true;
    self.qunBtn.node.active = true;
    self.startBtn.node.active = false;
  }
  //判断音乐是否播放
  isVoice(){
    var self = this;
    if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
      //暂停播放
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });
    } else {
      //开始播放
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice1.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });
    }
  }
  //分享
  shareEvent(){
    const options: any = {};
    var random = Math.round(Math.random() * (this.shareData.length - 1));
    options.title = this.shareData[random].text;
    options.imageUrl = this.shareData[random].pic;
    options.query = 'typpe=2';
    Partner.shareAppMessage(options);
  }
  //切换音乐是否播放
  voiceTouch() {
    var self = this;
    if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
      //暂停播放
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice1.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });
      cc.sys.localStorage.setItem('isVoice', 2);
    } else {
      //开始播放
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });
      cc.sys.localStorage.setItem('isVoice', 1);
    }
  };
  //同意服务许可
  agreeEvent(){
    const self = this;
    if(self.isAgree){
      cc.loader.load({ url: 'res/raw-assets/resources/pic/notAgree.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.agreeBtn.getComponentsInChildren(cc.Sprite)[1].spriteFrame = mylogo;
        self.isAgree = false;
      });
    }else{
      cc.loader.load({ url: 'res/raw-assets/resources/pic/agree.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.agreeBtn.getComponentsInChildren(cc.Sprite)[1].spriteFrame = mylogo;
        self.isAgree = true;
      });
    }
  };
  //随机创建道路
  createRoadAll() {
    var self = this;
    for (var i = 0; i < this.roadArr.length; i++) {
      if (this.roadArr[i].road == this.preRoad.road && this.roadArr[i].type == this.preRoad.type) {
        let arrList = this.roadArr[i].child;
        let wRandom = Math.round(Math.random() * (arrList.length - 1));
        this.createRoad(arrList[wRandom].road, arrList[wRandom].type);
        this.preRoad = arrList[wRandom];
        break;
      }
    }
  };
  //创建道路的随机分路
  createRoad(road, type) {
    if (road == 1) {
      this.createRoadTong(type, this.pool_r1, this.road1, 0, 50, 0, 50, 100,type == 0?0:180,0);
    } else if (road == 2) {
      this.createRoadTong(type, this.pool_r2, this.road2, -25, 0, -25, 0, 0,type == 0?-90:90,0);
    } else {
      var ramdom2 = Math.round(Math.random() * 2) + 1;
      if (ramdom2 == 1) {
        if (road == 3) {
          this.createRoadTong(type, this.pool_r3_1, this.road3_1, 100, 150, 150, 100, 250,type == 0?90:180,3.5);
        } else if (road == 4) {
          this.createRoadTong(type, this.pool_r4_1, this.road4_1, -100, 150, -150, 100, 250,type == 0?-90:180,3.5);
        } else if (road == 5) {
          this.createRoadTong(type, this.pool_r5_1, this.road5_1, 150, 100, 100, 150, 250,type == 0?0:-90,3.5);
        } else if (road == 6) {
          this.createRoadTong(type, this.pool_r6_1, this.road6_1, -150, 100, -100, 150, 250,type == 0?0:90,3.5);
        }
      } else if (ramdom2 == 2) {
        if (road == 3) {
          this.createRoadTong(type, this.pool_r3_2, this.road3_2, 25, 75, 75, 25, 100,type == 0?90:180,1.3);
        } else if (road == 4) {
          this.createRoadTong(type, this.pool_r4_2, this.road4_2, -25, 75, -75, 25, 100,type == 0?-90:180,1.3);
        } else if (road == 5) {
          this.createRoadTong(type, this.pool_r5_2, this.road5_2, 75, 25, 25, 75, 100,type == 0?0:-90,1.3);
        } else if (road == 6) {
          this.createRoadTong(type, this.pool_r6_2, this.road6_2, -75, 25, -25, 75, 100,type == 0?0:90,1.3);
        }
      } else if (ramdom2 == 3) {
        if (road == 3) {
          this.createRoadTong(type, this.pool_r3_3, this.road3_3, 12.5, 62.5, 62.5, 12.5, 75,type == 0?90:180,0.9);
        } else if (road == 4) {
          this.createRoadTong(type, this.pool_r4_3, this.road4_3, -12.5, 62.5, -62.5, 12.5, 75,type == 0?-90:180,0.9);
        } else if (road == 5) {
          this.createRoadTong(type, this.pool_r5_3, this.road5_3, 62.5, 12.5, 12.5, 62.5, 75,type == 0?0:-90,0.9);
        } else if (road == 6) {
          this.createRoadTong(type, this.pool_r6_3, this.road6_3, -62.5, 12.5, -12.5, 62.5, 75,type == 0?0:90,0.9);
        }
      }
    }
  };


  //创建道路123456
  createRoadTong(type, nodePool, selfPrefab, addX, addY, repairX, repairY, addHeight,rotation,time) {
    let road1 = null;

    if (nodePool.size() > 0) {
      // console.log('对象池创建road1');
      road1 = nodePool.get();
    } else {
      road1 = cc.instantiate(selfPrefab);
    }
    this.hangData.push({
      roadx:this.roadx,
      roady:this.roady,
      rotation:rotation,
      time:time
     });
    this.road.addChild(road1, 100, this.createTag++);
    // 0上1下
    if (type == 0) {
      road1.setPosition(this.roadx += addX * this.roadScale, this.roady += addY * this.roadScale);
      this.roadx += repairX * this.roadScale;
      this.roady += repairY * this.roadScale;
    } else {
      road1.setPosition(this.roadx -= addX * this.roadScale, this.roady -= addY * this.roadScale);
      this.roadx -= repairX * this.roadScale;
      this.roady -= repairY * this.roadScale;
    }

    road1.scale = this.roadScale;
    const colorList = this.allColor[this.thisColor].road;
    road1.color = cc.color(colorList[0], colorList[1], colorList[2]);
    
    this.RoadHeight += addHeight * this.roadScale;
  }
  //改变display
  changeRank(isShow: boolean) {
    this.isRank = isShow;
    this.display.node.active = this.isRank;
  }

  hiddenAll() {
    const message: any = {};
    message.message = 'hiddenAll';
    Partner.postMessage(message);
    this.changeRank(false);
    this.closeBtn.node.active = false;
    this.qunBtn.node.active = false;
    this.startBtn.node.active = true;
  }
  startGame() {
    if(this.isAgree){
      cc.director.loadScene("main");
    }else{
      this.tips.node.active = true;
      this.scheduleOnce(function(){
        this.tips.node.active = false;
      },2)
    }
   
  };
  start() {

  }
  _updaetSubDomainCanvas() {
    if (!this.tex) {
      return;
    }
    var openDataContext = Partner.getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;
    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.display.spriteFrame = new cc.SpriteFrame(this.tex);
  };
  addScore(){
    const self = this;
    self.isAddScore++;
    if (self.isAddScore == 30) {
      self.score++;
      self.scoreLabel.string = '' + self.score;
      self.isAddScore = 0;
    }
  }
  update(dt) {
    if (this.isRank && Partner.isWeChat()) {
      this._updaetSubDomainCanvas();
    }
    if(!this.isOver){
      this.moveRoadFu(dt);
      this.destoryRoad();
      this.addScore();
    }
    
  }
  //判断路走到哪了，并创建和销毁
  destoryRoad() {
    if ((Math.abs(this.road.getPositionY()) + this.node.height + 600 * this.roadScale > this.RoadHeight)) {
      // console.log((Math.abs(this.road.getPositionY()) + this.node.height / 1.5 + 600 * this.roadScale), '超过了', this.RoadHeight);
      for (var i = 0; i < 5; i++) {
        this.createRoadAll();
        var thisNode = this.road.getChildByTag(this.deleteTag++);
        this.putPool(thisNode);
        //this.road.removeChildByTag(this.deleteTag++, true);
      }
    }
    var action,action1;
    if( this.car.node.rotation == 0 && this.road.getPositionY() < -this.hangData[0].roady || this.car.node.rotation == 180 && this.road.getPositionY() > -this.hangData[0].roady || this.car.node.rotation == 90 && this.road.getPositionX() < -this.hangData[0].roadx || this.car.node.rotation == -90 && this.road.getPositionX() > -this.hangData[0].roadx){
      action = cc.rotateTo(this.hangData[0].time/2, this.hangData[0].rotation);
      action1 = cc.rotateTo(this.hangData[0].time/2, this.hangData[0].rotation*2);
      this.steering.node.runAction(action1);
      this.car.node.runAction(action);
      this.hangData.shift();
    }
  };
 //把节点放入到对象池里面
 putPool(thisNode) {
  if (thisNode.name == 'road1') {
    this.pool_r1.put(thisNode);
  } else if (thisNode.name == 'road2') {
    this.pool_r2.put(thisNode);
  } else if (thisNode.name == 'road3_1') {
    this.pool_r3_1.put(thisNode);
  } else if (thisNode.name == 'road3_2') {
    this.pool_r3_2.put(thisNode);
  } else if (thisNode.name == 'road3_3') {
    this.pool_r3_3.put(thisNode);
  } else if (thisNode.name == 'road4_1') {
    this.pool_r4_1.put(thisNode);
  } else if (thisNode.name == 'road4_2') {
    this.pool_r4_2.put(thisNode);
  } else if (thisNode.name == 'road4_3') {
    this.pool_r4_3.put(thisNode);
  } else if (thisNode.name == 'road5_1') {
    this.pool_r5_1.put(thisNode);
  } else if (thisNode.name == 'road5_2') {
    this.pool_r5_2.put(thisNode);
  } else if (thisNode.name == 'road5_3') {
    this.pool_r5_3.put(thisNode);
  } else if (thisNode.name == 'road6_1') {
    this.pool_r6_1.put(thisNode);
  } else if (thisNode.name == 'road6_2') {
    this.pool_r6_2.put(thisNode);
  } else if (thisNode.name == 'road6_3') {
    this.pool_r6_3.put(thisNode);
  }
}
  moveRoadFu(dt) {

    var nowSpeed = this.speed * 60 * dt
    //道路往后走动
    let retaton: number = this.car.node.rotation % 360;
    let x: number = 0;
    let y: number = 0;
    if (retaton < 0) {
      retaton += 360;
    }
    if (retaton == 0) {
      x = 0;
      y = nowSpeed;
    } else if (retaton == 180) {
      x = 0;
      y = -nowSpeed;
    } else if (retaton == 90) {
      x = nowSpeed;
      y = 0;
    } else if (retaton == 270) {
      x = -nowSpeed;
      y = 0;
    } else if (retaton > 0 && retaton < 90) {
      y = nowSpeed * Math.cos(retaton * (2 * Math.PI / 360));
      x = nowSpeed * Math.sin(retaton * (2 * Math.PI / 360));
    } else if (retaton > 90 && retaton < 180) {
      y = -nowSpeed * Math.sin((retaton - 90) * (2 * Math.PI / 360));
      x = nowSpeed * Math.cos((retaton - 90) * (2 * Math.PI / 360));
    } else if (retaton > 180 && retaton < 270) {
      x = -nowSpeed * Math.sin((retaton - 180) * (2 * Math.PI / 360));
      y = -nowSpeed * Math.cos((retaton - 180) * (2 * Math.PI / 360));
    } else if (retaton > 270 && retaton < 360) {
      x = -nowSpeed * Math.cos((retaton - 270) * (2 * Math.PI / 360));
      y = nowSpeed * Math.sin((retaton - 270) * (2 * Math.PI / 360));
    }
    this.road.setPosition(this.road.getPositionX() - x, this.road.getPositionY() - y);

  }
}
