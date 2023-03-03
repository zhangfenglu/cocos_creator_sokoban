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

    setCallback (callback) {
        this.callback = callback
    },

    onLoad () {
        UI_Control.prototype.onLoad.call(this)
        this.initView()
    },


    initView() {
      /*  if (this.view['content1']) this.view['content1'].setString('')
        if (this.view['content2']) this.view['content2'].setString('')
        if (this.view['content3']) this.view['content3'].setString('')
        if (this.view['Lad_Rightdi_1']) this.view['Lad_Rightdi_1'].visible = false
        if (this.view['Lad_Rightdi_2']) this.view['Lad_Rightdi_2'].visible = false
        if (this.view['Lad_Rightdi_3']) this.view['Lad_Rightdi_3'].visible = false*/

       /* let curYinDaoStep = Manager_Guide.getGuideStep()
        if(curYinDaoStep <= Config_G.GUIDE_STEP_CONFIG.GUIDE_STEP_3) this['btn_skip'].visible = false*/
        app.btnClick(this.view['btn_skip'], ()=> {
            this.onClose()
        })
    },

    start () {

    },

    // update (dt) {},
});
