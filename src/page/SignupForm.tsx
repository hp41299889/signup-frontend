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
  RadioChangeEvent,
  Divider,
  Space,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useState, useEffect } from "react";
import { Session } from "../api/interface";
import { deleteSignup, getAllSessions, postSignup } from "../api/signup";
import { SignupFormData } from "./interface";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

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
  const deadline = dayjs("2023-07-05");

  const renderSessionOption = sessions.map((session) => {
    const { id, name, place, activityDate, remainingNumber } = session;
    return (
      <Radio value={id} key={`radio_${id}`}>
        <Text>
          {name} {dayjs(activityDate).format("M月D日")}
          {`(${place})`}
          <Divider type="vertical" />
          剩餘名額：{remainingNumber}
        </Text>
      </Radio>
    );
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

  const onSessionChange = (e: RadioChangeEvent) => {
    const isSapplyShttle = sessions[e.target.value - 1].isShuttle;
    setShowShuttle(isSapplyShttle);
    if (isSapplyShttle) {
      form.setFieldsValue({
        isShuttle: null,
      });
    } else {
      form.setFieldsValue({
        isShuttle: false,
      });
    }
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
          title: <Text>表單送出成功！</Text>,
          content: (
            <>
              <p>
                <Text>恭喜您已成功送出表單！</Text>
              </p>
              <p>
                <Text>請至信箱收取驗證信件以完成報名</Text>
              </p>
              <p>
                <Text type="danger">
                  請留意垃圾郵件，驗證信件可能被歸類為垃圾信件
                </Text>
              </p>
            </>
          ),
          onOk: () => {
            form.resetFields();
            navigate("/signup");
          },
        });
      })
      .catch((err) => {
        console.error(err);
        Modal.error({
          title: <Text>報名失敗！</Text>,
          okText: "我知道了",
          content: (
            <>
              <Text>錯誤：</Text>
              {err.response.data.message === "id is already exist" && (
                <>
                  <p>此員編已重複報名</p>
                </>
              )}
            </>
          ),
          onOk: () => {
            Modal.confirm({
              title: "要刪除先前報名紀錄嗎？",
              okText: "確認刪除",
              cancelText: "返回",
              content: "此動作會刪除先前的報名紀錄，即可以員編再次報名",
              onOk: () => {
                const id = form.getFieldValue("id");
                deleteSignup(id)
                  .then((res) => {
                    Modal.success({
                      title: "刪除報名紀錄成功！",
                      okText: "確認",
                      content:
                        "已成功刪除先前報名紀錄，請再次以報名系統報名並進行信箱驗證",
                      onOk: () => {
                        navigate("/signup");
                      },
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              },
            });
          },
        });
      });
  };

  useEffect(() => {
    if (dayjs().isSame(deadline, "day") || dayjs().isAfter(deadline, "day")) {
      Modal.error({
        title: "錯誤",
        content: "報名已截止！",
        onOk: () => {
          navigate("/home");
        },
      });
    }
  }, [navigate, deadline]);

  useEffect(() => {
    getAllSessions()
      .then((res) => {
        if (res.data.status === "success") {
          if (res.data.data.length > 0) {
            setSessions(res.data.data);
          }
        }
      })
      .catch((err) => {
        setSessions([]);
      });
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFormSubmit}
      requiredMark={false}
      layout="vertical"
    >
      <Row>
        <Col xs={24} lg={{ span: 16, offset: 4 }}>
          <Row gutter={[6, { xs: 0 }]}>
            <Col xs={24}>
              <Title>報名表單</Title>
            </Col>
            <Col xs={24} lg={8}>
              <Item
                name="name"
                label="姓名：(請填寫與身分證件一致的姓名)"
                rules={[{ required: true, message: "請輸入姓名" }]}
              >
                <Input />
              </Item>
            </Col>
            <Col xs={24} lg={{ span: 8, pull: 2, offset: 2 }}>
              <Item
                name="id"
                label="兆豐銀行員工編號：(6碼)"
                rules={[
                  { required: true, message: "請輸入員編" },
                  { min: 6, message: "員編長度不符合" },
                ]}
              >
                <Input maxLength={6} />
              </Item>
            </Col>
            <Col xs={24} lg={8}>
              <Item
                name="phoneNumber"
                label="行動電話："
                rules={[
                  { required: true, message: "請輸入行動電話" },
                  { min: 10, message: "行動電話長度不符合" },
                ]}
              >
                <Input maxLength={10} />
              </Item>
            </Col>
            <Col xs={24} lg={16}>
              <Item
                name="email"
                label="EMAIL：(請正確填寫稍後能接收由系統發送回覆郵件的Email信箱)"
                rules={[
                  { required: true, message: "請輸入EMAIL" },
                  { type: "email", message: "非法的EMAIL格式" },
                ]}
              >
                <Input />
              </Item>
            </Col>
            <Col xs={24} lg={24}>
              <Item
                name="sessionId"
                label="參加場次："
                rules={[{ required: true, message: "請選擇參加場次" }]}
              >
                <Radio.Group onChange={onSessionChange}>
                  <Space direction="vertical">{renderSessionOption}</Space>
                </Radio.Group>
              </Item>
            </Col>
            <Col xs={24} lg={{ span: 16, pull: 16, offset: 16 }}>
              <Item
                name="joinNumber"
                label="是否攜眷：(每名兆豐員工可免費攜眷人數為2人，第3名家眷以上，每人需酌收$400元餐飲費，並於家庭日當天於報到處繳交)"
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
              <Col xs={24} lg={24}>
                <Item
                  name="extraJoinNumber"
                  label={
                    <>
                      <Text>總參加人數：</Text>
                      <Text type="danger">(含自己)</Text>
                    </>
                  }
                  rules={[
                    { required: true, message: "請輸入總參加人數" },
                    {
                      validator(_, value) {
                        if (!Number.isInteger(Number(value))) {
                          return Promise.reject(
                            new Error("總參加人數必須是整數")
                          );
                        }
                        if (value <= 3) {
                          return Promise.reject(
                            new Error("總參加人數必須大於3人")
                          );
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
            <Col xs={12} lg={12}>
              <Item
                name="isParking"
                label="有無停車："
                rules={[{ required: true, message: "請選擇有無停車" }]}
              >
                <Radio.Group options={isParkingOption} />
              </Item>
            </Col>
            <Col xs={12} lg={12}>
              <Item
                name="isShuttle"
                label="是否搭乘接駁車："
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
                      !!form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    送出
                  </Button>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default SignupForm;
