import React from 'react';
import { Breadcrumb, Row, Col, Card } from 'antd'
import Axios from '../api/axios'
import Donut from '../components/Donut'

const Email = props => {
  const { esData } = props
  console.log(esData)
  let donutData = []
  let donutDataTotal = 0
  let esDonutData = 'results' in esData ? esData.results : []
  let esDonutDataTotal = 'total' in esData ? esData.total : 0
  return (
    <div style={{backgroundColor: '#ececec'}}>
      <div style={{backgroundColor: '#fff', padding: '20px 0 0 20px'}}>
        <Breadcrumb>
          <Breadcrumb.Item>成本中心</Breadcrumb.Item>
          <Breadcrumb.Item>部门成本月报</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{margin: 0, paddingTop: '10px'}}>部门成本月报</h2>
      </div>
      <div style={{padding: '20px 30px'}}>
        <Row gutter={16}>
          <Col span={12}>
            <Card
              title="实际部门总成本"
              bordered={false}
            >
              <Donut dataSource={donutData} total={donutDataTotal} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="预估部门总成本"
              bordered={false}
            >
              <Donut dataSource={esDonutData} total={esDonutDataTotal} />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

Email.getInitialProps = async function({ req }) {
  let data = {}
  let receiver = req.params.receiver
  try {
    const res = await Axios.get('/cost_email/estimated', {
      params: { receiver: receiver, dimension: 'dept' }
    })
    data = res.data
  } catch (error) {
    console.log(error)
  }
  return {
    esData: data
  }
}

export default Email