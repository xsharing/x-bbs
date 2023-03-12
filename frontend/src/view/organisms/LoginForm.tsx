import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAuthorizationTokenSetter } from '../../graphql';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginCommitEvent } from '../../selector/auth';

interface FormFields {
    email: string;
    password: string;
}

export const LoginForm = (): JSX.Element => {
  const [form] = useForm<FormFields>();
  const authorizationTokenSetter = useAuthorizationTokenSetter();
  const navigate = useNavigate();
  const [loginMutation, isInFlight] = useLoginCommitEvent();

  const login = useCallback((data: FormFields) => {
    loginMutation({variables: { input: data}, onCompleted: (data) => {
      console.log('loginMutation.onCompleted', data);
      authorizationTokenSetter(data.login);
      navigate('/');
    }
  });
  }, [authorizationTokenSetter, navigate, loginMutation]);

  return (
    <Form form={form} onFinish={login}>
      <Form.Item label="email" name="email">
        <Input type="email" />
      </Form.Item>
      <Form.Item label="password" name="password">
        <Input type="password" />
      </Form.Item>
      <Button htmlType="submit" loading={isInFlight}>Login</Button>
    </Form>
  );
};
