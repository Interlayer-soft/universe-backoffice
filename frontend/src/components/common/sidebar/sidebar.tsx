import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  RadarChartOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import routes from '../../../constants/routes';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar: React.FC = () => {
  return (

      <Sider>
    
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
           <Link to={routes.ADMIN}>Admin </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<RadarChartOutlined />}>
          <Link to={routes.PREDICTLOGS}>Predict logs</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<NotificationOutlined />} title="Submenu">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>


  );
};

export default Sidebar;
