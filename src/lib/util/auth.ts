export function getTokenDuration() {
	const expiration = localStorage.getItem('expiration');
	const expirationDate = new Date(expiration || '');
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	return duration;
}

export function getAuthToken() {
	const token = localStorage.getItem('token');
	const duration = getTokenDuration();
	if (duration < 0) {
		return 'EXPIRED';
	}

	return token ? 'Bearer ' + token : token;
}
