import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import formatMoney from '../utils/index';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const color = [
  '#1890FF',
  '#13C2C2',
  '#2FC25B',
  '#FACC14',
  '#F04864',
  '#8543E0'
];

class Donut extends React.PureComponent {
  static defaultProps = {
    estimate: false,
    dataSource: [],
    total: 0,
    increase: 0
  };
  static propTypes = {
    estimate: PropTypes.bool,
    dataSource: PropTypes.array,
    increase: PropTypes.number
  };
  getOption = () => {
    const dataSource = this.props.dataSource;
    const data = dataSource.map(item => ({
      value: item.amount,
      name: item.name
    }));
    const option = {
      color: color,
      series: [
        {
          type: 'pie',
          radius: ['70%', '90%'],
          center: ['45%', '45%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              formatter: params => {
                const { name, value } = params;
                let money = formatMoney.format(value);
                return `{title|${name}}\n{value|¥${money}}`;
              },
              lineHeight: 30,
              rich: {
                title: {
                  align: 'center',
                  color: '#a9a9a9',
                  fontSize: 24
                },
                value: {
                  align: 'center',
                  color: '#000',
                  fontSize: 16,
                  fontWeight: 'bold'
                }
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data
        }
      ]
    };
    return option;
  };
  render() {
    const { estimate, dataSource, total, increase } = this.props;
    const style = {
      width: '50%',
      height: '300px',
      float: 'left'
    };
    const option = this.getOption();
    return (
      <div>
        <div className="clearfix">
          <div style={style}>
            <ReactEchartsCore
              echarts={echarts}
              option={option}
              notMerge={true}
              lazyUpdate={true}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ float: 'left', width: '50%' }}>
            {dataSource.map((value, index) => (
              <div style={{ padding: '8px 0', overflow: 'hidden' }} key={index}>
                <div style={{ float: 'left', width: '25%', minWidth: 80 }}>
                  <i
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: color[index],
                      marginRight: '10px'
                    }}
                  />
                  <span title={value.name}>
                    {value.name.length > 4
                      ? value.name.slice(0, 3) + '...'
                      : value.name}
                  </span>
                </div>
                <div style={{ float: 'left' }}>
                  <span style={{ color: '#a9a9a9' }}>|</span>
                  <span style={{ padding: '0 8px', color: '#a9a9a9' }}>
                    {value.pct}
                  </span>
                </div>
                <div style={{ float: 'right' }}>
                  ¥ {formatMoney.format(value.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#a9a9a9' }}>
            {estimate ? '预估总成本：' : '实际总成本：'}
          </span>
          <span style={{ fontSize: 20 }}>
            <strong>¥ {formatMoney.format(total)}</strong>
          </span>
          {estimate && (
            <span>
              <span style={{ color: '#a9a9a9', padding: '0 5px' }}>月环比</span>
              {increase > 0 && (
                <Icon type="caret-up" style={{ color: '#2FC25B' }} />
              )}
              {increase < 0 && (
                <Icon type="caret-down" style={{ color: '#f5222d' }} />
              )}
              {increase === 0 && <span>-</span>}
              {increase !== 0 && (
                <span style={{ padding: '0 5px' }}>
                  {parseFloat(increase * 100).toFixed(2)}%
                </span>
              )}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Donut;
