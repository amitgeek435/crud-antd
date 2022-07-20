import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
import {
  Button,
  Checkbox,
  Col,
  Form,
  InputNumber,
  Radio,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setUser, delUser, editUser } from "../reducer/setUserSlice";
const { Header, Content } = Layout;
const { Option } = Select;
const { Column } = Table;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UserForm = () => {
  const userSel = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [userData, setuserData] = useState([]);
  const [iseditUser, seteditUser] = useState(false);
  const [editUserIndex, seteditUserIndex] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    setuserData(userSel);
  }, [userSel]);

  const onFinish = (values) => {
    const useryear = values["year"];
    const usermonth = values["month"];
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth();
    var yearAge = curYear - useryear;
    if (curMonth >= usermonth) var monthAge = curMonth - usermonth;
    else {
      yearAge--;
      monthAge = 12 + curMonth - usermonth;
    }
    let newAge = { yearAge, monthAge };
    values.age = newAge;
    if (iseditUser) {
      dispatch(
        editUser({
          data: values,
          index: editUserIndex,
        })
      );
      seteditUser(false);
    } else {
      dispatch(
        setUser({
          data: values,
        })
      );
    }
    form.resetFields();
  };

  const delUserhandle = (index) => {
    dispatch(
      delUser({
        index,
      })
    );
  };

  const editUserhandle = (record, index) => {
    seteditUser(true);
    seteditUserIndex(index);
    form.setFieldsValue(record);
  };
  return (
    <Layout>
      <Header>
        <h1 style={{ color: "white" }}>User Form</h1>
      </Header>
      <Content style={{ marginTop: "20px", height: "91vh" }}>
        <Row justify="center">
          <Col xs={22} md={22} lg={22} xl={22} xxl={22}>
            <Form
              form={form}
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
              initialValues={{
                year: "",
                month: "",
                hobby: [],
                gender: "male",
              }}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="Please input your username" />
              </Form.Item>
              <Form.Item
                name="useremail"
                label="Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your useremail!",
                  },
                ]}
              >
                <Input placeholder="Please input your useremail" />
              </Form.Item>

              <Form.Item
                name="country"
                label="Country"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your country!",
                  },
                ]}
              >
                <Select placeholder="Please select a country">
                  <Option value="india">India</Option>
                  <Option value="japan">Japan</Option>
                  <Option value="thailand">Thailand</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="BirthDate"
                style={{
                  marginBottom: 0,
                }}
              >
                <Form.Item
                  name="year"
                  rules={[
                    {
                      required: true,
                      message: "Please input your year!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(10% - 8px)",
                  }}
                  help="Enter Dob Year"
                >
                  <InputNumber min={1900} max={new Date().getFullYear()} />
                </Form.Item>
                <Form.Item
                  name="month"
                  rules={[
                    {
                      required: true,
                      message: "Please input your month!",
                    },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                  help="Enter Dob Month"
                >
                  <InputNumber min={1} max={12} />
                </Form.Item>
              </Form.Item>

              <Form.Item name="gender" label="Gender">
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="hobby" label="Hobby">
                <Checkbox.Group>
                  <Row>
                    <Col span={8}>
                      <Checkbox
                        value="Driving"
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        Driving
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="Foodie"
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        Foodie
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="Coding"
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        Coding
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="Travelling"
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        Travelling
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="Shopping"
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        Shopping
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="Cricket"
                        style={{
                          lineHeight: "32px",
                        }}
                      >
                        Cricket
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Table dataSource={userData} key={new Date().getTime().toString()}>
              <Column
                title="Id"
                dataIndex="id"
                key="id"
                render={(text, record, index) => `${index + 1}`}
              />
              <Column title="First Name" dataIndex="username" key="firstName" />
              <Column title="Email" dataIndex="useremail" key="email" />
              <Column title="Country" dataIndex="country" key="country" />

              <Column
                title="Age"
                dataIndex="age"
                key="age"
                render={(age) => {
                  return (
                    <Tag color="purple">
                      {age.yearAge} years {age.monthAge} months
                    </Tag>
                  );
                }}
              />
              <Column title="Gender" dataIndex="gender" key="gender" />
              <Column
                title="Hobby"
                dataIndex="hobby"
                key="hobbies"
                render={(hobbies) =>
                  hobbies?.length ? (
                    hobbies.map((hobby) => (
                      <Tag color="blue" key={hobby}>
                        {hobby}
                      </Tag>
                    ))
                  ) : (
                    <div>-</div>
                  )
                }
              />
              <Column
                title="Action"
                key="action"
                render={(text, record, index) => (
                  <>
                    <Space size="middle">
                      <Button
                        onClick={() => editUserhandle(record, index)}
                        danger
                      >
                        Edit
                      </Button>
                      <Button onClick={() => delUserhandle(index)} danger>
                        Delete
                      </Button>
                    </Space>
                  </>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UserForm;
