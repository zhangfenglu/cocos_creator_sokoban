// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

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

     load_all_nodes : function(root) {
          this.root = root
          for(let i = 0; i < root.childrenCount; i++){
              /*if(this.view[root.children[i].name]){
                  cc.assert(false, " !! csb文件中存在同名的node name = " + root.children[i].name + " !!")
                  return
              }*/
              this.view[root.children[i].name] = root.children[i]
              this.load_all_nodes(root.children[i])
          }
     },

     playCsbAction:function(actionName, isLoop, func){
         let animationComponet = this.getComponent(cc.Animation)
         if(isLoop) animState.wrapMode = cc.WrapMode.Loop
         let animState = animationComponet.play(actionName)
         if (animState) {
             animState.on('stop', (event) => {
                 // 处理停止播放时的逻辑
                 let clip = event.detail
                if(func) func()
             }, this)

         }
     },

     onLoad () {
         this.view = {}
         this.load_all_nodes(this.node)
     },

    onClose(){
       if(app.isObjectValid(this.node)) {
           this.node.removeFromParent(true)
           this.node = null
       }
    },

    start () {

    },

    // update (dt) {},
});
