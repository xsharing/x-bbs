import { Form, Input, Modal } from 'antd';
import { ConnectionHandler, type Disposable } from 'react-relay';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { threadQuery, useUpdateThreadCommitEvent } from '../../selector/thread';
import {
  threadsQuery,
  useCreateThreadCommitEvent,
} from '../../selector/threads';

interface Data {
  name: string;
}
export const ThreadUpdateForm = ({
  threadId,
}: {
  threadId: string;
}): JSX.Element => {
  const [form] = Form.useForm<Data>();
  const [commit, isInFlight] = useUpdateThreadCommitEvent();
  const navigate = useNavigate();
  const initialData = useRecoilValue(threadQuery(threadId));

  return (
    <Modal
      open={true}
      destroyOnClose={true}
      title={`Update Thread: ${initialData.node?.name}`}
      okText="Update"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onOk={async () => {
        const values = await form.validateFields();
        // console.log(values);

        await new Promise((resolve, reject) =>
          commit({
            variables: {
              input: { name: values.name, id: threadId },
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
      onCancel={() => {
        navigate('..');
      }}
    >
      <Form preserve={false} labelAlign="left" form={form}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
