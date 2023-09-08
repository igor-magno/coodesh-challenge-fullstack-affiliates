import { Suspense, useState, useTransition } from "react";
import TransactionsPage from "./TransactionsPage";
import TransactionsImportByTxtPage from "./TransactionsImportByTxtPage";
import Layout from "./Layout";

function App() {
  return (
    <Suspense fallback={<BigSpinner />}>
      <Router />
    </Suspense>
  );
}

function Router() {
  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();

  function navigate(url: string) {
    startTransition(() => {
      setPage(url);
    });
  }

  let content;
  if (page === "/" || page === "/transactions") {
    content = <TransactionsPage navigate={navigate} />;
  } else if (page === "/transactions/txt-import") {
    content = <TransactionsImportByTxtPage navigate={navigate} />;
  }
  return <Layout isPending={isPending}>{content}</Layout>;
}

function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}

export default App;
