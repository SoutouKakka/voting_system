$(function() {
	$('.new-campaign').submit(async function() {
		var form = {};
		$.each($('.new-campaign').serializeArray(), function(i, field) {
			if (field.name && field.value) {
				_.set(form, field.name, field.value);
			}
		});
		var rawResponse = await fetch('/admin/campaigns', {
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
		window.location.href = `/campaigns/${content.data._id}`;
	});
})