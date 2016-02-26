function sumNonRedValues(obj, sum) {
	if (typeof obj === 'number') {
		return sum + obj
	} else if (obj instanceof Array) {
		for (let i = 0; i < obj.length; i++)
			sum = sumNonRedValues(obj[i], sum)
		return sum
	} else if (typeof obj === 'object') {
		const keys = Object.keys(obj)
		let objectSum = 0
		for (let i = 0; i < keys.length; i++) {
			let value = obj[keys[i]]
			if (typeof value === 'string' && value === 'red') 
				return sum
			objectSum = sumNonRedValues(value, objectSum)
		}		
		return sum + objectSum
	} else 
		return sum
}

export default {
	addNumbersInString(input) {
		const numbersRegex = /\-?\d+/g
		const results = input.match(numbersRegex)
		return results ? results.reduce((sum, next) => sum + parseFloat(next), 0) : 0
	},
	
	addNonRedNumbers(input) {
		const json = JSON.parse(input)
		return sumNonRedValues(json, 0)
	}
}