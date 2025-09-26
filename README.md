# Chart Generator Library
## Project
<!-- Screenshots! -->
  
  

## Installation



## Usage

  

## Valid Objects
| Object  | Type   | Elements                   | Limit  |
| ------- | ------ | -------------------------- | ------ |
| Data    | Array  | Objects                    | 2 - 10 |
| Data[i] | Object | Keys (see Data Schema)     | 2      |
| Options | Object | Keys (see Options Schemas) | 0 - 5  |
  
### Data Schema
| Key   | Type   | Allowed values           |
| ----- | ------ | ------------------------ |
| name  | string |                          |
| value | number | (-1 000 000) - 1 000 000 |
  
### Options Schemas
#### Options: Linear Charts
| Key    | Type   | Allowed values                                   |
| ------ | ------ | ------------------------------------------------ |
| width  | number | 200 - 1000                                       |
| height | number | 150 - 800                                        |
| title  | string |                                                  |
| color  | string | red, orange, yellow, green, blue, indigo, violet |
| font   | string | Arial, Verdana, Tahoma, Times New Roman, Georgia |
  
#### Options: Radial Charts
| Key    | Type   | Allowed values                                   |
| ------ | ------ | ------------------------------------------------ |
| radius | number | 100 - 400                                        |
| title  | string |                                                  |
| font   | string | Arial, Verdana, Tahoma, Times New Roman, Georgia |
  

## Code examples
### Create a bar chart displaying monthly rainfall
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
    font: "Georgia"
}

const chart = new Chart()
const rainfallChart = chart.createBarChart(data, linearOptions)

rainfallChart.render()
```

### Validate new inputs and create a new pie chart
```
chart.clearChart()

chart.validateData(newData)
chart.validateOptions(newOptions)

const newRainfallChart = chart.createPieChart(newData, newOptions)
newRainfallChart.render()
```
  
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
![KFC](https://img.shields.io/badge/KFC-F40027?style=for-the-badge&logo=kfc&logoColor=white)