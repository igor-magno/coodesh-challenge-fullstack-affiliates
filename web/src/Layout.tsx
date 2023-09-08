import { ReactNode } from "react";

const Layout = ({
  children,
  isPending,
}: {
  children: ReactNode;
  isPending: Boolean;
}) => {
  return (
    <div className="p-4">
      <section
        style={{
          opacity: isPending ? 0.7 : 1,
        }}
        className="flex justify-center"
      >
        <h2 className="text-4xl font-extrabold dark:text-white">
          Transactions
        </h2>
      </section>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
