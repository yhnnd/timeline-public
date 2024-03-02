		function db_select(FormName,SelectTypeClass,SelectType){
				if(FormName==undefined||SelectTypeClass==undefined||SelectType==undefined){
				alert("function db_select(FormName,SelectTypeClass,SelectType)\nERROR: function parameter undefined !");
				return;
				}
				var myForm = document.getElementsByName(FormName)[0];

				var myInput = document.createElement("input");
				myInput.setAttribute("name","db_select_type");
				myInput.setAttribute("type","text");
				myInput.setAttribute("value",SelectType);
				myForm.appendChild(myInput);

				var myInput2 = document.createElement("input");
				myInput2.setAttribute("name","db_select_type_class");
				myInput2.setAttribute("type","text");
				myInput2.setAttribute("value",SelectTypeClass);
				myForm.appendChild(myInput2);

				document.body.appendChild(myForm);
				myForm.submit();
				document.body.removeChild(myForm);
		}
		function db_select_AutoFillInputByInputName(FormName,InputName,SelectType,SelectName,SelectValue){
				if(FormName==undefined||InputName==undefined
				||SelectType==undefined||SelectName==undefined||SelectValue==undefined)
				alert("function advanced_db_select(FormName,InputName,SelectType,SelectName,SelectValue)\n"
				+ "Error: function parameter undefined !");
				$("input[name='"+ InputName +"']")[0].value = SelectValue;
				db_select(FormName,SelectType,SelectName);
		}