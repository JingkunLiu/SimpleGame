import GameItem from "./GameItem";
import { loadJsonConfig } from "./utils";
// 游戏盒子？
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends cc.Component {

  @property(cc.Node)
  private nodScroll: cc.Node = null;

  @property(cc.Node)
  private nodScrollView: cc.Node = null;

  @property(cc.Node)
  private nodContent: cc.Node = null;

  @property(cc.Prefab)
  private pfbItem: cc.Prefab = null;

  // LIFE-CYCLE CALLBACKS:

  public onLoad () {
    this.init();
  }

  public init() {

    // const self = this;
    // cc.loader.load('https://dy-bucket-01.oss-cn-shanghai.aliyuncs.com/box/pretend/gh_1b494bdafd65.json', function (err, res) {
    //   console.log("res", res);
    //   const tArrData = res.data.pretendlist
    //   let tNumCurItem = 0;
    //   const tAllCount = tArrData.length;
    //   const loadBatch : () => void = () => {
    //     for (let i = 0; i < 5 && tNumCurItem < tAllCount; i++ , tNumCurItem++) {
    //       const tNode = cc.instantiate(self.pfbItem);
    //       tNode.parent = self.nodContent;
    //       const tGameItem: GameItem = GameItem.GetComponent(tNode);
    //       tGameItem.init(tArrData[tNumCurItem]);
    //     }
    //     if (tNumCurItem >= tAllCount) {
    //       self.unschedule(loadBatch);
    //     }
    //   };
    //   self.schedule(loadBatch, 0.05);
    // });

    // const tSize = Partner.getSize();
    const windowSize = cc.view.getVisibleSize();
    this.nodScroll.height = windowSize.height;
    this.nodScrollView.height = windowSize.height;

    const self = this;
    cc.loader.load('https://dy-bucket-01.oss-cn-shanghai.aliyuncs.com/box/index/gh_1b494bdafd65.json?v=' + new Date().getTime(), function (err, res) {
      const tArrData = res.data.comlist[0].array;
      let tNumCurItem = 0;
      const tAllCount = tArrData.length;
      const loadBatch : () => void = () => {
        for (let i = 0; i < 5 && tNumCurItem < tAllCount; i++ , tNumCurItem++) {
          const tNode = cc.instantiate(self.pfbItem);
          tNode.parent = self.nodContent;
          const tGameItem: GameItem = GameItem.GetComponent(tNode);
          tGameItem.init(tArrData[tNumCurItem]);
        }
        if (tNumCurItem >= tAllCount) {
          self.unschedule(loadBatch);
        }
      };
      self.schedule(loadBatch, 0.05);
    });
    
  }

  start() {

  }


  // update (dt) {}
}
