# Chart Generator Library
## Project
<!-- Screenshots! -->
  

## Installation

  
  
## Usage
### Methods
To use the interface, you create an instance of the class Chart. The interface contains three main methods:  
- createBarChart(data, options)
- createLineGraph(data, options)
- createPieChart(data, options)
  
Each method accepts two parameters and returns a div element containing the chart, and the chart elements are rendered using SVG. Only one chart can be rendered per Chart instance; if you call one of these methods on a Chart instance that already contains a rendered chart, it will be overriden.  
  
The data object stores data in the form of objects containing a name and a value. The options object stores configurable style rules for the chart. Static style rules are stored in a default CSS template.  
  
Passing an options object is optional. It is also not required to pass an options object containing all the keys defined in the schema, the chart will use the default options as defined in the table below.  
The options object has two different schemas depending on the type of chart being created. See **Options Schemas** and **Data Schema** below.  
  
Data and options are automatically validated before rendering the chart, and an exception is thrown if they fail any validation checks. If you want to validate either object before creating a chart, you can call these methods:
- validateData(data)
- validateOptions(options)
  
Finally, you can call any of these helper methods:  
- get chart()
- resetChart()
- replaceStaticCSS(template)
  
### Default options
| Key    | Values            |
| ------ | ----------------- |
| width  | 550               |
| height | 300               |
| radius | 150               |
| title  | Data Chart        |
| color  | darkred           |
| font   | Monaco, monospace |
  

## Valid Objects
| Object  | Type   | Elements                   | Limit  |
| ------- | ------ | -------------------------- | ------ |
| Data    | Array  | Objects                    | 2 - 10 |
| Data[i] | Object | Keys (see Data Schema)     | 2      |
| Options | Object | Keys (see Options Schemas) | 0 - 5  |
  
---
### Data Schema
| Key   | Type   | Allowed values           |
| ----- | ------ | ------------------------ |
| name  | string |                          |
| value | number | (-1 000 000) - 1 000 000 |
  
---
### Options Schemas
#### Options: Linear Charts
| Key    | Type   | Allowed values                                            |
| ------ | ------ | --------------------------------------------------------- |
| width  | number | 200 - 1000                                                |
| height | number | 150 - 800                                                 |
| title  | string |                                                           |
| color  | string | darkred, red, orange, yellow, green, blue, indigo, violet |
| font   | string | (Monaco, monospace), Arial, Verdana, Tahoma, Times New Roman, Georgia|
  
---
#### Options: Radial Charts
| Key    | Type   | Allowed values                                   |
| ------ | ------ | ------------------------------------------------ |
| radius | number | 100 - 400                                        |
| title  | string |                                                  |
| font   | string | (Monaco, monospace), Arial, Verdana, Tahoma, Times New Roman, Georgia |
  

## Code examples
#### Create a bar chart displaying monthly rainfall
```
const data = [
    {
        name: "Stockholm",
        value: 22
    },
    {
        name: "Oslo",
        value: 14
    }
]

const linearOptions = {
    width: 500,
    height: 250,
    title: "Monthly Rainfall By City",
    color: "blue",
    font: "Monaco, monospace"
}

const chart = new Chart()
const rainfallChart = chart.createBarChart(data, linearOptions)
```
---
#### Validate new inputs and create a new pie chart
```
chart.validateData(newData)
chart.validateOptions(newOptions)

const newRainfallChart = chart.createPieChart(newData, newOptions)
```
  
  
## Contribution



## Assignment files
Reflektioner: https://github.com/aangelinux/1DV610-L2/blob/main/assignment/reflektion.md  
Testrapport: https://github.com/aangelinux/1DV610-L2/blob/main/assignment/testrapport.md  
  

## Version
1.0.0


## License
Licensed under the MIT License.  
  

## Badges
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Made with love and](https://img.shields.io/badge/KFC-F40027?style=for-the-badge&logo=kfc&logoColor=white)
![Made with love and](https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white)