// 应用里面的小元素

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameItem extends cc.Component {

  public static GetComponent(pNodComp: cc.Node): GameItem {
    return pNodComp.getComponent(GameItem);
  }

  @property(cc.Label)
  private labName: cc.Label = null;

  @property(cc.Sprite)
  private sprIcon: cc.Sprite = null;

  private mObjData;

  public onLoad () {
  }

  public init(pData: any) {
    this.mObjData = pData;
    // console.log("当前的数据：", pData);

    // this.labName.string = pData.img_author;
    // this.labDesc.string = pData.word;

    // const self = this;

    // // 加载图片
    // cc.loader.load({ url: pData.img_url, type: 'png' }, function (err, res) {
    //   self.sprIcon.node.setScale(0.2);
    //   var img = new cc.SpriteFrame(res);
    //   self.sprIcon.spriteFrame = img;
    // });

    this.labName.string = pData.name;

    const self = this;

    // 加载图片
    cc.loader.load({ url: pData.cover, type: 'png' }, function (err, res) {
      self.sprIcon.node.setScale(0.87);
      var img = new cc.SpriteFrame(res);
      self.sprIcon.spriteFrame = img;
    });

  }

  private onBtnTouchEnd() {
    Partner.navigateToMiniProgram(this.mObjData.appid);
    
  }
}
