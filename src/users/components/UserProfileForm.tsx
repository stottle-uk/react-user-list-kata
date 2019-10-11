import React, { useState } from 'react';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Form, { FormInputItem, FormStatus } from '../../shared/forms/Form';
import { User } from '../models/User';

interface OwnProps {
  user: User;
  onSubmit: (user: User) => Observable<User>;
  onCancel: () => void;
}

const UserProfileForm: React.FC<OwnProps> = ({ user, onSubmit, onCancel }: OwnProps) => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    isDirty: false
  });

  const formItems: FormInputItem[] = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address' },
    { name: 'county', label: 'County' },
    { name: 'country', label: 'Country' }
  ];

  const onFormSubmit = (user: User) => {
    setFormStatus({ ...formStatus, isSubmitting: true, isSubmitted: false, isDirty: true });
    onSubmit(user)
      .pipe(tap(() => setFormStatus({ ...formStatus, isSubmitting: false, isSubmitted: true })))
      .subscribe();
  };

  return (
    <Form
      initialFormData={user}
      formItems={formItems}
      formStatus={formStatus}
      onCancel={onCancel}
      onSubmit={onFormSubmit}
    />
  );
};

export default UserProfileForm;
