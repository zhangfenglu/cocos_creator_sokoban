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
    },

    initData(csb_path,callBack) {
        this._callBack = callBack
        this.initView()
    },


    initView() {
        if (this.view['content1']) this.view['content1'].getComponent(cc.Label).string = ''
        if (this.view['content2']) this.view['content2'].getComponent(cc.Label).string = ''
        if (this.view['content3']) this.view['content3'].getComponent(cc.Label).string = ''
        if (this.view['Lad_Rightdi_1']) {
            this.view['Lad_Rightdi_1'].visible = false
            this.view['Lad_Rightdi_1'].active = false
        }
        if (this.view['Lad_Rightdi_2']) {
            this.view['Lad_Rightdi_2'].visible = false
            this.view['Lad_Rightdi_2'].active = false
        }
        if (this.view['Lad_Rightdi_3']) {
            this.view['Lad_Rightdi_3'].visible = false
            this.view['Lad_Rightdi_3'].active = false
        }

       /* let curYinDaoStep = Manager_Guide.getGuideStep()
        if(curYinDaoStep <= Config_G.GUIDE_STEP_CONFIG.GUIDE_STEP_3) this['btn_skip'].visible = false*/
        app.btnClick(this.view['btn_skip'], ()=> {
            if(this._callBack) this._callBack()
            this.onClose()
        })
    },

    showA1(curSpeek,callback) {
        this._speakInterval = 0.2
        if (this.view['Lad_Rightdi_1']) {
            this.view['Lad_Rightdi_1'].visible = true
            this.view['Lad_Rightdi_1'].active = true
        }
        if (this.view['Lad_Rightdi_2']) {
            this.view['Lad_Rightdi_2'].visible = false
            this.view['Lad_Rightdi_2'].active = false
        }
        if (this.view['Lad_Rightdi_3']) {
            this.view['Lad_Rightdi_3'].visible = false
            this.view['Lad_Rightdi_3'].active = false
        }
        if (this.view['content1']) this.view['content1'].getComponent(cc.Label).string = ''
        this.playCsbAction("animation" + this._curAnimation, this._loop === 1 ? true : false ,  ()=> {
            this._isPlayActioning = false
        })

        app.autoTyping(this.view['content1'], curSpeek, this._speakInterval, 0.03, ()=> {
            if(callback) callback()
        })
        this.view['content1'].visible = true
        this.view['content1'].active = true
        return




        //富文本 暂不考虑
        let isFuWenBen = curSpeek.search("<font")
        if(isFuWenBen >= 0){
            this.view['content1'].visible = false
        }
        else{
            app.autoTyping(this.content1, curSpeek, this._speakInterval, 0.03, ()=> {
                if(callback) callback()
            })
            this.content1.visible = true
            return
        }
        let txt = this.view['txt_1']
        txt.visible = false
        let allTxtUI = []
        app.clearAllChildRuleOutChild(this['P_1'],'txt_1')
        let hangNum = 0

        let SuperRichText = view.createView(this.view['P_1'], 'GameEngine/EngineUtils/SuperRichText', 1000, 500, curSpeek, cc.p(22, 5))
        SuperRichText.visible = false
        let allColors = SuperRichText.getAllColors()

        curSpeek = app.getTextFromFontHtml(curSpeek)

        for(let i = 0; i < curSpeek.length; i++){
            let cloneTxt = txt.clone()
            cloneTxt.visible = false
            cloneTxt.setName('clone_' + i)
            cloneTxt.setString(curSpeek[i])
            this.view['P_1'].addChild(cloneTxt)
            cloneTxt.x = txt.x + i * 26
            hangNum = parseInt(cloneTxt.x / 620)
            cloneTxt.x = cloneTxt.x - hangNum * 620
            cloneTxt.y = cloneTxt.y - hangNum * cloneTxt.height
            allTxtUI.push(cloneTxt)
            if(allColors[i]) cloneTxt.setColor(allColors[i])
        }

        for(let i = 0 ; i < allTxtUI.length; i++){
            let ui = allTxtUI[i]
            ui.y = ui.y  +  hangNum * 20
        }

        app.autoTypingColor(this.view['P_1'], curSpeek, this._speakInterval, 0.03, ()=> {
            if(callback) callback()
        })
    },

    showA2(curSpeek,callback) {
        this._speakInterval = 0.2
        if (this.view['Lad_Rightdi_1']) {
            this.view['Lad_Rightdi_1'].visible = false
            this.view['Lad_Rightdi_1'].active = false
        }
        if (this.view['Lad_Rightdi_2']) {
            this.view['Lad_Rightdi_2'].visible = true
            this.view['Lad_Rightdi_2'].active = false
        }
        if (this.view['Lad_Rightdi_3']) {
            this.view['Lad_Rightdi_3'].visible = false
            this.view['Lad_Rightdi_3'].active = false
        }
        if (this.view['content2']) this.view['content2'].getComponent(cc.Label).string = ''

        app.autoTyping(this.view['content2'], curSpeek, this._speakInterval, 0.03, ()=> {
            if(callback) callback()
        })
        this.view['content2'].visible = true
        return


        let isFuWenBen = curSpeek.search("<font")
        if(isFuWenBen >= 0){
            this.view['content2'].visible = false
        }
        else{
            app.autoTyping(this.content2, curSpeek, this._speakInterval, 0.03, ()=> {
                if(callback) callback()
            })
            this.view['content2'].visible = true
            return
        }

        let txt = this['txt_2']
        txt.visible = false
        let allTxtUI = []
        let hangNum = 0
        app.clearAllChildRuleOutChild(this['P_2'],'txt_2')

        let SuperRichText = view.createView(this['P_2'], 'GameEngine/EngineUtils/SuperRichText', 1000, 500, curSpeek, cc.p(22, 5))
        SuperRichText.visible = false
        let allColors = SuperRichText.getAllColors()
        // cc.log('SuperRichTextAllColor=' + JSON.stringify(allColors))
        curSpeek = app.getTextFromFontHtml(curSpeek)
        // cc.log(' curSpeek====' + curSpeek)
        for(let i = 0; i < curSpeek.length; i++){
            let cloneTxt = txt.clone()
            cloneTxt.visible = false
            cloneTxt.setName('clone_' + i)
            cloneTxt.setString(curSpeek[i])
            if(allColors[i]) cloneTxt.setColor(allColors[i])
            // cloneTxt.setColor(cc.color(app.randomNum(1,255), app.randomNum(1,255),app.randomNum(1,255)))
            this.view['P_2'].addChild(cloneTxt)
            cloneTxt.x = txt.x + i * 26
            allTxtUI.push(cloneTxt)
            hangNum = parseInt(cloneTxt.x / 620)
            cloneTxt.x = cloneTxt.x - hangNum * 620
            cloneTxt.y = cloneTxt.y - hangNum * cloneTxt.height
        }

        for(let i = 0 ; i < allTxtUI.length; i++){
            let ui = allTxtUI[i]
            ui.y = ui.y  +  hangNum * 20
        }

        app.autoTypingColor(this.view['P_2'], curSpeek, this._speakInterval, 0.03, ()=> {
            if(callback) callback()
        })

    },
    showA3(curSpeek,callback) {
        this._speakInterval = 0.2
        if (this.view['Lad_Rightdi_1']) {
            this.view['Lad_Rightdi_1'].visible = false
            this.view['Lad_Rightdi_1'].active = false
        }
        if (this.view['Lad_Rightdi_2']) {
            this.view['Lad_Rightdi_2'].visible = false
            this.view['Lad_Rightdi_2'].active = false
        }
        if (this.view['Lad_Rightdi_3']) {
            this.view['Lad_Rightdi_3'].visible = true
            this.view['Lad_Rightdi_3'].active = true
        }
        if (this.view['content3']) this.view['content3'].getComponent(cc.Label).string = ''
        this.view['content3'].visible = true
        app.autoTyping(this.view['content3'], curSpeek, this._speakInterval, 0.03, ()=> {
            if(callback) callback()
        })
        return

        let isFuWenBen = curSpeek.search("<font")
        if(isFuWenBen >= 0){
            this.view['content3'].visible = true
        }
        else{
            this.view['content3'].visible = true
            app.autoTyping(this.view['content3'], curSpeek, this._speakInterval, 0.03, ()=> {
                if(callback) callback()
            })
            return
        }

        let txt = this.view['txt_3']
        txt.visible = false
        let allTxtUI = []
        let hangNum = 0
        app.clearAllChildRuleOutChild(this.view['P_3'],'txt_3')

        let SuperRichText = view.createView(this.view['P_3'], 'GameEngine/EngineUtils/SuperRichText', 1000, 500, curSpeek, cc.p(22, 5))
        SuperRichText.visible = false
        let allColors = SuperRichText.getAllColors()
        // cc.log('SuperRichTextAllColor=' + JSON.stringify(allColors))
        curSpeek = app.getTextFromFontHtml(curSpeek)

        for(let i = 0; i < curSpeek.length; i++){
            let cloneTxt = txt.clone()
            cloneTxt.visible = false
            cloneTxt.setName('clone_' + i)
            cloneTxt.setString(curSpeek[i])
            cloneTxt.x = txt.x + i * 26
            if(allColors[i]) cloneTxt.setColor(allColors[i])
            // cloneTxt.setColor(cc.color(app.randomNum(1,255), app.randomNum(1,255),app.randomNum(1,255)))
            this['P_3'].addChild(cloneTxt)
            allTxtUI.push(cloneTxt)
            hangNum = parseInt(cloneTxt.x / 620)
            cloneTxt.x = cloneTxt.x - hangNum * 620
            cloneTxt.y = cloneTxt.y - hangNum * cloneTxt.height
        }

        for(let i = 0 ; i < allTxtUI.length; i++){
            let ui = allTxtUI[i]
            ui.y = ui.y  +  hangNum * 20
        }

        app.autoTypingColor(this.view['P_3'], curSpeek, this._speakInterval, 0.03, ()=> {
            if(callback) callback()
        })
    },

    showNo() {
        this._speakInterval = 0.2
        if (this.view['Lad_Rightdi_1']) {
            this.view['Lad_Rightdi_1'].visible = false
            this.view['Lad_Rightdi_1'].active = false
        }
        if (this.view['Lad_Rightdi_2']) {
            this.view['Lad_Rightdi_2'].visible = false
            this.view['Lad_Rightdi_2'].active = false
        }
        if (this.view['Lad_Rightdi_3']) {
            this.view['Lad_Rightdi_3'].visible = false
            this.view['Lad_Rightdi_3'].active = false
        }
        if (this.view['content1']) this.view['content1'].getComponent(cc.Label).string = ''
        if (this.view['content2']) this.view['content2'].getComponent(cc.Label).string = ''
        if (this.view['content3']) this.view['content3'].getComponent(cc.Label).string = ''
    },

    setSpeakRoleName(curSpeekName,curRoleName) {
        if (curSpeekName === 'a1') {
            this.view['Lad_Rightdi_1'].active = true
            this.view['Lad_Rightdi_2'].active = false
            this.view['Lad_Rightdi_3'].active = false
            if(this.view['name1']) this.view['name1'].getComponent(cc.Label).string = curRoleName
        } else if (curSpeekName === 'a2') {
            this.view['Lad_Rightdi_1'].active = false
            this.view['Lad_Rightdi_2'].active = true
            this.view['Lad_Rightdi_3'].active = false
            if(this.view['name2']) this.view['name2'].getComponent(cc.Label).string = curRoleName
        } else if (curSpeekName === 'a3') {
            this.view['Lad_Rightdi_1'].active = false
            this.view['Lad_Rightdi_2'].active = false
            this.view['Lad_Rightdi_3'].active = true
            if(this.view['name3']) this.view['name3'].getComponent(cc.Label).string = curRoleName
        }
    },

    start () {

    },

    // update (dt) {},
});
