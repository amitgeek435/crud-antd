import React, { useState, useEffect } from "react";
import { Layout, Table } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
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
  //   Upload,
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

// const normFile = (e) => {
//   console.log("Upload event:", e);

//   if (Array.isArray(e)) {
//     return e;
//   }

//   return e?.fileList;
// };

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
    console.log(record);
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
                age: 16,
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
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Please select your Age!",
                  },
                ]}
              >
                <Form.Item name="age" noStyle>
                  <InputNumber min={1} max={100} />
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

              {/* <Form.Item
                name="userprofile"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Chose your profle pic.*"
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item> */}

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

              <Column title="Age" dataIndex="age" key="age" />
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
