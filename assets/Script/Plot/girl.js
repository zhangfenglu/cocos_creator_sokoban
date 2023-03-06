// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let UI_Control = require("../GUIBase/UI_Control")
cc.Class({
    extends: UI_Control,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         UI_Control.prototype.onLoad.call(this)
     },
    //数据初始化
    initData(callBack){

        this._callBack = callBack
        this.scenario_Role = null

        this.initView()
    },

    showCsbAction:function(csbActionName){
        this.playCsbAction(csbActionName,false,()=>{

        })
    },

    showRole(scenario_Role) {
        if(typeof (scenario_Role.spine_path) === undefined || scenario_Role.spine_path.indexOf('.json') === -1)   {
            if(this.view['img_girl']) this.view['img_girl'].visible = true
            if(this.view['spine_girl']) this.view['spine_girl'].visible = false
            cc.log('scenario_Role.pic_path===' + scenario_Role.pic_path)
            cc.loader.loadRes(scenario_Role.pic_path,cc.SpriteFrame,(err,frame)=> {
                this.view['img_girl'].getComponent(cc.Sprite).spriteFrame=frame
            })
        }
        else {
            cc.log('spine scenario_Role.pic_path===' + scenario_Role.pic_path)
            let spinPath =  app.getSubStr(scenario_Role.spine_path,0,scenario_Role.spine_path.length - 5)

            let allCardConfig = app.getConfigInfoByTable('Card_info',null,null)
            let cardScale = null
            for(let key in allCardConfig) {
                let card = allCardConfig[key]

                let girlSpine = card.girlSpine
                if(spinPath === girlSpine){
                    cardScale = card.girlscale
                    break
                }
            }

            if(cardScale) this.view['spine_girl'].scale = cardScale
            let scenario_Spine_Action_Des = app.getConfigInfoByTable('Scenario_Table','Scenario_Spine_Action_Des',scenario_Role.spineid)
            let actionName = scenario_Spine_Action_Des.path
            cc.log("scenario_Spine_Action_Des===" + JSON.stringify(scenario_Spine_Action_Des))
            cc.log('加载 本地spinPath1================' + spinPath + ' actionName==' + actionName)
            if(this.view['img_girl_a1']) this.view['img_girl'].visible = false
            if(this.view['spine_girl']) {
                this.view['spine_girl'].active = true
                this.view['spine_girl'].visible = true
            }
            if(this.view['spine_girl']) app.playSpinAction(this.view['spine_girl'], spinPath  ,spinPath  + '.atlas',0,actionName,true, ()=> {
                //cc.log(' 完毕啊')
            })

        }
        this.scenario_Role = scenario_Role
    },

    getRole() {
        return  this.scenario_Role
    },

    initView() {
        if(this.view['img_girl']) this.view['img_girl'].visible = false
        if(this.view['spine_girl']) this.view['spine_girl'].visible = false
        this.view['spine_girl'].removeAllChildren(true)
    },

    start () {

    },

    // update (dt) {},
});
