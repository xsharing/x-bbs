import { Form, Input, Modal } from 'antd';
import { ConnectionHandler, type Disposable } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  threadsQuery,
  useCreateThreadCommitEvent,
} from '../../selector/threads';

interface Data {
  name: string;
}
export const ThreadCreateForm = (): JSX.Element => {
  const [form] = Form.useForm<Data>();
  const [commit, isInFlight] = useCreateThreadCommitEvent();
  const navigate = useNavigate();

  const connectionId = useRecoilValue(threadsQuery).edgesConnectionId;
  // console.log('connectionId', connectionId);

  return (
    <Modal
      open={true}
      destroyOnClose={true}
      title="Create A New Thread"
      okText="Create"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onOk={async () => {
        const values = await form.validateFields();
        // console.log(values);

        await new Promise((resolve, reject) =>
          commit({
            variables: {
              input: { name: values.name },
              connections: [connectionId],
            },
            onCompleted: (response, errors) => {
              console.log('onCompleted', response, errors);
              if ((errors?.length ?? 0) > 0) {
                reject(errors);
              } else {
                resolve(response);
              }
            },
          }),
        );
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
