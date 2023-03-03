cc.Class({
   // extends: cc.Component,

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

    // onLoad () {},


    getName(){
        return this.name;
    },

    setName(name){
        this.name = name;
    },

    doSomething(){
        cc.log(' doSomethingdoSomethingdoSomethingdoSomethingdoSomething')
    },

    getJuQingInfo(juqingId) {
        let plotInfo = app.getConfigInfoByTable('Plot_all',null,juqingId)
        return plotInfo
    },

    PlayJuQing(PrefabScript,juqingId, callBack){
        let juQingInfo = this.getJuQingInfo(juqingId)
        if(juQingInfo.id){
            PrefabScript.initData(juQingInfo,()=>{})
        }
    },

    getJuQingContentByARowIndex(tableName, wordIndex) {
        let plotInfo = app.getConfigInfoByTable(tableName,null,wordIndex)
        let tableData = {}
        tableData.totalWordsNum = app.getObjectLength( app.getConfigInfoByTable(tableName,null,null))
        tableData.curDiaLog = plotInfo
        if(typeof tableData.curDiaLog === 'undefined' ) return null
        return tableData
    },

    start () {

    },

    // update (dt) {},
});
