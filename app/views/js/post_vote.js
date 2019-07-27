async function makeVote() {
	var hkid = document.forms.choices.hkid.value;
	var campaignID = document.forms.choices.campaign_id.value;
	var choiceID = document.forms.choices.choice_id.value;
	var rawResponse = await fetch('/admin/votes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({ hkid, campaign_id: campaignID, choice_id: choiceID })
	});
	var content = await rawResponse.json();
	var status = rawResponse.status;
	if (status !== 201) {
		alert(content.meta.message);
		return;
	}
	window.location.href = `/campaigns/${campaignID}/result`;
}
