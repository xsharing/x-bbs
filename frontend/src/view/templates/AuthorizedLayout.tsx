import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import styles from './AuthorizedLayout.module.css';

export default function AuthorizedLayout(): JSX.Element {
  return (
    <Layout.Content className={styles.layout}>
      <Layout.Header>header goes here</Layout.Header>
      <Outlet />
      <Layout.Footer>©Nobuyuki Horiuchi 2023</Layout.Footer>
    </Layout.Content>
  );
}
