async function create(ctx) {
	const defaultChoiceLength = 4;
	ctx.render('campaigns/new', { defaultChoiceLength });
	ctx.status = 200;
}

module.exports = create;
