

var result_time = 0;
const role =['duelist','sentinel','initiator','controller']
const jp_duelist = 'デュエリスト';
const jp_sentinel = 'センチネル';
const jp_initiator = 'イニシエーター';
const jp_controller = 'コントローラー';
const duelist =['ジェット','フェニックス','ネオン','レイナ','ヨル','レイズ']
const sentinel =['セージ','サイファー','キルジョイ','チェンバー']
const initiator =['ブリーチ','ソーヴァ','スカイ','フェイド','KAY/O']
const controller = ['アストラ','ヴァイパー','オーメン','ブリム','ハーバー']

var agentlist = duelist.concat(sentinel,initiator,controller)
var picklist = agentlist
console.log(agentlist)
console.log(agentlist.length)

function hideshow_roulette(hideshow){
	console.log(hideshow)
	if (hideshow=='hide'){
		const hide_roulette = document.getElementsByClassName("hide_roulette");
        for(let h =0; h<hide_roulette.length; h++){
    	    hide_roulette[h].style.display="none";
        }
	}
	if (hideshow=='show'){
		const hide_roulette = document.getElementsByClassName("hide_roulette");
        for(let h =0; h<hide_roulette.length; h++){
    	    hide_roulette[h].style.display="block";
        }
	}
}
window.onload = function () {

hideshow_roulette('hide');


var parent = document.getElementById("agentlist");
console.log(parent)
for (let i = 0; i < agentlist.length; i++){
	var el = document.createElement("input");
	el.setAttribute('type','button')

	el.setAttribute('class','agent');
	el.setAttribute('value',agentlist[i])
	el.classList.add('agent')
	for (let r = 0; r < role.length; r++){
		if (eval(role[r]).indexOf(agentlist[i]) >-1){
			el.classList.add(role[r])
		}

	}
	console.log(el)
    parent.appendChild(el)
  }


  var agent = document.getElementsByClassName('agent');
 
  for (i = 0; i < agent.length; i++) { //エージェント一覧をループ
    agent[i].addEventListener("click", function() { //agentにクリックイベント追加
      if (this.classList.contains('nohave')){
		console.log(this.value)
		picklist.push(this.value)
		console.log(picklist)
		this.classList.toggle('nohave');
		return;
	  } 
	  this.classList.toggle('nohave');

      var val = this.value;
      var picklist2 = picklist.filter(function(a) {
        return a !== val;
	  });
	  console.log(picklist2)
	  picklist = picklist2;

    });
  }
}


function confirm(){ //抽選不参加エージェント確定
	const removelist =document.getElementById('removelist');
	removelist.innerHTML = ``;
	removelist.append(document.createTextNode('抽選不参加エージェント➤'))
	for (let i = 0; i < agentlist.length; i++){ //不参加を選択したエージェントをagentリストと照らし合わせる
		console.log(picklist.indexOf(agentlist[i]))
    	if (picklist.indexOf(agentlist[i]) == -1){
			removelist.appendChild(document.createTextNode(agentlist[i] + ','))
		}
	if (picklist.length==0){
		alert(picklist.length)
		alert('ランダム抽選に参加するエージェントを最低でも1人以上用意してください。')
		return
	}else{
		hideshow_roulette('show')
	}
	}

	var parent2 = document.getElementById("picklist"); //ピックしたやつを表示
	parent2.innerHTML = ``;
	console.log(parent2)
	for (let i = 0; i < picklist.length; i++){
		var el = document.createElement("input");
		el.setAttribute('type','text')
		console.log(el)
		el.setAttribute('class','pick');
		el.setAttribute('value' ,picklist[i])
		el.classList.add('agent' + [i])
		for (let r = 0; r < role.length; r++){
			if (eval(role[r]).indexOf(picklist[i]) >-1){
				el.classList.add(role[r])
			}
	
		}
		el.disabled = true;
		
		parent2.appendChild(el)
	  }
}
//ルーレット loop変数で何回実行するか
async function roulette(loop){ 
	hideshow_roulette('hide');
	if (loop == 4545){
		var select_num = document.getElementById('time_select')
		loop = select_num.value
	}
	for (let l=0; l < loop; l++){
		
		hideshow_roulette('hide');
		var parent3 = document.getElementById("picklist");
	

		var children = parent3.children
		var random = Math.floor(Math.random() * agentlist.length);
		var flash_time = 8;
		if (loop >= 3){
			flash_time = 6;
		}
		if (loop >= 5){
			flash_time = 5;
		}
		if (loop >= 10){
			flash_time = 4;
		}if (loop >= 20){
			flash_time = 2;
		}if (loop >=25){
			flash_time = 0;
		}
		for (let i = 0; i < flash_time; i++){	 //演出フラッシュ

			while(children[random] == null){
				var random = Math.floor(Math.random() * agentlist.length);
			}
			children[random].classList.toggle('flash');
			await wait(0.2);
			children[random].classList.toggle('flash');
			var random = Math.floor(Math.random() * agentlist.length);
		}
		while(children[random] == null){
			var random = Math.floor(Math.random() * agentlist.length);
		}
		console.log(random + children[random].value) //結果決定
		
		
		if (announce_el != null){
			announce_parent.innerHTML = ``;
		}
		var announce_parent = document.getElementById('announce_result');
		
		var announce_el = document.createElement("p");
		
		announce_el.setAttribute('class','announce');
		for (let r = 0; r < role.length; r++){
			if (eval(role[r]).indexOf(children[random].value) >-1){
				announce_el.classList.add(role[r])
				var announce_role = document.createElement("p"); 
				announce_role.setAttribute('class','announce');
				announce_role.classList.add(role[r]);
				var jp_role = 'jp_' + role[r];
				announce_role.textContent=eval(jp_role);
				

			}
	
		}
		announce_el.textContent = children[random].value;
		console.log(announce_el)
		announce_parent.appendChild(announce_role);
		

		announce_parent.appendChild(announce_el);
		



		children[random].classList.toggle('flash');
		children[random].style.scale ="1.3";

		const resultparent = document.getElementById('resultlist')
		result_time += 1;
//		var result_el = document.createElement("input");
//		result_el.setAttribute('class','pick');
//		result_el.setAttribute('value' ,[result_time] + picklist[random])
//		result_el.classList.add('resultagent' + [random])
//		result_el.disabled = true;
//		resultparent.appendChild(result_el)





  // <table> 要素と <tbody> 要素を作成
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // すべてのセルを作成
        // 表の行を作成
        var row = document.createElement("tr");

    	for (var j = 0; j < 2; j++) {
          // <td> 要素とテキストノードを作成し、テキストノードを
          // <td> の内容として、その <td> を表の行の末尾に追加
            var cell = document.createElement("td");
	  
        	if (j == 0){
              var cellText = document.createTextNode(result_time);
            }if (j==1){
              var cellText = document.createTextNode(children[random].value + '✘');
			  for (let r = 0; r < role.length; r++){
				if (eval(role[r]).indexOf(children[random].value) >-1){
					cell.classList.add(role[r])
				}
		
			}
            }
			tbl.addEventListener("click", function() {
				this.remove();
			})
   
        	cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // 表の本体の末尾に行を追加
        tblBody.appendChild(row);
  

        // <tbody> を <table> の中に追加
        tbl.appendChild(tblBody);
        // <table> を resultlist の中に追加

        resultparent.appendChild(tbl);
        tbl.setAttribute("border", "2");
		if (result_time % 5 == 0){ //5つごとに改行用のスペースをいれる
			var result_space = document.createElement("div");
			result_space.setAttribute('class','space');
			resultparent.appendChild(result_space)
		}




      
		await wait(1)
	    
		checked_remove = document.getElementById('check-takeout').checked //削除するかの確認

		if (checked_remove==true ){
			children[random].remove();
			

		}else{
			children[random].classList.remove('flash');
			children[random].style.scale ="1";
		}
		
	    if (parent3.hasChildNodes() == false) {
		    confirm();
	    }
    }
	await wait(1)
    confirm();
	hideshow_roulette('show');
	if (announce_el != null){
		announce_parent.innerHTML = ``;
	}
	

}

  
  //n秒待機用
  const wait = (sec) => {
	return new Promise((resolve, reject) => {
	  setTimeout(resolve, sec*1000);
	});
  };
  
