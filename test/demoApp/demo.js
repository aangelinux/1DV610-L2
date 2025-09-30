/**
 * @module Defines a demo application to test the Chart Generator library.
 * @file test/demo.js
 */

import { Chart } from '../../lib/public/chart.js'
import { testTemplate } from './demoTestTemplate.js'

const template = document.createElement('template')
template.innerHTML = `
<style>
    #demo-app {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f7b538;
        color: #780116;
        font-size: 1.4rem;
        font-family: 'Monaco', monospace;
        font-weight: bold;
        margin: 0;
    }

    h1 {
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        margin: 15px 0 5px 0;
    }

    #inputs {
        display: flex;
        flex-direction: row;
        gap: 40px;
    }

    #dataInputs {
        display: flex;
        flex-direction: row;
        gap: 15px;
        margin-bottom: 15px;
    }

    #dataInputs input[type=number] {
        width: 75px;
    }

    #optionsInputs div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 1.2rem;
        gap: 5px;
        width: 230px;
        align-items: center;
    }

    #optionsInputs input {
        width: 140px;
    }

    input {
        display: flex;
        margin-top: 5px;
        padding: 2px;
        font-size: 1rem;
        border: 2px solid black;
        border-radius: 5px;
        width: 200px;
    }

    #buttons {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }

    button {
        padding: 10px 10px;
        font-family: 'Monaco', monospace;
        font-size: 1rem;
        color: white;
        background-color: #780116;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #7d3e4aff;
    }

    #chart {
        margin-top: 20px;
    }
</style>

<div id="demo-app">
    <h1>CHART GENERATOR</h1>
    <div id="inputs">
        <div id="dataInputs">
            <div id="textInputs">
                <input type="text">
                <input type="text">
                <input type="text">
                <input type="text">
                <input type="text">
                <input type="text">
            </div>
            <div id="numberInputs">
                <input type="number">
                <input type="number">
                <input type="number">
                <input type="number">
                <input type="number">
                <input type="number">
            </div>
        </div>
        <div id="optionsInputs">
            <div>
                <label for="width" name="width">Width:</label>
                <input id="options" name="width" type="number">
            </div>

            <div>
                <label for="height" name="height">Height:</label>
                <input id="options" name="height"type="number">
            </div>

            <div>
                <label for="radius" name="radius">Radius:</label>
                <input id="options" name="radius" type="number">
            </div>

            <div>
                <label for="title" name="title">Title:</label>
                <input id="options" name="title" type="text">
            </div>

            <div>
                <label for="color" name="color">Color:</label>
                <input id="options" name="color" type="text">
            </div>

            <div>
                <label for="font" name="font">Font:</label>
                <input id="options" name="font" type="text">
            </div>
        </div>
    </div>
    <div id="buttons">
        <button id="barButton">GENERATE BAR CHART</button>
        <button id="lineButton">GENERATE LINE GRAPH</button>
        <button id="pieButton">GENERATE PIE CHART</button>
        <button id="clearButton">CLEAR CHART</button>
        <button id="updateCSSButton">UPDATE CSS</button>
        <button id="getChartButton">GET CURRENT CHART</button>
    </div>
    <div id="chartElement"></div>
</div>
`

customElements.define('demo-app',
    /**
     * Encapsulates logic for the demo-app component.
     */
    class extends HTMLElement {
        // Buttons
        #barButton
        #lineButton
        #pieButton
        #clearButton
        #updateCSSButton
        #getChartButton
        // Inputs
        #textInputs
        #numberInputs
        #optionsInputs
        // Chart div
        #chartElement

        /**
         * Creates an instance of the current type.
         */
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#barButton = this.shadowRoot.querySelector('#barButton')
            this.#lineButton = this.shadowRoot.querySelector('#lineButton')
            this.#pieButton = this.shadowRoot.querySelector('#pieButton')
            this.#clearButton = this.shadowRoot.querySelector('#clearButton')
            this.#updateCSSButton = this.shadowRoot.querySelector('#updateCSSButton')
            this.#getChartButton = this.shadowRoot.querySelector('#getChartButton')

            this.#textInputs = this.shadowRoot.querySelector('#textInputs')
                .querySelectorAll('input[type="text"]')
            this.#numberInputs = this.shadowRoot.querySelector('#numberInputs')
                .querySelectorAll('input[type="number"]')
            this.#optionsInputs = this.shadowRoot.querySelectorAll('#options')

            this.#chartElement = this.shadowRoot.querySelector('#chartElement')
            this.chart = new Chart()
            this.abortController = new AbortController()
        }

        /**
         * Called when the element is appended to the DOM.
         */
        connectedCallback() {
            this.#barButton.addEventListener('click', () => {
                const objectArrays = this.#gatherOptionsFromInputs()
                const optionsObject = this.#saveOptionInObject(objectArrays)

                const dataArrays = this.#gatherDataFromInputs()
                const objectData = this.#saveDataInObject(dataArrays)

                this.#addBarChart(objectData, optionsObject)
            }, { signal: this.abortController.signal })

            this.#lineButton.addEventListener('click', () => {
                const objectArrays = this.#gatherOptionsFromInputs()
                const optionsObject = this.#saveOptionInObject(objectArrays)

                const dataArrays = this.#gatherDataFromInputs()
                const objectData = this.#saveDataInObject(dataArrays)

                this.#addLineGraph(objectData, optionsObject)
            }, { signal: this.abortController.signal })

            this.#pieButton.addEventListener('click', () => {
                const objectArrays = this.#gatherOptionsFromInputs()
                const optionsObject = this.#saveOptionInObject(objectArrays)

                const dataArrays = this.#gatherDataFromInputs()
                const objectData = this.#saveDataInObject(dataArrays)

                this.#addPieChart(objectData, optionsObject)
            }, { signal: this.abortController.signal })

            this.#clearButton.addEventListener('click', () => {
                this.#clearChart()
            }, { signal: this.abortController.signal })

            this.#updateCSSButton.addEventListener('click', () => {
                this.#updateCSS(testTemplate)
            }, { signal: this.abortController.signal })

            this.#getChartButton.addEventListener('click', () => {
                this.#getChart()
            }, { signal: this.abortController.signal })
        }

        /**
         * Called when the element is removed from the DOM.
         */
        disconnectedCallback() {
            this.abortController.abort()
        }

        #gatherDataFromInputs() {
            let textDataArray = []
            let numberDataArray = []
            let dataArraysObject

            this.#extractValues(this.#textInputs, textDataArray)
            this.#extractValues(this.#numberInputs, numberDataArray)
            
            return dataArraysObject = { textDataArray, numberDataArray }
        }

        #gatherOptionsFromInputs() {
            let optionLabelArray = []
            let optionValueArray = []
            let optionArraysObject

            this.#extractName(this.#optionsInputs, optionLabelArray)
            this.#extractValues(this.#optionsInputs, optionValueArray)

            return optionArraysObject = { optionLabelArray, optionValueArray }
        }

        #extractValues(elementArray, inputArray) {
            elementArray.forEach((element) => {
                if (element.value && isNaN(element.value)) {
                    inputArray.push(element.value)
                } else if (element.value && !isNaN(element.value)) {
                    inputArray.push(Number(element.value))
                }
            })
        }

        #extractName(elementArray, inputArray) {
            elementArray.forEach((element) => {
                if (element.value) {
                    inputArray.push(element.name)
                }
            })
        }

        #saveDataInObject(dataArrays) {
            const { textDataArray, numberDataArray } = dataArrays
            let objectData = []

            for (let i = 0; i <= textDataArray.length - 1; i++) {
                objectData.push({
                    name: textDataArray[i],
                    value: Number(numberDataArray[i])
                })
            }

            return objectData
        }

        #saveOptionInObject(optionArrays) {
            const { optionLabelArray, optionValueArray } = optionArrays
            let optionsObject = {}

            for (let i = 0; i <= optionLabelArray.length - 1; i++) {
                let option = optionLabelArray[i]
                let value = optionValueArray[i]

                Object.assign(optionsObject, { [option]: value })
            }

            return optionsObject
        }

        #addBarChart(data, options) {
            const barChart = this.chart.createBarChart(data, options)
            this.#chartElement.appendChild(barChart)
        }

        #addLineGraph(data, options) {
            const lineGraph = this.chart.createLineGraph(data, options)
            this.#chartElement.appendChild(lineGraph)
        }

        #addPieChart(data, options) {
            const pieChart = this.chart.createPieChart(data, options)
            this.#chartElement.appendChild(pieChart)
        }

        #clearChart() {
            this.chart.resetChart()
        }

        #updateCSS(template) {
            this.chart.replaceStaticCSS(template)
        }

        #getChart() {
            const currentChart = this.chart.chart.cloneNode(true)
            this.#chartElement.appendChild(currentChart)
        }
    }
)