export function BEARER() {
	if (JSON.parse(localStorage.getItem('userInfo'))) {
		console.log('USER INFO', JSON.parse(localStorage.getItem('userInfo')))
		return {"Authorization": `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`}			
	} else return null;
}