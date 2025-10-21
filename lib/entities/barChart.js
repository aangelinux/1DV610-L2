/**
 * @module Renders a bar chart.
 */

export class BarChart {
    // Static values
    #chartType = "LINEAR"
    #barToColumnRatio = 3
    #rows = 4
    #minValue = 0  // bar charts should start at 0 to not look misleading

    // Dynamic values
    #width
    #height
    #values
    #maxValue
    #heightScale
    #rowHeight
    #columns
    #barWidth
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
        this.#dataMarker.renderBars(this.#data)

        return chart
    }

    #calculateLayout() {
        this.#width = this.#options.width
        this.#height = this.#options.height

        this.#maxValue = this.#scale.getBiggestValue(this.#data)
        this.#values = this.#scale.getValues(this.#minValue, this.#maxValue, this.#rows)
        this.#columns = this.#scale.getColumns(this.#width, this.#data)

        this.#barWidth = this.#columns / this.#barToColumnRatio
        this.#heightScale = this.#height / this.#maxValue
        this.#rowHeight = this.#height / this.#rows
        this.#firstDataPos = (this.#columns / 2) - (this.#barWidth / 2)
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
            barWidth: this.#barWidth,
            firstDataPos: this.#firstDataPos
        }
    }
}