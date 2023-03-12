import { Form, Input, Modal, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { GroupVisibilityEnum } from '../../gql/graphql';
import { groupsQuery, useCreateGroupCommitEvent } from '../../selector/groups';

interface Data {
  name: string;
  visibility: GroupVisibilityEnum;
}
export const GroupCreateForm = (): JSX.Element => {
  const [form] = Form.useForm<Data>();
  const [commit, isInFlight] = useCreateGroupCommitEvent();
  const navigate = useNavigate();

  const connectionId = useRecoilValue(groupsQuery).edgesConnectionId;

  return (
    <Modal
      open={true}
      destroyOnClose={true}
      title="Create New Group"
      okText="Create"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onOk={async () => {
        const values = await form.validateFields();
        // console.log(values);

        await new Promise((resolve, reject) =>
          commit({
            variables: {
              input: { name: values.name, visibility: values.visibility },
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
      onCancel={() => {
        navigate('..');
      }}
    >
      <Form preserve={false} labelAlign="left" form={form}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
        <Form.Item name="visibility">
          <Select
            options={[
              {
                label: GroupVisibilityEnum.Public,
                value: GroupVisibilityEnum.Public,
              },
              {
                label: GroupVisibilityEnum.Private,
                value: GroupVisibilityEnum.Private,
              },
              {
                label: GroupVisibilityEnum.Secret,
                value: GroupVisibilityEnum.Secret,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
