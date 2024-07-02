export default function getCurrencyFormat(number: number, currency: string, LanguageFormat = undefined) {
	return Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: currency }).format(number);
}