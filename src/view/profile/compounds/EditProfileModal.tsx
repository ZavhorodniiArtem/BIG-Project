import { Button, DatePicker, Form, Input, Modal } from 'antd';
import useStore from '@hooks/useStore.ts';
import { TEditProfile, TEditValues } from '@/view/profile/compounds/types.ts';

const EditProfileModal = ({
  isModalOpen,
  setIsModalOpen,
  username,
}: TEditProfile) => {
  const { profile } = useStore();
  const { auth } = useStore();

  const handleOk = async (values: TEditValues) => {
    try {
      const data = { ...values, birthday: values.birthday.$d };
      await profile.editProfile(data);
      await auth.getMe();
      setIsModalOpen(false);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <Modal
      title="Edit profile"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        name="profile"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={handleOk}
        initialValues={{
          userName: username,
        }}
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Birthday" name="birthday">
          <DatePicker />
        </Form.Item>

        <div className="flex justify-end">
          <Button
            type="default"
            htmlType="button"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
