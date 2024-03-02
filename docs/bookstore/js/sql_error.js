	function show_div(div_id,btn_id){
		var div = document.getElementById(div_id);
		div.style.display = "block";
		var btn = document.getElementById(btn_id);
		btn.style.display = "none";
	}
	function hide_div(div_id,btn_id){
		var div = document.getElementById(div_id);
		div.style.display = "none";
		var btn = document.getElementById(btn_id);
		btn.style.display = "inline-block";
	}
	function redirect(myurl){
		window.location.href = myurl;
	}