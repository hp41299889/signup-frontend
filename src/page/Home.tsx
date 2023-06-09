import { Col, Image, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import Taipei_1 from "../asset/img/Taipei-1.png";
import ZongChang from "../asset/img/ZongChang.png";
import Taipei_2 from "../asset/img/Taipei-2.png";
import Yilan from "../asset/img/Yilan.png";
import Kaohsiung from "../asset/img/Kaohsiung.png";
import TaoChu from "../asset/img/TaoChu.png";
import TaoChu_stay from "../asset/img/TaoChu_stay.png";
import Tainan from "../asset/img/Tainan.png";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const imgItems = [
    {
      title: "台北一場",
      src: Taipei_1,
      hyperLink: "http://www.wugu-farm.com.tw/",
    },
    { title: "中彰場", src: ZongChang, hyperLink: "http://www.mmts.com.tw/" },
    { title: "台北二場", src: Taipei_2, hyperLink: "https://www.tcap.taipei/" },
    { title: "宜蘭場", src: Yilan, hyperLink: "https://www.tcfarm.com.tw/" },
    {
      title: "高雄場",
      src: Kaohsiung,
      hyperLink: "https://tendrum.com.tw/TpHome/ct",
    },
    {
      title: "桃竹場",
      src: TaoChu,
      hyperLink: "https://www.facebook.com/XINFENGFARM/?locale=zh_TW",
    },
    {
      title: "台南場",
      src: Tainan,
      hyperLink: "https://springgarden.hi-bnb.com/",
    },
  ];

  const images: JSX.Element[] = imgItems.map((item) => {
    return (
      <Col
        xs={24}
        lg={6}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>{item.title}</Title>
        <Space>
          <Image width={200} height={300} src={item.src} />
          {item.title === "桃竹場" && (
            <Image width={300} height={200} src={TaoChu_stay} />
          )}
        </Space>
        <Link
          to={item.hyperLink}
          style={{
            paddingTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>點擊圖片看場次介紹</span>
          <span>點我前往場地官網</span>
        </Link>
      </Col>
    );
  });

  return (
    <Row justify={{ xs: "center", lg: "space-between" }}>
      <Col lg={24} style={{ display: "flex", justifyContent: "center" }}>
        <Paragraph>
          備註：
          <ul>
            <li>報名資訊僅供本次活動聯絡及報到系統使用。</li>
            <li>每名兆豐員工可免費攜眷人數為2人。</li>
            <li>每人限定報名1場次</li>
            <li>感謝您的報名與參與。</li>
          </ul>
        </Paragraph>
      </Col>
      {images}
    </Row>
  );
};

export default Home;
