import { Route, Routes } from 'react-router-dom';
import { ShowCreateGroupModalButton } from '../molecules/ShowCreateGroupModalButton';
import { GroupCreateForm } from '../organisms/GroupCreateForm';
import { GroupTable } from '../organisms/GroupTable';

export default function Threads(): JSX.Element {
  return (
    <main>
      <ShowCreateGroupModalButton />
      <GroupTable />
      <Routes>
        <Route path="create" element={<GroupCreateForm />} />
      </Routes>
    </main>
  );
}
