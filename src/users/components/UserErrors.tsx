import React from 'react';

interface OwnProps {
  retry?: () => void;
  retryText?: string;
  errors: any[];
}

interface StoreProps {}

type AllProps = OwnProps & StoreProps;

const UserErrors: React.FC<AllProps> = ({ errors, retry, retryText }: AllProps) =>
  !!errors.length ? (
    <article className="message is-danger is-in-modal">
      <div className="message-body">
        {errors[errors.length - 1].data}
        {!!retry && <b onClick={retry}>&nbsp;{retryText}</b>}
      </div>
      {/* todo: show something nice when max retries fails */}
    </article>
  ) : (
    <></>
  );

export default UserErrors;