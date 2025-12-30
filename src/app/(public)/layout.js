import Header from "../../components/layout/Header";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicLayout;
