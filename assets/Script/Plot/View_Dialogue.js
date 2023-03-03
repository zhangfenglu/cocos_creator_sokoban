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
        //dhkPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad : function() {
        UI_Control.prototype.onLoad.call(this)

       // this.initView()
       /* app.dynamicAddPrefab('dhk',this.view['dhk'],(dhkPrefab)=>{
            /!*let dhkPrefabScript = dhkPrefab.getComponent('dhk')
            dhkPrefabScript.setCallback(()=>{
                this.view['dhk'].removeAllChildren()
            })*!/
        })*/
    },


    //数据初始化
    initData(juQingInfo, callBack){
        cc.log('juQingInfo.plot_table====' + juQingInfo.plot_table)
        this.plot_table =  app.spitStrArr(juQingInfo.plot_table,"/")[1]
        this._callBack = callBack
        this._wordIndex = 0 //语句索引
        this._isSpeekOver = false //所有会话结束
        this._isSpeaking = false //正在会话中
        this._isPlayActioning = true //播放csb中的帧动画
        this._loop = 1 //单个帧动画循环播放
        this._autoPlay = 0 // 自动播放下一条语句


        this.initView()
        this.startRun()
    },

    initView:function() {
        app.btnClick(this.view['Panel_4'], ()=> {
            if(this._isSpeaking){
                //app.setTypingSpead(2)
            }else{
                cc.log('=======================this._isPlayActioning===' + this._isPlayActioning + ' this._isCanNext====' + this._isCanNext)
                if(!this._isPlayActioning && this._isCanNext ){
                    if (this._optionId == null || this._optionId === 0 || this._optionId === "" ){
                       /* if (this._soundHandle ) GlobalInterface.soundManager().stopEffect(this._soundHandle)
                        this.nextSpeak()*/
                    }else{
                        //带选项 界面逻辑 暂不实现

                    }
                }
            }
        })
        //app.dynamicAddPrefab('dhk',this.view['dhk'],(dhkPrefab)=> {
            /*let dhkPrefabScript = dhkPrefab.getComponent('dhk')
            dhkPrefabScript.setCallback(() => {
                this.view['dhk'].removeAllChildren()
            })*/
       // })
    },

    startRun () {
        this.nextSpeak()

        if (this._isAuto) {
            this.autoPlayJuQing()
        }
    },

    autoSpeek() {
        this._isSpeaking = true
        this._isPlayActioning = true
        let delayTime = 0
        if(this._curAnimation === 0) delayTime = 0.15

        app.delay(delayTime * 1000).then(()=>{
            if (this._curSpeekName === 'a1') {
                this.playCsbAction("animation" + this._curAnimation, this._loop === 1 ? true : false ,  ()=> {
                    this._isPlayActioning = false
                })
                app.log(' this._speakInterval====' +  this._speakInterval)

                if(this.dialogBoxView) this.dialogBoxView.showA1(this._curSpeek,()=>{
                    this._isSpeaking = false
                })

            } else if (this._curSpeekName === 'a2') {
                this.playCsbAction("animation" + this._curAnimation, this._loop === 1 ? true : false,  ()=> {
                    this._isPlayActioning = false
                })

                if(this.dialogBoxView) this.dialogBoxView.showA2(this._curSpeek,()=>{
                    this._isSpeaking = false
                })

            } else if (this._curSpeekName === 'a3') {
                this.playCsbAction("animation" + this._curAnimation, this._loop === 1 ? true : false,  ()=> {
                    this._isPlayActioning = false
                })

                if(this.dialogBoxView) this.dialogBoxView.showA3(this._curSpeek,()=>{
                    this._isSpeaking = false
                })

            } else if (this._curSpeekName === '') {
                this._isSpeaking = false
                if(this.dialogBoxView) this.dialogBoxView.showNo()
                this.playCsbAction("animation" + this._curAnimation, this._loop === 1 ? true : false,  ()=> {
                    this._isPlayActioning = false
                })
            }
        })



    },

    nextSpeak: function () {
        this._wordIndex = this._wordIndex + 1
        this.reFreshSpeakInfo()
        if (this._isSpeekOver) {
            app.delay(0.1 * 1000).then(()=>{
                if (this._callBack) this._callBack()
                this.node.onClose()
            })
        } else {
            this.autoSpeek()
        }

        if (this._autoPlay === 1) {
            this.autoPlayJuQing()
        }

    },

    reFreshSpeakInfo () {
        let Manager_Plot = app.getManager_Plot()
        let rowTableInfo = Manager_Plot.getJuQingContentByARowIndex(this.plot_table, this._wordIndex)
        //{"totalWordsNum":17,"curDiaLog":{"id":13,"Name":"a3","roleName":"不知火","dialogue":"还记得暴走的紫电吗 ？美优姐姐送她去休息，但是紫电现在仍然没有完全恢复。","effect":100,"bg_pic":100,"A3":10203,"A3_way":2,"Colour":null}}
        cc.log('rowTableInfo====' + JSON.stringify(rowTableInfo))

        if (rowTableInfo) {
            let curDiaLog = rowTableInfo.curDiaLog
            let nums = rowTableInfo.totalWordsNum
            if (rowTableInfo.curDiaLog ) {
                this._curSpeek = curDiaLog.dialogue //会话内容
                this._curSpeekName = curDiaLog.Name //会话人物ui位置标记
                this._curRoleName = curDiaLog.roleName //会话角色
                this._optionId = curDiaLog.OptionId //选项
                this._color = curDiaLog.Color //会话内容颜色值
                this._autoPlay = curDiaLog.autoPlay   //吓一条语句是否自动播放
                this._loop = curDiaLog.loop //csb帧动画循环播放
                this._dialogBox = curDiaLog.dialogBox // 会话窗口样式

                let Scenario_Dialog_style = app.getConfigInfoByTable('Scenario_Table','Scenario_Dialog_style',this._dialogBox)
                this.csb_path = Scenario_Dialog_style.csb_path

              /* if(this._wordIndex === 1) {
                    this.dialogBoxView = view.createView(this['dhk'],'GameView/Plot/dhk',this.csb_path,()=>{
                        if (this._callBack) this._callBack()
                        this.onClose()
                    })
                    this.dialogBoxView.cloneNextBtn(this)
                }

                if(this.dialogBoxView) this.dialogBoxView.setSpeakRoleName(this._curSpeekName,this._curRoleName)*/

                if(typeof(curDiaLog.RoleAction) !== undefined) this._curAnimation = parseInt(this._wordIndex - 1)
                else this._curAnimation = curDiaLog.RoleAction
                this._WaitTime = parseInt(curDiaLog.WaitTime) ? parseInt(curDiaLog.WaitTime) : 0
                this._WaitTime = 0

                this._effect = curDiaLog.effect //音效
                this._isCanNext = false

                if (this._WaitTime <= 0) {
                    this._isCanNext = true
                } else {
                    //暂时省略掉
                }

                //播放声音处理
                if (this._effect !== 0) {
                    if (this._soundHandle) GlobalInterface.soundManager().stopEffect(this._soundHandle)
                    let scenario_RoleVoice = app.getConfigInfoByTable('Scenario_Table','Scenario_RoleVoice',this._effect)
                    this._effect = scenario_RoleVoice.path
                   // this._soundHandle = GlobalInterface.soundManager().playEffect(this._effect)
                }

                this._speakInterval = 0.2
                this.bg_pic = curDiaLog.bg_pic //背景图片id
                cc.log('this.bg_pic=====' + this.bg_pic)
                let scenario_Bg_Pic = app.getConfigInfoByTable('Scenario_Table','Scenario_Bg_Pic',this.bg_pic)
                this.bg_pic = scenario_Bg_Pic.path

                this.bg_effect = curDiaLog.bg_effect
                let scenario_Bg_Display_effect = app.getConfigInfoByTable('Scenario_Table','Scenario_Bg_Display_effect',this.bg_effect)
                if(typeof (this.bg_effect) === undefined || this.bg_effect === 0) {
                    this.bg_effect = null
                    scenario_Bg_Display_effect = null
                }
                if(scenario_Bg_Display_effect) this.bg_effect = scenario_Bg_Display_effect.csb //背景特效

                this.filter_effect = curDiaLog.filter_effect
                let scenario_filter_effect = app.getConfigInfoByTable('Scenario_Table','Scenario_filter_effect',this.filter_effect)
                if(typeof (this.filter_effect) === undefined || this.filter_effect === 0) {
                    scenario_filter_effect = null
                    this.filter_effect = null
                }
                if(scenario_filter_effect) this.filter_effect = scenario_filter_effect.csb //滤镜特效

               /* if(this.filter_effectView){
                    this.filter_effectView.onClose()
                    this.filter_effectView = null
                    this['lujing'].removeAllChildren(true)
                }
                if(this.filter_effect && !cc.isUndefined(this.filter_effect)){
                    this.filter_effectView = view.createView(this['lujing'],'GameView/Plot/filter_effect',this.filter_effect)
                } */

               /* if(this.bt_txView){
                    this.bt_txView.onClose()
                    this.bt_txView = null
                    this['bg_tx'].removeAllChildren(true)
                }
                if(this.bg_effect && !cc.isUndefined(this.bg_effect)) this.bt_txView = view.createView(this['bg_tx'],'GameView/Plot/bg_tx',this.bg_effect)
*/
                this.A1 = curDiaLog.A1
                this.A1_way = curDiaLog.A1_way
                this.A2 = curDiaLog.A2
                this.A2_way = curDiaLog.A2_way
                this.A3 = curDiaLog.A3
                this.A3_way = curDiaLog.A3_way
                let scenario_Role1 = app.getConfigInfoByTable('Scenario_Table','Scenario_Role',this.A1)
                if(typeof (this.A1) === undefined) scenario_Role1 = null
                let scenario_Role2 = app.getConfigInfoByTable('Scenario_Table','Scenario_Role',this.A2)
                if(typeof (this.A2) === undefined) scenario_Role2 = null
                let scenario_Role3 = app.getConfigInfoByTable('Scenario_Table','Scenario_Role',this.A3)
                if(typeof (this.A3) === undefined) scenario_Role3 = null
                let scenario_Role_Display_effect1 = app.getConfigInfoByTable('Scenario_Table','Scenario_Role_Display_effect',this.A1_way)
                if(typeof (this.A1_way) === undefined) scenario_Role_Display_effect1 = null
                let scenario_Role_Display_effect2 = app.getConfigInfoByTable('Scenario_Table','Scenario_Role_Display_effect',this.A2_way)
                if(typeof (this.A2_way) === undefined) scenario_Role_Display_effect2 = null
                let scenario_Role_Display_effect3 = app.getConfigInfoByTable('Scenario_Table','Scenario_Role_Display_effect',this.A3_way)
                if(typeof (this.A3_way) === undefined) scenario_Role_Display_effect3 = null

                //角色动作
                let csbActionName1 = null
                if(scenario_Role_Display_effect1) csbActionName1 = scenario_Role_Display_effect1.csbActionName

                let csbActionName2 = null
                if(scenario_Role_Display_effect2) csbActionName2 = scenario_Role_Display_effect2.csbActionName

                let csbActionName3 = null
                if(scenario_Role_Display_effect3) csbActionName3 = scenario_Role_Display_effect3.csbActionName

                if(scenario_Role1) {
                   /* if(this.roleView1 && this.roleView1.getRole() === scenario_Role1){}
                    else{
                        if(this.roleView1){
                            this.roleView1.onClose()
                            this.roleView1 = null
                        }
                        this.roleView1 = view.createView(this['girl_1'],'GameView/Plot/girl')
                        if(csbActionName1) this.roleView1.showCsbAction(csbActionName1)
                        this.roleView1.showRole(scenario_Role1)
                    }*/
                }
                else{
                   /* if(this.roleView1){
                        this.roleView1.onClose()
                        this.roleView1 = null
                    }*/
                }
                if(scenario_Role2) {
                   /* if(this.roleView2 && this.roleView2.getRole() === scenario_Role2){}
                    else {
                        if (this.roleView2) {
                            this.roleView2.onClose()
                            this.roleView2 = null
                        }
                        this.roleView2 = view.createView(this['girl_2'], 'GameView/Plot/girl')
                        if(csbActionName2) this.roleView2.showCsbAction(csbActionName2)
                        this.roleView2.showRole(scenario_Role2)
                    }*/
                }
                else{
                   /* if(this.roleView2){
                        this.roleView2.onClose()
                        this.roleView2 = null
                    }*/
                }

                if(scenario_Role3) {
                   /* if(this.roleView3 && this.roleView3.getRole() === scenario_Role3){}
                    else {
                        if (this.roleView3) {
                            this.roleView3.onClose()
                            this.roleView3 = null
                        }
                        this.roleView3 = view.createView(this['girl_3'], 'GameView/Plot/girl')
                        if(csbActionName3) this.roleView3.showCsbAction(csbActionName3)
                        this.roleView3.showRole(scenario_Role3)
                    }*/
                }
                else {
                   /* if (this.roleView3) {
                        this.roleView3.onClose()
                        this.roleView3 = null
                    }*/
                }
                this.bg_pic = './er/' + this.bg_pic
                if(this.bg_pic && this.view['bg']) {
                    cc.loader.loadRes(this.bg_pic,cc.SpriteFrame,(err,frame)=> {
                        cc.log(' err====' + err)
                        this.view['bg'].getComponent(cc.Sprite).spriteFrame=frame
                    })

                    //this['bg'].loadTexture(this.bg_pic, ccui.Widget.LOCAL_TEXTURE)
                }


            }
            else cc.log('获取语句异常')
        }
        else this._isSpeekOver = true
    },

    autoPlayJuQing() {
        let delayTime = cc.delayTime(1)
        let callback = cc.callFunc( ()=> {
            cc.log('aaaaa1')
            if(this._isSpeaking){

            }else{
                if(this._isPlayActioning == null || this._isPlayActioning){
                    if(this._optionId == null || this._optionId === 0 || this._optionId === ""){
                        //关闭声音处理
                        if(this._soundHandle){
                           // GlobalInterface.soundManager().stopEffect(this._soundHandle)
                        }
                        this.nextSpeak()
                    }else{
                        //带有选项功能 暂不实现

                    }

                }

            }
        })

        let seq = cc.sequence(delayTime, callback)

        if(this._isAuto){
            this.node.runAction(cc.RepeatForever.create(seq))
        }else{
            this.node.runAction(seq)
        }

    },

    start () {

    },

    // update (dt) {},
});
