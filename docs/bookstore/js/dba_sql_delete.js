		var td_delete_button = undefined;
		function deleterow(btn){
			$('#myModal').modal('show');
			td_delete_button = btn;
		}
		function deleterow_submit(){
			var tr = td_delete_button.parentNode.parentNode;
			// var table = document.getElementById("tab");
			// table.deleteRow(tr.rowIndex);
			post("db_delete.html","db_delete_id",tr.childNodes[0].innerHTML);
		}