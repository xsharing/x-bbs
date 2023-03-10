import { Modal } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { ShowCreateThreadModalButton } from '../molecules/ShowCreateThreadModalButton';
import { ThreadCreateForm } from '../organisms/ThreadCreateForm';
import { ThreadTable } from '../organisms/ThreadTable';

export default function Threads(): JSX.Element {
  return (
    <main>
      <ShowCreateThreadModalButton />
      <ThreadTable />
      <Routes>
        <Route path="create" element={<ThreadCreateForm />} />
      </Routes>
    </main>
  );
}
