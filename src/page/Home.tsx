import { Col, Divider, Image, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import Taipei_1 from "../asset/img/Taipei-1.jpg";
import ZongChang from "../asset/img/ZongChang.jpg";
import Taipei_2 from "../asset/img/Taipei-2.jpg";
import Yilan from "../asset/img/Yilan.jpg";
import Kaohsiung from "../asset/img/Kaohsiung.jpg";
import TaoChu from "../asset/img/TaoChu.jpg";
import Tainan from "../asset/img/Tainan.jpg";

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <Row>
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>台北一場</Title>
        <Image width={200} height={300} src={Taipei_1} />
        <Link to="http://www.wugu-farm.com.tw/" style={{ paddingTop: "10px" }}>
          點擊前往頁面
        </Link>
      </Col>
      <Divider />
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>中彰場</Title>
        <Image width={200} height={300} src={ZongChang} />
        <Link to="http://www.mmts.com.tw/" style={{ paddingTop: "10px" }}>
          點擊前往頁面
        </Link>
      </Col>
      <Divider />
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>台北二場</Title>
        <Image width={200} height={300} src={Taipei_2} />
        <Link to="https://www.tcap.taipei/" style={{ paddingTop: "10px" }}>
          點擊前往頁面
        </Link>
      </Col>
      <Divider />
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>宜蘭場</Title>
        <Image width={200} height={300} src={Yilan} />
        <Link to="https://www.tcfarm.com.tw/" style={{ paddingTop: "10px" }}>
          點擊前往頁面
        </Link>
      </Col>
      <Divider />
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>高雄場</Title>
        <Image width={200} height={300} src={Kaohsiung} />
        <Link
          to="https://tendrum.com.tw/TpHome/ct"
          style={{ paddingTop: "10px" }}
        >
          點擊前往頁面
        </Link>
      </Col>
      <Divider />
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>桃竹場</Title>
        <Image width={200} height={300} src={TaoChu} />
        <Link
          to="https://www.facebook.com/XINFENGFARM/?locale=zh_TW"
          style={{ paddingTop: "10px" }}
        >
          點擊前往頁面
        </Link>
      </Col>
      <Divider />
      <Col
        xs={24}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>台南場</Title>
        <Image width={200} height={300} src={Tainan} />
        <Link
          to="https://springgarden.hi-bnb.com/"
          style={{ paddingTop: "10px" }}
        >
          點擊前往頁面
        </Link>
      </Col>
    </Row>
  );
};

export default Home;
