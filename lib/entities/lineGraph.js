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
    #config
    #validator
    #scale
    #style
    #axis
    #dataMarker
    #data
    #options

    constructor(dependencies, data, options) {        
        this.#config = dependencies.config
        this.#validator = dependencies.validator
        this.#scale = dependencies.scale
        this.#style = dependencies.style
        this.#axis = dependencies.axis
        this.#dataMarker = dependencies.dataMarker

        this.#data = data
        this.#options = options

    }

    render(chart) {
        this.#options = this.#config.assemble(this.#options, this.#chartType)
        this.#validator.validateData(this.#data)
        this.#validator.validateOptions(this.#options)

        this.#calculateLayout()
        this.#setAxis()
		this.#setdataMarker()
        this.#style.baseStyle = this.#options

        this.#dataMarker.renderTitle(this.#options.title)
        this.#axis.renderYAxis(this.#values)
        this.#axis.renderXAxis(this.#data)
        this.#dataMarker.renderLine(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#height = this.#options.height
        this.#width = this.#options.width

        this.#minValue = this.#scale.getSmallestValue(this.#data)
        this.#maxValue = this.#scale.getBiggestValue(this.#data)
        this.#values = this.#scale.getValues(this.#minValue, this.#maxValue, this.#rows)
        this.#columns = this.#scale.getColumns(this.#width, this.#data)

        this.#heightScale = this.#height / this.#maxValue
        this.#rowHeight = this.#height / this.#rows
        this.#firstDataPos = (this.#columns / 2) + (this.#dataPointRadius / 2)
    }

    #setAxis() {
        this.#axis.layout = {
            width: this.#width,
            height: this.#height,
            columns: this.#columns,
            xAxisValue: this.#minValue,
            rowHeight: this.#rowHeight
        }
	}

	#setdataMarker() {
        this.#dataMarker.layout = {
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