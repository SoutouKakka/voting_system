async function makeVote() {
	var form = toJSON(document.forms.choices);
	console.log(form);
	if (!form.choice_id) {
		alert('Please select a choice');
		return
	}
	var rawResponse = await fetch('/admin/votes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify(form)
	});
	var content = await rawResponse.json();
	var status = rawResponse.status;
	if (status !== 201) {
		alert(content.meta.message);
		return;
	}
	window.location.href = `/campaigns/${form.campaign_id}/result`;
}

function toJSON( form ) {
	var obj = {};
	var elements = form.querySelectorAll( "input, select, textarea" );
	for( var i = 0; i < elements.length; ++i ) {
		var element = elements[i];
		var name = element.name;
		var value = element.value;

		if( name && value ) {
			_.set(obj, name, value);
		}
	}

	return obj;
}