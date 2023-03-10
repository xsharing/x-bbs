import { Form, Input, Modal } from 'antd';
import { type Disposable } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useCreateThreadCommitEvent } from '../../selector/threads';

interface Data {
  name: string;
}
export const ThreadCreateForm = (): JSX.Element => {
  const [form] = Form.useForm<Data>();
  const [commit, isInFlight] = useCreateThreadCommitEvent();
  const navigate = useNavigate();

  return (
    <Modal
      open={true}
      destroyOnClose={true}
      title="Create A New Thread"
      okText="Create"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onOk={async () => {
        const values = await form.validateFields();
        console.log(values);
        commit({
          variables: { input: { name: values.name } },
        });
        navigate('..');
      }}
      okButtonProps={{ loading: isInFlight }}
    >
      <Form preserve={false} labelAlign="left" form={form}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
