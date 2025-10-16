/**
 * @module Defines limits for data and options objects.
 */

export class Limits {
	#dataObjects = { 
		min: 2, 
		max: 10 
	}
		
    #dataObjectKeys = { 
		min: 2, 
		max: 2 
	}

    #dataValue = { 
		min: 0, 
		max: 10000000 
	}

    #optionKeys = { 
		min: 3, 
		max: 5 
	}

    #optionValues = {
        width: { min: 200, max: 1000 },
        height: { min: 150, max: 800 },
        radius: { min: 100, max: 400 }
    }

	#optionStrings = {
		color: [
			"darkred", 
			"red", 
			"orange", 
			"yellow", 
			"green", 
			"blue", 
			"indigo", 
			"violet", 
			"darkolivegreen"
		],
		font: [
			"monaco, monospace",
			"arial", 
			"verdana", 
			"tahoma", 
			"times new roman", 
			"georgia", 
			"lexend light"	
		]
	}

    #dataTypes = {
        name: "string",
        value: "number",
    }

    #optionsTypes = {
        width: "number",
        height: "number",
        radius: "number",
        title: "string",
        color: "string",
        font: "string"
    }

	constructor() {
	}

	get dataObjects() {
		return this.#dataObjects
	}

	get dataObjectKeys() {
		return this.#dataObjectKeys
	}

	get dataValue() {
		return this.#dataValue
	}

	get optionKeys() {
		return this.#optionKeys
	}

	get optionValues() {
		return this.#optionValues
	}

	get optionStrings() {
		return this.#optionStrings
	}

	get dataTypes() {
		return this.#dataTypes
	}

	get optionsTypes() {
		return this.#optionsTypes
	}
}