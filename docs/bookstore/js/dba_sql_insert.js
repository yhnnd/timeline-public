		var repeat, id_td, style_prev, timer_prev;

		function insert_input_check_resetStyle(){
			id_td.setAttribute('style',style_prev);
		}
		function insert_input_check_alert(){
			id_td.setAttribute("style","background-color:#faebcc;");
			setTimeout("insert_input_check_resetStyle()",300);
		}
		
		function insert_input_check(FromInput,ToInput){
				var InputNames = ["id","username","identity","password","age"];
				for(var i = FromInput; i <= ToInput; ++i){
					var InputName = "db_insert_" + InputNames[i];
					var Input = document.getElementById(InputName);
					var InputValue = Input.value;

					var InputValueIsIllegal = false;
					var InputValueIsNull = InputValue==null;
					var InputValueIsEmpty = InputValue=="";

					if( i==0 && InputValueIsNull==false && InputValueIsEmpty==false ){
						var id_tds = document.getElementsByName("user_id");
						for( var n = 0; n < id_tds.length; ++n ){
							if(InputValue == id_tds[n].innerHTML){
								InputValueIsIllegal = true;
								id_td = id_tds[n];
								style_prev = id_td.getAttribute("style");
								repeat = 0;
								window.clearInterval(timer_prev);
								timer_prev = setInterval(function (){
									if( repeat < 3 ) insert_input_check_alert();
									++ repeat;
								},400);
							}
						}
					}
					if( InputValueIsIllegal || InputValueIsNull || InputValueIsEmpty ){
						if(InputNames[i]=="age"){// db_insert_age is nullable
							Input.value="0";
							Input.setAttribute("style","background-color:#d6e9c6;");//light gray green
						} else {// db_insert_id, db_insert_name, db_insert_age
							if( InputValueIsIllegal ) setAlert("alert-warning", InputNames[i]+" cannot be "+InputValue+" !");
							else if( InputValueIsNull ) setAlert("alert-warning", InputNames[i] + " cannot be null !");
							else if( InputValueIsEmpty ) setAlert("alert-warning", InputNames[i] + " cannot be empty !");
							var Alert = document.getElementsByClassName("alert")[0];
							var BackColor = Alert.getAttribute("background-color");
							Input.setAttribute("style","background-color:#faebcc;");//light gray red
							return false;
						}
					}else{// Approved
						Input.setAttribute("style","background-color:#d6e9c6;");//light gray green
					}
				}
				return true;
		}
		function insert_submit(FormName){
				var myForm = document.getElementById(FormName);
				if(insert_input_check(0,4)==true)
					myForm.submit();
		}
		function insert_reset(){
				var InputNames = ["id","username","identity","password","age"];
				for(var i = 0; i<InputNames.length; ++i){
					var Input = document.getElementById("db_insert_"+InputNames[i]);
					if(InputNames[i]=="identity") Input.style.backgroundColor = "#eee";
					else Input.style.backgroundColor = "#ffffff";
				}
				setAlert("alert-info", "insert form reseted");
		}