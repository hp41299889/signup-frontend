import React from "react";
import { Col, Image, Row, Space, Typography } from "antd";

import line from "../asset/img/line.jpg";

const { Paragraph, Title } = Typography;

const Service: React.FC = () => {
  return (
    <Row>
      <Col xs={24} lg={14}>
        <Title level={3} style={{ display: "flex", justifyContent: "center" }}>
          客服相關資訊
        </Title>
        <Paragraph mark>
          <ul>
            <li>Line-ID：yellowbd1992</li>
            <li>
              若您有任何特殊需求，或未收到報名回復郵件，請與我們聯絡(LINE)
            </li>
            <li>
              若需預訂『桃竹場次~新豐農場~免費帳篷營位或自費1,000元的蒙古包』，也請與我們聯絡(LINE)，每位員工限訂一位置，先訂先贏，額滿為止
            </li>
            <li>留言若無法立即回覆，敬請見諒並耐心等候，謝謝您</li>
          </ul>
        </Paragraph>
      </Col>
      <Col xs={24} lg={10}>
        <Space
          direction="vertical"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Image src={line} width={200} height={200} />
          {/* <Link href="https://line.me/ti/p/nS3htUh-Zg">無法掃描嗎？</Link> */}
        </Space>
      </Col>
    </Row>
  );
};

export default Service;
