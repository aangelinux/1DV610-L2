/**
 * @module Defines a demo application to test the Chart Generator library.
 * @file test/demo.js
 */

import { Chart } from '../lib/public/chart.js'

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
            </div>
            <div id="numberInputs">
                <input type="number">
                <input type="number">
                <input type="number">
                <input type="number">
                <input type="number">
            </div>
        </div>
        <div id="optionsInputs">
            <div>
                <label for="width">Width:</label>
                <input id="width" type="number">
            </div>

            <div>
                <label for="height">Height:</label>
                <input id="height" type="number">
            </div>

            <div>
                <label for="title">Title:</label>
                <input id="title" type="text">
            </div>

            <div>
                <label for="color">Color:</label>
                <input id="color" type="text">
            </div>

            <div>
                <label for="font">Font:</label>
                <input id="font" type="text">
            </div>
        </div>
    </div>
    <div id="buttons">
        <button id="barButton">GENERATE BAR CHART</button>
        <button id="lineButton">GENERATE LINE GRAPH</button>
        <button id="pieButton">GENERATE PIE CHART</button>
    </div>
    <div id="chart"></div>
</div>
`

customElements.define('demo-app',
    /**
     * Encapsulates logic for the demo-app component.
     */
    class extends HTMLElement {
        #barButton
        #lineButton
        #pieButton
        #textInputs
        #numberInputs
        #optionsInputs
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
            this.#textInputs = this.shadowRoot.querySelector('#textInputs').querySelectorAll('input[type="text"]')
            this.#numberInputs = this.shadowRoot.querySelector('#numberInputs').querySelectorAll('input[type="number"]')
            this.#chartElement = this.shadowRoot.querySelector('#chart')

            this.chart = new Chart()
            this.abortController = new AbortController()
        }

        /**
         * Called when the element is appended to the DOM.
         */
        connectedCallback() {
            this.#barButton.addEventListener('click', () => {
                const dataArrays = this.#gatherDataFromInputs()
                const objectData = this.#saveDataInObject(dataArrays)
                this.#addBarChart(objectData)
            }, { signal: this.abortController.signal })

            this.#lineButton.addEventListener('click', () => {
                const dataArrays = this.#gatherDataFromInputs()
                const objectData = this.#saveDataInObject(dataArrays)
                this.#addLineGraph(objectData)
            }, { signal: this.abortController.signal })

            this.#pieButton.addEventListener('click', () => {
                const dataArrays = this.#gatherDataFromInputs()
                const objectData = this.#saveDataInObject(dataArrays)
                this.#addPieChart(objectData)
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

            this.#textInputs.forEach((textInput) => {  // Extract
                if (textInput.value) {
                    textDataArray.push(textInput.value)
                }
            })
            this.#numberInputs.forEach((numberInput) => {  // Extract
                if (numberInput.value) {
                    numberDataArray.push(numberInput.value)
                }
            })

            return dataArraysObject = { textDataArray, numberDataArray }
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

        #addBarChart(data) {
            const barChart = this.chart.createBarChart(data)
            this.#chartElement.appendChild(barChart)
        }

        #addLineGraph(data) {
            const lineGraph = this.chart.createLineGraph(data)
            this.#chartElement.appendChild(lineGraph)

        }

        #addPieChart(data) {
            const pieChart = this.chart.createPieChart(data)
            this.#chartElement.appendChild(pieChart)
        }
    }
)