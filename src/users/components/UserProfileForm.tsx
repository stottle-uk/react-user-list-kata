import React, { useState } from 'react';
import Form, { FormInputItem } from '../../shared/forms/Form';
import { User } from '../models/User';
import UserErrors from './UserErrors';

// todo: add validation methods to the formItems

const formItems: FormInputItem[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'address', label: 'Address' },
  { name: 'county', label: 'County' },
  { name: 'country', label: 'Country' }
];

interface OwnProps {
  user: User;
  errors: any[];
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserProfileForm: React.FC<OwnProps> = ({ user, errors, onSubmit, onCancel }: OwnProps) => {
  const [formData, setFormData] = useState<User>(user);

  const onFormSubmit = () => onSubmit({ ...user, ...formData });

  return (
    <div className="modal-card" data-e2e="user-profile-form">
      <header className="modal-card-head">
        <p className="modal-card-title">{user.username}</p>
        <button className="delete" aria-label="close" onClick={onCancel}></button>
      </header>
      <section className="modal-card-body">
        <UserErrors errors={errors} />
        <Form initialFormData={user} formItems={formItems} onChange={setFormData} />
      </section>
      <footer className="modal-card-foot">
        <button className="button is-success" onClick={onFormSubmit} data-e2e="user-profile-submit">
          Save changes
        </button>
        <button className="button" onClick={onCancel}>
          Cancel
        </button>
      </footer>
    </div>
  );
};

export default UserProfileForm;
