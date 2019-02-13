// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Collision extends cc.Component {

  @property
  game = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    //碰撞检测系统
  };
  //碰撞产生时
  onCollisionEnter(other, self) {
    cc.log("检测到碰撞");
    this.game.gameOver();
    this.setManage(false);
  };
  setManage(isManage){
    var manager = cc.director.getCollisionManager();
    manager.enabled = isManage;
  }
  start() {

  }

  // update (dt) {}
}
