/**
 * @module Renders a line graph.
 */

export class LineGraph {
    // Static values
    #chartType = "LINEAR"
    #dataPointRadius = 5
    #rows = 4

    // Dynamic values
    #width
    #height
    #values
    #maxValue
    #minValue
    #heightScale
    #rowHeight
    #columns
    #firstDataPos

    // Objects
    #configuration
    #validator
    #scale
    #style
    #axis
    #marker
    #data
    #options

    constructor(dependencies, data, options) {
        const { configuration, validator, scale, style, axis, marker } = dependencies
        
        this.#configuration = configuration
        this.#validator = validator
        this.#scale = scale
        this.#style = style
        this.#axis = axis
        this.#marker = marker

        this.#data = data
        this.#options = options

    }

    render(chart) {
        this.#options = this.#configuration.assemble(this.#options, this.#chartType)
        this.#validator.validateData(this.#data)
        this.#validator.validateOptions(this.#options)

        this.#calculateLayout()
        this.#setAxis()
		this.#setMarker()
        this.#style.baseStyle = this.#options

        this.#marker.renderTitle(this.#options.title)
        this.#axis.renderYAxis(this.#values)
        this.#axis.renderXAxis(this.#data)
        this.#marker.renderLine(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#height = this.#options.height
        this.#width = this.#options.width

        this.#minValue = this.#scale.getSmallestValueOf(this.#data)
        this.#maxValue = this.#scale.getBiggestValueOf(this.#data)
        this.#values = this.#scale.getValues(this.#minValue, this.#maxValue, this.#rows)
        this.#columns = this.#scale.getColumns(this.#width, this.#data)

        this.#heightScale = this.#height / this.#maxValue
        this.#rowHeight = this.#height / this.#rows
        this.#firstDataPos = (this.#columns / 2) + (this.#dataPointRadius / 2)
    }

    #setAxis() {
        this.#axis.chartLayout = {
            width: this.#width,
            height: this.#height,
            columns: this.#columns,
            xAxisValue: this.#minValue,
            rowHeight: this.#rowHeight
        }
	}

	#setMarker() {
        this.#marker.chartLayout = {
            width: this.#width,
            height: this.#height,
            columns: this.#columns,
            heightScale: this.#heightScale,
            dataPointRadius: this.#dataPointRadius,
            minValue: this.#minValue,
            firstDataPos: this.#firstDataPos           
        }
    }
}