import { useEffect, useState } from "react";
import ApiClient from "./ApiClient";

const TransactionsPage = ({ navigate }: { navigate: Function }) => {
  const [transactions, setTransactions] = useState<Array<any>>([]);
  const [amount, setAmount] = useState<number>(0);

  const getTransactions = async () => {
    const t = await ApiClient({
      route: "transaction",
      init: {
        method: "GET",
      },
    });
    if (t != 0) setTransactions(t);
  };

  const getSumValue = async () => {
    const a = await ApiClient({
      route: "transaction/sum-value",
      init: {
        method: "GET",
      },
    });
    if (a != 0) setAmount(Number(a.sumValue));
  };

  useEffect(() => {
    getTransactions();
    getSumValue();
  }, []);

  return (
    <div className="p-4">
      <div className="md:flex md:flex-row-reverse justify-between p-4">
        <div className="h-full flex justify-center items-center dark:text-white pb-4">
          Saldo:{" "}
          {amount < 0 ? (
            <div className="text-red-500 pl-4">{amount}</div>
          ) : (
            <div className="text-green-500 pl-4">{amount}</div>
          )}
        </div>
        <div>
          <button
            onClick={() => navigate("/transactions/txt-import")}
            className="bg-blue-500 hover:bg-blue-700 dark:text-white font-bold py-2 px-4 rounded-full"
          >
            Importa arquivo (.TXT)
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
              <th scope="col" className="px-6 py-3">
                Seller
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.product}
                </th>
                <td className="px-6 py-4">
                  {new Date(transaction.date).toLocaleString("pt-BR", {
                    weekday: "long", // Nome completo do dia da semana
                    year: "numeric", // Ano no formato de 4 dígitos
                    month: "long", // Nome completo do mês
                    day: "numeric", // Dia do mês
                    hour: "numeric", // Hora no formato 12 horas
                    minute: "numeric", // Minuto
                    second: "numeric", // Segundo
                    hour12: true, // Use o formato de 12 horas (true) ou 24 horas (false)
                  })}
                </td>
                <td className="px-6 py-4">
                  {transaction.Type.nature}, {transaction.Type.description}
                </td>
                <td className="px-6 py-4">{transaction.value}</td>
                <td className="px-6 py-4">{transaction.seller}</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;
