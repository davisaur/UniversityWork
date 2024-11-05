window.addEventListener("load", function(){

	document.querySelector("#contact form").addEventListener("submit", sendmessage);
	document.querySelector("#reset_success").addEventListener("click", reset);
	document.querySelector("#reset_error").addEventListener("click", reset);
});

function sendmessage(evt) {

	// prevent browser form submit
	evt.preventDefault();
	

	// get values
	var email = document.querySelector("#email").value.trim();
	var subject = document.querySelector("#subject").value.trim();
	var message = document.querySelector("#message").value.trim();

	
	// get handles for error messages
	var hint_email = document.querySelector("#hint_email");
	var hint_subject = document.querySelector("#hint_subject");
	var hint_message = document.querySelector("#hint_message");

	
	// test field values 
	var fields_ok = true;
	
	if(email.length == 0 || email.indexOf("@") < 0) {
		hint_email.style.display = "inline";
		fields_ok = false;
	} else {
		hint_email.style.display = "none";
	}

	if(subject.length == 0) {
		hint_subject.style.display = "inline";
		fields_ok = false;
	} else {
		hint_subject.style.display = "none";
	}

	if(message.length == 0) {
		hint_message.style.display = "inline";
		fields_ok = false;
	} else {
		hint_message.style.display = "none";
	}
	
	
	// if everything is ok, post it to the server
	if(fields_ok) {
	
		// hide form and show loading icon
		document.querySelector("#contact").style.display = "none";
		document.querySelector("#loading").style.display = "block";
	
	
		// prepare data 
		var data = "email=" + encodeURIComponent(email)
				 + "&subject=" + encodeURIComponent(subject)
				 + "&message=" + encodeURIComponent(message);
				 
				 
		// make request		 
		var xhr = new XMLHttpRequest(); 
		xhr.addEventListener("load", function(){
			
			// hide loading icon
			document.querySelector("#loading").style.display = "none";

			console.log(xhr.responseText);

			if(xhr.status==201){
				document.querySelector("#success").style.display = "block";
			}
			else {
				document.querySelector("#error").style.display = "block";
			}				
		});
		xhr.open("POST", "contact.php", true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
		
	}
}

function reset() {
	document.querySelector("#success").style.display = "none";
	document.querySelector("#error").style.display = "none";
	document.querySelector("#loading").style.display = "none";
	document.querySelector("#contact").style.display = "block";
	document.querySelector("#email").value = "";
	document.querySelector("#subject").value = "";
	document.querySelector("#message").value = "";
}
