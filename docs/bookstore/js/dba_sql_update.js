
		var td_update_button = undefined;
		function updaterow_reset(){
			if( td_update_button != undefined && td_update_button != null ){
				updaterow_done(td_update_button);
			}
		}
		function updaterow(btn){
			updaterow_reset();
			var tr = btn.parentNode.parentNode;
			for(var i=0;i<=4;++i){
				if(i==2) continue;//identity cannot be changed using this function
				if(i==3) continue;//password cannot be changed using this function
				var td = tr.childNodes[i];
				var td_text = td.innerHTML;
				td.innerHTML = "<div class='input-group input-group-sm'>"
				+ "<input  class='form-control' style='text-align:center' "
				+ (i==0 ? "disabled='true' readonly='true' " : "")
				+ "type='text' value='"+td_text+"' /></div>";
			}
			btn.parentNode.innerHTML =
			"<div type='button' id='update_submit' class='btn btn-sm btn-default' onclick='updaterow_submit(this)'>"
			+"&nbsp;<span class='glyphicon glyphicon-ok-sign'></span>&nbsp;</div>";
			td_update_button = document.getElementById("update_submit");
		}

		function updaterow_done(btn){
			var Verified = true;
			var tr = btn.parentNode.parentNode;
			for(var i=0;i<=4;++i){// <td>        <div>         <input>
				if(i==2) continue;//identity cannot be changed using this function
				if(i==3) continue;//password cannot be changed using this function
				var myInput = tr.childNodes[i].childNodes[0].childNodes[0];//<input>
				tr.childNodes[i].innerHTML = myInput.value;
				if( myInput.value==null || myInput.value=="" ){
					setAlert("alert-warning","value to update cannot be null or empty");
					Verified = false;
				}
			}
			btn.parentNode.innerHTML =
			"<idv type='button' value=' UPDATE ' class='btn btn-sm btn-"
			+ ( Verified == true ? "primary" : "warning" )
			+ "' onclick='updaterow(this)'>&nbsp;<span class='glyphicon glyphicon-edit'></span>&nbsp;</div>";
			td_update_button = undefined;
			return Verified;
		}

		function updaterow_submit(btn){
				//     <input>  <td>      <tr>
				var tr = btn.parentNode.parentNode;
				// turn <td><div><input> into <td>text
				if( updaterow_done(btn) != true ) return;

				// submit a form to db_update.html
				var myForm = document.createElement("form");
				myForm.method="post";
				myForm.action = "db_update.html";

				var col_names = new Array("id","name","identity","password","age");
				for(var i=0;i<col_names.length;++i){
					if(i==2) continue;//identity cannot be changed using this function
					if(i==3) continue;//password cannot be changed using this function
					var myInput = document.createElement("input");
					myInput.setAttribute("name", col_names[i]);
					myInput.setAttribute("type", "text");
					myInput.setAttribute("value", tr.childNodes[i].innerHTML);
					myForm.appendChild(myInput);
				}

				document.body.appendChild(myForm);
				myForm.submit();
				document.body.removeChild(myForm);
		}
