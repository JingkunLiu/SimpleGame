import { loadJsonConfig } from "./utils";
const { ccclass, property } = cc._decorator;
@ccclass
export default class Main extends cc.Component {

  //方向盘
  /**
   * 手指转的时候小车跟着转。
   * 松开手的时候方向盘归位，但是小车方向保持不归位。
   */
  @property(cc.Sprite)
  steering: cc.Sprite = null;

  //  子域排行榜
  @property(cc.Sprite)
  display: cc.Sprite = null;

  //  子域超过好友
  @property(cc.Sprite)
  displayExced: cc.Sprite = null;

  //小汽车
  @property(cc.Sprite)
  car: cc.Sprite = null;

  //小汽车动画
  @property(cc.Animation)
  anmiat: cc.Animation = null;

  actionB: cc.Action = null;

  @property(cc.Sprite)
  bgcolor: cc.Sprite = null;

  @property(cc.Node)
  gameOverNode: cc.Node = null;

  @property(cc.Label)
  scoreLa: cc.Label = null;

  @property(cc.Prefab)
  road1: cc.Prefab = null;

  @property(cc.Prefab)
  road2: cc.Prefab = null;

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

  //引导
  @property(cc.Sprite)
  guideNdoe: cc.Sprite = null;

  // 设置声音
  @property(cc.Sprite)
  voice: cc.Sprite = null;

  //重新开始按钮
  @property(cc.Button)
  btnRestart: cc.Button = null;

  //复活按钮
  @property(cc.Button)
  reVive: cc.Button = null;

  //分享按钮
  @property(cc.Button)
  shareBtn: cc.Button = null;

  //复活按钮
  @property(cc.Button)
  btnContinue: cc.Button = null;

  //互推按钮
  @property(cc.Button)
  interpushBtn: cc.Button = null;

  // 游戏结束展示分数
  @property(cc.Label)
  labelScore1: cc.Label = null;

  @property(cc.Label)
  labelScore2: cc.Label = null;

  @property(cc.Button)
  qunBtn: cc.Button = null;

  //closeBtn
  @property(cc.Button)
  closeBtn: cc.Button = null;

  //showRank2
  @property(cc.Button)
  BtnRank2: cc.Button = null;

  //记录手指移动的位置
  positionx: number = 0;
  positiony: number = 0;

  //记住方向盘的方向
  direat: number = 0;

  //小车的速度，也就是道路的速度
  speed: number = 0;

  //小车的方向，根据这个方向来移动道路和旋转小车
  car_direat: number = 0;

  //分数
  score: number = 0;

  //上一条路的记录，通过roadArr来判断下一条路是那几条
  preRoad = null;

  //记录道路已经创建到什么位置了，下一条从这里开始
  roadx: number = 0;
  roady: number = 0;

  //得分的计时function
  interval = null;

  //记录游戏是否结束
  isOver = null;

  //用来存储 road之间衔接关系的
  roadArr = null;

  //所有配色方案
  allColor = null;

  //当前使用的配色方案
  thisColor = null;

  //老司机物语
  @property(cc.Label)
  wuyuLabel: cc.Label = null;
  wuyu = null;

  //微信接口使用的播放音乐的组件

  beginId = null;
  audioContext = null;
  endId = null;

  //当前使用的背景音乐的index
  bgmIndex = null;

  //子域
  tex = null;
  tex1 = null;

  //判断当前排行榜是否是群排行
  isQun = null;

  //清除道路的tag
  deleteTag = null;

  //创建道路的tag
  createTag = null;

  //道路挪动定时器
  moveRoad = null;

  //是否为分享复活
  isrevive = null;

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

  //是否在看排行榜
  isRank = false;

  //记录是否可以加分 分数0.5秒加1
  isAddScore = null;

  //记录超越好友展示的状态
  isCompare = false;
  //记录超越好友帧数
  frameCount = 0;
  //互推数据
  interPushData = [];
  //分享数据
  shareData = null;

  //是否复活
  isReviveBoo = false;

  //是否为第一次
  isFirst = null;

  //这局是否显示复活按钮
  isShowRevive = null;

  //微信环境下启动
  runTimeOnShow(options) {
    const self = this;
    if (!Partner.isWeChat()) {
      return
    }
    const query: any = options.query;
    if (query.typpe == 2 || query.typpe == '2') {
      if (cc.sys.localStorage.getItem('scene') == 'main') {
        const message: any = {};
        message.message = "showRank3";
        message.shareTicket = options.shareTicket;
        Partner.postMessage(message);

        self.changeRank(true);
        self.isOver = true;

        if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
          cc.audioEngine.stopAll();
        }
        self.qunBtn.node.active = false;
        self.isQun = true;
        self.closeBtn.node.active = true;
        self.gameOverNode.active = true;
        // self.gameOverNode.getChildByName('gameOver').active = false;
        // self.gameOverNode.getChildByName('skip').active = false;
        // self.BtnRank2.node.active = false;
      }

    }

  }


  async onLoad() {
    const self = this;
    self.isOver = true;
    this.changeRank(false);
    await self.initLoad();
    //如果是微信平台
    if (Partner.isWeChat()) {
      Partner.onShow(function (options) {
        self.runTimeOnShow(options);
      });
      Partner.showShareMenu({ withShareTicket: true });

      Partner.onShareAppMessage(function () {
        var random = Math.round(Math.random() * (self.shareData.length - 1));
        return {
          title: self.shareData[random].text,
          imageUrl: self.shareData[random].pic,
          query: 'typpe=1'
        }
      })
      Partner.requestGet('https://zhiyuan.xuemei.fun/zhiyuan/basic/web/index.php/qiu/finger', {}, function (res) {
        if (res == 1) {
          self.isReviveBoo = false;
          self.reVive.node.active = false;
        } else {
          self.isReviveBoo = true;
          self.reVive.node.active = false;
        }
      })

      // 获取互推数据
      const params = {
        appid: "",
        openid: "",
        unionid: "",
      };
      params.appid = "wx052185d816d7aaa0";
      params.openid = null;
      params.unionid = null;

      if (self.interPushData.length <= 0) {
        Partner.requestPost('https://tool.dayukeji.com/vea/tool/getPushList', params, function (respData) {
          if (respData.errCode) {
            // console.log("获取推荐页失败");
          } else if (respData.data) {
            if (respData.data.length > 0) {
              // console.log("获取推荐页成功");
              self.interPushData = respData.data;
              self.showInterPush();
            }
          }
        });
      } else {
        self.showInterPush();
      }

    }
    this.node.on('touchstart', this.onTouchStart, this);
    this.node.on('touchmove', this.onTouchMove, this);
    this.node.on('touchend', this.onTouchEnd, this);
    this.btnRestart.node.on('click', this.Restart, this);
    this.reVive.node.on('click', this.shareRevive, this);
    this.shareBtn.node.on('click', this.shareShot, this)
    this.qunBtn.node.on('click', this.shareT, this);
    this.btnContinue.node.on('click', this.ReVive, this);
    this.voice.node.on('touchstart', this.voiceTouch, this);
    this.closeBtn.node.on('click', this.hiddenAll, this);
    this.BtnRank2.node.on('click', this.showRank2, this);
    this.interpushBtn.node.on('click', this.interPush, this);
    this.isFirst = true;
    this.Restart();
  };
  //初始化一些固定的东西

  async initLoad() {
    cc.sys.localStorage.setItem('scene', 'main');
    this.roadScale = 1.3;
    this.speed = 3.5 * this.roadScale;
    this.roadArr = await loadJsonConfig("road");
    this.allColor = await loadJsonConfig("color");
    this.wuyu = await loadJsonConfig("wuyu");
    this.shareData = await loadJsonConfig("share");
    this.car.getComponent('Collision').game = this;
    this.RoadHeight = 0;
    this.isAddScore = 0;
    this.beginId = -1;
    this.audioContext = -1;
    this.endId = -1;
    this.tex = new cc.Texture2D();
    this.tex1 = new cc.Texture2D();
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

  };

  //展示好友排行2
  showRank2() {
    const message: any = {};
    message.message = "showRank2";
    Partner.postMessage(message);
    this.changeRank(true);
    this.gameOverNode.active = false;
    // this.gameOverNode.getChildByName('skip').active = false;
    // this.BtnRank2.node.active = false;
    this.isQun = false;
    this.closeBtn.node.active = true;
    // this.qunBtn.node.active = true;

  }
  //隐藏排行榜2
  hiddenAll() {
    if (this.isQun == true) {
      const message: any = {};
      message.message = "showRank1";
      message.score = "0";
      Partner.postMessage(message);
      this.changeRank(true);
      // this.gameOverNode.getChildByName('skip').active = true;
      this.gameOverNode.active = true;
      // this.BtnRank2.node.active = true;
      this.closeBtn.node.active = false;
      // this.qunBtn.node.active = false;
      this.isQun = false;
    } else {
      const message: any = {};
      message.message = "h2s1";
      Partner.postMessage(message);
      this.changeRank(true);
      this.gameOverNode.active = true;
      // this.gameOverNode.getChildByName('skip').active = true;
      // this.BtnRank2.node.active = true;
      this.closeBtn.node.active = false;
      // this.qunBtn.node.active = false;
    }

  }

  //查看群排行分享
  shareT() {
    // console.log('分享');
    const options: any = {};
    var random = Math.round(Math.random() * (this.shareData.length - 1));
    options.title = this.shareData[random].text;
    options.imageUrl = this.shareData[random].pic;
    options.query = 'typpe=2';
    Partner.shareAppMessage(options);
  };

  //分享成绩
  shareShot() {
    const options: any = {};
    var random = Math.round(Math.random() * (this.shareData.length - 1));
    options.title = this.shareData[random].text;
    options.imageUrl = this.shareData[random].pic;
    options.query = 'typpe=1';
    Partner.shareAppMessage(options);
  }
  //分享后复活
  shareRevive() {
    this.isrevive = true;
    cc.audioEngine.stopAll();
    const options: any = {};
    var random = Math.round(Math.random() * (this.shareData.length - 1));
    options.title = this.shareData[random].text;
    options.imageUrl = this.shareData[random].pic;
    options.query = 'typpe=1';
    Partner.shareAppMessage(options);
    // this.ReVive();
    this.reVive.node.active = false;
    this.btnContinue.node.active = true;
    this.ReVive();
    // this.gameOverNode.getChildByName('gameOver').getChildByName('Label').active = false;
  }
  //复活
  ReVive() {
    var self = this;
    this.isrevive = false;
    this.gameOverNode.active = false;
    this.reVive.node.active = false;
    this.isShowRevive = false;
    this.btnContinue.node.active = false;
    // this.gameOverNode.getChildByName('gameOver').active = false;
    // this.gameOverNode.getChildByName('gameOver').getChildByName('Label').active = true;
    // this.gameOverNode.getChildByName('skip').active = true;
    if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
      this.audioContext = cc.audioEngine.play(this.bgmIndex, true, 1);
      var ifVoice = function () {
        if (cc.audioEngine.getState(self.audioContext) != 1) {
          cc.audioEngine.stopAll();
          cc.audioEngine.play(self.bgmIndex, true, 1);
        } else {
          self.unschedule(ifVoice);
        }
      }
      self.scheduleOnce(ifVoice, 0.2);
    }
    if ((this.createTag - this.deleteTag > 0) && this.road.getChildByTag(this.deleteTag)) {
      for (var i = this.deleteTag; i < this.createTag; i++) {
        var thisNode = this.road.getChildByTag(i);
        this.putPool(thisNode);
      }
    }
    this.gameOverNode.active = false;
    const message: any = {};
    if (this.isRank) {
      message.message = "hiddenAll";
      Partner.postMessage(message);
    }
    this.changeRank(false);

    this.isAddScore = 0;
    // this.road.removeAllChildren();
    this.RoadHeight = 0;
    this.createTag = 1;
    this.deleteTag = 1;
    this.road.setPosition(0, 0);
    this.car_direat = 0;
    this.direat = 0;
    this.steering.node.rotation = 0;
    this.car.node.rotation = 0;
    this.roadx = 0;
    this.roady = -600 * this.roadScale;

    for (i = 0; i < 10; i++) {
      this.createRoadTong(0, this.pool_r1, this.road1, 0, 50, 0, 50, 100);

    }
    this.preRoad = {
      road: 1,
      type: 0
    }
    for (i = 0; i < 30; i++) {
      self.createRoadAll();
    }
    this.car.node.getComponent('Collision').setManage(true);

    this.isOver = false;
    this.anmiat.play('carClip');
  };
  //判断是否加分
  addScore() {
    const self = this;
    self.isAddScore++;
    if (self.isAddScore == 30) {
      self.score++;
      self.scoreLa.string = 'score  ' + self.score;
      self.isAddScore = 0;
      // Partner.postMessage({
      //   message:'compare',
      //   score:self.score
      // });
      // self.isCompare = true;
      // self.displayExced.node.active = true;
    }

  };
  //判断路走到哪了，并创建和销毁
  destoryRoad() {
    if (!this.isOver && (Math.abs(this.road.getPositionY()) + this.node.height + 600 * this.roadScale > this.RoadHeight)) {
      console.log((Math.abs(this.road.getPositionY()) + this.node.height / 1.5 + 600 * this.roadScale), '超过了', this.RoadHeight);
      for (var i = 0; i < 5; i++) {
        this.createRoadAll();
        var thisNode = this.road.getChildByTag(this.deleteTag++);
        this.putPool(thisNode);
        //this.road.removeChildByTag(this.deleteTag++, true);
      }
    }
  };
  //转动方向盘
  turnCar() {
    if (!this.isOver) {
      //小车转动方向
      if (Math.abs(this.car_direat - this.car.node.rotation) < 5 && this.car_direat - this.car.node.rotation != 0) {
        this.car.node.rotation = this.car_direat;
      } else if (this.car_direat - this.car.node.rotation != 0) {
        if (this.car_direat - this.car.node.rotation > 0) {
          this.car.node.rotation += 5;
        } else {
          this.car.node.rotation -= 5;
        }

      }
      // this.car.node.rotation = this.car.node.rotation%360;
      // this.steering.node.rotation = this.direat;
    }
  }
  //跳过分享复活，展示结束和排行榜
  SkipVive() {
    // this.gameOverNode.getChildByName('gameOver').active = false;
    // this.gameOverNode.getChildByName('skip').active = true;
    const message: any = {};
    message.message = "showRank1";
    message.score = this.score;
    Partner.postMessage(message);
    this.changeRank(true);
    // this.BtnRank2.node.active = true;
    // this.qunBtn.node.active = true;
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
      if (!this.isOver) {
        cc.audioEngine.stopAll();
        // cc.audioEngine.uncacheAll();
        // this.audioContext.stop();
      }
    } else {
      //开始播放
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });

      cc.sys.localStorage.setItem('isVoice', 1);
      if (!this.isOver) {
        if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
          this.audioContext = cc.audioEngine.play(this.bgmIndex, true, 1);
          // this.audioContext.src = this.bgmIndex;
          // this.audioContext.autoplay = true;
          // this.audioContext.loop = false;
          // this.audioContext.obeyMuteSwitch = false;
          // this.audioContext.volume = 1;
        }
      }
    }
  };

  //开始或重新开始是初始化一些数据
  assignment() {

    this.thisColor = Math.round(Math.random() * (this.allColor.length - 1));
    // this.thisColor = 24;
    var self = this;
    if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
      //播放
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });
    } else {
      //暂停
      cc.loader.load({ url: 'res/raw-assets/resources/pic/voice1.png', type: 'png' }, function (err, res) {
        var mylogo = new cc.SpriteFrame(res);
        self.voice.getComponent(cc.Sprite).spriteFrame = mylogo;
      });
    }
    var bgmList = [
      'https://xiaoming.yaoxingfuo.com/bgm/bgm1.mp3',
      'https://xiaoming.yaoxingfuo.com/bgm/bgm2.mp3',
      'https://xiaoming.yaoxingfuo.com/bgm/bgm3.mp3',
      'https://xiaoming.yaoxingfuo.com/bgm/bgm4.mp3'
    ];
    this.bgmIndex = bgmList[Math.round(Math.random() * (bgmList.length - 1))];
    this.RoadHeight = 0;
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

  //游戏结束
  gameOver() {
    // this.labelScore1.string = 'score  ' + this.score;
    this.reVive.node.active = (this.isShowRevive && this.score > 10) ? true : false;
    this.shareBtn.node.active = (this.isShowRevive && this.score > 10) ? false : true;
    this.isCompare = false;
    Partner.postMessage({
      message: 'hiddenCompare'
    });
    this.labelScore2.string = '' + this.score;
    this.isOver = true;
    this.anmiat.stop();
    if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
      cc.audioEngine.stopAll();
      this.endId = cc.audioEngine.play('https://xiaoming.yaoxingfuo.com/bgm/end1.mp3', false, 1);
    }
    Partner.vibrateLong({});
    var wuyuIndex = Math.round(Math.random() * (this.wuyu.length - 1));
    this.wuyuLabel.string = '老司机寄语：\n' + this.wuyu[wuyuIndex];
    this.gameOverNode.active = true;
    const message: any = {};
    message.message = "showRank1";
    message.score = this.score;
    Partner.postMessage(message);
    this.changeRank(true);

    // if ((this.createTag - this.deleteTag > 0) && this.road.getChildByTag(this.deleteTag)) {
    //   for (var i = this.deleteTag; i < this.createTag; i++) {
    //     var thisNode = this.road.getChildByTag(i);
    //     this.putPool(thisNode);
    //   }
    // }
    // if (this.gameOverNode.getChildByName('skip').active) {
    //   const message: any = {};
    //   message.message = "showRank1";
    //   message.score = this.score;
    //   Partner.postMessage(message);
    //   this.changeRank(true);
    //   this.BtnRank2.node.active = true;
    // }
  };
  //改变display
  changeRank(isShow: boolean) {
    this.isRank = isShow;
    // this.display.node.active = this.isRank;
    if (!isShow) {
      this.display.node.active = isShow;
    }
    this.qunBtn.node.active = this.isRank;
    this.displayExced.node.active = false;
  }
  //互推
  interPush() {
    const arrData = this.interPushData;
    const result = [];
    for (let i = 0; i < arrData.length; i++) {
      result.push(arrData[i].push_img);
    }
    Partner.previewImg(result);
  }
  //展示互推
  showInterPush() {
    const self = this;
    const remoteIcon = self.interPushData[0].push_icon;
    cc.loader.load(remoteIcon, (err, texture: cc.Texture2D) => {
      if (err) {
        self.interpushBtn.node.active = false;
      } else {
        self.interpushBtn.node.active = true;
        const icon: cc.Sprite = self.interpushBtn.node.getChildByName("gameIcon").getComponent(cc.Sprite);
        icon.spriteFrame = new cc.SpriteFrame(texture);
      }
    });
  }
  //重新开始
  Restart() {
    const message: any = {};
    if (this.isRank) {
      message.message = "hiddenAll";
      Partner.postMessage(message);
    }

    this.changeRank(false);
    this.isrevive = false;
    // this.qunBtn.node.active = false;
    this.closeBtn.node.active = false;
    // this.BtnRank2.node.active = false;
    var self = this;
    this.gameOverNode.active = false;
    // this.gameOverNode.getChildByName('gameOver').active = true;
    // this.gameOverNode.getChildByName('skip').active = false;
    if ((this.createTag - this.deleteTag > 0) && this.road.getChildByTag(this.deleteTag)) {
      for (var i = this.deleteTag; i < this.createTag; i++) {
        var thisNode = this.road.getChildByTag(i);
        this.putPool(thisNode);
      }
    }
    //复活按钮
    this.isShowRevive = (this.isReviveBoo && !this.isFirst) ? true : false;
    this.btnContinue.node.active = false;

    this.isAddScore = 0;
    this.assignment();
    if (!cc.sys.localStorage.getItem('isVoice') || cc.sys.localStorage.getItem('isVoice') == 1 || cc.sys.localStorage.getItem('isVoice') == '1') {
      self.audioContext = cc.audioEngine.play(self.bgmIndex, true, 1);
    }
    this.createTag = 1;
    this.deleteTag = 1;

    const colorList = this.allColor[this.thisColor].bg;
    this.bgcolor.node.color = cc.color(colorList[0], colorList[1], colorList[2]);
    this.road.setPosition(0, 0);
    this.car_direat = 0;
    this.direat = 0;
    this.steering.node.rotation = 0;
    this.car.node.rotation = 0;
    this.roadx = 0;
    this.roady = -600 * this.roadScale;

    for (i = 0; i < 10; i++) {
      this.createRoadTong(0, this.pool_r1, this.road1, 0, 50, 0, 50, 100);
    }
    this.anmiat.play('carClip');
    this.preRoad = {
      road: 1,
      type: 0
    }
    for (i = 0; i < 30; i++) {
      self.createRoadAll();
    }
    self.score = 0;
    self.scoreLa.string = 'score  ' + self.score;
    if (!cc.sys.localStorage.getItem('isNew')) {
      cc.sys.localStorage.setItem('isNew', true);
      self.guideNdoe.node.active = true;
      self.guideNdoe.node.on('touchstart', self.guideTouchStart, self)
      return;
    }
    this.car.node.getComponent('Collision').setManage(true);
    this.isFirst = false;
    this.isOver = false;

  }
  guideTouchStart() {
    this.guideNdoe.node.active = false;
    this.car.node.getComponent('Collision').setManage(true);
    this.isOver = false;
  }
  //道路向后挪动
  moveRoadFu(dt) {
    if (!this.isOver) {
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

  //手机开始拖动方向盘
  onTouchStart(e) {
    if (!this.isOver) {
      this.steering.node.stopAction(this.actionB);
      this.direat = this.steering.node.rotation;
      this.positionx = e.getLocationX();
      this.positiony = e.getLocationY();
    } else if (!this.qunBtn.node.active && !this.BtnRank2.node.active && !this.isQun && !this.isrevive) {
      this.SkipVive();
    }

  };
  //手机拖动方向盘中
  onTouchMove(e) {
    if (!this.isOver) {
      // console.log('onTouchMove开始',new Date().getTime());
      let posx: number = e.getLocationX();
      let posy: number = e.getLocationY();
      let angel: number = 0;
      angel = this.getAngle(this.node.width / 2, this.node.height / 2 - 300, posx, posy, this.positionx, this.positiony);
      this.direat += angel;
      this.car_direat += angel / 4;
      // this.car.node.rotation = this.car_direat;
      this.steering.node.rotation = this.direat;
      this.positionx = posx;
      this.positiony = posy;
      // console.log('onTouchMove结束',new Date().getTime());
    }
  };
  //手机拖动方向盘结束
  onTouchEnd(e) {
    if (!this.isOver) {
      this.actionB = cc.rotateTo(0.5, 0);
      this.steering.node.runAction(this.actionB);
    }

  };

  //关于子域的加载
  _updaetSubDomainCanvas(which) {
    if (which == 'display') {
      if (!this.tex) {
        return;
      }
      var openDataContext = Partner.getOpenDataContext();
      var sharedCanvas = openDataContext.canvas;
      this.tex.initWithElement(sharedCanvas);
      this.tex.handleLoadedTexture();
      this.display.spriteFrame = new cc.SpriteFrame(this.tex);
      this.display.node.active = true;
    }
    else {
      if (!this.tex1) {
        return;
      }
      var openDataContext = Partner.getOpenDataContext();
      var sharedCanvas = openDataContext.canvas;
      this.tex1.initWithElement(sharedCanvas);
      this.tex1.handleLoadedTexture();
      this.displayExced.spriteFrame = new cc.SpriteFrame(this.tex1);
      this.displayExced.node.active = true;
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


  update(dt) {
    // if(this.isCompare){
    //   this.frameCount = this.frameCount >= 2?dt:this.frameCount+dt;
    //   this.isCompare = this.frameCount >= 2?false:true;
    // }
    if (this.isRank && Partner.isWeChat()) {
      this._updaetSubDomainCanvas('display');
    }
    if (this.isCompare && Partner.isWeChat()) {
      this._updaetSubDomainCanvas('displayExced');
    }

    if (!this.isOver) {
      this.moveRoadFu(dt);
      this.turnCar();
      this.addScore();
      this.destoryRoad();
    }
  };

  //三点获取角度
  getAngle(x, y, x1, y1, x2, y2) {
    var a = Math.sqrt(Math.pow(Math.abs(x - x1), 2) + Math.pow(Math.abs(y - y1), 2));
    var b = Math.sqrt(Math.pow(Math.abs(x - x2), 2) + Math.pow(Math.abs(y - y2), 2));
    var c = Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2));
    var cos = (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
    var radina = Math.acos(cos);
    var angles = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度
    var Xp12 = x1 - x;
    var Yp12 = y1 - y;
    var Xp23 = x2 - x1;
    var Yp23 = y2 - y1;
    var res = Xp12 * Yp23 - Yp12 * Xp23;
    let angle: number = 0;
    if (res > 0) {
      angle = angles;
    } else {
      angle = -angles;
    }
    return angle;
  };

  //创建道路的随机分路
  createRoad(road, type) {
    if (road == 1) {
      this.createRoadTong(type, this.pool_r1, this.road1, 0, 50, 0, 50, 100);
    } else if (road == 2) {
      this.createRoadTong(type, this.pool_r2, this.road2, -25, 0, -25, 0, 0);
    } else {
      var ramdom2;
      if (this.createTag < 20) {
        ramdom2 = 1;
      } else if (this.score < 50) {
        ramdom2 = Math.round(Math.random() * 1) + 1;
      } else {
        ramdom2 = Math.round(Math.random() * 2) + 1;
      }
      if (ramdom2 == 1) {
        if (road == 3) {
          this.createRoadTong(type, this.pool_r3_1, this.road3_1, 100, 150, 150, 100, 250);
        } else if (road == 4) {
          this.createRoadTong(type, this.pool_r4_1, this.road4_1, -100, 150, -150, 100, 250);
        } else if (road == 5) {
          this.createRoadTong(type, this.pool_r5_1, this.road5_1, 150, 100, 100, 150, 250);
        } else if (road == 6) {
          this.createRoadTong(type, this.pool_r6_1, this.road6_1, -150, 100, -100, 150, 250);
        }
      } else if (ramdom2 == 2) {
        if (road == 3) {
          this.createRoadTong(type, this.pool_r3_2, this.road3_2, 25, 75, 75, 25, 100);
        } else if (road == 4) {
          this.createRoadTong(type, this.pool_r4_2, this.road4_2, -25, 75, -75, 25, 100);
        } else if (road == 5) {
          this.createRoadTong(type, this.pool_r5_2, this.road5_2, 75, 25, 25, 75, 100);
        } else if (road == 6) {
          this.createRoadTong(type, this.pool_r6_2, this.road6_2, -75, 25, -25, 75, 100);
        }
      } else if (ramdom2 == 3) {
        if (road == 3) {
          this.createRoadTong(type, this.pool_r3_3, this.road3_3, 12.5, 62.5, 62.5, 12.5, 75);
        } else if (road == 4) {
          this.createRoadTong(type, this.pool_r4_3, this.road4_3, -12.5, 62.5, -62.5, 12.5, 75);
        } else if (road == 5) {
          this.createRoadTong(type, this.pool_r5_3, this.road5_3, 62.5, 12.5, 12.5, 62.5, 75);
        } else if (road == 6) {
          this.createRoadTong(type, this.pool_r6_3, this.road6_3, -62.5, 12.5, -12.5, 62.5, 75);
        }
      }
    }
  };
  //创建道路123456
  createRoadTong(type, nodePool, selfPrefab, addX, addY, repairX, repairY, addHeight) {
    let road1 = null;

    if (nodePool.size() > 0) {
      // console.log('对象池创建road1');
      road1 = nodePool.get();
    } else {
      road1 = cc.instantiate(selfPrefab);
    }
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

}
