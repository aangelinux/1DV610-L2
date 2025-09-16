/**
 * @module Defines a demo application to test the Chart Generator library.
 * @file tests/demo.js
 */

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

    #dataInputs {
        display: flex;
        flex-direction: row;
        gap: 15px;
        margin-bottom: 15px;
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
        width: 550px;
        height: 300px;
        border: 2px solid black;
        border-radius: 3px;
    }
</style>

<div id="demo-app">
    <h1>CHART GENERATOR</h1>
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
        /**
         * Creates an instance of the current type.
         */
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))
        }
    }
)