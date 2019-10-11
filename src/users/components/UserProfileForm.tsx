import React, { useState } from 'react';
import { User } from '../models/User';

interface OwnProps {
  user: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserProfileForm = ({ user, onSubmit, onCancel }: OwnProps) => {
  const [userData, setUserData] = useState<User>(user);

  const formItems = ['firstName', 'lastName', 'email', 'address', 'county', 'country'];

  const onChange = (field: string) => (e: React.FormEvent<HTMLInputElement>) =>
    setUserData({ ...userData, [field]: e.currentTarget.value });

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <pre>{JSON.stringify(user, undefined, 2)}</pre>
      {formItems.map(item => (
        <div key={item}>
          <input type="text" defaultValue={(user as any)[item]} name={item} onChange={onChange(item)} />
        </div>
      ))}
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <pre>{JSON.stringify(userData, undefined, 2)}</pre>
    </form>
  );
};

export default UserProfileForm;
