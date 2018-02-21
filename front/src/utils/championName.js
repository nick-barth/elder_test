/*
 * Returns safe string for us to use in filepaths / urls
 * --
 * @param {String} Champion name - ugly stuff
 * @return {String} Formatted Champ name
 */

export function formatChampName (champName) {
	return champName.replace(/ /g,'_').toLowerCase();
}

export function unformatChampName (champName) {
	return champName.replace('_', ' ');
}
