import { Card } from 'antd';
import { LoginForm } from '../organisms/LoginForm';

export default function Login(): JSX.Element {
  return (
    <main>
      <Card title="Login">
        <LoginForm />
      </Card>
    </main>
  );
}
