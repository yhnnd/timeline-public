		function post(action,name,value){
				var myForm = document.createElement("form");
				myForm.method="post";
				myForm.action = action;
				var myInput = document.createElement("input");
				myInput.setAttribute("name", name);
				myInput.setAttribute("type","text");
				myInput.setAttribute("value",value);
				myForm.appendChild(myInput);
				document.body.appendChild(myForm);
				myForm.submit();
				document.body.removeChild(myForm);
		}
		
		function setAlert(className,text){
			var Alert = document.getElementsByClassName("alert")[0];
				if(Alert!=undefined){
					Alert.setAttribute("class","db-info alert "+className);
					Alert.innerHTML = text;
				}
		}

		function bodyonload(){
			console.log("bodyonload() started");
			var InputNames = ["id","username","identity","password","age"];
			for(var i = 0; i<InputNames.length; ++i){
				var Input;
				Input = document.getElementById("db_insert_"+InputNames[i]);
				Input.setAttribute("onfocus","setAlert('alert-warning','input "+InputNames[i]+"')");
				Input.setAttribute("onblur","insert_input_check("+i+","+i+")");
				if(InputNames[i]=="identity") Input.style.backgroundColor = "#eee";
				else Input.style.backgroundColor = "#ffffff";
			}
			console.log("bodyonload() completed");
		}