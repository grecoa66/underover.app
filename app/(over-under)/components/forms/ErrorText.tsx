export const ErrorText = ({ message }: { message?: string }) => {
  return message ? <p className="text-sm text-red-500">{message}</p> : null;
};
