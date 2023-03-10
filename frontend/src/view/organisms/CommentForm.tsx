import { Button, Form, Input, Typography } from 'antd';
import { useRecoilValue } from 'recoil';
import { useAddCommentCommitEvent } from '../../selector/comment';
import { threadQuery } from '../../selector/thread';

export const CommentForm = ({
  threadId,
}: {
  threadId: string;
}): JSX.Element => {
  const commentsConnectionId = useRecoilValue(
    threadQuery(threadId),
  ).commentsConnectionId;

  const [form] = Form.useForm();
  const [commit, isInFlight] = useAddCommentCommitEvent();

  return (
    <Form
      form={form}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onFinish={async (values) => {
        await new Promise((resolve, reject) =>
          commit({
            variables: {
              input: { body: values.body, threadId },
              connections: [commentsConnectionId],
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
      }}
    >
      <Form.Item name="body">
        <Input />
      </Form.Item>
      <Button htmlType="submit" loading={isInFlight}>
        send
      </Button>
    </Form>
  );
};
