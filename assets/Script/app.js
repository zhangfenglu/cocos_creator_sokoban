
if (!window.app) window.app = {}
let Manager_Plot = require("./GameManager/Manager_Plot")
app.Manager_Plot = new Manager_Plot()

//配置文件必须放在 resources中 且不能包含路径 直接 require
app.getConfigInfoByTable = function(tableName,childTableName,index){
	if(tableName.indexOf('/') !== -1){
		tableName = tableName.substring(tableName.lastIndexOf('/') + 1)
	}
    let requireTable =  tableName
   // cc.log('加载 配置文件===' + requireTable)
	let table = require (requireTable)
	if (index == null){
		if(childTableName == null) return table
		return table[childTableName]
	}
	index = index + ''
	if(index.indexOf('id_') !== -1)  {
		if(childTableName == null) return table[index]
		return table[childTableName][index]
	}else{
		if(childTableName == null) return table["id_" + index]
		return table[childTableName]["id_" + index]
	}
}

//动态添加预制体
app.dynamicAddPrefab = function(str,parentNode,callback) {
	let onResourceLoaded = function(errorMessage, loadedResource ) {
		if(errorMessage ) {
			cc.log('Prefab error:' + errorMessage )
			return
		}
		if( !(loadedResource instanceof cc.Prefab )) {
			cc.log('Prefab error')
			return
		}

		let newMyPrefab = cc.instantiate(loadedResource)
		newMyPrefab.parent = parentNode
		//parentNode.addChild(newMyPrefab)
		//newMyPrefab.setPosition(0, 0 )
		if(callback) callback(newMyPrefab)
		//let newMyPrefabScript = newMyPrefab.getComponent('showTips')
	}
	cc.loader.loadRes(str, onResourceLoaded)
}

//延迟函数 app.delay(1000).then(() => {})
app.delay = function(ms) {
	return new Promise (resolve => setTimeout(resolve, ms))
}

//获取 分隔符 分割后的数组
app.spitStrArr = function(str,flag){
	let strArray = str.split(flag)
	return strArray
}

app.btnClick = function(node,callback) {
	node.on(
		cc.Node.EventType.TOUCH_START,
		 (event)=> {
			if(callback) callback()
		}
	)
}

app.isObjectValid = function(node) {
	if(node){
		let isValid = cc.isValid(node)
		return isValid
	}
	return false
}

//获取对象长度
app.getObjectLength = function(object) {
	let length = 0
	for(let key in object) length ++
	return length
}

//字符串截取 start开始位置,length截取长度不能负数
app.getSubStr = function(coment,start,length){
    return coment.substr(start,length)
}

//获取剧情管理类
app.getManager_Plot = function() {
	return app.Manager_Plot
}

//播放spin动画
app.playSpinAction = function (parentNode, skelName, atlasName, trackIndex, actionName, isLoop, func) {
	parentNode.visible = true
    cc.loader.loadRes(skelName, sp.SkeletonData, (err, skeletonData) => {
    	cc.log('spine 加载成功了吗 ===' + skeletonData)
        let s = parentNode.addComponent(sp.Skeleton)
        s.skeletonData = skeletonData
        //播放动画
        s.setAnimation(trackIndex, actionName, isLoop)
        //监听播放完毕的回调
        s.setCompleteListener(trackEntry => {
        	//cc.log(' trackEntry===' + JSON.stringify(trackEntry.animation))
            let animationName = trackEntry.animation ? trackEntry.animation.name : ''
            cc.log('[complete] animation: ' + animationName)
            if(func) func()
        })
    })
}


//延迟执行
app.delayHandle = function (node,func,delayTime,isStopAllAction) {
	let time = cc.delayTime(delayTime)
	let callback = cc.callFunc(function () {
		if(func) func()
		if(node && app.isObjectValid(node) && isStopAllAction){
			node.stopAllActions()
		}
	})
	let sequence = cc.sequence(time, callback)
	if(node && app.isObjectValid(node)) node.runAction(sequence)
}


//循环执行
app.repeatHandle = function (node,func,delayTime) {
	if(node && app.isObjectValid(node)) {
		let time = cc.delayTime(delayTime)
		let callback = cc.callFunc(function () {
			if (func) func()
		})
		let sequence = cc.sequence(time, callback)
		let action = cc.repeatForever(sequence)
		node.runAction(action)
	}
}

//截取指定个字符
app.substr = function (content, num) {
	let newStr = ""
	if(num <= content.length) {
		for (let i = 0; i < num; i++) {
			let onlyStr = content.charAt(i)
			newStr = newStr + onlyStr
		}
	}
	return newStr
}

app.setTypingSpead = function(spead){
	app.typingSpead = spead
}

app.getTypingSpead = function(){
	if(typeof (app.typingSpead) === undefined || !app.typingSpead) {
		app.typingSpead = 1
	}
	return app.typingSpead
}

//自动输出文字功能
app.autoTyping = function (node, content, pauseTime, typingSpead,func) {
	let num = 1
	if(node) node.stopAllActions()
	node.visible = true
	app.delayHandle(node,function () {
		app.repeatHandle(node,function (){
			let subStr = app.substr(content,num)
			if(subStr === content && func){
				func()
				node.stopAllActions()
				node.getComponent(cc.Label).string = subStr
				app.setTypingSpead(1)
				return
			}
			num = num + app.getTypingSpead()
			if(subStr === '' && func){
				func()
				node.stopAllActions()
				app.setTypingSpead(1)
				return
			}
			node.getComponent(cc.Label).string = subStr
		},typingSpead)
	},pauseTime)
}




