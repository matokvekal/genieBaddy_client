export const changeAppDirection = (dir) => {
	const body = document.body;
	body.dir = dir;
	if (dir === 'rtl') {
		if (body.className.indexOf('geniebuddy-rtl') !== -1) {
			return;
		}
		body.className = body.className + 'geniebuddy-rtl';
	} else {
		body.className = body.className.replace(/geniebuddy-rtl/g, '');
	}
};
