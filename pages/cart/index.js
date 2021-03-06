var app = getApp()
var startX;
var startY;
var endX;
var endY;
var key;
var maxRight = 60;
Page({
	data:{
		// carts: [],
		carts: [
			{id:1008,title:'Macbook Air',image:'https://img13.360buyimg.com/n7/jfs/t2191/334/2921047884/217714/eb1dd389/571f1329Ne4122e4c.jpg',num:'1',price:'6968.0',sum:'6968.0',selected:true, right:0, startRight:0, txtStyle:""},
			{id:1009,title:'Zippo打火机',image:'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg',num:'1',price:'198.0',sum:'198.0',selected:true, right:0, startRight:0, txtStyle:""},
			{id:1012,title:'iPhone7 Plus',image:'https://img13.360buyimg.com/n7/jfs/t3235/100/1618018440/139400/44fd706e/57d11c33N5cd57490.jpg',num:'1',price:'7188.0',sum:'7188.0',selected:true, right:0, startRight:0, txtStyle:""},
			{id:1031,title:'得力订书机',image:'https://img10.360buyimg.com/n7/jfs/t2005/172/380624319/93846/b51b5345/5604bc5eN956aa615.jpg',num:'3',price:'15.0',sum:'45.0',selected:false, right:0, startRight:0, txtStyle:""},
			{id:1054,title:'康师傅妙芙蛋糕',image:'https://img14.360buyimg.com/n7/jfs/t2614/323/914471624/300618/d60b89b6/572af106Nea021684.jpg',num:'2',price:'15.2',sum:'30.4',selected:false, right:0, startRight:0, txtStyle:""},
			{id:1063,title:'英雄钢笔',image:'https://img10.360buyimg.com/n7/jfs/t1636/60/1264801432/53355/bb6a3fd1/55c180ddNbe50ad4a.jpg',num:'1',price:'122.0',sum:'122.0',selected:true, right:0, startRight:0, txtStyle:""},
		],
		minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
		selectedAllStatus: false,
		toastHidden: true,
		toastStr: '',
		total: '',
		delBtnWidth:180//删除按钮宽度单位（rpx）
	},
	bindMinus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].num = num;
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		this.sum();
	},
	bindPlus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
		// 自增
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].num = num;
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		this.sum();
	},
	bindManual: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var carts = this.data.carts;
		var num = e.detail.value;
		carts[index].num = num;
		// 将数值与状态写回
		this.setData({
			carts: carts
		});
		console.log(this.data.carts);
	},
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
		//拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var selected = this.data.carts[index].selected;
		var carts = this.data.carts;
		// 对勾选状态取反
		carts[index].selected = !selected;
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
		});
		this.sum();
	},
	bindSelectAll: function() {
		// 环境中目前已选状态
		var selectedAllStatus = this.data.selectedAllStatus;
		// 取反操作
		selectedAllStatus = !selectedAllStatus;
		// 购物车数据，关键是处理selected值
		var carts = this.data.carts;
		// 遍历
		for (var i = 0; i < carts.length; i++) {
			carts[i].selected = selectedAllStatus;
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			carts: carts,
		});
		this.sum();

	},
	bindCheckout: function() {
		// 初始化toastStr字符串
		var toastStr = 'id:';
		// 遍历取出已勾选的id
		for (var i = 0; i < this.data.carts.length; i++) {
			if (this.data.carts[i].selected) {
				toastStr += this.data.carts[i].id;
				toastStr += ' ';
			}
		}
		//存回data
		this.setData({
			toastHidden: false,
			toastStr: toastStr
		});
	},
	bindToastChange: function() {
		this.setData({
			toastHidden: true
		});
	},
	onLoad: function() {
		// 更新数据
		// this.setData( {
		// 	carts: app.cartInfo.carts
		// })
		this.sum();
	},
	sum: function() {
		var carts = this.data.carts;
		// 计算总金额
		var total = 0;
		for (var i = 0; i < carts.length; i++) {
			if (carts[i].selected) {
				total += carts[i].num * carts[i].price;
			}
		}
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
			total: '￥' + total
		});
	},
	drawStart : function(e){
     // console.log("drawStart");
     var touch = e.touches[0];  
     startX = touch.clientX;  
     startY = touch.clientY;  
     var carts = this.data.carts;  
     for(var i in carts){  
     	var data = carts[i];  
     	data.startRight = data.right;  
     }  
     key = true;  
	 },  
	 drawEnd : function(e){  
	 	console.log("drawEnd");  
	 	var carts = this.data.carts;  
	 	for(var i in carts){  
	 		var data = carts[i];  
	 		if(data.right <= 100/2){  
	 			data.right = 0;  
	 		}else{  
	 			data.right = maxRight;  
	 		}  
	 	}  
	 	this.setData({  
	 		carts:carts  
	 	});  
	 },  
	 drawMove : function(e){  
	      //console.log("drawMove");  
	      var dataId = e.currentTarget.id;  
	      var carts = this.data.carts;  
	      if(key){  
	      	var touch = e.touches[0];  
	      	endX = touch.clientX;  
	      	endY = touch.clientY;  
	      	console.log("startX="+startX+" endX="+endX );  
	      	if(endX - startX == 0)  
	      		return ;  
	           //从右往左  

	           if((endX - startX) < 0){  
	           	for(var k in carts){  
	           		var data = carts[k];  
	           		if(carts[k].id == dataId){  
	           			var startRight = carts[k].startRight;  
	           			var change = startX - endX;  
	           			startRight += change;  
	           			if(startRight > maxRight)  
	           				startRight = maxRight;  
	           			carts[k].right = startRight;  
	           		}  
	           	}  
	            }else{//从左往右  
	            	for(var k in carts){  
	            		var data = carts[k];  
	            		if(carts[k].id == dataId){  
	            			var startRight = carts[k].startRight;  
	            			var change = endX - startX;  
	            			startRight -= change;  
	            			if(startRight < 0)  
	            				startRight = 0;  
	            			carts[k].right = startRight ;  
	            		}  
	            	}  
	            }  
	            this.setData({  
	            	carts: carts
	            });  

	        }  
	},  
    //删除item  
	delItem: function(e){  
	  	var dataId = e.target.dataset.id;  
	  	console.log("删除"+dataId);  
	  	var carts = this.data.carts;  
	  	var carts1 = [];   
	  	for(var i in carts){  
	  		var item = carts[i];  
	  		if(item.id != dataId){  
	  			carts1.push(item);  
	  		}  
	  	}  
	  	this.setData({  
	  		carts: carts1  
	  	});  
	}

})