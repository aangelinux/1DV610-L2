/**
 * @module Renders the data markers and title on the chart.
 */

export class Marker {
	#SVG_NS = "http://www.w3.org/2000/svg"
    #chart
    #style
	#layout

    constructor(chart, style) {
        this.#chart = chart
        this.#style = style
    }

    set layout(values) {
        this.#layout = values
    }

    renderTitle(titleText) {
        const title = document.createElement("h3")
        title.id = "chartTitle"
        title.textContent = titleText
        title.style.color = this.#style.color
        title.style.fontFamily = this.#style.font
        this.#chart.appendChild(title)
    }

    renderBars(data) {        
        const graph = this.#createGraph()
        this.#chart.appendChild(graph)
		
        let i = 0
        data.forEach((object) => {
            const dataValue = object.value
            const bar = this.#createBar(dataValue, i)
            graph.appendChild(bar)
            i++
        })
    }

    renderLine(data) {
        const graph = this.#createGraph()
        this.#chart.appendChild(graph)

        let dataPoints = []
        let i = 0
        data.forEach((object) => {
            const dataPoint = this.#createDataPoint(object.value, i)
            graph.appendChild(dataPoint)
            dataPoints.push(dataPoint)
            i++
        })
        const points = this.#createLinePath(dataPoints)
        const line = this.#createLine(points)
        graph.appendChild(line)
    }

    renderPieSlices(data) {
        const graph = this.#createGraph()
        this.#chart.appendChild(graph)

        let i = 0
        data.forEach((object) => {
            const path = this.#createSlicePath(object)
            const pieSlice = this.#createPieSlice(path, i)
            graph.appendChild(pieSlice)
            i++
        })
    }

    #createGraph() {
        const graph = document.createElementNS(this.#SVG_NS, "svg")
        graph.id = "svgGraph"
        graph.setAttribute("height", this.#layout.height)
        graph.setAttribute("width", this.#layout.width)

        return graph
    }

    #createBar(dataValue, i) {
        const bar = document.createElementNS(this.#SVG_NS, "rect")
        bar.id = "bar"
        bar.setAttribute("height", (dataValue * this.#layout.heightScale))
        bar.setAttribute("width", this.#layout.barWidth)
        bar.setAttribute("fill", `${this.#style.color}`)

        bar.setAttribute("x", 
            this.#layout.firstDataPos + (this.#layout.columns * i))
        bar.setAttribute("y", 
            this.#layout.height - (dataValue * this.#layout.heightScale))

        return bar
    }

    #createDataPoint(dataPoint, i) {
        const circle = document.createElementNS(this.#SVG_NS, "circle")
        circle.id = "circle"
        circle.setAttribute("r", this.#layout.dataPointRadius)
        circle.setAttribute("fill", this.#style.color)

        circle.setAttribute("cx", 
            this.#layout.firstDataPos + (this.#layout.columns * i))
        circle.setAttribute("cy", 
            this.#layout.height - 
			((dataPoint - this.#layout.minValue) * this.#layout.heightScale))

        return circle
    }

    #createLinePath(dataPoints) {
        let linePath = ""
        for (let i = 0; i < dataPoints.length; i++) {
            linePath = linePath.concat(
            `${dataPoints[i].getAttribute("cx")},
			${dataPoints[i].getAttribute("cy")} `)
        }

        return linePath
    }

    #createLine(points) {
        const polyline = document.createElementNS(this.#SVG_NS, "polyline")
        polyline.id = "polyline"
        polyline.setAttribute("points", points)
        polyline.setAttribute("stroke", this.#style.color)

        return polyline
    }

    #createSlicePath(data) {
        const { centerCoordinates, radius, rotation, sweepFlag } = this.#layout
        const { startCoordinates, endCoordinates, largeArcFlag } = data

        // Make sure to only use the values in coordinates objects
        const slicePath = `
        M ${centerCoordinates.x} ${centerCoordinates.y}
        L ${startCoordinates.x} ${startCoordinates.y}
        A ${radius} ${radius} ${rotation} ${largeArcFlag} ${sweepFlag}
            ${endCoordinates.x} ${endCoordinates.y}
        L ${centerCoordinates.x} ${centerCoordinates.y}
        Z`

        return slicePath
    }

    #createPieSlice(path, i) {
        const slice = document.createElementNS(this.#SVG_NS, "path")
        slice.id = "slice"
		slice.setAttribute("d", path)
        slice.setAttribute("fill", this.#style.pieColors[i])

        return slice
    }
}