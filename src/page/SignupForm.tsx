import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Typography,
  CheckboxOptionType,
  Modal,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useState, useEffect } from "react";
import { Session } from "../api/interface";
import { getAllSessions, postSignup } from "../api/signup";
import { SignupFormData } from "./interface";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const { Item, useForm } = Form;

const isParkingOption: CheckboxOptionType[] = [
  { label: "是", value: true },
  { label: "否", value: false },
];

const isShuttleOption: CheckboxOptionType[] = [
  { label: "是", value: true },
  { label: "否", value: false },
];

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showShuttle, setShowShuttle] = useState<boolean>(true);
  const [showJoinNumberInput, setShowJoinNumberInput] =
    useState<boolean>(false);

  const sessionOption: DefaultOptionType[] = sessions.map((session) => {
    const { id, name, remainingNumber } = session;
    return { label: `${name}，剩餘名額：${remainingNumber}`, value: id };
  });

  const joinNumberOption: DefaultOptionType[] = [
    { label: "否，我一人參加2023家庭日", value: 1 },
    { label: "是，我會攜眷1人，共計2人參加", value: 2 },
    { label: "是，我會攜眷2人，共計3人參加", value: 3 },
    {
      label: (
        <div style={{ whiteSpace: "normal" }}>
          <Text>是，我會攜眷3人以上，共計4人以上參加</Text>
          <Text type="danger">(我了解需額外支付自付額)</Text>
        </div>
      ),
      value: 4,
    },
  ];

  const onJoinNumberChange = (number: number) => {
    if (number === 4) {
      setShowJoinNumberInput(true);
    } else {
      setShowJoinNumberInput(false);
    }
  };

  const onSessionChange = (sessionId: number) => {
    const isSapplyShttle = sessions[sessionId - 1].isShuttle;
    setShowShuttle(isSapplyShttle);
    form.setFieldsValue({
      isShuttle: isSapplyShttle,
    });
  };

  const onFormSubmit = async (values: SignupFormData) => {
    if (showJoinNumberInput) {
      values.joinNumber = values.extraJoinNumber;
    }
    if (!showShuttle) {
      values.isShuttle = false;
    }
    await postSignup(values)
      .then((res) => {
        console.log(res);
        Modal.success({
          title: <Text>報名成功！</Text>,
          content: <Text>恭喜您已成功報名！</Text>,
          onOk: () => {
            navigate("/signup");
          },
        });
      })
      .catch((err) => {
        console.error(err);
        Modal.error({
          title: <Text>報名失敗！</Text>,
          content: (
            <>
              <Text>錯誤：</Text>
              {err.response.data.message === "id is already exist" && (
                <Text>此員編已重複報名</Text>
              )}
            </>
          ),
        });
      });
  };

  useEffect(() => {
    getAllSessions().then((res) => {
      if (res.data.status === "success") {
        if (res.data.data.length > 0) {
          setSessions(res.data.data);
        }
      }
    });
  }, []);

  return (
    <Form form={form} onFinish={onFormSubmit} requiredMark={false}>
      <Row gutter={[6, { xs: 0 }]}>
        <Col xs={24}>
          <Title>報名表單</Title>
        </Col>
        <Col xs={12}>
          <Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "請輸入姓名" }]}
          >
            <Input />
          </Item>
        </Col>
        <Col xs={12}>
          <Item
            name="id"
            label="員編"
            rules={[{ required: true, message: "請輸入員編" }]}
          >
            <Input maxLength={6} />
          </Item>
        </Col>
        <Col xs={12}>
          <Item
            name="phoneNumber"
            label="行動電話"
            rules={[{ required: true, message: "請輸入行動電話" }]}
          >
            <Input />
          </Item>
        </Col>
        <Col xs={24}>
          <Item
            name="email"
            label="EMAIL"
            rules={[
              { required: true, message: "請輸入EMAIL" },
              { type: "email", message: "非法的EMAIL格式" },
            ]}
          >
            <Input />
          </Item>
        </Col>
        <Col xs={24}>
          <Item
            name="sessionId"
            label="參加場次"
            rules={[{ required: true, message: "請選擇參加場次" }]}
          >
            <Select options={sessionOption} onChange={onSessionChange} />
          </Item>
        </Col>
        <Col xs={24}>
          <Item
            name="joinNumber"
            label="是否攜眷"
            rules={[{ required: true, message: "請選擇是否攜眷" }]}
          >
            <Select
              options={joinNumberOption}
              onChange={onJoinNumberChange}
              style={{ minWidth: "350px" }}
            />
          </Item>
        </Col>
        {showJoinNumberInput && (
          <Col xs={24}>
            <Item
              name="extraJoinNumber"
              label={
                <>
                  <Text>總參加人數</Text>
                  <Text type="danger">(含自己)</Text>
                </>
              }
              rules={[
                { required: true, message: "請輸入總參加人數" },
                {
                  validator(_, value) {
                    if (!Number.isInteger(Number(value))) {
                      return Promise.reject(new Error("總參加人數必須是整數"));
                    }
                    if (value <= 3) {
                      return Promise.reject(new Error("總參加人數必須大於3人"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input inputMode="numeric" type="number" />
            </Item>
          </Col>
        )}
        <Col xs={12}>
          <Item
            name="isParking"
            label="有無停車"
            rules={[{ required: true, message: "請選擇有無停車" }]}
          >
            <Radio.Group options={isParkingOption} />
          </Item>
        </Col>
        <Col xs={12}>
          <Item
            name="isShuttle"
            label="是否接駁"
            rules={[{ required: true, message: "請選擇是否接駁" }]}
          >
            {showShuttle ? (
              <Radio.Group options={isShuttleOption} />
            ) : (
              <Text type="danger">本場次不提供接駁</Text>
            )}
          </Item>
        </Col>
        <Col xs={{ span: 6, offset: 18 }}>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                送出
              </Button>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SignupForm;