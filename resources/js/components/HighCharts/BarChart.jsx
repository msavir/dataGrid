import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
// High charts
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
// helpers
import setData from './helpers';

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: {
        text: props.text
      },
      chart: {
        type: 'bar'
      },
      xAxis: {
        type: 'category'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        },
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
                      props.onChartSliceClick({
                         searchText:this.name,
                         searchColumnValue:this.series.name
                     })
                    }
                }
            }
        }
      },
      series: [
      {
        name: props.name,
        colorByPoint: true,
        data: []
      }
      ]
    };
  }

  componentDidUpdate(prevProps, prevState) {
  if (prevProps.data !== this.props.data){
    let result = setData(this.props);
    this.setLocalState(result);
  }
}

  componentDidMount(){
    let result = setData(this.props);
    this.setLocalState(result);
  }

  setLocalState(result){
    var series = {...this.state.series}
    series.data = result;
    this.setState({series})
  }

  render() {
    return (
      <div>
      <HighchartsReact highcharts={Highcharts} options={this.state} />
      </div>
      );
  }
}

BarChart.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    index: PropTypes.string,
    data: PropTypes.array,
    onChartSliceClick: PropTypes.func
}

export default BarChart;