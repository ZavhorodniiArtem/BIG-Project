import login from '@assets/img/login.png';

const WithAuth = ({ children }: any) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center justify-center w-1/2">
        {children}
      </div>
      <div className="flex w-1/2 h-[calc(100vh-60px)]">
        <img src={login} alt="login" className="mx-auto" />
      </div>
    </div>
  );
};

export default WithAuth;
