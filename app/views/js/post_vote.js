async function makeVote() {
	const hkid = document.forms.choices.hkid.value;
	const campaignID = document.forms.choices.campaign_id.value;
	const choiceID = document.forms.choices.choice_id.value;
	const rawResponse = await fetch('/admin/votes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		},
		body: JSON.stringify({ hkid, campaign_id: campaignID, choice_id: choiceID })
	});
	const content = await rawResponse.json();
	const status = rawResponse.status;
	if (status !== 201) {
		alert(content.meta.message);
		return;
	}
	window.location.href = `/campaigns/${campaignID}/result`;
}
