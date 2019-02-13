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
export default class Road extends cc.Component {

  roadScale = null;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.roadScale = 1.3;
  }

  update(dt) {
    const selfY = this.node.getPositionY();
    const parentY = this.node.parent.getPositionY();
    const selfPositionY = selfY+parentY;
    const selfHeight = this.node.height * this.roadScale;
    if(selfPositionY-selfHeight/2 < 65/2 && selfPositionY+selfHeight/2 > -65/2){
      this.node.group = 'road';
    }else{
      this.node.group = 'ildle';
    }

  }
}
