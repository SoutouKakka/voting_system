$(function() {
	$('.choices').submit(async function() {
		var form = {};
		$.each($('.choices').serializeArray(), function(i, field) {
			form[field.name] = field.value;
		});
		if (!form.choice_id) {
			alert('Please select a choice');
			return;
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
	});
})
