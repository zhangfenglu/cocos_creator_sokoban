
if (!window.app) window.app = {}
let Manager_Plot = require("./GameManager/Manager_Plot")
app.Manager_Plot = new Manager_Plot()

//配置文件必须放在 resources中 且不能包含路径 直接 require
app.getConfigInfoByTable = function(tableName,childTableName,index){
	if(tableName.indexOf('/') !== -1){
		tableName = tableName.substring(tableName.lastIndexOf('/') + 1)
	}
    let requireTable =  tableName
    cc.log('加载 配置文件===' + requireTable)
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
		newMyPrefab.setPosition(0, 0 )
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

//获取剧情管理类
app.getManager_Plot = function() {
	return app.Manager_Plot
}




